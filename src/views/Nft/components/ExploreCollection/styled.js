import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const ExploreCollectionStyled = styled.div`
  max-width: 1360px;
  padding: 20px 40px;
  margin: auto;
  .header-artists {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    .title-artists {
      font-weight: bold;
      text-align: center;
      flex: 1;
      font-size: ${isMobile ? '20px' : '40px'};
    }
  }
  
  .content-collect {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 24px;
    align-items: stretch;
    padding: 24px 0px;
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
  display: ${isMobile ? 'block' : 'flex'};
  margin: ${isMobile ? 'none' : ' 20px 0 10px 0'};
  .left-action {
    flex: 1;
    .filter-label {
      font-weight: 600;
      font-size: 20px;
      color: #333435;
      margin-right: 24px;
    }
    .filter-group {
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
    .filter-group-mobile {
      list-style: none;
      font-feature-settings: 'tnum', 'tnum';
      display: flex;
      font-size: 0;
      line-height: unset;
      max-width: calc(100vw - 80px);
      flex-wrap: nowrap;
      overflow-x: auto;
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
  }
  
`
