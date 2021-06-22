import React from 'react'
import { ButtonProccesing } from './index'
import { SyncOutlined } from '@ant-design/icons'
function btnProcessing(props: any) {
  const { label } = props
  return (
    <ButtonProccesing {...props} height="40px">
      {label ? label : 'Processing'} <SyncOutlined />
    </ButtonProccesing>
  )
}

export default btnProcessing
