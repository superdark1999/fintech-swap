import axios from 'axios'
import { StakingNftService } from './StakingNftService'

const restConnector = axios.create({
  baseURL: 'http://localhost:3004/',
})

export const stakingNftService = new StakingNftService({ restConnector })
