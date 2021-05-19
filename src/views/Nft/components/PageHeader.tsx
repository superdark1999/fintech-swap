import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'reactstrap';

// import Container from '../Container'

interface PageHeaderProps {
  icon: React.ReactNode
  subtitle?: string
  title?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <Container size="sm">
      <StyledPageHeader>

        <StyledIcon>{icon}</StyledIcon>
        <StyledTitle>{title}</StyledTitle>
        <StyledSubtitle>{subtitle}</StyledSubtitle>
      </StyledPageHeader>
    </Container>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
  margin: 0 auto;

`

const StyledIcon = styled.div`
  height: auto;
  width: auto;
  text-align: center;
  margin-bottom: 18px;

  @media (min-width: 768px) {
    height: 120px;
    line-height: 120px;
  }

  img {
    @media (max-width: 768px) {
      height: 110px;
      line-height: 100px;
    }
  }
`

const StyledTitle = styled.h1`
  padding-top: 100px;
  color: ${(props) => props.theme.color.brown[300]};
  font-size: 41px;
  text-align: center;
  font-weight: 700;
  margin: 0;
  padding: 0;
  background: linear-gradient(90deg,rgb(186 222 183) 0%,rgb(25 163 221) 100%); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (min-width: 768px) {
    font-size: 35px;
  }
`

const StyledSubtitle = styled.h3`
  font-size: 19px;
  font-weight: 600;
  margin: 0;
  padding: 0 20px;
  text-align: center;
  white-space: unset;
  font-family: 'Nunito Sans', sans-serif;
  font-style: italic;


  @media (min-width: 768px) {
    padding: 0;
    font-size: 26px;
    white-space: nowrap;
  }
`

export default PageHeader
