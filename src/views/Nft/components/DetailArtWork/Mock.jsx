import { ButtonTrade } from "components-v2/Button";
import React from 'react'
import styled from 'styled-components'

const ID = styled.div`
  text-align: right;
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
`
const IMG = styled.img`
  width: 35px;
  border-radius: 50%;
`

export const columnHistory = [
  {
    title: 'Event',
    dataIndex: 'event',
    width: 150,
  },
  {
    title: 'From',
    dataIndex: 'from',
    render: (from) =>  
    <a href={`https://mkp.luckyswap.center/user-profile/${from[0]}/onstore/readyToSell`} target="_blank">
      <IMG src={from[1]} >  
      </IMG>
    </a>
  },
  {
    title: 'To',
    dataIndex: 'to',
    render: (to) => 
    <a href={`https://mkp.luckyswap.center/user-profile/${to[0]}/onstore/readyToSell`} target="_blank">
      <IMG src={to[1]} >  
      </IMG>
    </a>
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
  },
  {
    event: "Bid", price: 505, from: '0x2433bE070fAeE3F9608154', to: '0x2433bE070fAeE3F9608154', date: '4 weeks ago'
  }
];

export const dataBidding = [
  {
    address: "Bid", price: 505
  },
  {
    address: "Bid", price: 505
  }
]

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
    render: (record) => <ButtonTrade>Confirm</ButtonTrade>,
    width: 100,
  }
]