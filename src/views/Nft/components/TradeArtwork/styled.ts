import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
export const TradeArtWorkStyled = styled.div`
  max-width: 1320px;
  /* width: 1100px; */
  margin: ${!isMobile ? '60px auto' : '10px auto'};
  padding: 0px 40px;
  background: ${!isMobile ? 'F9FAFB' : '2px solid #E7EBEF'};
  border: ${!isMobile && '2px solid #E7EBEF'};
  box-sizing: border-box;
  border-radius: 32px;
  justify-content: center;
  .ant-select {
    margin-top: 40px;
    .ant-select-selector {
      border-radius: 30px;
      .ant-select-selection-item {
        font-weight: 500;
        font-size: 14px;
        text-decoration: unset;
      }
    }
  }
  .tradeOption {       
    background: #F9FAFB;
    border: 2px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 32px;
  }
  .footer{
    align-items: center;
    margin-bottom: 40px;
    justify-content: space-between;
    .ant-input {
      border-radius: 16px;
      resize: none;
      width: 100%;
      padding: 10px;
    }
    >div {
      margin: 20px auto;
    }
  }
`;

interface PropsStyled {
  center?: boolean
}

export const CardStyled = styled.div<PropsStyled>`
  max-width: 248px;
  background: #ffffff;
  /* height: 334px; */
  border: 1px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 24px;
  margin: ${props => props.center && 'auto'};
  margin-top: 40px;
  margin-bottom: 40px;
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    >img {
      max-width: 200px;
      max-height: 200px;
    }
  }
  .name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #333435;
    margin-top: 8px;
  }
  .input {
    border-radius: 100px;
    margin: 4px 0px;
  }
  .organize {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333435;
    margin-top: 2px;
  }

`
