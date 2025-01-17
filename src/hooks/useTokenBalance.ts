import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getBep20Contract, getCakeContract } from 'utils/contractHelpers'
import { useWeb3NoAccount } from 'utils/web3'
import useRefresh from './useRefresh'
import useWeb3 from './useWeb3'

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const web3 = useWeb3()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3)
      const res = await contract.methods
        .balanceOf(account)
        .call()
        .catch((error) => console.log('fetch balance error : ', error))
      setBalance(new BigNumber(res))
    }

    if (account) {
      fetchBalance()
    }
  }, [account, tokenAddress, web3, fastRefresh])

  return balance
}

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh()
  const [totalSupply, setTotalSupply] = useState<BigNumber>()

  useEffect(() => {
    async function fetchTotalSupply() {
      const cakeContract = getCakeContract()
      const supply = await cakeContract.methods.totalSupply().call()
      setTotalSupply(new BigNumber(supply))
    }

    fetchTotalSupply()
  }, [slowRefresh])

  return totalSupply
}

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()
  const web3 = useWeb3()

  useEffect(() => {
    const fetchBalance = async () => {
      const contract = getBep20Contract(tokenAddress, web3)
      const res = 0 // await contract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call()
      setBalance(new BigNumber(res))
    }

    fetchBalance()
  }, [web3, tokenAddress, slowRefresh])

  return balance
}

export const useNativeBalance = () => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()
  const { account } = useWeb3React()
  const web3NoAccount = useWeb3NoAccount()

  useEffect(() => {
    if (account && web3NoAccount) {
      const fetchBalance = async () => {
        const result = await web3NoAccount.eth.getBalance(account)
        setBalance(new BigNumber(result))
      }

      fetchBalance()
    }
  }, [account, slowRefresh, web3NoAccount])
  return balance
}

export default useTokenBalance
