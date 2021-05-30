import {getContract, getProviderOrSigner, isAddress} from '../wallet/utils'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import  abiNFT from './AbiNFT'
import  abiBid from './AbiBid'
import { useActiveWeb3React } from '../wallet/hooks'
import { useContract } from '../wallet/hooks/useContract'
import { useModalOpen, useWalletModalToggle } from '../wallet/state/application/hooks'
import { ApplicationModal } from "../wallet/state/application/actions" 
import { useCallback, useMemo } from 'react'

const NFT_ADDRESS = '0xa75556C5b07e88119d7979761D00b8a55A1Bc315';
const BID_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';
const LUCKY_TOKEN_ADDRESS = '0x5C2AaAdD1FcE223baaEFB1cF41ce872e9d8B986A';
const payableAmountDefault = 1000000000000000

export default function NFTService(){
        const { account } = useActiveWeb3React()
        const nftContract = useContract(NFT_ADDRESS,abiNFT)
        const bidContract = useContract(BID_ADDRESS,abiBid)

        const grantNFT = useCallback((URI: string, receiverAddress:string|undefined,  payableAmount:number) =>{
            receiverAddress = receiverAddress||account
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to mint NFT')
                return 
            }
            nftContract.mint(receiverAddress,URI,{
                gasLimit: 235000,
                from: account,
                value: payableAmount||payableAmountDefault,
            })
        },[account,nftContract])

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



        return {grantNFT,transferNFT,cancelSellNFT,sellNFT,getOwnerNFT}
}
