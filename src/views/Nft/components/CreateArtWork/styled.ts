import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Modal } from 'antd'
 
import { Radio } from 'antd';
export const GroupButton = styled(Radio.Group)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
 `
export const CreateArtWorkStyled = styled.div`
  margin: ${!isMobile && '40px auto'};
  max-width: 1100px;
  background: ${!isMobile && '#F9FAFB'};
  padding: ${isMobile ? "24px" : "40px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${!isMobile && '2px solid #E7EBEF'};
  border-radius: 32px;
  .ant-modal-content {
    overflow: auto;
    border-radius: 24px
  }
  .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child{
    background:none;
    border:none;
  }
  .btn-submit{
    span{
      margin-left: 6px;
      animation: mymove 5s infinite;
      color: #fff;
      font-weight: 600;
      font-size: 16px;
      }
      @keyframes mymove {
        100% {transform: rotate(180deg);}
      }
  }

`
export const RadioButton= styled(Radio.Button)`
&.ant-radio-button-wrapper-checked ::before {
    width: ${isMobile? '80px' : '172px'};
    height: ${isMobile? '60px' : '100px'};
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius:16px; 
    padding: 2px; 
    box-sizing: border-box;
    border:2px solid #35A5FC;
  }
&.ant-radio-button-wrapper-checked{
  span, > span > svg {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0 0.5rem 0 0.25rem;
    font-size: 1rem;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    font-weight: 500;
    background-color: #35A5FC;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    outline: none;
    margin: unset;
  }
}

 margin: 10px;
 &.ant-radio-button-wrapper{
   border: 1px solid #d9d9d9;
   ::before {
    content: none;
  }
  height: ${isMobile? '60px' : '100px'};
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${isMobile ? '8px':  '20px 46px'};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  width: ${isMobile? '80px' : '172px'};
  :hover {
    border:1px solid #35A5FC;
    background:#fff;
    color:#35A5FC;
  }
}
`

export const ModalStyled  = styled(Modal) `
  background: #ffffff;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100% !important; 
  max-width: unset;
  padding: 0;
  margin: 0 !important;
  border-radius: 0;padding-bottom: 80px;
  .ant-modal-body {
    overflow: scroll;
    max-height: calc(100vh - 110px);
    border-radius: 0;
  }
`