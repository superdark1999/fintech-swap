import styled from 'styled-components'
import { isMobile } from 'react-device-detect'
interface Props {
  readMore?: boolean
}

export const CartStyled = styled.div<Props>`
    
    .box-flex{
        display: ${isMobile ? 'block' : 'flex'};;
        margin-bottom: ${isMobile ? '0' : '10px'};
    }
    
    .name {
      font-weight: bold;
      font-size: 28px;
      line-height: 40px;
      color: #333435;
      opacity: 0.9;
    }
    .intro{
      display: ${isMobile ? 'block' : 'flex'}
        
    }
    
    .des{
        margin-left: 0,
        font-weight: 600,
        margin-bottom: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        width: ${isMobile ? ' 100% ' :(props) =>!!props.readMore ? 'nowrap' : 'unset' };
        white-space: ${isMobile ? 'unset' : (props) =>!!props.readMore ? 'nowrap' : 'unset'};
    }
    .readMore{
        display: ${isMobile ? 'none' :(props) => 
        !!props.readMore ? 'block' : 'none'};
        color: #1890ff;
        cursor: pointer;
    }
    .number {
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
      text-decoration: underline;
      background: #333435;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 16px;
      margin-left: 4px;
      font-weight: 600;
      > img {
        margin-top: -3px;
        margin-left: 5px;
        width: 20px;
      }
    }
    .type{
      margin-left: 4px;
      color: #333435;
     
    }
    .tokenId{
      margin-left: 4px;
      color: #333435;
    }
    .date{
      margin-left: 4px;
      color: #333435;
    }
    .tags{
      list-style: none;
      padding-left: 10px;
      margin-bottom: 0;
      .item{
        display: inline-block;
      }
      .item + .item::before {
        display: inline-block;
        white-space: pre;
        content: ", ";
      }
      li{
        float: left;
        a{
          font-size: 16px;
          text-decoration: none;
          border-radius: 25px;
         
        }
      }
    }
    .title-card{
      display: block;
      
    }
    .content {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #333435;
      margin: 12px 0px 0px 0px;
    }
    .organize {
      font-weight: 600;
      line-height: 20px;
      color: #333435;
      display: flex;
      align-items: center;
      > .name {
        margin: 0px 6px;
        font-size: 16px;
      }
    }
`
