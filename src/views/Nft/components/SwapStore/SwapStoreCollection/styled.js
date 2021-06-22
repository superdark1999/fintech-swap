import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const ExploreCollectionStyled = styled.div`
  max-width: 1320px;
  padding: 20px 0;
  margin: auto;
  .banner-nft {
    margin: 30px 0;
    border-radius: 12px;
    img {
      border-radius: 12px;
    }
  }
  .header-artists {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .title-artists {
      font-weight: bold;
      text-align: center;
      background: -webkit-linear-gradient(45deg, #1cace8, #07dce6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: ${isMobile ? '20px' : '40px'};
    }
  }
  .more-action {
    display: flex;
    .left-action {
      flex: 1;
      .filter-label {
        font-weight: 600;
        font-size: 20px;
        color: #333435;
        margin-right: 24px;
      }
    }
    .right-action {
      font-weight: ${isMobile ? '500' : '700'};
      font-size: ${isMobile ? '16px' : '20px'};
      text-align: ${isMobile && 'right'};
      width: 108px;
      /* text-decoration: underline; */
      cursor: pointer;
      display: flex;
      margin-right: 112px;
      .ant-select {
        margin-right: 16px;
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
  }
  @media (max-width: 765px) {
    flex-direction: column;
    .more-action {
      display: flex;
      align-items: center;
    }
  }
  .content-collect {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
    grid-gap: 24px;
    align-items: stretch;
    padding: 24px 0px;
    margin: 30px 0;
  }

  .footer-section {
    width: 100%;
    background: #afbac5;
    margin-top: 16px;
    height: 1px;
    position: relative;
    .wrapper-button {
      width: 120px;
      height: 34px;
      position: absolute;
      left: 50%;

      transform: translate(-50%, 0);
      top: -16px;
      display: flex;
      justify-content: center;
    }
  }
`
export const FilterBarStyled = styled.div`
  display: flex;
  margin: 20px 0 10px 0;
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
      margin: 0px 8px;
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
    height: 32px;
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
