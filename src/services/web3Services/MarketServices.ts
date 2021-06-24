
import  abiBid from './AbiBid'
import { useContract } from 'wallet/hooks/useContract'
import { useCallback } from 'react'
import _ from 'lodash'
import { useActiveWeb3React } from 'wallet/hooks'
import {getPrice, SUPPORT_CHAIN_IDS, getPriceFromEstimateGas} from 'utils'
import useUserStore from 'store/userStore'

export const MARKET_ADDRESS = '0x6f9E559eCaFFEcbEb22B3a1c9f5179063f4d5c71';

const OUT_OF_BNB = `Insufficient balance of BNB`
const OUT_OF_LUCKY = `Insufficient balance of LUCKY`

function useMarketServiceChain97(){
        const marketContract = useContract(MARKET_ADDRESS,abiBid)
        const [userState, userActions] = useUserStore()
        const setTokenPrice = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const estimatedGas = await marketContract.estimateGas.readyToSellToken(tokenId,unitPrice);
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.readyToSellToken(tokenId,unitPrice,{
                gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.BNB])

        const setTokenBidInfo = useCallback(async(tokenId:string|undefined,price:number|undefined,step:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            const unitStep = step + '000000000000000000'
            if(userState.balance.LUCKY<price){
              throw new Error(OUT_OF_LUCKY)
            }
            const estimatedGas = await marketContract.estimateGas.readyToBidToken(tokenId,unitPrice,unitStep);
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.readyToBidToken(tokenId,unitPrice,unitStep,{
                gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.LUCKY,userState.balance.BNB])

        const getTokenPrice = useCallback(async(tokenId:string|undefined)=>{
            return marketContract.getPriceByTokenId(tokenId)      
        },[marketContract])

        const getTokenBidPrice = useCallback(async(tokenId:string|undefined)=>{
          return marketContract.getPriceBidCurrentByTokenId(tokenId)      
      },[marketContract])

        const getStepPrice = useCallback(async(tokenId:string|undefined)=>{
            return marketContract.getStepByTokenId(tokenId)      
        },[marketContract])

        const buyToken = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
          if(userState.balance.LUCKY<price){
            throw new Error(OUT_OF_LUCKY)
          }
            const estimatedGas = await marketContract.estimateGas.buyToken(tokenId)
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.buyToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.BNB,userState.balance.LUCKY])

        const getBidsByUser = useCallback(async(address:string|undefined)=>{
            return marketContract.getUserBids(address)
        },[marketContract])

        const getBidsByTokenId = useCallback(async(tokenId:string|undefined)=>{
          return marketContract.getBids(tokenId)
      },[marketContract])

        const bidToken = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            if(userState.balance.LUCKY<price){
              throw new Error(OUT_OF_LUCKY)
            }
            const estimatedGas = await marketContract.estimateGas.bidToken(tokenId,unitPrice)
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.bidToken(tokenId,unitPrice, {
              gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.BNB,userState.balance.LUCKY])

        const updateBidPrice = useCallback(async(tokenId:string|undefined,price:number|undefined)=>{
            const unitPrice = price + '000000000000000000'
            if(userState.balance.LUCKY<price){
              throw new Error(OUT_OF_LUCKY)
            }
            const estimatedGas = await marketContract.estimateGas.updateBidPrice(tokenId,unitPrice)
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.updateBidPrice(tokenId,unitPrice, {
              gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.BNB,userState.balance.LUCKY])

        const cancelBidToken = useCallback(async(tokenId:string|undefined)=>{
            const estimatedGas = await marketContract.estimateGas.cancelBidToken(tokenId)
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.cancelBidToken(tokenId, {
              gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.BNB])

        const sellTokenToBidUser = useCallback(async(tokenId:string|undefined,address:string|undefined)=>{
            const estimatedGas = await marketContract.estimateGas.sellTokenTo(tokenId,address)
            if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
              throw new Error(OUT_OF_BNB)
            }
            return marketContract.sellTokenTo(tokenId,address, {
              gasLimit: estimatedGas,
            })
        },[marketContract,userState.balance.BNB])

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

        const cancelSellToken = useCallback(async(tokenId:string|undefined)=>{
          const estimatedGas = await marketContract.estimateGas.cancelSellToken(tokenId)
          if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
            throw new Error(OUT_OF_BNB)
          }
          return marketContract.cancelSellToken(tokenId, {
            gasLimit: estimatedGas,
          })
      },[marketContract,userState.balance.BNB])

      const listNFTToSWap = useCallback(async(tokenId:string|undefined)=>{
        const estimatedGas = await marketContract.estimateGas.listNFT(tokenId)
        if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
          throw new Error(OUT_OF_BNB)
        }
        return marketContract.listNFT(tokenId, {
          gasLimit: estimatedGas,
        })
    },[marketContract,userState.balance.BNB])

      const cancelListNFT = useCallback(async(tokenId:string|undefined)=>{
        const estimatedGas = await marketContract.estimateGas.cancelListNFT(tokenId)
        if(userState.balance.BNB<getPriceFromEstimateGas(Number(estimatedGas))){
          throw new Error(OUT_OF_BNB)
        }
        return marketContract.cancelListNFT(tokenId, {
          gasLimit: estimatedGas,
        })
    },[marketContract,userState.balance.BNB])

    return {cancelListNFT,cancelSellToken,getTokenPrice,setTokenPrice,listNFTToSWap, buyToken, getBidsByUser,getBidsByTokenId,bidToken,updateBidPrice,cancelBidToken,sellTokenToBidUser, setTokenBidInfo,getStepPrice, getTokenBidPrice, getHighestBidAndPrice}
}



export default function MarketService(){
  const { account, chainId } = useActiveWeb3React()
  const MarketServiceChain97 = useMarketServiceChain97()
  if(SUPPORT_CHAIN_IDS.includes(chainId)){
      return MarketServiceChain97
  }
  return null
}