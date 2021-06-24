import React from 'react'
import styled from 'styled-components'
import { CheckCircleFilled } from '@ant-design/icons'
import Lucky from 'assets/images/token.svg'
import TextGradient from 'components-v2/ID'

export default function CardSwap(props: any) {
  return (
    <CardSwapStyled style={{...props.style}}>
      <img src={props.data?.contentUrl}/>
      <div className="filter">
        <div className="title">{props.data?.title}</div>
        <div className="artist-name">
          LuckySwapStudio {' '}
          <CheckCircleFilled style={{color:"#84C87E"}}/>
        </div>
        { !props.data?.ownerWalletAddress ?
          <div className="price">
          21 {' '} <img src={Lucky} />
          </div>
          :
          <TextGradient>{props.data?.ownerWalletAddress}</TextGradient>
        }
      </div>
      {
        (props.value && props.setVisible) && <div className="edit" onClick={() => props?.setVisible({ isOpen: true, value: props.value })}>Edit</div>
      }
    </CardSwapStyled>
  )
}

const CardSwapStyled = styled.div`
  width: 280px;
  height: 400px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }
  .filter {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(181.09deg, rgba(0, 0, 0, 0) 57.15%, #000000 110.73%);
    color: #ffffff;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 20px;
    .title {
      font-weight: 600;
      font-size: 20px;
    }
    .artist-name {
      font-weight: 600;
      font-size: 14px;
    }
  }
  .edit {
    border: 1px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 100px;
    padding: 8px 20px;
    text-align: center;
    background: #FFFFFF;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`