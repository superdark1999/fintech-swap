import styled from 'styled-components'
export const StatusBarStyled = styled.div`
    width:100%;
    height:100%;
    .status-processing{

      span{
      margin-right: 6px;
      animation: mymove 5s infinite;
      color: #F0B90B;
      font-weight: 600;
      font-size: 16px;
      }
      @keyframes mymove {
        100% {transform: rotate(180deg);}
      }
      img{
        margin-right: 6px;
      }
      color: #F0B90B;
      font-weight: 600;
      font-size: 16px;
      border:none;
      height: 100%;
      font-weight: 600;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      text-transform: capitalize;
    }
    .status-approved{
      span{
      margin-right: 6px;
      color: #84C87E;
      font-weight: 600;
      font-size: 16px;
      }
      img{
        margin-right: 6px;
      }
      color: #84C87E;
      font-weight: 600;
      font-size: 16px;
      border:none;
      height: 100%;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      text-transform: capitalize;
    }
`