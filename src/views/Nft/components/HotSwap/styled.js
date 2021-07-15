import styled from 'styled-components'
import { isMobile } from 'react-device-detect'

export const HotArtWorksStyled = styled.div`
  position: relative;
  .header-artists {
    height: 48px;
    width: 100%;
    display: flex;
    align-items: center;
    .title-artists {
      font-weight: bold;
      flex: 1;
      font-size: ${isMobile ? '20px' : '32px'};
    }
    .more-artists {
      font-weight: ${isMobile ? '500' : '700'};
      font-size: ${isMobile ? '16px' : '20px'};
      text-align: ${isMobile && 'right'};
      width: 120px;
      text-decoration: underline;
      cursor: pointer;
    }
  }
  .more-artists {
    font-weight: 700;
    font-size: 20px;
    width: 120px;
    text-decoration: underline;
    cursor: pointer;
  }
  .scroll-left {
    font-size: 36px;
    position: absolute;
    right: -14px;
    top: 50%;
    color: #e7ebef;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff;
    z-index: 1;
  }
  .scroll-right {
    font-size: 36px;
    position: absolute;
    left: -14px;
    top: 50%;
    color: #e7ebef;
    border-radius: 50%;
    overflow: hidden;
    background: #ffffff;
    z-index: 1;
  }
  .content-artwork {
    padding: 24px 0px;
    width: 100%;
    max-width: 100%;
    overflow-x: auto;
    display: flex;
    .card-art-work {
      margin-right: 24px;
    }
    /* display: grid;
      grid-gap: 24px;
      grid-template-columns: repeat(100000,248px);
      grid-template-rows: minmax(248px,1fr); */
    ::-webkit-scrollbar {
      display: none;
    }
    scroll-behavior: smooth;
  }
`
