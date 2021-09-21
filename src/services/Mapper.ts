import axios, { AxiosInstance } from 'axios'
import { BaseNFT, NFT } from '../config/constants/types'

interface RequestMappingInput {
  chain_id: number
  child_token?: string
  decimals?: 0
  email: string
  map_type?: string
  mintable?: boolean
  name: string
  root_token: string
  symbol: string
  token_type: string
  uri?: string
}

export class MapperService {
  private restConnector: AxiosInstance

  constructor() {
    this.restConnector = axios.create({
      baseURL: 'https://tokenmapper.api.matic.today/api/v1',
    })
  }

  public async requestMapping(input: RequestMappingInput): Promise<any> {
    return this.restConnector.post('/mapping', input)
  }
}
