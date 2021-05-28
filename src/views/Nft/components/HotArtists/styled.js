import styled from 'styled-components'

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
        height:408px;
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
          .image {
            background-color: gray;
            width: 60px; 
            height: 60px;
            border-radius: 4px;
            cursor: pointer;
          }
        }
      }
    }
`