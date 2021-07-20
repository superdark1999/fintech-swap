import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

// interface Props {
//   styleFilter?: string;
// }

export const FilterBarStyled = styled.div`
  width:${(props) =>
    props?.styleFilter == 'collection' 
  && isMobile? '100%': 'unset'};
  margin-top: ${(props) =>
    props?.styleFilter == 'collection' && '30px'};
  .right-action {
    font-weight: ${isMobile ? '500' : '700'};
    font-size: ${isMobile ? '16px' : '20px'};
    text-align: ${isMobile && 'right'};
    display: flex;
    flex-direction: ${(props) =>
      (props?.styleFilter == 'onstore' && !isMobile) ? 'unset': 'column'};
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
