import styled from 'styled-components'
interface Props {
  urlCover?: string
}
export const UserProfileStyled = styled.div<Props>`
  .section {
    width: 100%;
    justify-content: center;
    &.header-profile {
      height: 160px;
      position: relative;
      justify-content: center;
      background: ${(props) => `url(${props.urlCover})`};
      background-repeat: no-repeat;
      background-size: cover;
      .header-profile-col {
        max-width: 1320px;
        > .avatar {
          width: 140px;
          height: 140px;
          top: 85px;
          border: 5px solid #ffffff;
          box-sizing: border-box;
          border-radius: 80px;
          position: absolute;
        }
      }
    }
    &.content-profile {
      .content {
        max-width: 1320px;
      }
      margin: 80px auto;
      padding-bottom: 80px;
      display: flex;
      justify-content: center;
      .info-detail {
        display: flex;
        justify-content: space-between;
        .name {
          font-size: 28px;
          line-height: 40px;
          color: #333435;
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
          > img {
            margin-top: -4px;
          }
        }
        .button-right {
          display: flex;
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
        margin-top: 24px;
      }
    }
  }
`

export const CartStyled = styled.div`
  /* display: flex; */
  margin: 20px 0;
  padding: 30px;
  border: 1px solid #e7ebef;
  box-sizing: border-box;
  border-radius: 24px;
  .avatar {
    width: 210px;
    height: 210px;
    border-radius: 8px;
    margin-right: 40px;
  }
  .description {
    width: 100%;
    margin-top: 0px !important;
    .header-card {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .status {
        display: flex;
        align-items: center;
        border: 1px solid #19a3dd;
        box-sizing: border-box;
        border-radius: 100px;
        padding: 2px 8px;
        color: #19a3dd;
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
      margin-bottom: 12px;
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
    .number {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      cursor: pointer;
      text-decoration: underline;
      background: #35a5fc;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      margin-left: 4px;
      font-weight: 600;
      > img {
        margin-top: -3px;
        margin-left: 5px;
      }
    }
    .content {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #333435;
      margin: 32px 0px 12px 0px;
    }
    .organize {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #333435;
      display: flex;
      align-items: center;
      > .name {
        margin: 0px 6px;
      }
    }
    .group-button {
      display: flex;
      > div {
        margin-right: 10px;
      }
      .btn-qrCode {
        background: #fff;
        border-radius: 100px;
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
  max-width: 900px;
  margin: 0 auto;
`
