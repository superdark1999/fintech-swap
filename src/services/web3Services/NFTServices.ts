import { isAddress} from 'wallet/utils'
import { AddressZero } from '@ethersproject/constants'
import  abiNFT from './AbiNFT'
import  abiBid from './AbiBid'
import  abiLucky from './AbiLucky'
import { useActiveWeb3React } from 'wallet/hooks'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import { ethers } from 'ethers'
import _ from 'lodash'

export const NFT_ADDRESS = '0xa75556C5b07e88119d7979761D00b8a55A1Bc315';
export const MARKET_ADDRESS = '0x172D30072817afBcaebF39B75b6eCd1E0B8Ec90F';
export const LUCKY_TOKEN_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';
const payableAmountDefault = '10000000000000000'



export default function NFTService(){
        const { account } = useActiveWeb3React()
        const nftContract = useContract(NFT_ADDRESS,abiNFT)

        const mintToken = useCallback(async(URI: string)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            const estimatedGas = await nftContract.estimateGas.mint(account,URI,{
                from: account,
                value: payableAmountDefault,
            });
            return nftContract.mint(account,URI,{
                gasLimit: estimatedGas,
                from: account,
                value: payableAmountDefault,
            })
        },[account,nftContract])


        const getTokenUrl = useCallback((tokenId)=>{
            return nftContract.tokenURI(tokenId)
        },[nftContract])

        const approveTokenToMarket = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await nftContract.estimateGas.approve(MARKET_ADDRESS,tokenId);
            return nftContract.approve(MARKET_ADDRESS,tokenId, {
                gasLimit: estimatedGas,
              })
        },[nftContract])

        const isTokenReadyToSell = useCallback(async(tokenId:string|undefined)=>{
            const approvedAddress = await nftContract.getApproved(tokenId)
            if(approvedAddress===MARKET_ADDRESS){
                return true
            }
            return false
        },[nftContract])


        return {mintToken,getTokenUrl,approveTokenToMarket, isTokenReadyToSell}
}
