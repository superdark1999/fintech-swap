
import styled from 'styled-components'
import { Radio } from 'antd'

export const GroupButton = styled(Radio.Group)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

interface StyledButtonProps {
  width?: string;
  borderRadius?: string,
  height?: string,
}

export const RadioButton= styled(Radio.Button)<StyledButtonProps>`
&.ant-radio-button-wrapper-checked ::before {
    width: ${props => props.width || '172px'};
    height: ${props => props.height || '40px'};
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius: ${props => props.borderRadius || '16px'};
    padding: 2px; 
    box-sizing: border-box;
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
    border-color: none;
    > span > svg {
    background: unset
  }
  }
 &.ant-radio-button-wrapper-checked{
  span {
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
  > span > svg {
    background: unset
  }
} 

 margin: 10px;
 &.ant-radio-button-wrapper{
   border: 1px solid #d9d9d9;
   ::before {
    content: none;
  }
  border-radius: ${props => props.borderRadius || '16px'};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 46px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  width: ${props => props.width || '172px'};
  height: ${props => props.height || '40px'};
  :hover::before {
    width: ${props => props.width || '172px'};
    height: ${props => props.height || '40px'};
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius: ${props => props.borderRadius || '16px'};
    padding: 2px; 
    box-sizing: border-box;
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
    border-color: none;
  }
  
  :hover:not(.ant-radio-button-wrapper-disabled) {
    border: 1px solid #35A5FC;
    background:#fff;
    color:#35A5FC;
  }
  &.ant-radio-button-wrapper-disabled:hover{
    :before{
      content: none;
    }
  }
}
`