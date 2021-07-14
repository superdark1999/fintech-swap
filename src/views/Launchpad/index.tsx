import React, { useEffect } from 'react'
import { Redirect, Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import { ChainId } from '@luckyswap/v2-sdk'
import IfoTabButtons from './components/IfoTabButtons'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import { useHookIFOs } from './Store'
import { useActiveWeb3React } from '../../hooks/index'

const Ifos = () => {
  const { path } = useRouteMatch()
  const [state, actions] = useHookIFOs()
  const { chainId } = useActiveWeb3React()
  let { launchpads } = state
  launchpads = launchpads.filter(l => l.chainId === chainId);

  useEffect(() => {
    actions.getLaunchpads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  if (chainId !== ChainId.BSCTESTNET && chainId !== ChainId.MAINNET) {
    return <Redirect to="/" />
  }

  if (state.keySearch) {
    launchpads = launchpads.filter((x) => x.name.toLowerCase().indexOf(state.keySearch.toLowerCase()) > -1)
  }
  return (
    <>
      <Hero />
      <Container>
        <IfoTabButtons />
        <Route exact path={`${path}`}>
          <CurrentIfo ifos={launchpads} />
        </Route>
        {/* <Route path={`${path}/history`}>
        <CurrentIfo />
        </Route> */}
      </Container>
    </>
  )
}

export default Ifos
