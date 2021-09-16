// import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Row } from 'reactstrap'
import { fetchNftUser as fetchNFTUser } from 'state/poolsNft/fetchPoolInfo'
import { NFT } from '../../config/constants/types'
import { useActiveWeb3React } from '../../hooks/index'
import { stakingNftService } from '../../services/index'
import { addAdditionalInfoNFTs, excludeExistedTokens, excludeSoldTokens } from '../../state/poolsNft/fetchPoolInfo'
import notification from './Components/Alert'
import CardNFT from './Components/CardToken'
import ModalSubmit from './Components/ModalSubmit'

interface MyCollectionProps {
  setMyTokens?: any
  activeTab: string
}

const MyCollection: React.FC<MyCollectionProps> = ({ setMyTokens, activeTab }: MyCollectionProps) => {
  const formRef = useRef()
  const isInitial = useRef<boolean>(false)
  const [isShowModalSubmit, setShowModalSubmit] = useState<boolean>(false)
  const { account } = useActiveWeb3React()
  const [tokens, setTokens] = useState<NFT[]>([])
  const [tokenSelected, setTokenSelected] = useState<NFT>()

  useEffect(() => {
    const getUserTokens = async () => {
      try {
        const [userTokens, existedTokens] = await Promise.all([
          fetchNFTUser(account),
          stakingNftService.getAllTokensId(),
        ])

        const notSoldTokens = excludeSoldTokens(userTokens, account)
        setMyTokens(notSoldTokens)
        const notUsedTokens = excludeExistedTokens(notSoldTokens, existedTokens)

        const fullInfoTokens = await addAdditionalInfoNFTs(notUsedTokens)
        setTokens(fullInfoTokens)
      } catch (error) {
        notification('error', { message: 'Fetching Error', description: error?.message })
      }
    }

    if (account && activeTab === '1' && !isInitial.current) {
      getUserTokens()
      isInitial.current = true
    }
  }, [account, setMyTokens, activeTab])

  const onSubmit = async (value: any) => {
    if (tokenSelected) {
      const { contractAddress, tokenID, image, name, description } = tokenSelected as any
      await stakingNftService
        .registerStakingToken({
          urlToken: value.urlToken,
          name: name ?? value.name,
          description: description ?? value.description,
          image,
          tokenID,
          contractAddress,
        })
        .catch((error) => notification('error', { message: 'Error', description: error?.message }))
      notification('success', {
        message: 'Update info NFT success, you can check NFT on approved collection',
        description: '',
      })
      setShowModalSubmit(false)

      setTokens((prevTokens) =>
        prevTokens.filter((token) => token.tokenID !== tokenID || token.contractAddress !== contractAddress),
      )
      setTokenSelected(null)
    }
  }

  const registerHandler = (info) => {
    setTokenSelected(info)
    setShowModalSubmit(true)
  }

  return (
    <>
      <Row>
        {tokens.map((token) => (
          <CardNFT
            name={token.name}
            description={token.description}
            image={token.image}
            contractAddress={token.contractAddress}
            tokenID={token.tokenID}
            onRegister={registerHandler}
          />
        ))}
      </Row>
      <ModalSubmit
        isShowModalSubmit={isShowModalSubmit}
        setShowModalSubmit={setShowModalSubmit}
        formRef={formRef}
        onSubmit={onSubmit}
        token={tokenSelected}
        // data={data}
      />
    </>
  )
}

export default MyCollection
