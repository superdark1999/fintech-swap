import React from 'react'
import {ButtonProccesing} from './index'
import { SyncOutlined} from '@ant-design/icons';
function btnProcessing(props:any) {
    return (
        <ButtonProccesing height="40px">
            Processing <SyncOutlined />
        </ButtonProccesing>
    )
}

export default btnProcessing
