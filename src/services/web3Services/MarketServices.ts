
import  abiBid from './AbiBid'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import _ from 'lodash'
import { useActiveWeb3React } from 'wallet/hooks'
import {getPrice, SUPPORT_CHAIN_IDS} from 'utils'

export const MARKET_ADDRESS = '0xA50Ba50d8a76074aa33baBB3f869033826557302';



function useMarketServiceChain97(){
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
            const estimatedGas = await marketContract.estimateGas.sellTokenTo(tokenId,address)
            return marketContract.sellTokenTo(tokenId,address, {
              gasLimit: estimatedGas,
            })
        },[marketContract])

        const getHighestBidAndPrice = useCallback(async(tokenId:string|undefined, NFTType:string)=>{
          if(tokenId){
            if(NFTType=='buy'){
              const unitPrice =  await getTokenPrice(tokenId)
              const price = getPrice(Number(unitPrice?._hex))
              return price
            }else{
              const bidsArr = await getBidsByTokenId(tokenId)
              const bidsData = bidsArr?.map((item: any) => {
                    return {
                      key: item?.[0] || '',
                      address: item?.[0] || '',
                      price: Number(item?.[1]?._hex) / Number(1e18),
                    }
                  }) || []
              const maxPrice = _.maxBy(bidsData,(item:any)=> item?.price)?.price||0
              const unitPrice = await getTokenBidPrice(tokenId)
              const price = getPrice(unitPrice?._hex)
              if(price>maxPrice){
                return price
              }else{
                return maxPrice
              }
            }
          }
        },[marketContract])

    return {cancelSellToken,getTokenPrice,setTokenPrice, buyToken, getBidsByUser,getBidsByTokenId,bidToken,updateBidPrice,cancelBidToken,sellTokenToBidUser, setTokenBidInfo,getStepPrice, getTokenBidPrice, getHighestBidAndPrice}
}



export default function MarketService(){
  const { account, chainId } = useActiveWeb3React()
  const MarketServiceChain97 = useMarketServiceChain97()
  if(SUPPORT_CHAIN_IDS.includes(chainId)){
      return MarketServiceChain97
  }
  return null
}