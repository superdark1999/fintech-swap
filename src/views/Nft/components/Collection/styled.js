import styled from 'styled-components'

export const CollectionStyled = styled.div`
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
    .content-artists{
      width: 100%;
      max-width: calc(100% - 40px);
      overflow-x: auto;
      display: flex;
      ::-webkit-scrollbar {
        display: none;
      }
      .card-artists{
        margin-top:24px;
        min-width:248px;
        height:408px;
        border: 1px solid #E7EBEF;
        box-sizing: border-box;
        border-radius: 24px;
        margin-right: 20px;
        padding: 24px;
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
          }
        }
      }
    }

`