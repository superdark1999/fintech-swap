

import React from 'react'
import styled from 'styled-components'
import Lucky from 'assets/images/token.svg'
import { CloseOutlined } from '@ant-design/icons'

export default function CardOffer(props:any) {
  const { type, onChangePrice, onChangeNote, onChangeSwapMethod } = props
  const onChangeInputPrice = (event:any)=>{
    onChangePrice&&onChangePrice(event.target.value)
  }
  return (
    <CardOfferStyled>
       <CloseOutlined style={{position:'absolute',top:10}} onClick={()=>onChangeSwapMethod(null)} />
      { type === 2 &&
        <div className="option-offer">
          <div className="input-offer">
            <label>Your offer</label>
            <input placeholder="Enter price" onChange={onChangeInputPrice} />
          </div>
          <div className="balance">
            Balance: <div>100 {' '}</div> <img src={Lucky}/>
          </div>
        </div>
      }

      <div className="option-offer">
        <div className="input-offer">
            <label>Note for author</label>
          <textarea placeholder="Enter note" />
          </div>
      </div>
    </CardOfferStyled>
  )
}

const CardOfferStyled = styled.div`
  width: 280px;
  height: 400px;
  border: 1px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: space-around; */
  .option-offer {
    :first-child{
      border-bottom: 1px solid #E7EBEF;
      margin-bottom: 16px;
    }
    .input-offer {
      display: flex;
      flex-direction: column;
      >label {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        color: #333435;
      }
      >input, textarea {
        margin-top: 10px;
        border: 1px solid #E7EBEF;
        box-sizing: border-box;
        border-radius: 100px;
        width: 100%;
        height: 40px;
        padding: 10px;     
      }
      > textarea {
          border-radius: 16px;
          width: 100%;
          height: 160px;
        }
    }
    .balance {
      display: flex;
      margin: 10px 0px 16px 0px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      >div {
        font-weight: 600;
        font-size: 14px;
        color: #35A5FC;
        margin-right: 5px;
      }
    }
  }
`