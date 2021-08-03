import { AxiosInstance } from 'axios'

export class StakingNftService {
  private restConnector: AxiosInstance

  constructor(options: { restConnector: AxiosInstance }) {
    this.restConnector = options.restConnector
  }

  public async getAllTokens() {
    const { data } = await this.restConnector.get('/stakingNft')
    return data
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

  public async registerStakingToken({ name, description, urlToken, urlImg, tokenID, contractAddress }) {
    return this.restConnector.post('/stakingNft', {
      name,
      description,
      urlToken,
      urlImg,
      tokenID,
      contractAddress,
    })
  }

  public async stakeToken({ tokenID, contractAddress }) {
    return this.restConnector.patch('/stakingNft', {
      tokenID,
      contractAddress,
      status: 'staking',
    })
  }
}
