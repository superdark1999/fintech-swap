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
const A = styled.a`
  display: flex
`
const SPAN = styled.span`
  margin: auto 0;
  margin-left: 10px
`

export const columnHistory = [
  {
    title: 'Event',
    dataIndex: 'event',
    width: 200,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 100,
  },
  {
    title: 'From',
    dataIndex: 'from',
    width: 200,
    render: (from) =>  
    <A href={window.location.origin+`/user-profile/${from[0]}/onstore/readyToSell`} target="_blank">
      <IMG src={from[1]} >  
      </IMG>
      <SPAN>{from[2]}</SPAN>
    </A>
    
  },
  {
    title: 'To',
    dataIndex: 'to',
    width: 200,
    render: (to) => 
    <A href={window.location.origin+`/user-profile/${to[0]}/onstore/readyToSell`} target="_blank">
      <IMG src={to[1]} >  
      </IMG>
      <SPAN>{to[2]}</SPAN>
    </A>
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 150
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