import { useWeb3React } from '@web3-react/core'
import { network } from 'connectors'
import { useEagerConnect, useInactiveListener } from 'hooks'
import { useEffect } from 'react'
import { NetworkContextName } from '../constants'
import useQuickConnect from './useEagerConnect'

const useWeb3ReactManager = () => {
  const { active } = useWeb3React()
  const { active: networkActive, error: networkError, activate: activateNetwork } = useWeb3React(NetworkContextName)

  // try to eagerly connect to an injected provider, if it exists and has granted access already
  // const triedEager = useEagerConnect()

  // const triedEager = useEagerConnect()
  const triedLs = useQuickConnect()

  // after eagerly trying injected, if the network connect ever isn't active or in an error state, activate itd
  useEffect(() => {
    if (triedLs && !networkActive && !networkError && !active) {
      activateNetwork(network)
    }
  }, [triedLs, networkActive, networkError, activateNetwork, active])

  // when there's no account connected, react to logins (broadly speaking) on the injected provider, if it exists
  useInactiveListener(!triedLs)

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (!active && networkError) {
    console.log('network error : ', networkError)
  }

  // if neither context is active, spin
  if (!active && !networkActive) {
    console.log('connecting...')
  }
}

export default useWeb3ReactManager
