import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Container from 'components/layout/Container'
import CurrentIfo from './CurrentIfo'

const Ifos = () => {
  const { path } = useRouteMatch()

  return (
    <>
      <Container>
        <Route exact path={`${path}`}>
          <CurrentIfo />
        </Route>
      </Container>
    </>
  )
}

export default Ifos
