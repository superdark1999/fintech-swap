import { isAddress} from 'wallet/utils'
import { AddressZero } from '@ethersproject/constants'
import  abiLucky from './AbiLucky'
import { useActiveWeb3React } from 'wallet/hooks'
import { useContract } from 'wallet/hooks/useContract'
import { SUPPORT_CHAIN_IDS, binanceAddress} from 'utils'
import { ethers } from 'ethers'

import _ from 'lodash'

function useLuckyServiceBinaceChain(){
        const { account } = useActiveWeb3React()

        const LuckyTokenContract = useContract(binanceAddress.LUCKY,abiLucky)


        const approveLevelAmount = (address:string)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Your spender address was wrong')
                return null
            }
           return LuckyTokenContract.approve(address,ethers.constants.MaxUint256)
        }

        const checkApproveLevelAmount = (contractAddress:string)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            if(!isAddress(contractAddress) || contractAddress === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            return LuckyTokenContract.allowance(account,contractAddress)
        }

        const getLuckyBalance = ()=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Your spender address was wrong')
                return null
            }
           return LuckyTokenContract.balanceOf(account)
        }

        return { approveLevelAmount, checkApproveLevelAmount,getLuckyBalance, LuckyTokenContract}
}


export default function LuckyService(){
    const { account, chainId } = useActiveWeb3React()
    const LuckyServiceBinaceChain = useLuckyServiceBinaceChain()
    if(SUPPORT_CHAIN_IDS.includes(chainId)){
        return LuckyServiceBinaceChain
    }
    return null
}