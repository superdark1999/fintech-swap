import styled from 'styled-components'

export const ConfirmStyled = styled.div<{isGrayFilter:any}>`
  width: 100%;
  max-width: 1100px;
  margin: 40px auto;
  padding: 40px;
  border: 2px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 32px;
  background: #F9FAFB;
  display: flex;
  justify-content: center;
  flex-direction: column;
  filter: ${props=> props.isGrayFilter ? 'grayscale(100%)':''} ;
  .nft-image {
    width: 180px;
    height: 180px;
    border-radius: 24px;
    > img {
      width: 180px;
      height: 180px;
      object-fit: cover;
      border-radius: 24px;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 16px;
    margin: auto;
    width: 440px;
    padding-left: 30px;
    padding-top: 30px;
    margin-bottom: 20px;
    .row-content{
      display: flex;
      margin-top: 8px;
      .label {
        min-width: 140px;
        font-weight: 500;
        font-size: 16px;
      }
    }
  }
`