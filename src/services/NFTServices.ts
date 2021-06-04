import {getContract, getProviderOrSigner, isAddress} from '../wallet/utils'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import  abiNFT from './AbiNFT'
import  abiBid from './AbiBid'
import  abiLucky from './AbiLucky'
import { useActiveWeb3React } from '../wallet/hooks'
import { useContract } from '../wallet/hooks/useContract'
import { useModalOpen, useWalletModalToggle } from '../wallet/state/application/hooks'
import { ApplicationModal } from "../wallet/state/application/actions" 
import { useCallback, useMemo } from 'react'
import { ethers } from 'ethers'

export const NFT_ADDRESS = '0xa75556C5b07e88119d7979761D00b8a55A1Bc315';
export const MARKET_ADDRESS = '0x172D30072817afBcaebF39B75b6eCd1E0B8Ec90F';
export const LUCKY_TOKEN_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';
const payableAmountDefault = '10000000000000000'



export default function NFTService(){
        const { account } = useActiveWeb3React()
        const nftContract = useContract(NFT_ADDRESS,abiNFT)
        const marketContract = useContract(MARKET_ADDRESS,abiBid)
        const LuckyTokenContract = useContract(LUCKY_TOKEN_ADDRESS,abiLucky)

        const mintNFT = useCallback(async(URI: string)=>{
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


        const approveLevelAmount = useCallback((address)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Your spender address was wrong')
                return 
            }
           return LuckyTokenContract.approve(address,ethers.constants.MaxUint256)
        },[LuckyTokenContract])

        const checkApproveLevelAmount = useCallback((contractAddress)=>{
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

        const getNFTUrl = useCallback((tokenId)=>{
            return nftContract.tokenURI(tokenId)
        },[nftContract])

        //sell NFT

        const approveNFTToMarket = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await nftContract.estimateGas.approve(MARKET_ADDRESS,tokenId);
            return nftContract.approve(MARKET_ADDRESS,tokenId, {
                gasLimit: estimatedGas,
              })
        },[nftContract])

        const isNFTReadyToSell = useCallback(async(tokenId:string|undefined)=>{
            const approvedAddress = await nftContract.getApproved(tokenId)
            if(approvedAddress===MARKET_ADDRESS){
                return true
            }
            return false
        },[])

        const setPriceForNFT = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.readyToSellToken(tokenId,unitPrice);
            return marketContract.readyToSellToken(tokenId,unitPrice,{
                gasLimit: estimatedGas,
            })
        },[])

        const cancelSellNFT = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await marketContract.estimateGas.cancelBidToken(tokenId)
            return marketContract.cancelBidToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        //buy NFT 



        return {mintNFT,getNFTUrl,cancelSellNFT, approveNFTToMarket,setPriceForNFT, approveLevelAmount, checkApproveLevelAmount, isNFTReadyToSell}
}
