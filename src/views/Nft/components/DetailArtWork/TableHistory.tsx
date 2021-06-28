import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'
import { TableStyled } from './styled'
import { columnHistory } from './Mock'
import { useHookDetail } from './Store'
const { TabPane } = Tabs
const TableHistory = ({ tokenId }: any) => {
  const [stateDetail, actionsDetail] = useHookDetail()
  // call history transaction by tokenID
  useEffect(() => {
    if (tokenId) {
      actionsDetail.getHistorys(tokenId)
    }
  }, [tokenId])
  return (
    <TableStyled
      columns={columnHistory}
      dataSource={stateDetail.historys}
      size="middle"
      scroll={{ x: 'calc(300px + 50%)', y: 500 }}
    />
  )
}

export default TableHistory
