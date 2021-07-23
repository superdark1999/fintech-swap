import bep20Abi from 'config/abi/erc20.json'
import { ethers } from 'ethers'
import { useContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'

const useUtilityToken = (tokenAddress) => {
  const contract = useContract(tokenAddress, bep20Abi)

  const addTransaction = useTransactionAdder()

  const balanceOf = async (address) => {
    if (address && contract) {
      const balance = await contract.balanceOf(address).catch(() => console.log('fail to fetch balance'))

      return balance
    }
    return 0
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
