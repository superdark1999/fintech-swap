import axios from 'axios'
import { StakingNftService } from './StakingNftService'
import { MapperService } from './Mapper'

const restConnector = axios.create({
  baseURL: 'http://localhost:3004/',
})

export const stakingNftService = new StakingNftService({ restConnector })
export const mapperService = new MapperService()
