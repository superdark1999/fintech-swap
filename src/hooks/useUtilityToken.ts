import { ethers } from 'ethers'
import bep20Abi from 'config/abi/erc20.json'
import { useContract, useIfoContract } from 'hooks/useContract'
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { ConsoleSqlOutlined } from '@ant-design/icons'

const useUtilityToken = (tokenAddress) => {
  const contract = useContract(tokenAddress, bep20Abi)
  const addTransaction = useTransactionAdder()

  const balanceOf = async (account) => {
    const balance = await contract.balanceOf(account).catch(() => console.log('fail to fetch balance'))

    return balance
  }

  const approve = async (address) => {
    await contract.approve(address, ethers.constants.MaxUint256).then(async (response) => {
      addTransaction(response, {
        summary: 'Approve successfully!',
      })
    })
  }

  const allowance = async (account, address) => {
    const result = await contract?.allowance?.(account, address).catch(() => console.log('Error fetch approval data'))

    return result
  }

  const listenApproveEvent = async (callback) => {
    if (contract)
      contract.on('Approval', async () => {
        callback()
      })
  }
  return { approve, allowance, balanceOf, listenApproveEvent }
}

export default useUtilityToken
