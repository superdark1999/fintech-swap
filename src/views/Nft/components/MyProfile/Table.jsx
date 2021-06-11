import React from 'react'
import { Table } from 'antd'
import { ButtonTrade } from "components-v2/Button";
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
export const columnBidding = [
  {
    title: 'Address',
    dataIndex: 'address',
    width: 100,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 100,
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: (record) => <ButtonTrade>Widthdraw</ButtonTrade>,
    width: 100,
  },
  {
    title: 'Note',
    dataIndex: 'note',
    width: 100,
  },
]
export const dataBidding = [
  {
    address: 505, price: 505, note:"NFT was sold"
  },
  {
    address: 505, price: 505, note:"NFT was sold"
  }
]
export default () => {
  return (
    <div>
      <Table
        columns={columnBidding}
        dataSource={dataBidding}
        size="middle"
      />
      <Table
        columns={columnHistory}
        dataSource={dataHistory}
        size="middle"
      />
    </div>
  )
}
