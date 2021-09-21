import addresses from 'config/constants/contracts'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { addAdditionalInfoNFTs } from 'state/poolsNft/fetchPoolInfo'
import { getAddress } from 'utils/addressHelpers'
import { ethers } from 'ethers'
import { useActiveWeb3React } from './index'
import { NFT } from '../config/constants/types'
import { getBoostedPercent, excludeSoldTokens, excludeTokensNotTransferToFarm } from '../state/poolsNft/fetchPoolInfo'

const EtherscanPostfix = {
  1: '',
  4: '-rinkeby',
  5: '-goerli',
}

const BscscanPostfix = {
  56: '',
  97: '-testnet',
}

export const useEthereumCollection = () => {
  const { chainId, account } = useActiveWeb3React()
  const [myCollection, setMyCollection] = useState<NFT[]>([])

  useEffect(() => {
    if (account && chainId) {
      const url = `https://api${
        EtherscanPostfix[chainId] ?? '-goerli'
      }.etherscan.io/api?module=account&action=tokennfttx&address=${account}&sort=asc&apikey=H73WJKKZ7PP5WGF9C11EAPU8MJKY9BNHIJ`
      axios
        .get(url)
        .then((response) => {
          setMyCollection(
            response.data.result.map((item) => ({
              ...item,
              tokenID: parseInt(item.tokenID),
              contractAddress: getAddress(item.contractAddress),
            })),
          )
        })
        .catch((error) => {
          console.log('error get collection : ', error)
        })
    }
  }, [chainId, account])

  return myCollection
}

export const useEthCollectionFullInfo = () => {
  const { chainId, account } = useActiveWeb3React()
  const [myCollection, setMyCollection] = useState<NFT[]>([])

  useEffect(() => {
    const fetchEthCollection = async () => {
      try {
        const url = `https://api${
          EtherscanPostfix[chainId] ?? '-goerli'
        }.etherscan.io/api?module=account&action=tokennfttx&address=${account}&sort=asc&apikey=H73WJKKZ7PP5WGF9C11EAPU8MJKY9BNHIJ`
        const tokens = (await axios.get(url))?.data?.result

        const fullInfoTokens = await addAdditionalInfoNFTs(tokens)
        setMyCollection(fullInfoTokens)
      } catch (error) {
        console.log('get eth collection error : ', error)
      }
    }
    if (account && chainId) {
      fetchEthCollection()
    }
  }, [chainId, account])

  return myCollection
}

export const useSpaceHunterCollection = () => {
  const { chainId, account } = useActiveWeb3React()
  const [myCollection, setMyCollection] = useState<NFT[]>([])

  useEffect(() => {
    const fetchSpaceHunterCollection = async () => {
      try {
        const url = `https://api${
          BscscanPostfix[chainId] ?? '-testnet'
        }.bscscan.com/api?module=account&action=tokennfttx&address=${account}&contractaddress=${getAddress(
          addresses.spaceHunter,
        )}&sort=asc&apikey=8KFSH17E4S26HYAFBGTPCA29NMNCRY4W3K`
        let tokens = (await axios.get(url))?.data?.result
        tokens = tokens.map((item) => ({
          ...item,
          tokenID: parseInt(item.tokenID as any),
          contractAddress: ethers.utils.getAddress(item.contractAddress),
          isUsingToBoost: false,
        }))

        tokens = excludeTokensNotTransferToFarm({ tokens, account, chainId })

        tokens = await addAdditionalInfoNFTs(tokens)
        tokens = await getBoostedPercent(tokens)
        setMyCollection(tokens)
      } catch (error) {
        console.log('get space hunter collection error : ', error)
      }
    }
    if (account && chainId) {
      fetchSpaceHunterCollection()
    }
  }, [chainId, account])

  return myCollection
}
