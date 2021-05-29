import React from 'react'
import styled from 'styled-components'

/**
 * Note: currently there should be only 1 active IFO at a time
 */

const IfoTitle = () => {

  return (
    <Title>IFO</Title>
  )
}

const Title = styled.h2`
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    margin-top: 32px;
    margin-bottom: 50px;
    color: #fff;
`

export default IfoTitle
