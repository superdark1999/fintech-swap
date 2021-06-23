import React, { useEffect, useState} from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import IfoTabButtons from './components/IfoTabButtons'
import Hero from './components/Hero'
import CurrentIfo from './CurrentIfo'
import { useHookIFOs } from './Store'


const Ifos = () => {
  const { path } = useRouteMatch()
  // const [status, setStatus] = useState('open');
  const [state, actions] = useHookIFOs();
  const { filterStatus, filterLaunchpads } = state;

  useEffect(() => {
    actions.getLaunchpads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterWithStatus = async (e) => {
    actions.filterLaunchWithStatus(e.target.value);
  }

  return (
    <>
      <Hero />
      <Container>
        <IfoTabButtons onFilterWithStatus={handleFilterWithStatus} status={filterStatus} />
        <Route exact path={`${path}`}>
          <CurrentIfo ifos={filterLaunchpads} />
        </Route>
        {/* <Route path={`${path}/history`}>
        <CurrentIfo />
        </Route> */}
      </Container>
    </>
  )
}

export default Ifos
