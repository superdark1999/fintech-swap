import styled from 'styled-components'
import CoverDefault from 'assets/images/cover-default.svg'
export const UserProfileStyled = styled.div`
  .section {
      width: 100%;
      justify-content: center;
    &.header-profile {  
      height: 160px;     
      position: relative;
      justify-content: center;
      background: url(${CoverDefault});
      background-repeat: no-repeat;
      background-size: cover;
      .header-profile-col{     
        max-width: 1320px;
        > .avatar {
        width: 140px;
        height: 140px;
        top: 85px;
        border: 5px solid #FFFFFF;
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
        img {
          margin-left: 5px;
        }
        .rank {
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          color: #FAE54A;
          display: flex;
          > img {
            margin-top: -4px;
          }
        }
        .button-right{
          display: flex;
          .btn-donate {
            width: 125px;
            height: 40px;
            >span {
              margin-right: 5px;
            }
          }
          img {
            width: 40px;
            height: 40px;
            border: 1px solid #E7EBEF;
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
  
`;

export const CartStyled = styled.div`
  /* display: flex; */
  margin: 20px 0;
  padding: 32px;
  border: 1px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 24px;
  
  .avatar {
    width: 300px;
    height: 300px;
    border-radius: 8px;
    margin-right: 40px;
  }
  .description{
    width: 100%;
    margin-top: 0px !important;
    .header-card{
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      .status {
        display: flex;
        align-items: center;
        border: 1px solid #19A3DD;
        box-sizing: border-box;
        border-radius: 100px;
        padding: 2px 8px;
        color:  #19A3DD;
      }
      .cancel {
        width: 98px;
        height: 40px;
        background: #FC636B;
        border-radius: 100px;
        padding: 2px 8px;
        color:  #FFF;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 8px 20px;
        cursor: pointer;
        :hover {
          opacity: 0.6
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
    .number {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      background: linear-gradient(270deg,#19A3DD -16.5%,#BADEB7 117.25%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      font-weight: 600;
      >img {
        margin-top: -3px;
        margin-left: 5px;
      }
    }
    .content{
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
      >.name {
        margin: 0px 6px;
      }
    }
    .group-button {
      display: flex;
      > div {
        margin-right: 10px;
      }
    }
    &.space-vehicle{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

`;


export const  ListCart = styled.div`
 max-width: 1100px;
 margin: 0 auto;
`