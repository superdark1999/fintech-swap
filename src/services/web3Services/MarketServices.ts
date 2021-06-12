
import  abiBid from './AbiBid'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import _ from 'lodash'

export const MARKET_ADDRESS = '0xA50Ba50d8a76074aa33baBB3f869033826557302';



export default function MarketService(){
        const marketContract = useContract(MARKET_ADDRESS,abiBid)

        const setTokenPrice = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.readyToSellToken(tokenId,unitPrice);
            return marketContract.readyToSellToken(tokenId,unitPrice,{
                gasLimit: estimatedGas,
            })
        },[marketContract])

        const setTokenBidInfo = useCallback(async(tokenId:string|undefined,price:number|undefined,step:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const unitStep = step + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.readyToBidToken(tokenId,unitPrice,unitStep);
            return marketContract.readyToBidToken(tokenId,unitPrice,unitStep,{
                gasLimit: estimatedGas,
            })
        },[marketContract])

        const getTokenPrice = useCallback(async(tokenId:string|undefined)=>{
            return marketContract.getPriceByTokenId(tokenId)      
        },[marketContract])

        const getTokenBidPrice = useCallback(async(tokenId:string|undefined)=>{
          return marketContract.getPriceBidCurrentByTokenId(tokenId)      
      },[marketContract])

        const getStepPrice = useCallback(async(tokenId:string|undefined)=>{
            return marketContract.getStepByTokenId(tokenId)      
        },[marketContract])

        const cancelSellToken = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await marketContract.estimateGas.cancelBidToken(tokenId)
            return marketContract.cancelBidToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        const buyToken = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await marketContract.estimateGas.buyToken(tokenId)
            return marketContract.buyToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        const getBidsByUser = useCallback(async(address:string|undefined)=>{
            return marketContract.getUserBids(address)
        },[marketContract])

        const getBidsByTokenId = useCallback(async(tokenId:string|undefined)=>{
          return marketContract.getBids(tokenId)
      },[marketContract])

        const bidToken = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.bidToken(tokenId,unitPrice)
            return marketContract.bidToken(tokenId,unitPrice, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        const updateBidPrice = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.updateBidPrice(tokenId,unitPrice)
            return marketContract.updateBidPrice(tokenId,unitPrice, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        const cancelBidToken = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await marketContract.estimateGas.cancelBidToken(tokenId)
            return marketContract.cancelBidToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        const sellTokenToBidUser = useCallback(async(tokenId:string|undefined,address:string|undefined)=>{
          // // console.log(marketContract.estimateGas.sellTokenTo)
          //   const estimatedGas = await marketContract.estimateGas.sellTokenTo(109,address)
          //   // console.log(estimatedGas)
            return marketContract.sellTokenTo(tokenId,address, {
              gasLimit: '28500000',
            })
        },[marketContract])

    return {cancelSellToken,getTokenPrice,setTokenPrice, buyToken, getBidsByUser,getBidsByTokenId,bidToken,updateBidPrice,cancelBidToken,sellTokenToBidUser, setTokenBidInfo,getStepPrice, getTokenBidPrice}
}
