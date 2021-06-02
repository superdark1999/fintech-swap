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
export const BID_ADDRESS = '0x113f1E1542b9ff5C1bA156601A94A8409f6c835E';
export const LUCKY_TOKEN_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';
const payableAmountDefault = 1000000000000000

export default function NFTService(){
        const { account } = useActiveWeb3React()
        const nftContract = useContract(NFT_ADDRESS,abiNFT)
        const bidContract = useContract(BID_ADDRESS,abiBid)
        const LuckyTokenContract = useContract(LUCKY_TOKEN_ADDRESS,abiLucky)

        const mintNFT = useCallback((URI: string,  payableAmount:number)=>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to create NFT')
                return 
            }
            return nftContract.mint(account,URI,{
                gasLimit: 235000,
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
        },[])

        const transferNFT = useCallback(async(receiverAddress:string|undefined,tokenId:string|undefined)=>{
            const estimatedGas = await nftContract.estimateGas.transferFrom(account,receiverAddress,tokenId)
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to transfer NFT')
                return 
            }
            nftContract.transferFrom(account,receiverAddress,tokenId, {
                gasLimit: estimatedGas,
              })
        },[account,nftContract])

        const sellNFT  = useCallback(async(tokenId:number|undefined,price:number)=>{
            //const estimatedGas = await bidContract.estimateGas.bidToken(tokenId,price)
            console.log(bidContract)
            // return bidContract.bidToken(tokenId,price, {
            //   gasLimit: estimatedGas,
            // })
        },[bidContract])

        const cancelSellNFT = useCallback(async(tokenId:number|undefined)=>{
            const estimatedGas = await bidContract.estimateGas.cancelBidToken(tokenId)
            return bidContract.cancelBidToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[bidContract])

        const getOwnerNFT = useCallback(()=>{
            console.log(account)
            return nftContract.ownerOf(account)
        },[account])



        return {mintNFT,transferNFT,cancelSellNFT,sellNFT,getOwnerNFT,approveLevelAmount}
}
