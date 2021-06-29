

import React from 'react'
import styled from 'styled-components'
import Lucky from 'assets/images/token.svg'
import { CloseOutlined } from '@ant-design/icons'
import useUserStore from 'store/userStore'
import { Input } from 'antd';

const { TextArea } = Input;
export default function CardOffer(props: any) {
  const { type, onChangePrice, onChangeNote, onChangeSwapMethod } = props
  const [userState, userAction] = useUserStore()

  const onChangeInputPrice = (event: any) => {
    onChangePrice && onChangePrice(event.target.value)
  }
  return (
    <CardOfferStyled>
      {type === 2 &&
        <div className="option-offer">
          <div className="input-offer">
            <div className='row-content'>
              <label>Your offer</label>
              <CloseOutlined onClick={() => onChangeSwapMethod(null)} />
            </div>
            <input placeholder="Enter price" onChange={onChangeInputPrice} />
          </div>
          <div className="balance">
            Balance: <div>{userState?.balance?.LUCKY || 0}</div> <img src={Lucky} />
          </div>
        </div>
      }

      <div className="option-offer">
        <div className="input-offer">
          <div className='row-content'>
            <label>Note for author</label>
            {type === 2 ? null : <CloseOutlined onClick={() => onChangeSwapMethod(null)} />}
          </div>
          <TextArea className="note-input" autoSize={{ minRows: 3, maxRows: 7 }} placeholder="Enter note" maxLength={200} showCount={true} />
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
    cursor: pointer;
    :first-child{
      border-bottom: 1px solid #E7EBEF;
      margin-bottom: 16px;
    }
    .input-offer {
      display: flex;
      flex-direction: column;
      textarea{
        height:170px !important;
        width:100% !important;
        border-radius: 12px !important;
      }
      .row-content{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
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