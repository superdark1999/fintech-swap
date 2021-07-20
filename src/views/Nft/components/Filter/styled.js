import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const FilterBarStyled = styled.div`
  .right-action {
    font-weight: ${isMobile ? '500' : '700'};
    font-size: ${isMobile ? '16px' : '20px'};
    text-align: ${isMobile && 'right'};
    display: flex;
    flex-direction: column;
    grid-gap: 20px;
    .search-input {
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
