import React, { createContext, useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'

import { Jus } from '../../Jus'

// import Web3Connect from 'web3connect'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Portis from '@portis/web3'
import Web3 from 'web3'
import Torus from "@toruslabs/torus-embed";
import WalletLink from "walletlink"
import WalletLinkProvider from "walletlink"


export interface JusContext {
  jus?: typeof Jus
  reConnect?: any
}

export const Context = createContext<JusContext>({
  jus: undefined,
  reConnect: undefined,
})

declare global {
  interface Window {
    jussauce: any
  }
}


const JusProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet()


  const [jus, setJus] = useState<any>()

  // @ts-ignore
  window.jus = jus
  // @ts-ignore

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId)
      const jusLib = new Jus(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: '6000000',
        defaultGasPrice: '1000000000000',
        accounts: [],
        ethereumNodeTimeout: 10000,
      })
      setJus(jusLib)
      window.jussauce = jusLib
    }
  }, [ethereum])
  const reConnect = () => {
  }
  return (
    <Context.Provider value={{ jus, reConnect }}>{children}</Context.Provider>
  )
}

export default JusProvider
