import { isAddress} from 'wallet/utils'
import { AddressZero } from '@ethersproject/constants'
import  abiNFT from './AbiNFT'
import  abiBid from './AbiBid'
import  abiLucky from './AbiLucky'
import { useActiveWeb3React } from 'wallet/hooks'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import useUserStore from 'store/userStore'
import { ethers } from 'ethers'
import _ from 'lodash'
import {MARKET_ADDRESS} from './MarketServices'
import { BigNumber } from 'Jus'
import { getPrice , getPriceFromEstimateGas} from 'utils'

export const NFT_ADDRESS = '0xa75556C5b07e88119d7979761D00b8a55A1Bc315';
const payableAmountDefault = '10000000000000000'

const BNB_ERROR = `You don't have enough BNB`

function useNFTServiceChain97(){
        const { account } = useActiveWeb3React()
        const nftContract = useContract(NFT_ADDRESS,abiNFT)
        const [userState, userActions] = useUserStore()

        const mintToken = useCallback(async(URI: string)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            const estimatedGas = await nftContract.estimateGas.mint(account,URI,{
                from: account,
                value: payableAmountDefault,
            });
            if(userState.balance.BNB<getPrice(Number(payableAmountDefault))+getPriceFromEstimateGas(Number(estimatedGas))){
                throw new Error(BNB_ERROR)
            }
            return nftContract.mint(account,URI,{
                gasLimit: estimatedGas,
                from: account,
                value: payableAmountDefault,
            })
        },[account,userState.balance.BNB])


        const getTokenUrl = useCallback((tokenId)=>{
            return nftContract.tokenURI(tokenId)
        },[])

        const approveTokenToMarket = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await nftContract.estimateGas.approve(MARKET_ADDRESS,tokenId);
            if(userState.balance.BNB<getPrice(Number(payableAmountDefault))+getPriceFromEstimateGas(Number(estimatedGas))){
                throw new Error(BNB_ERROR)
            }
            return nftContract.approve(MARKET_ADDRESS,tokenId, {
                gasLimit: estimatedGas,
              })
        },[userState.balance.BNB])

        const isTokenReadyToSell = useCallback(async(tokenId:string|undefined)=>{
            const approvedAddress = await nftContract.getApproved(tokenId)
            if(approvedAddress===MARKET_ADDRESS){
                return true
            }
            return false
        },[])


        return {mintToken,getTokenUrl,approveTokenToMarket, isTokenReadyToSell}
}


export default function NFTService(){
    const { account, chainId } = useActiveWeb3React()
    const LuckyServiceChain97 = useNFTServiceChain97()
    if(chainId==97){
        return LuckyServiceChain97
    }
    return null
}