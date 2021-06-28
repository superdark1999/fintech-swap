

import React from 'react'
import styled from 'styled-components'

//1: only token
//2: NFT + token

export default function CardSelect(props: { setSelectMethod?: (value: number) => void, isShowOption:boolean } ) {
  const {setSelectMethod,isShowOption} = props
  return (
    <CardSelectStyled>
      {isShowOption?(
        <div>
          <p className="description">
            Wait another user offer your NFT
          </p>
        </div>
      ):(
        <>
        <div className="option-offer">
        <div className="button-offer" onClick={() => setSelectMethod(1)}>
          Select NFT only
        </div>
        <p className="description">
          You can select multiple artwork at once
        </p>
      </div>

      <div className="option-offer">
        <div className="button-offer" onClick={() => setSelectMethod(2)}>
          {`Select NFT & Token`}
        </div>
        <p className="description">
          You can select multiple artwork and offer token
        </p>
      </div>
      </>
      )}
    </CardSelectStyled>
  )
}

const CardSelectStyled = styled.div`
  width: 280px;
  height: 400px;
  border: 1px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .option-offer {
    :first-child{
      border-bottom: 1px solid #E7EBEF;
    }
    padding: 22px;
    .button-offer {
      border: 1px solid #333435;
      box-sizing: border-box;
      border-radius: 100px;
      font-weight: 600;
      font-size: 16px;
      color: #333435;
      text-align: center;
      padding: 8px;
    }
    .description {
      margin-top: 10px;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      text-align: center;
    }
  }
`