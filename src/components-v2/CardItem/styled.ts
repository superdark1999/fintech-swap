import styled from 'styled-components'

interface PropsStyled {
  width?: string;
  height?: string;
  src?: string
}

export const StyledCart = styled.div<PropsStyled>`
  padding: 12px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .card-art-work{
    /* width: ${props => props.width || '300px'};
    height: ${props => props.height || '530px'}; */
    /* border: 1px solid #E7EBEF; */
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 8px;
    /* :hover{ 
      box-shadow: 1px 4px 8px #ececec;
      -webkit-transition:  box-shadow .3s ease-in;
    } */
    
    .wrapper-image{
      width: ${props => props.width || '300px'};
      height: ${props => props.height || '450px'};
      border: 1px solid #E7EBEF;
      box-sizing: border-box;
      overflow: hidden;
      border-radius: 8px;
      position: relative;
      .gradient-background {
        z-index: 1;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(181.09deg, rgba(0, 0, 0, 0) 57.15%, #000000 110.73%);
        display: none;
        :hover {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .title {
          padding: 20px;
          font-weight: 600;
          font-size: 20px;
          
        }
      }
      .ff-responsive {
        width:300px !important;
        height:450px !important;
      }
      .header-card-art-work {
        display: flex;
        justify-content: space-between;
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        z-index: 1;
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
        }
        >img {
          width: 36px;
          height: 36px;
          margin-top: -6px;
          cursor: pointer;
          }
        }
      /* padding-top: 100%; */
      /* background-image: ${props => `url(${props.src})`};
      background-size: contain;
      background-repeat: no-repeat;
      [data-animation] {
      animation: var(--animn, none) var(--animdur, 0s) var(--animtf, linear) var(--animdel, 0s) var(--animic, infinite) var(--animdir, alternate) var(--animfm, none) var(--animps, running);
       }  */
       .avatar {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        object-fit: cover;
      }
      :hover {
        .gradient-background {
          z-index: 1;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          background: linear-gradient(181.09deg, rgba(0, 0, 0, 0) 57.15%, #000000 110.73%);
          display: none;     
          display: flex;
          flex-direction: column;
          justify-content: flex-end;   
          .title {
            padding: 20px;
            font-weight: 600;
            font-size: 20px;
            color: #ffffff;
          }
        }
      }
      
    }
  
    /* .name {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      color: #333435;
      cursor: pointer;
    } */

    .wrapper-info{
      margin-top: 12px;
      color: #333435;
      .title {
        display: flex;
        justify-content: space-between;
        .name-artist {
          font-size: 14px;
          line-height: 20px;
          color: #333435;
          opacity: 0.75;
          font-weight: 600;
        }
        .copy {
          font-size: 12px;
          img {
            width: 18px;
            height: 18px;
          }
        }     
      }
      .number {
        color: linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
        margin: 3px 0px;
        display: flex;
        justify-content: space-between;
        img {
          margin-top: -3px;
          margin-right: 5px;
          width: 18px;
        }
      }
    }
  }

`

export const ButtonStyle = styled.div`
  background: linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  cursor: pointer;
  >img, span {
    margin-right: 5px;
  }
`;

export const ButtonBuyStyle = styled.div`
  background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  cursor: pointer;
  ::before {
    content:"";
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius:50px; 
    padding: 2px; 
    background:linear-gradient(270deg, #19A3DD -16.5%, #BADEB7 117.25%);
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out; 
    mask-composite: exclude; 
  }
`;