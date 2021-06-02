import styled from 'styled-components'

export const SidebarStyled = styled.div`
  .collapse-menu {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin-left: 20px;
    flex-direction: column;
    >img, span {
      margin-top: 20px;
      /* border-bottom: 1px solid #E7EBEF; */
      width: 25px;
      height: 25px;
      font-size: 25px;
    }
  }
  
  .button {
    display: flex;
    align-items: center;
    transition: border-color 0.3s, background 0.3s, padding 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
    padding:  0px 24px;
    height: 60px;
    &.bordered {
      border-bottom: 1px solid #E7EBEF;
    }
    cursor: pointer;
    >img {
      margin-right: 5px;
    }
    &.button-collapse{
      .title {
        text-decoration: underline;
        color: #333435;
        font-weight: 600;
      }
    }
    &.on-sale{
      background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      position: relative;
      cursor: pointer;
      ::before {
        content:"";
        padding: 2px; 
        background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
      }
    }
  }
  .group-menu {
    .menu {
      font-weight: 600;
      font-size: 20px;
      line-height: 32px;
      text-decoration-line: underline;
      color: #333435;
      display: flex;
      justify-content: space-between;
      .group-title {
        img, span {
          margin-right: 5px;
        }
      }
    }
    .list-sub-menu {
      height: 0;
      transition: 300ms;
      overflow: hidden;
      &.show-sub-menu {
        
        height: 240px;
        transition: 300ms;
        overflow: hidden;
      }
       background: #F9FAFB;
       display: flex;
       flex-direction: column;
       .ant-checkbox-group {
          margin: 24px 0px 0px 30px;
          display: flex;
          flex-direction: column;
          .ant-checkbox-group-item {
            margin-bottom: 6px;
            border-bottom: ${props => (props.isMobile ? '0.5px solid #E0E0E0' : 'unset')};
            padding: ${props => (props.isMobile ? '6px 0px 12px 0px' : 'unset')};
            :last-child {
              border-bottom: unset;
            }
          }
        }
       .input-search {
          background: #FFFFFF;
          border: 1px solid #E7EBEF;
          box-sizing: border-box;
          border-radius: 100px;
          height: 40px;
          width: calc(100% - 52px );  
          display: flex;
          align-items: center;
          padding: 10px;
          margin: 24px 0px 0px 24px;
          >input {
            border: none;
            border-radius: 100px;
            padding-left: 10px;
            :focus{
              outline: unset;
            }
          }
       }
       .group-input{
         justify-content: space-between;
         >input {
          background: #FFFFFF;
          border: 1px solid #E7EBEF;
          box-sizing: border-box;
          border-radius: 100px;
          height: 40px;
          width: 116px
         }
         .icon-search {
           color: #333435;
         }
       }
       .ant-select { 
         margin-top: 20px; 
         width: calc(100% - 52px );  
         margin-left: 24px;
         padding-left: 0;        
          .ant-select-selector {
          border-radius: 30px;
          height: 40px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .ant-select-selection-item {
            font-weight: 500;
            font-size: 14px;
            text-decoration: unset;
          }
        }
      }
      .sub-menu {
        margin-left: 24px;
        padding-left: 0;
        > button {
          height: 40px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    }
`