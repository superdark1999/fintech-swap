import { Drawer } from 'antd'
import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { LeftOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'

interface NotifyProps {
  setShowDetailNotification?: (value: boolean) => void
  showDetailNofitication?: boolean

}

const DetailNotificationMobile = (props: NotifyProps) => {
  const { showDetailNofitication, setShowDetailNotification } = props
  
  return (
    <DrawerStyled
      placement="right"
      closable={false}
      onClose={() => setShowDetailNotification(false)}
      visible={showDetailNofitication}
      width={isMobile ? '100%' : '400px'}
      title={(
        <div className="title-notification">
          <LeftOutlined onClick={() => setShowDetailNotification(false)}/>
          <div className="title">Detail notification</div>
        </div>)}
    >
      <div className="body-notification">
        
      </div>
      
    </DrawerStyled>
  )
}

export default DetailNotificationMobile


const DrawerStyled = styled(Drawer)`
  .title-notification {
    display: flex;
    align-items: flex-start;
    .anticon {
      font-size: 16px;
      margin-top:3px;
    }
    > .title {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      margin-left: 20px;
    }
  }
  .body-notification {
    
  }
`
