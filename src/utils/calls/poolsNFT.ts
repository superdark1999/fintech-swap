import { TransactionResponse } from '@ethersproject/providers'
import { Contract, ethers } from 'ethers'
import getGasPrice from 'utils/getGasPrice'
import { DEFAULT_GAS_LIMIT } from '../../constants/index'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeNFT = async (stakingNFTContract: Contract, { tokenID, contractAddress }) => {
  const gasPrice = getGasPrice()
  const tx: TransactionResponse = await stakingNFTContract.stake(
    ethers.utils.getAddress(contractAddress),
    ethers.BigNumber.from(tokenID),
    {
      ...options,
      gasPrice,
    },
  )
  const receipt = await tx.wait()
  return receipt.status
}

export const withdrawNFT = async (stakingNFTContract: Contract, { tokenID, contractAddress }) => {
  const gasPrice = getGasPrice()

  const tx: TransactionResponse = await stakingNFTContract.withdraw(
    ethers.utils.getAddress(contractAddress),
    ethers.BigNumber.from(tokenID),
    {
      ...options,
      gasPrice,
    },
  )
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestNFT = async (stakingNFTContract: Contract, { tokenID, contractAddress }) => {
  const gasPrice = getGasPrice()
  const tx: TransactionResponse = await stakingNFTContract.withdraw(
    ethers.utils.getAddress(contractAddress),
    ethers.BigNumber.from(tokenID),
    {
      ...options,
      gasPrice,
    },
  )
  const receipt = await tx.wait()
  return receipt.status
  //
}

export const approveNFT = () => {
  //
}
