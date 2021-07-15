import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const CollectionStyled = styled.div`
  .header-artists {
    height: 48px;
    display: flex;
    align-items: center;
    .title-artists {
      font-weight: bold;
      flex: 1;
      font-size: ${isMobile ? '20px' : '32px'};
    }
    .more-action {
      font-weight: ${isMobile ? '500' : '700'};
      font-size: ${isMobile ? '16px' : '20px'};
      text-align: ${isMobile && 'right'};
      width: 108px;
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
