import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
 
import { Radio } from 'antd';
export const GroupButton = styled(Radio.Group)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
 `
export const CreateArtWorkStyled = styled.div`
  margin: 40px auto;
  max-width: 1100px;
  background: ${!isMobile && '#F9FAFB'};
  padding: ${isMobile ? "10px" : "40px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${!isMobile && '2px solid #E7EBEF'};
  border-radius: 32px;
  .ant-modal-content {
    overflow: auto;
    border-radius: 24px
  }
`
export const RadioButton= styled(Radio.Button)`
&.ant-radio-button-wrapper-checked ::before {
    min-width: 172px;
    /* height: 100px; */
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius:16px; 
    padding: 2px; 
    box-sizing: border-box;
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
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
    background: linear-gradient(
    270deg
    ,#19A3DD -16.5%,#BADEB7 117.25%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: unset;
  }
}

 margin: 10px;
 &.ant-radio-button-wrapper{
   border: 1px solid #d9d9d9;
   ::before {
    content: none;
  }
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 46px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  width: 172px;
  /* height: 100px; */
  :hover::before {
    width: 172px;
    /* height: 100px; */
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius:16px; 
    padding: 2px; 
    box-sizing: border-box;
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
  }
  

  :hover {
    background: linear-gradient(
      270deg
      ,#19A3DD -16.5%,#BADEB7 117.25%);
      -webkit-background-clip: text;
      -webkit-text-fill-color:transparent;
  }
}
`