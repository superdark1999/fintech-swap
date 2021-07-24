import React from 'react'
import styled from 'styled-components'
import { Text, Heading, Link, Image } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'

const LayoutWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  margin-bottom: 30px;
  margin: 0 auto 40px;
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  padding: 20px;
  background-color: #2b2a2a;
  text-align: center;
`

const SectionTitle = styled.div`

`

const TitleMain = styled.h2`
  font-size: 40px;
  line-height: 50px;
  margin-bottom: 13px;
  color: #fff;
  font-weight: 700;
  text-transform: capitalize;
`

const SubTitle = styled.p`
  max-width: 650px;
  font-size: 16px;
  line-height: 26px;
  color: #fff;
  margin: 0 auto;
`

const BoxItem = styled.h2`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  margin-top: 30px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Item = styled.div`
  text-align: left;
  overflow: hidden;
  position: relative;
  margin-bottom: 30px;
  background: #f4c706;
  box-shadow: 0px 30px 20px 0px rgb(0 37 93 / 15%);
  border-radius: 15px;
  transition: all 0.3s ease-in;
  cursor: pointer;

  &:after {
    position: absolute;
    content: "";
    background: linear-gradient(to right,#ffd009,#f97503);
    width: 0%;
    height: 0%;
    top: 50%;
    left: 50%;
    bottom: 0px;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in;
    border-radius: 50%;
  }

  &:hover {
    transform: translateY(0px) !important;

    &:after {
      width: 100%;
      height: 100%;
      opacity: 1;
      border-radius: 0%;
    }

    .btn-step {
      color: #1a1a1a;

      &:before {
        background-color: #fce307;
      }
    }
  }
`

const InerItem = styled.div`
  width: 100%;
  position: relative;
  z-index: 99;
  padding: 30px 22px;
  transition: 0.3s ease-in;
`

const Title = styled.h3`
  color: #1a1a1a;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
`

const Desc = styled.p`
  font-size: 16px;
  color: #464646;
`

const Step = styled.span`
	display: flex;
  justify-content: center;
  margin-left: auto;
  width: 80px;
	padding: 10px 0;
	border-radius: 10rem;
	color: #fff;
	text-transform: uppercase;
	font-size: 1rem;
	transition: all .3s;
	position: relative;
	overflow: hidden;
	z-index: 1;

	&:after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #c5892e;
		border-radius: 10rem;
		z-index: -2;
	}

	&:before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: all .3s;
		border-radius: 10rem;
		z-index: -1;
	}
`

const HowItWorks = () => {
  // const TranslateString = useI18n()

  return (
    <LayoutWrapper>
      <SectionTitle>
        <TitleMain>How to Play</TitleMain>
        <SubTitle>If the digits on your tickets match the winning numbers in the correct order, you win a portion of the prize pool Simple!</SubTitle>
      </SectionTitle>

      <BoxItem>
        <Item>
          <InerItem>
            <Step className="btn-step">  
              STEP 1
            </Step>

            <Title>Buy tickets</Title>

            <Desc>
              Prices are set when the round starts, equal to 1 LUCKY per ticket.
            </Desc>
          </InerItem>
        </Item>

        <Item>
          <InerItem>
            <Step className="btn-step">  
              STEP 2
            </Step>

            <Title>Wait for the Draw</Title>

            <Desc>
              There are two draws every day: once every 24h.
            </Desc>
          </InerItem>
        </Item>

        <Item>
          <InerItem>
            <Step className="btn-step">  
              step 3
            </Step>

            <Title>Check for Prizes</Title>

            <Desc>
              Once the round&apos;s over, come back to the page and check to see if you&apos;ve won!
            </Desc>
          </InerItem>
        </Item>
      </BoxItem>
    </LayoutWrapper>
  )
}
export default HowItWorks
