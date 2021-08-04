import { ConsoleSqlOutlined } from '@ant-design/icons'
import { ethers } from 'ethers'
import getRpcUrl from 'utils/getRpcUrl'
import {getChainId} from './web3React'

const RPC_URL = getRpcUrl(getChainId())

export const simpleRpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL)

export default null
