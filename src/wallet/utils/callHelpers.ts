// import { ethers } from 'ethers'

export const approve = async (lpContract:any, masterChefContract:any, account:any) => {
  const args = [masterChefContract.options.address, 12121]
  console.log('masterChefContrac>>',lpContract.methods,masterChefContract.options.address,"100000000000000")
  return lpContract.methods
    .approve(...args)
    .send({ from: account })
}
