import styled from 'styled-components'
import {isMobile} from 'react-device-detect'

export const HotArtistsStyled = styled.div`
position: relative;
  .header-artists{
    height:48px;
    width:100%;
    display:flex;    
    align-items: center;
    .title-artists{
        font-weight: bold;
        flex:1;
        font-size: ${isMobile ? '20px' : '32px'};
    }    
    .more-artists{
        font-weight: ${isMobile ? '500' : '700'};
        font-size: ${isMobile ? '16px' : '20px'};
        text-align: ${isMobile && 'right'};
        width: 108px;
        text-decoration: underline;
        cursor: pointer;
    }
  }
    .scroll-left {
      position: absolute;
      right: -8px;
      top: 50%;
      color: #E7EBEF;
      border-radius: 50%;
      overflow: hidden;
      background: #ffffff;
      z-index: 1;
    }
    .scroll-right {
      position: absolute;
      left: -8px;
      top: 50%;
      color: #E7EBEF;
      border-radius: 50%;
      overflow: hidden;
      background: #ffffff;
      z-index: 1;
    }
  .content-artists{
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      display: flex;
      ::-webkit-scrollbar {
        display: none;
      }
      position: relative;
      scroll-behavior: smooth;
      
      .card-artists{
        margin:24px 0px;
        min-width:248px;
        /* height:408px; */
        height:330px;
        border: 1px solid #E7EBEF;
        box-sizing: border-box;
        border-radius: 24px;
        margin-right: 20px;
        padding: 24px;
        :hover{ 
        box-shadow: 1px 4px 8px #ececec;
          -webkit-transition:  box-shadow .3s ease-in;
        }
        .avatar-artists{
          width: 200px;
          height: 200px;
          background-color: gray;
          border-radius: 50%;
          margin-bottom: 24px;
        }
        .name-artists {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #333435;
          text-align: center;
          cursor: pointer;
        }
        .rank-artists {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #FAE54A;
          text-align: center;
          > img {
            margin-top: -4px;
          }
        }
        .line {
          height: 1px;
          background: #E7EBEF;
          margin: 16px auto;
        }
        .list-image {
          display: flex;
          justify-content: space-between;
          .wrapper-image{
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 8px;
            overflow: hidden;
            align-items: center;
            overflow: hidden;
            position: relative;
            width: 60px;
            height: 60px;
            /* padding-top: 100%; */
            >img {
              width: 100%;
              height: 100%;
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              object-fit: cover;
            }
          }
        }
      }
    }
`

interface Props {
  bgImage?: boolean
}

export const ImageStyled = styled.div<Props>`
  position: relative;
  height: ${isMobile ? 'calc(100vh - 200px)' : 'calc(100vh - 80px)'};
  width: 100%;
  overflow: hidden;
  
  .bg-image {
    /* The image used */
    background-image: ${ props => `url(${props.bgImage})`};
    animation-play-state: paused;
    /* Add the blur effect */
    filter: blur(8px);
    -webkit-filter: blur(70px);
    
    /* Full height */
    height: 100%; 
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
  }
  >img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    max-width: calc(100% - 100px);
    max-height: calc(100vh - 300px);
    border-radius: 16px;
  }
  .img-artwork {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    max-width: calc(100% - 100px);
    max-height: calc(100vh - 300px);
    border-radius: 16px;
  }
`
export const DetailStyled = styled.div`
  padding: 42px 32px;
  height: calc(100vh - 200px);
  /* overflow: auto; */
  
  
  .title {
    font-weight: bold;
    font-size: 28px;
    line-height: 40px;
  }
  .description {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    margin-top: 16px;
  }
  .token{
    /* -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: linear-gradient(270deg,#19A3DD -16.5%,#BADEB7 117.25%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent; */
    font-size: 16px;
    font-weight: 600;
    >img {
      margin-top: -3px;
      margin-left: 5px;
    }
  }
  .organize {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333435;
    >.name {
      margin: 0px 6px;
    }
  }
  
`

export const ReviewStyled = styled.div`
  border-bottom: 1px solid #E7EBEF;
  padding: 16px 0px;
  .review-item {
    display: flex;
    justify-content: space-between;   
  }
  .comment {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #333435;
    margin: 6px 0px;
  }
  .time {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #AFBAC5;
    margin: 6px 0px;
  }
`
export const ScrollReview = styled.div`
  max-height: calc(100vh - 500px); 
  overflow: auto; 
  padding-bottom: 80px;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const FooterStyled = styled.div`
  /* position: absolute; */
  width: 100%;
  height: 80px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0px -4px 16px -4px rgba(35, 35, 35, 0.06);
  background-color: #ffffff;
  border-top: 2px solid #E7EBEF;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 42px 32px;
  >div {
    width: 48%;
  }
`

export const DetailTabpane = styled.div`
  border: 1px solid #f0f0f0;
  padding: 12px;
  .group-info {     
    :not(:last-child){
      border-bottom: 1px solid #f0f0f0;
    }
    .info {
      padding: 6px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 14px;
        font-weight: normal;
      }
      .value{
        width: 50%;
        text-align: right;
      }
    }
  }
  
`

export const HeaderStyled = styled.div`
  position: absolute;
  top: 20px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: ${isMobile ? '12px' : '24px'};
  flex-wrap: wrap;
  .date-time {
    font-weight: 600;
    font-size: 14px;
    background-color: #FC636B;
    color: #ffffff;
    /* border: 2px solid #FC636B; */
    border-radius: 30px;
    padding-left: 10px;
    padding-right: 10px;
    width: max-content;
    height: 24px;   
    margin-right: 12px;
    margin-left: 20px;
    margin-bottom: 12px;
  }
  .rating {
    padding: 0px 8px;
    background-color: #ffffff;
    border: 1px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 100px;
    height: 24px;
    margin-bottom: 12px;
  }
  .social-icon  {
    display: flex;
    margin-bottom: 12px;
    > span {
      font-size: ${isMobile ? '16px' : '24px'};
      background: #FFFFFF;
    }
    .icon {
      background: #FFFFFF;
      border: 1px solid #E7EBEF;
      box-sizing: border-box;
      border-radius: 100px;
      margin-left: 12px;
      cursor: pointer;
      width: ${isMobile? '30px' : '40px'};
      height: ${isMobile? '30px' : '40px'};
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333333;
      img {
        width: ${isMobile? '16px' : '24px'};
        height: ${isMobile? '16px' : '24px'};
      }
    }
  }
`