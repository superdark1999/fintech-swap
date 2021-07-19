import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
import bannerDefault from 'assets/images/banner-profile-default.jpg'
import arrowDown from '../../../../assets/images/down-filled-triangular-arrow.svg'

interface Props {
  urlCover?: string;
  state?: boolean;
}
export const UserProfileStyled = styled.div<Props>`
  background: #f9fafb;
  .ant-radio-button-wrapper-checked span {
    background-color: #fff !important;
    font-weight: bold !important;
  }
  .btn-filter {
    background: #fff;
    color: #333534;
    span {
      font-weight: bold;
    }
    :hover {
      background: #333534 !important;
      color: #fff !important;
      border: 1px solid #333534 !important;
    }
  }
  .ant-radio-button-wrapper {
    :hover {
      ::before {
        background: #333534 !important;
      }
    }
  }
  .ant-radio-button-wrapper-checked ::before {
    background: #333534 !important;
  }
  .ant-radio-button-wrapper-checked {
    background: #333534 !important;
    border: none !important;
    color: #fff !important;
  }
  .ant-tabs-tab {
    color: #afbac5;
    font-size: ${isMobile ? '16px' : '20px'};
    font-weight: 600;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #333435;
    font-size: ${isMobile ? '16px' : '20px'};
    font-weight: 600;
  }
  .ant-tabs-ink-bar {
    background: #333435;
  }
  .section {
    width: 100%;
    justify-content: center;
    &.header-profile {
      height: 300px;
      position: relative;
      justify-content: center;
      background: ${(props) =>
        props.urlCover ? `url(${props.urlCover})` : `url(${bannerDefault})`};
      background-repeat: no-repeat;
      background-size: cover;
      .header-profile-col {
        max-width: 1100px;
        > .avatar {
          width: 140px;
          height: 140px;
          top: 230px;
          border: 5px solid #ffffff;
          box-sizing: border-box;
          border-radius: 80px;
          position: absolute;
          object-fit: cover;
        }
      }
    }
    &.content-profile {
      .content {
        max-width: ${!isMobile && '1100px'};
        .ant-tabs {
          overflow: inherit !important;
        }
      }
      margin: 80px auto;
      padding-bottom: 80px;
      display: flex;
      justify-content: center;
      .info-detail {
        display: flex;
        justify-content: space-between;
        flex-direction: ${isMobile ? 'column' : 'row'};
        .name {
          font-size: 28px;
          line-height: 40px;
          color: #333435;
          font-weight: 600;
          :hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .copy {
          span {
            border-radius: 100px;
            border: 1px solid #e7ebef;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        img {
          margin-left: 5px;
        }
        .rank {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #fae54a;
          display: flex;
          align-items: center;
          > img {
            margin-top: -4px;
            margin-right: 6px;
            width: 40px;
          }
        }
        .button-right {
          display: flex;
          align-items: center;
          a {
            padding-right: 6px;
          }
          .btn-donate {
            width: 125px;
            height: 40px;
            > span {
              margin-right: 5px;
            }
          }
          img {
            width: 40px;
            height: 40px;
            border: 1px solid #e7ebef;
            box-sizing: border-box;
            border-radius: 100px;
            cursor: pointer;
          }
        }
      }
      .description {
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        margin-top: 20px;
        margin-left: ${isMobile ? '0px' : ' 20px'};
      }
    }
  }
`

export const CartStyled = styled.div<Props>`
  /* display: flex; */
  margin: 20px 0;
  padding: 30px;
  border: 1px solid #e7ebef;
  box-sizing: border-box;
  border-radius: 24px;
  background: #fff;
  .avatar {
    width: 210px;
    height: 210px;
    border-radius: 8px;
    display: block;
    object-fit: cover;
    margin: 0 auto;
    margin-bottom: ${isMobile ? '10px' : ' 0px'};
  }
  .btn-swap {
    background: linear-gradient(45deg, #1cace8, #07dce6);
  }
  .info-swap{
      display: block;
      position: relative;
      background: unset;
      cursor: pointer;
      border: 0;
      margin: 0 auto;
      font-weight: bold;
      border: 1px solid #efefef;
      border-radius: 100px;
      color: #333435;
      padding: 0px 45px 0 15px;
      .arrowDown{
        position: absolute;
        width: 40px;
        height: 40px;
        right: -1px;
        top: -1px;
        background: #efefef;
        border-radius: 50%;
        &::before{
          content: '';
          background: url(${arrowDown});
          width: 11px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%) rotate( ${(props) => props.state ? '0deg' : '180deg'});
          height: 10px;
          background-size: cover;
        }
      }
      
    }
  .description {
    width: 100%;
    margin-top: 0px !important;
    .header-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .status {
        display: flex;
        align-items: center;
        border: 1px solid #19a3dd;
        box-sizing: border-box;
        border-radius: 100px;
        padding: 2px 16px;
        color: #19a3dd;
        text-transform: capitalize;
      }
      .nfttype-status {
        color: #19a3dd;
        width: 100%;
      }
      .name-date {
        display: flex;
        font-weight: bold;
        font-size: 28px;
        line-height: 40px;
        color: #333435;
        opacity: 0.9;
        margin-bottom: 12px;
      }
      .cancel {
        width: 98px;
        height: 40px;
        background: #fc636b;
        border-radius: 100px;
        padding: 2px 8px;
        color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 20px;
        cursor: pointer;
        :hover {
          opacity: 0.6;
        }
      }
    }
    
    .name {
      font-weight: bold;
      font-size: 28px;
      line-height: 40px;
      color: #333435;
      opacity: 0.9;
      
      :hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .header-card {
      @media (max-width: 991px) {
        display: flex;
        flex-direction: column;
      }
      .group-btn-action {
        height: 40px;
        .dropdown-action {
          border: none;
          width: 184px;
          height: 100%;
          font-weight: bold;
          color: #fff;
          border-radius: 100px;
          background: #35a5fc;
        }
        .cancel-action {
          border: none;
          width: 98px;
          height: 100%;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          border-radius: 100px;
          background: #fc636b;
        }
        .process-action {
          .status-processing {
            span {
              margin-right: 6px;
              animation: mymove 5s infinite;
              color: #f0b90b;
              font-weight: 600;
              font-size: 16px;
            }
            @keyframes mymove {
              100% {
                transform: rotate(180deg);
              }
            }
            color: #f0b90b;
            font-weight: 600;
            font-size: 16px;
            border: none;
            height: 100%;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .status-approved {
            span {
              margin-right: 6px;
              color: #84c87e;
              font-weight: 600;
              font-size: 16px;
            }
            color: #84c87e;
            font-weight: 600;
            font-size: 16px;
            border: none;
            height: 100%;
            font-weight: 600;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
    .group-button {
      display: flex;
      margin-top: 10px;
      flex: 1;
      > div {
        margin-right: 10px;
      }
      .qrCode-wrapper {
        flex: 1;
        justify-content: flex-end;
        display: flex;
      }
      .btn-qrCode {
        background: #fff;
        border-radius: 100px;
        cursor: pointer;
        border: 1px solid #e7ebef;
        width: 40px;
        height: 40px;
        align-items: center;
        padding: 8px;
        display: flex;
        justify-content: center;
      }
    }
    &.space-vehicle {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }
`

export const ListCart = styled.div`
  /* max-width: 900px; */
  margin: 0 auto;
`
