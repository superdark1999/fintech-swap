import { isAddress} from 'wallet/utils'
import { AddressZero } from '@ethersproject/constants'
import  abiNFT from './AbiNFT'
import { useActiveWeb3React } from 'wallet/hooks'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import useUserStore from 'store/userStore'
import _ from 'lodash'
import { getPrice , getPriceFromEstimateGas, SUPPORT_CHAIN_IDS, binanceAddress} from 'utils'

const payableAmountDefault = '10000000000000000'

const BNB_ERROR = `You don't have enough BNB`

function useNFTServiceBinaceChain(){
        const { account } = useActiveWeb3React()
        const nftContract = useContract(binanceAddress.NFT,abiNFT)
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
            const estimatedGas = await nftContract.estimateGas.approve(binanceAddress.MARKET,tokenId);
            if(userState.balance.BNB<getPrice(Number(payableAmountDefault))+getPriceFromEstimateGas(Number(estimatedGas))){
                throw new Error(BNB_ERROR)
            }
            return nftContract.approve(binanceAddress.MARKET,tokenId, {
                gasLimit: estimatedGas,
              })
        },[userState.balance.BNB])

        const isTokenReadyToSell = useCallback(async(tokenId:string|undefined)=>{
            const approvedAddress = await nftContract.getApproved(tokenId)
            if(approvedAddress===binanceAddress.MARKET){
                return true
            }
            return false
        },[])

        const transferToken = useCallback(async(tokenId:string|undefined, address:string|undefined)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            if(!isAddress(account) || account === AddressZero){
                window.alert('Address is wrong format')
                return 
            }
            const estimatedGas = await nftContract.estimateGas.transferFrom(account,address,tokenId,{
                from: account
            });
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
                throw new Error(BNB_ERROR)
            }
            return nftContract.transferFrom(account,address,tokenId,{
                gasLimit: estimatedGas,
            })
        },[account,userState.balance.BNB])


        return {mintToken,getTokenUrl,approveTokenToMarket, isTokenReadyToSell, transferToken, nftContract}
}


export default function NFTService(){
    const { account, chainId } = useActiveWeb3React()
    const LuckyServiceBinaceChain = useNFTServiceBinaceChain()
    if(SUPPORT_CHAIN_IDS.includes(chainId)){
        return LuckyServiceBinaceChain
    }
    return null
}