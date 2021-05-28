import styled from 'styled-components'

export const StyledCart = styled.div`
  .card-art-work{
  /* margin: 24px 0px; */
    padding: 24px;
    /* width: 248px; */
    /* height: 512px; */
    border: 1px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 24px;
    overflow: hidden;
    box-sizing: border-box;
    /* margin-right: 24px; */
    /* display: flex; */
    :hover{ 
      box-shadow: 1px 4px 8px #ececec;
      -webkit-transition:  box-shadow .3s ease-in;
    }
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
        cursor: pointer;
      }
    }
  .avatar {
    width: auto;
    height: auto;
    border-radius: 8px;
    margin: 14px 0px;
  }
  .name {
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #333435;
    cursor: pointer;
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
      margin-right: 5px;
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
    >img {
      margin-right: 5px;
    }
    &.justify-center {
      display: flex;
      justify-content: center;
    }
  }
}`

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