import {getContract, getProviderOrSigner, isAddress} from '../wallet/utils'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import  abiNFT from './AbiNFT'
import { useActiveWeb3React } from '../wallet/hooks'
import { useContract } from '../wallet/hooks/useContract'
import { useModalOpen, useWalletModalToggle } from '../wallet/state/application/hooks'
import { ApplicationModal } from "../wallet/state/application/actions" 
import { useCallback, useMemo } from 'react'

const NFT_ADDRESS = '0xa75556C5b07e88119d7979761D00b8a55A1Bc315';
const payableAmountDefault = 1000000000000000

export const useMintNFT = (URI: string, receiverAddress:string|undefined,  payableAmount:number)=>{
        const luckyswapContract = useContract(NFT_ADDRESS,abiNFT)
        const { library, account } = useActiveWeb3React()
        receiverAddress = receiverAddress||account
        return useCallback(() =>{
            if(!isAddress(account) || account === AddressZero){
                window.alert('Please login your wallet to mint NFT')
                return 
            }
            luckyswapContract.mint(receiverAddress,URI,{
                gasLimit: 235000,
                from: account,
                value: payableAmount||payableAmountDefault,
            })
        },[library,account])
}
