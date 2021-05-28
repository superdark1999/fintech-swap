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
  position: absolute;
  top: 0;

  @media (min-width: 767px) {
    background-position: center;
  }
`

const StyledMain = styled.div`
  align-items: center;
  height: calc(100vh - 80px);
  min-height: calc(100vh - ${(props) => props.theme.topBarSize * 1.1}px);
  margin-top:80px;
`

export default Page
