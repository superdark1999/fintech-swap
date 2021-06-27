import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const ConfirmStyled = styled.div<{isGrayFilter:any}>`
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  padding: 40px;
  border: 2px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 32px;
  background: #F9FAFB;
  display: flex;
  justify-content: center;
  flex-direction: column;
  filter: ${props=> props.isGrayFilter ? 'grayscale(100%)':''} ;
  .nft-image {
    width: 180px;
    height: 180px;
    border-radius: 24px;
    > img {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 24px;
    }
  }
  .rotate{
    animation: mymove 5s infinite;
    @keyframes mymove {
    100% {
      transform: rotate(180deg);
    }
  }
  }
  .content {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 16px;
    margin: auto;
    width: 440px;
    padding-left: 30px;
    padding-top: 30px;
    margin-bottom: 20px;
    .row-content{
      display: flex;
      margin-top: 8px;
      .label {
        min-width: 140px;
        font-weight: 500;
        font-size: 16px;
      }
    }
  }
`

export const VideoStyled = styled.div`
  position: relative;
  height: ${isMobile ? 'calc(100vh - 200px)' : 'calc(100vh - 80px)'};
  width: 100%;
  overflow: hidden;
  .bg-image {
    /* The image used */
    background: #1d1d1d;
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(60px);

    /* Full height */
    height: 100%;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  > video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    max-width: calc(100% - 100px);
    max-height: calc(100vh - 330px);
    border-radius: 16px;
  }
  .img-artwork {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    max-width: calc(100% - 100px);
    max-height: calc(100vh - 330px);
    border-radius: 16px;
  }
`