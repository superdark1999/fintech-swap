import { AxiosInstance } from 'axios'
import { BaseNFT, NFT } from '../config/constants/types'

export class StakingNftService {
  private restConnector: AxiosInstance

  constructor(options: { restConnector: AxiosInstance }) {
    this.restConnector = options.restConnector
  }

  public async getAllTokens() {
    const { data } = await this.restConnector.get('/stakingNft')
    return data
  }

  public async getAllTokensId(): Promise<BaseNFT[]> {
    try {
      const { data } = await this.restConnector.get('/stakingNft/poolsId')
      return data
    } catch (error) {
      return []
    }
  }

  public async getPendingTokens() {
    const { data } = await this.restConnector.get('/stakingNft?status=pending')
    return data
  }

  public async getApprovedTokens() {
    const { data } = await this.restConnector.get('/stakingNft?status=approve')
    return data
  }

  public async getStakingTokens() {
    const { data } = await this.restConnector.get('/stakingNft?status=staking')
    return data
  }

  public async registerStakingToken({ name, description, urlToken, image, tokenID, contractAddress }: NFT) {
    if (name && description && urlToken && image && tokenID && contractAddress) {
      return this.restConnector.post('/stakingNft', {
        name,
        description,
        urlToken,
        image,
        tokenID,
        contractAddress,
      })
    }
    throw new Error('Not have enough info token')
  }

  public async stakeToken({ tokenID, contractAddress }) {
    return this.restConnector.patch(`/stakingNft/`, {
      tokenID,
      contractAddress,
      status: 'staking',
    })
  }

  public async getTokenByID({ tokenID, contractAddress }): Promise<any> {
    const { data } = await this.restConnector.get(`/stakingNft?tokenID=${tokenID}&contractAddress=${contractAddress}`)
    return data[0]
  }
}
