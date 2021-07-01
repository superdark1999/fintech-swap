import styled from 'styled-components'

interface StyledButtonProps {
  width?: string
  borderRadius?: string
  height?: string
  padding?: string
  htmlType?: any
}
export const ButtonCancel = styled.button<StyledButtonProps>`
  width: ${(props) => props.width || 'max-content'};
  height: ${(props) => props.height || 'max-content'};
  background: #fc636b;
  border-radius: 100px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '8px 24px'};
  font-weight: 600;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
  > img,
  span {
    /* margin-right: 5px; */
  }
`
export const ButtonTrade = styled.button<StyledButtonProps>`
  width: ${(props) => props.width || 'max-content'};
  height: ${(props) => props.height || 'max-content'};
  background: #fff;
  border-radius: 100px;
  border: 2px solid #35a5fc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '8px 24px'};
  font-weight: 600;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #35a5fc;
  cursor: pointer;
  margin-right: 10px;
  &.disabled {
    background: #bdbdbd;
    color: #fff;
    border: 2px solid #fff;
  }
  > img,
  span {
    /* margin-right: 5px; */
  }
`

export const ButtonBuy = styled.button<StyledButtonProps>`
  width: ${(props) => props.width || 'max-content'};
  height: ${(props) => props.height || 'max-content'};
  background: #35a5fc;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '8px 24px'};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  position: relative;
  cursor: pointer;
  color: #fff;
  border:none;
  &.disabled {
    background: #bdbdbd;
    color: #fff;
    border: 2px solid #fff;
  }
`

export const ButtonProccesing = styled.div<StyledButtonProps>`
  width: ${(props) => props.width || 'max-content'};
  height: ${(props) => props.height || 'max-content'};
  background: #35a5fc;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || '8px 24px'};
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  cursor: pointer;
  span {
    margin-left: 6px;
    animation: mymove 5s infinite;
    color: #19a3dd;
    font-weight: 600;
    font-size: 16px;
  }
  @keyframes mymove {
    100% {
      transform: rotate(180deg);
    }
  }
  ::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50px;
    padding: 2px;
    background: #35a5fc;
    -webkit-mask: linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`
