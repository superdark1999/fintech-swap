import React from 'react'
import { TableStyled } from '../MarketOffer/styled'
import TextGradient from 'components-v2/ID'
import { getCompactString } from 'utils'
import {Row, Image } from 'antd'
import Token from 'assets/images/token.svg'
import formatNumber from 'utils/formatNumber'
import { ButtonBuy } from 'components-v2/Button'
//import { API_DASHBOARD } from '../../../../../constants'
const OfferTable = ({ offerData, isRenderAction, chooseOffer, state, renderButon }: any) => {
    //console.log(offerData)
    const column = [
      {
        title: 'Buyer',
        render: (record: any) => {
          return (
            <div>
              {record?.ownerWalletAddress > 0 && (
              <a href={`/user-profile/${record?.ownerWalletAddress}/onstore/readyToSell`} target="_blank">
                <TextGradient width="auto" fontSize="14px">{getCompactString(record?.ownerWalletAddress, 6)} </TextGradient>
              </a>
              )}
            </div>
          )
        }
      },
      {
        title: 'Id Product',
        render: (record: any) => {
          return (
            <div>
              <a href={`/artwork/detail/buy/${record?._id}`} target="_blank">
                <TextGradient width="auto" fontSize="14px">{getCompactString(record?.ownerWalletAddress, 6)} </TextGradient>
              </a>
            </div>
          )
        }
      },
      {
        title: 'Item',
        render: (record: any) => {
          return (
            <div>
              {record?.price > 0 && (<Row>
                <TextGradient width="auto" fontSize="14px">{formatNumber(record?.price)} </TextGradient>
                {' '}<img src={Token} />
              </Row>)}
             { record?.type!='video'?
             <Image style={{ width: 80, height: 80, borderRadius: '8px' }} src={record?.contentUrl} />:
              <video
              className="nft-image"
              width='80px'
              height='80px'
              style={{objectFit:'cover'}}
              playsInline
              controls
              muted
              src={`${record?.contentUrl}`}
              data-srcset={record?.contentUrl}
              data-src={`${record?.contentUrl}#t=0.1`}
              loop
            />}
            </div>
          )
        }
      },
      {
        title: 'Price',
        dataIndex: 'price',
      },
      {
        title: 'Created By',
        render: (record: any) => {
          return (
            <div>
              <a href={`/user-profile/${record?.createdBy?.walletAddress}/onstore/readyToSell`} target="_blank">
                <TextGradient width="auto" fontSize="14px">{record?.createdBy?.name} </TextGradient>
              </a>
            </div>
          )
        }
      },
      {
        title: 'Note',
        dataIndex: 'note',
      },
      {
        title: 'Action',
        render: (record: any) => {
          return (<>
            {isRenderAction ? (renderButon ? 
               renderButon(record)
            : <ButtonBuy onClick={() => { chooseOffer(record) }}>View</ButtonBuy>) : null}
          </>)
        }
      },
    ];
    return (
      <TableStyled
        columns={column}
        dataSource={offerData}
        size="middle"
        scroll={{ x: 300 }}
        style={{ width: '1100px', margin: 'auto' }}
        state={state}
      />
    )
  }
export default OfferTable