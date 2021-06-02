import styled from 'styled-components'

interface StyledButtonProps {
    width?: string;
    borderRadius?: string,
    height?: string,
    padding?: string,
  }

export const ButtonTrade = styled.div<StyledButtonProps>`
  width: ${props => props.width || 'max-content'};
  height: ${props => props.height || 'max-content'};
  background: linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '8px 24px'};
  font-weight: 600;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  cursor: pointer;
  >img, span {
    margin-right: 5px;
  }
`;

export const ButtonBuy = styled.div<StyledButtonProps>`
  width: ${props => props.width || 'max-content'};
  height: ${props => props.height || 'max-content'};
  background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.padding || '8px 24px'};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  cursor: pointer;
  ::before {
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius:50px; 
    padding: 2px; 
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
  }
`;
