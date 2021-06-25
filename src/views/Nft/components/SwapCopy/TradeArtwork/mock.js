import React from 'react'
import { Image, Row } from 'antd'
import TextGradient from 'components-v2/ID'
import Token from 'assets/images/token.svg'

export const column = [
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Buyer',
    dataIndex: 'buyer',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (record) => {
     return (
      <div>
        <Row>
          <TextGradient width="auto" fontSize="14px">100K LUCKY</TextGradient>
          {' '}<img src={Token} />
        </Row>
        <Image style={{width: 80, height: 80, borderRadius: '8px' }}  src="https://cdnb.artstation.com/p/assets/images/images/038/322/775/large/pengcheng-yang-souskehb2.jpg?1622761089" />
        <div style={{fontWeight: 600}}>Txn Hash</div>
      </div>
     )
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Note',
    dataIndex: 'note',
  },
];

export const data = [
  {
    author: "LuckySwapStudio", buyer: "LuckySwapStudio", price: { price: 100, img: ""}, status: 'On sale', date: '15/05/2021', note: "ABC"
  },
  {
    author: "LuckySwapStudio", buyer: "LuckySwapStudio", price: { price: 100, img: ""}, status: 'On sale', date: '15/05/2021', note: "ABC"
  },
  {
    author: "LuckySwapStudio", buyer: "LuckySwapStudio", price: { price: 100, img: ""}, status: 'On sale', date: '15/05/2021', note: "ABC"
  },
  {
    author: "LuckySwapStudio", buyer: "LuckySwapStudio", price: { price: 100, img: ""}, status: 'On sale', date: '15/05/2021', note: "ABC"
  },
];