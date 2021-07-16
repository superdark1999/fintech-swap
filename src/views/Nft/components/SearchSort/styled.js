import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const FilterBarStyled = styled.div`
  display: flex;
  margin: ${isMobile ? 'none' : ' 20px 0 10px 0'};
  .left-action {
    flex: 1;
    .filter-label {
      font-weight: 600;
      font-size: 20px;
      color: #333435;
      margin-right: 24px;
    }
    .ant-radio-wrapper {
      background: #fff;
      color: #333435;
      margin: 8px;
      padding: 4px 16px;
      font-weight: 600;
      border: 1px solid #e7ebef;
      box-sizing: border-box;
      border-radius: 100px;
      &.ant-radio-wrapper-checked {
        background: #333435;
        color: #fff;
      }
    }
    .ant-radio .ant-radio-inner {
      display: none;
    }
    .ant-radio {
      display: none;
    }
  }
  .right-action {
    font-weight: ${isMobile ? '500' : '700'};
    font-size: ${isMobile ? '16px' : '20px'};
    text-align: ${isMobile && 'right'};
    display: flex;
    flex-direction: column;
    /* text-decoration: underline; */
    cursor: pointer;
    display: flex;
    .search-input {
      margin-bottom: 24px;
      input {
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }
      .ant-btn-primary {
        background: #333435;
        border: 1px solid #333435;
      }
    }
    .ant-select {
      margin-left: 16px;
      .ant-select-selector {
        border-radius: 30px;
        .ant-select-selection-item {
          font-weight: 500;
          font-size: 14px;
          text-decoration: unset;
        }
      }
    }
  }
  @media (max-width: 765px) {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
`
