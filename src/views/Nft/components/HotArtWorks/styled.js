import styled from 'styled-components'

export const HotArtWorksStyled = styled.div`
    .header-artists{
        height:48px;
        width:100%;
        display:flex;    
        align-items: center;
        .title-artists{
            font-weight: bold;
            flex:1;
            font-size: 32px;
        }    
        .more-artists{
            font-weight: 700;
            font-size: 20px;
            width: 108px;
            text-decoration: underline;
            cursor: pointer;
        }
    }
    .content-artwork{
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      display: flex;
      ::-webkit-scrollbar {
        display: none;
      }
      .card-art-work{
          margin-top: 24px;
          padding: 24px;
          width: 248px;
          height: 512px;
          border: 1px solid #E7EBEF;
          box-sizing: border-box;
          border-radius: 24px;
          margin-right: 20px;
        .header-card-art-work {
          display: flex;
          justify-content: space-between;
          .date-time {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: #FC636B;
            border: 2px solid #FC636B;
            border-radius: 30px;
            padding-left: 10px;
            padding-right: 10px;
            width: max-content;
            height: 24px;
          }
          >img {
            width: 36px;
            height: 36px;
            margin-top: -6px;
          }
        }
        .avatar {
          width: 200px;
          height: 200px;
          border-radius: 8px;
          margin: 14px 0px;
        }
        .name {
          font-weight: 600;
          font-size: 16px;
          line-height: 24px;
          color: #333435;
        }
        .title {
          font-size: 14px;
          line-height: 20px;
          color: #333435;
          opacity: 0.75;
        }
        .number {
          color: linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
          font-weight: 600;
          font-size: 14px;
          line-height: 20px;
          margin: 3px 0px;
          >img {
            margin-top: -3px;
          }
        }
        .rating {
          font-size: 12px;
          color: #AFBAC5;
          .ant-rate {
            font-size: 12px;
          }
        }
        .or-text {
          margin-top: 8px;
          text-align: center;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #AFBAC5;
        }
        .action-button {
          display: flex;
          justify-content: space-between;
          margin-top: 8px;
          &.justify-center {
            display: flex;
            justify-content: center;
          }
        }
      }
`