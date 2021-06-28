import React, {useState, useEffect} from 'react'
import { Table } from 'antd'
import { ButtonTrade } from "components-v2/Button";
import useMarketServices from 'services/web3Services/MarketServices'
import { useActiveWeb3React } from 'wallet/hooks'
import {getPrice} from 'utils'
import formatNumber from 'utils/formatNumber'
import _ from 'lodash'
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

export default () => {
  const {getBidsByUser, cancelBidToken} = useMarketServices()
  const {account} = useActiveWeb3React()
  const [isProccessing, setIsProcessing] = useState(false)
  const [bids, setBids] = useState([])
  useEffect(()=>{
    getBidsByUser(account).then(data=>{
      setBids(
      data.map((item:any)=>{
        return{
          key:Number(item[0]._hex),
          tokenId:Number(item[0]._hex),
          price:formatNumber(getPrice(item[1]._hex)) 
        }
      }))
    })
  },[])
  const onWidthdraw = (record:any) => ()=>{
    setIsProcessing(true)
    cancelBidToken(record?.tokenId).then(_.debounce(()=>{
      getBidsByUser(account).then(data=>{
        setBids(
        data.map((item:any)=>{
          return{
            key:Number(item[0]._hex),
            tokenId:Number(item[0]._hex),
            price:formatNumber(getPrice(item[1]._hex)) 
          }
        }))
        setIsProcessing(false)
      })
    },20000))
    .catch(()=>{
      setIsProcessing(false)
    })
  }
  const columnBidding = [
    {
      title: 'TokenId',
      dataIndex: 'tokenId',
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
      render: (_:any,record:any) => <ButtonTrade onClick={onWidthdraw(record)}>{!isProccessing?'Widthdraw':'Proccessing...'}</ButtonTrade>,
      width: 100,
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: 100,
    },
  ]
  return (
    <div>
      <Table
        columns={columnBidding}
        dataSource={bids}
        size="middle"
      />
      {/* <Table
        columns={columnHistory}
        dataSource={dataHistory}
        size="middle"
      /> */}
    </div>
  )
}
