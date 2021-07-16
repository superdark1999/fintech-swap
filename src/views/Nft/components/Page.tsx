import React from 'react'
import styled from 'styled-components'
import BgRec from '../../../assets/img/airdrop.jpg'

const Page: React.FC = ({ children }) => (
  <StyledPage>
    <StyledMain>{children}</StyledMain>
  </StyledPage>
)

const StyledPage = styled.div`
  width: 100%;
  background-position: 27% 15%;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  /* position: absolute; */
  top: 0;

  @media (min-width: 767px) {
    background-position: center;
  }
`

const StyledMain = styled.div`
  align-items: center;
`

export default Page