import styled from 'styled-components'

export const HotArtWorksStyled = styled.div`
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
    .more-artists{
      font-weight: 700;
      font-size: 20px;
      width: 108px;
      text-decoration: underline;
      cursor: pointer;
      }
    .scroll-left {
      position: absolute;
      right: -12px;
      top: 50%;
      color: #E7EBEF;
      border-radius: 50%;
      overflow: hidden;
      background: #ffffff;
      z-index: 1;
    }
    .content-artwork{
      padding: 24px 0px;
      width: 100%;
      max-width: 100%;
      overflow-x: auto;
      display: flex;
      display: grid;
      grid-gap: 50px;
      grid-template-columns: repeat(100000,248px);
      grid-template-rows: minmax(150px,1fr);
      ::-webkit-scrollbar {
        display: none;
      }
      scroll-behavior: smooth;
    }
`