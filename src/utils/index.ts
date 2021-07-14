
/* eslint-disable */
import { BigNumber } from '@ethersproject/bignumber'
import { getAddress } from '@ethersproject/address'
import { ChainId } from '@juiceswap/v2-sdk'
import useMarketServices from 'services/web3Services/MarketServices'
import _ from 'lodash'

export { default as formatAddress } from './formatAddress'

const OUT_OF_BNB = `Insufficient balance of BNB`
const OUT_OF_LUCKY = `Insufficient balance of LUCKY`

export const getParam = (name: string) => {

 var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null) {
     return null;
  }
  return decodeURI(results[1]) || 0;
}
// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address)
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`
}
export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch {
    return false
  }
}
// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value.mul(BigNumber.from(10000).add(BigNumber.from(1000))).div(BigNumber.from(10000))
}

export const getPrice = (price:number) => {
  const priceString = Number(price)/Number(1e+18)
  return Number(priceString)
}

export const getPriceFromEstimateGas = (price:number) => {
  const priceString = Number(price)/Number(1e+8)
  return Number(priceString)
}

export const getCompactString=(str:string, sepLen:number)=>{
  if(!str||typeof str !== 'string'){
    return ''
  }
  const strLen = str.length || 0
  return `${str.slice(0,sepLen)}...${str.slice(strLen-sepLen,strLen)}`
}

export const embedTokenIdLinkBSCScan = (tokenId:number,contractAddress:string,chainId:ChainId)=>{
  let url = ''
  if(chainId==97){
    url = 'https://testnet.bscscan.com/token/'
  }
  return `${url + contractAddress +'?a='+tokenId}`
}

export const SUPPORT_CHAIN_IDS:Array<ChainId> = [56]

export const binanceConfig = {
  chainId: '0x38',
  rpcUrls: [
    'https://bsc-dataseed.binance.org/',
  ],
  chainName: 'Binance SmartChain Mainnet',
  nativeCurrency: {
    name: 'MainnetBNB',
    symbol: 'BNB', // 2-6 characters long
    decimals: 18,
  },
  blockExplorerUrls: ['https://bscscan.com'],
}

export const binanceAddress = {
  MARKET:'',
  LUCKY:'',
  NFT:''
}

export const BINANCE_DOMAIN_API = 'https://api.bscscan.com'

export const binaceText = 'bsc-mainnet'

export const handleAlertMessage = (message:string)=>{
  if(message==`Error: [ethjs-query] while formatting outputs from RPC '{"value":{"code":-32603,"data":{"code":-32000,"message":"transaction underpriced"}}}'`){
    return 'Low gas'
  }else if(message == 'MetaMask Tx Signature: User denied transaction signature.'){
    return 'You denied transaction signature.'
  }else if(message == OUT_OF_BNB){
    return OUT_OF_BNB
  }else if(message == OUT_OF_LUCKY){
    return OUT_OF_LUCKY
  }
  return 'Something went wrong, please try again later.'
}