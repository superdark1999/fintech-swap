import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import useMarketServices from 'services/web3Services/MarketServices'
import { useActiveWeb3React } from 'wallet/hooks'

export const columnHistory = [
  {
    title: 'Event',
    dataIndex: 'event',
    width: 100,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 100,
  },
  {
    title: 'From',
    dataIndex: 'from',
  },
  {
    title: 'To',
    dataIndex: 'to',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
];

export const dataHistory = [
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  },
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  },
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  },
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  },
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  },
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  }
];

export default function TableHistory(){
  const {getBidsByUser} = useMarketServices()
  const {account} = useActiveWeb3React()
  const [bids, setBids] = useState([])
  useEffect(()=>{
    getBidsByUser(account).then(data=>{
      console.log(data)
    })
  },[])
  return (
    <div>
      <Table
        columns={columnHistory}
        dataSource={dataHistory}
        size="middle"
      />
    </div>
  )
}
