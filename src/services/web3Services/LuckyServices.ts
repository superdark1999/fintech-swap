import { isAddress} from 'wallet/utils'
import { AddressZero } from '@ethersproject/constants'
import  abiLucky from './AbiLucky'
import { useActiveWeb3React } from 'wallet/hooks'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import { ethers } from 'ethers'
import _ from 'lodash'
import { ChainId } from '@juiceswap/v2-sdk'
export const LUCKY_TOKEN_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';

function useLuckyServiceChain97(){
        const { account, chainId } = useActiveWeb3React()
        const LuckyTokenContract = useContract(LUCKY_TOKEN_ADDRESS,abiLucky)


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

        return { approveLevelAmount, checkApproveLevelAmount,getLuckyBalance}
}


export default function LuckyService(){
    const { account, chainId } = useActiveWeb3React()
    const LuckyServiceChain97 = useLuckyServiceChain97()
    if(chainId==97){
        return LuckyServiceChain97
    }
    return null
}