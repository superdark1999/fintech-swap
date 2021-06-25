import React, { useEffect } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import { useHookIFOs } from './Store'

const Ifos = () => {
  const { path } = useRouteMatch()
  const [state, actions] = useHookIFOs()
  let { launchpads } = state

  useEffect(() => {
    actions.getLaunchpads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
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
