import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
interface Props {
  background: string
}

export const OnSaleStyled = styled.div<Props>`
  /* width: 100%; */
  max-width: 1100px;
  margin: ${isMobile ? '20px' : '40px auto'};
  padding: ${isMobile ? '20px' : '50px'};
  border: 2px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: ${isMobile && 'space-around'};
  .background {
    background: #000000c4;
    background-image: ${props => props.background && `url(${props.background})`};
    background-repeat: no-repeat;
        filter: blur(8px);
    -webkit-filter: blur(100px);
    background-size: 200%;
    background-position: center;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  }
  .wrapper-image {
    min-width: 380px;
    height: 530px;
    
    margin: 10px;
    z-index: 1;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 24px;
    }
  }
  .wrapper-info {
    width: calc(100% - 380px - 40px);
    height: 530px;
    min-width: ${isMobile ? '300px' : '380px' } ;
    max-height: ${isMobile ? '400px' : '530px' };
   
    overflow: scroll;
    background: rgba(0, 0, 0, 0.25);
    border-radius: 24px;
    z-index: 1;
    margin: 10px;
    padding: 32px;
    color: #FFFFFF;
    .title {
      font-weight: bold;
      font-size: 28px;
      line-height: 40px;
      margin-bottom: 32px;
    }
    .description {
      font-weight: 500;
      font-size: 16px;
    }
    .organize {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #FFFFFF;
      margin-bottom: 40px;
      >.name {
        margin: 0px 6px;
      }
    }
    .social-icon  {
      display: flex;
      .icon {
        background: #FFFFFF;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 1px solid #000000;
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 30px;
          height: 30px;
          padding: 1px;
        }
      }
      
    }
  }
  
`