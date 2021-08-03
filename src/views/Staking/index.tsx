// import axios from 'axios'
import Page from 'components/layout/Page'
import React, { useEffect, useRef, useState } from 'react'
import { Row, TabContent, TabPane } from 'reactstrap'
import { fetchNftUser as fetchNftTokenUser } from 'state/poolsNft/fetchPoolInfo'
import styled from 'styled-components'
import { useActiveWeb3React } from '../../hooks/index'
import { stakingNftService } from '../../services/index'
import { addAdditionalInfoTokens, excludeExistedTokens, excludeSoldTokens } from '../../state/poolsNft/fetchPoolInfo'
import notification from './Components/Alert'
import CardNftToken from './Components/CardToken'
import ModalSubmit from './Components/ModalSubmit'
import NavBar from './Components/NavBar'

const MyCollection: React.FC = () => {
  const formRef = useRef()
  const [isShowModalSubmit, setShowModalSubmit] = useState(false)
  const { account } = useActiveWeb3React()
  const [tokens, setTokens] = useState([])
  const [tokenSelected, setTokenSelected] = useState()

  useEffect(() => {
    const getUserTokens = async () => {
      try {
        const [userTokens, existedTokens] = await Promise.all([
          fetchNftTokenUser(account),
          stakingNftService.getAllTokens(),
        ])

        excludeExistedTokens(userTokens, existedTokens)
        excludeSoldTokens(userTokens)

        addAdditionalInfoTokens(userTokens)

        setTokens(userTokens)
      } catch (error) {
        notification('error', { message: 'Fetching Error', description: error?.message })
      }
    }

    getUserTokens()
  }, [account])

  // const stakeHandler = async (nftContract, tokenId) => {
  //   await stakingNftContract.stake(ethers.utils.getAddress(nftContract), BigNumber.from(tokenId))
  // }

  const onSubmit = async (value: any) => {
    if (tokenSelected) {
      const { contractAddress, tokenID, image, name, description } = tokenSelected as any
      await stakingNftService
        .registerStakingToken({
          urlToken: value.urlToken,
          name: name ?? value.name,
          description: description ?? value.description,
          urlImg: image,
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
        prevTokens.filter((token) => token.tokenID === tokenID && token.contractAddress === contractAddress),
      )
      setTokenSelected(null)
    }
  }

  const registerHandler = (info) => {
    setTokenSelected(info)
    setShowModalSubmit(true)
  }

  return (
    <Page>
      <StakingPage>
        <NavBar activeTab="1" />
        <TabContent activeTab="1">
          <TabPane tabId="1">
            <Row>
              {tokens.map((token) => (
                <CardNftToken
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
          </TabPane>
        </TabContent>
      </StakingPage>
    </Page>
  )
}

const StakingPage = styled.div`
  .align-center {
    display: unset;

    @media (min-width: 768px) {
      display: flex;
      justify-content: center;
    }

    &:hover {
      cursor: pointer;

      .thumb {
        transform: scale(0.9);
        transition: all 0.9s;
      }

      .effect-light {
        text-align: center;
        font-size: 1.2em;
        color: #fff;
        font-weight: 700;
        text-transform: uppercase;
        animation: blur 0.75s ease-out infinite;
        text-shadow: 0px 0px 5px #fff, 0px 0px 7px #fff;
      }
    }
  }

  .space-mb {
    margin-bottom: 40px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #ffffff57;

      &:last-child {
        border: none;
      }
    }
  }
`

export default MyCollection
