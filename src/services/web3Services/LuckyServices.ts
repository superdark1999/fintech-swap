import { isAddress} from 'wallet/utils'
import { AddressZero } from '@ethersproject/constants'
import  abiLucky from './AbiLucky'
import { useActiveWeb3React } from 'wallet/hooks'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import { ethers } from 'ethers'
import _ from 'lodash'
export const LUCKY_TOKEN_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';

export default function LuckyService(){
        const { account } = useActiveWeb3React()
        const LuckyTokenContract = useContract(LUCKY_TOKEN_ADDRESS,abiLucky)


        const approveLevelAmount = useCallback((address)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Your spender address was wrong')
                return 
            }
           return LuckyTokenContract.approve(address,ethers.constants.MaxUint256)
        },[LuckyTokenContract])

        const checkApproveLevelAmount = useCallback(async(contractAddress)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            if(!isAddress(contractAddress) || contractAddress === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            return LuckyTokenContract.allowance(account,contractAddress)
        },[LuckyTokenContract])

        return { approveLevelAmount, checkApproveLevelAmount}
}
