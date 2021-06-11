
import  abiBid from './AbiBid'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import _ from 'lodash'

export const MARKET_ADDRESS = '0x172D30072817afBcaebF39B75b6eCd1E0B8Ec90F';



export default function MarketService(){
        const marketContract = useContract(MARKET_ADDRESS,abiBid)

        const setTokenPrice = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.readyToSellToken(tokenId,unitPrice);
            return marketContract.readyToSellToken(tokenId,unitPrice,{
                gasLimit: estimatedGas,
            })
        },[marketContract])

        const getTokenPrice = useCallback(async(tokenId:string|undefined)=>{
            return marketContract.getPriceByTokenId(tokenId)      
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

        const bidToken = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.bidtoken(tokenId,unitPrice)
            return marketContract.bidtoken(tokenId,unitPrice, {
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
            const estimatedGas = await marketContract.estimateGas.sellTokenTo(tokenId,address)
            return marketContract.buyToken(tokenId,address, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

    return {cancelSellToken,getTokenPrice,setTokenPrice, buyToken, getBidsByUser,bidToken,updateBidPrice,cancelBidToken,sellTokenToBidUser}
}
