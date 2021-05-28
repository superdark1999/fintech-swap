import styled from 'styled-components'

export const CollectionStyled = styled.div`
    .header-artists{
        height:48px;
        width:100%;
        display:flex;    
        align-items: center;
        .title-artists{
            font-weight: bold;
            flex:1;
            font-size: 32px;
        }    
        .more-action{
            font-weight: 700;
            font-size: 20px;
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
    .content-collect{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
      grid-gap: 20px;
      align-items: stretch;
      padding: 24px 0px;
    }

    .footer-section {
      width: 100%;
      background: #AFBAC5;
      margin-top: 16px;
      height: 1px;
      position: relative;
      .wrapper-button {
        width: 120px;
        height:34px;
        background: #ffffff;
        position: absolute;
        left: 50%;
        top: -16px;
        display: flex;
        justify-content: center;
        >button {      
        }
      }
  }

`