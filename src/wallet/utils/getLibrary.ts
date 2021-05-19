import { Web3Provider } from '@ethersproject/providers'
import Web3 from 'web3'

export default function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider, 'any')
  library.pollingInterval = 15000
  return library
}
// export default function getLibrary(provider: any): Web3  {
//   return provider
// }
