import { Drawer } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'
import { RightOutlined } from '@ant-design/icons'
import DetailNotificationMobile from './DetailNotificationMobile'
import { isMobile } from 'react-device-detect'

interface NotifyProps {
  setShowNotification?: (value: boolean) => void
  showNofitication?: boolean
  onChangePrice?: (value: any) => void
  price?: any
}

const NotificationMobile = (props: NotifyProps) => {
  const { showNofitication, setShowNotification } = props
  const [showDetailNofitication, setShowDetailNotification] = useState(false)
  
  return (
    <DrawerStyled
      placement="right"
      closable
      onClose={() => setShowNotification(false)}
      visible={showNofitication}
      width={isMobile ? '100%' : '400px'}
      title={(
        <div className="title-notification">
          <div className="title">Notifications</div>
        </div>)}
    >
      <div className="body-notification">
        <div className="counter">
          <div>58</div>
          <div className="title">pending notifications</div>
          <div className="clear-all">Clear All</div>
          <div className="view-all">View All <RightOutlined/></div>
        </div>
        {[1,2,3,4,8,9,10,11,12,13,14,15].map(noti => {
          return (
            <div className="group" onClick={() => setShowDetailNotification(true)}>
              <div className="label-notify-item">
                Learn how to be a responsible trader and win limited edication NFTs!
              </div>
              <div className="content-notify-item">
                You sent Today at 8:42 PM
                Learn how to be a responsible trader and win limited edition NFTs!
                
                Best submissions stand a chance to win limited edition NFTs!
                <div>2021-07-17 06:35:00</div>
                <div className="more" >More Details ↓</div>
              </div>
            </div>
          )
        })}
      </div>
      <DetailNotificationMobile  showDetailNofitication={showDetailNofitication} setShowDetailNotification={setShowDetailNotification}/>
      
    </DrawerStyled>
  )
}

export default NotificationMobile


const DrawerStyled = styled(Drawer)`
  .title-notification {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    > .title {
      font-size: 24px;
      font-weight: 500;
     
    }
  }
  .body-notification {
    position: relative;
    .counter {
      padding: 10px;
      display: flex;
      justify-content: space-between;
      background-color: #ffffff;
      margin-bottom: 16px;
      border-radius: 8px;
      position: sticky;
      top: -24px;
      left: -24px;
      right: -24px;
      font-size: 12px;
      z-index: 1;
      box-shadow: rgb(0 0 0 / 12%) 0px 4px 12px -4px;
      
      .title {
        color: #B7BDC6;
      }
      .clear-all {
        color: #ff7875;
        cursor: pointer;
      }
      .view-all {
        color: #40a9ff;
        font-weight: 500;
        cursor: pointer;
      }
    }
    .group {
      cursor: pointer;
      margin-bottom: 16px;
      box-shadow: rgb(0 0 0 / 12%) 0px 4px 12px -4px;
      border-radius: 8px;
      padding: 10px;
      :hover {
        transform: rotate(2deg);
      }
      .label-notify-item {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .content-notify-item {
        color: #B7BDC6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        vertical-align: 2;
      }
    }
  }
`
