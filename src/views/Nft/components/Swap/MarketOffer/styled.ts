import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import { Table } from 'antd'


export const OfferStyled = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  padding: 40px;
  border: ${!isMobile && '2px solid #E7EBEF'};
  box-sizing: border-box;
  border-radius: 32px;
  background: ${!isMobile && '#F9FAFB'};
  .btn-back{
    height: max-content;
    background: transparent;
    border-radius: 100px;
    border:1px solid #333435;
    display: flex;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 8px 24px;
    margin-right:10px;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    position: relative;
    cursor: pointer;
    color: #333435;
  }
  .ant-select {
    margin-bottom: 20px;
    .ant-select-selector {
      border-radius: 30px;
      .ant-select-selection-item {
        font-weight: 500;
        font-size: 14px;
        text-decoration: unset;
      }
    }
  }
`

export const TradeArtWorkStyled = styled.div`
  max-width: 1320px;
  overflow: hidden;
  /* width: 1100px; */
  margin: ${!isMobile ? '60px auto' : '10px auto'};
  padding: 0px 40px;
  background: ${!isMobile ? 'F9FAFB' : '2px solid #E7EBEF'};
  border: ${!isMobile && '2px solid #E7EBEF'};
  box-sizing: border-box;
  border-radius: 32px;
  justify-content: center;
  .ant-select {
    margin-top: 40px;
    .ant-select-selector {
      border-radius: 30px;
      .ant-select-selection-item {
        font-weight: 500;
        font-size: 14px;
        text-decoration: unset;
      }
    }
  }
  .tradeOption {       
    background: #F9FAFB;
    border: 2px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 32px;
  }
  .footer{
    align-items: center;
    margin-bottom: 40px;
    justify-content: space-between;
    .ant-input {
      border-radius: 16px;
      resize: none;
      width: 100%;
      padding: 10px;
    }
    >div {
      margin: 20px auto;
    }
  }
`;

interface PropsStyled {
  center?: boolean
}

export const CardStyled = styled.div<PropsStyled>`
  max-width: 248px;
  background: #ffffff;
  /* height: 334px; */
  border: 1px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 24px;
  padding: 24px;
  margin: ${props => props.center && 'auto'};
  margin-top: 40px;
  margin-bottom: 40px;
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
  .name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #333435;
    margin-top: 8px;
  }
  .input {
    border-radius: 100px;
    margin: 4px 0px;
  }
  .organize {
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #333435;
    margin-top: 2px;
  }
`
interface PropsState {
  state?: boolean
}
export const TableStyled = styled(Table)<PropsState>`
  padding: ${isMobile && '12px'};
  .ant-spin-nested-loading{
    margin-top: 20px;
    animation: growDown 300ms ease-in-out forwards;
    transform-origin: top center;
    display: ${(props => !!props.state ? 'none' : 'block')};
    
    @keyframes growDown {
      0% {
          transform: scaleY(0)
      }
      80% {
          transform: scaleY(1.1)
      }
      100% {
          transform: scaleY(1)
      }
    }
  }
  
  .ant-table {
    border-radius: ${!isMobile && '32px'};
    overflow: hidden;
    border: 1px solid #E7EBEF;
    .ant-table-thead > tr > th {
      text-align: left;
      background: #FFFFFF;
      border-bottom: 1px solid #f0f0f0;
      padding: 12px 20px !important;
      color: #AFBAC5;
      ::before{
        width: 0 !important;
      }
    }
    .ant-table-tbody > tr > td {
      text-align: left;
      background: #FFFFFF;
      border-bottom: 1px solid #f0f0f0;
      padding: 12px 20px !important;
    }
  }
`

export const Container = styled.div`
  max-width: 1320px;
  margin: 0px auto;
`
export const WrapperListCard = styled.div`
  position: relative;
  .scroll-left {
    position: absolute;
    right: -15px;
    top: 50%;
    color: #E7EBEF;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff;
    z-index: 1;
  }
  .scroll-right {
    position: absolute;
    left: -15px;
    top: 50%;
    color: #E7EBEF;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff;
    z-index: 1;
  }
`
interface PropsListCard {
  numOfItem?: number
}
export const ListCard = styled.div<PropsListCard>`
  padding-left: ${props => ( props.numOfItem <= 3) && '50px'};
  display:flex;
  justify-content:center;
  align-items:center;
  transform: ${props => (props.numOfItem === 2 || props.numOfItem === 3) && 'translateX(82px)' };
  max-width: 400px;
  overflow: ${props => (props.numOfItem <= 3) ? 'unset' : 'scroll'};
  /* gap:20px; */
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }  

  >div { 
    width: 280px;
    height: 400px;
    -webkit-box-reflect: below 2px linear-gradient(transparent,transparent,#0004);
    -webkit-transform-origin: center;
    -ms-transform-origin: center;
    transform-origin: center;
    -webkit-transform: perspective(800px) rotateY(45deg);
    -ms-transform: perspective(800px) rotateY(45deg);
    transform: perspective(800px) rotateY(64deg);
    -webkit-transition: 0.5s;
    transition: 0.5s;
    margin-left: -200px;
  }
  :hover {
    >div {
      opacity:0.3;
      margin-left: -200px;
      :hover {
        width: 280px;
        height: 400px;
        /* width: 180px; */
        transform: rotateY(0deg);
        opacity:1;
        z-index: 1
      }
    }
  }
`