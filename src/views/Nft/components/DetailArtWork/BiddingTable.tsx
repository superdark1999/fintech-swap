import React, { useEffect, useState } from 'react'
import Token from 'assets/images/token.svg'
import 'antd/dist/antd.css'

import {
  TableStyled,
} from './styled'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices from 'services/web3Services/MarketServices'
import useLuckyServices from 'services/web3Services/LuckyServices'
import useUserStore from 'store/userStore'
import { useActiveWeb3React } from 'wallet/hooks'
import { useParams } from 'react-router-dom'
import { ButtonCancel, ButtonTrade } from 'components-v2/Button'
import { getPrice, getCompactString,  } from 'utils'
import formatNumber from 'utils/formatNumber'
import _ from 'lodash'
import { useHistory } from 'react-router-dom'
import ButtonProccesing from 'components-v2/Button/btnProcessing'

const BiddingTable = ({
  NFTInfo,
  bids,
  refreshingAfterCancelBid,
  onSetProccessing,
}: any) => {
  const { account } = useActiveWeb3React()
  const [isProcessing, setIsProccessing] = useState(false)
  const { buyItem } = useArtworkServices()
  const marketServicesMethod = useMarketServices()
  const history = useHistory()

  const onCancelBidToken = (record: any) => () => {
    console.log(record)
    setIsProccessing(true)
    if (marketServicesMethod) {
      marketServicesMethod?.cancelBidToken(NFTInfo?.tokenId)
        .then(() => {
          onSetProccessing(true)
          _.debounce(() => {
            refreshingAfterCancelBid && refreshingAfterCancelBid()
          }, 30000)()
        })
        .catch((err) => {
          console.log(err)
          setIsProccessing(false)
        })
    }
  }
  const confirmSellToken = (record: any) => () => {
    if (!account) {
      return alert('Unblock your wallet to confirm this item')
    }
    if (isProcessing) return
    setIsProccessing(true)
    const tokenId = NFTInfo?.tokenId
    if (tokenId && record?.address) {
      marketServicesMethod
        ?.sellTokenToBidUser(tokenId, record?.address)
        .then((dt) => {
          if (dt?.hash) {
            buyItem({
              id: NFTInfo?._id,
              walletAddress: record?.address,
            })
              .then(({ status }) => {
                if (status == 200) {
                  history.push('/my-profile/mycollection/checkingReadyToBuy')
                }
              })
              .catch(() => {
                setIsProccessing(false)
              })
          }
        })
        .catch(() => {
          setIsProccessing(false)
        })
    }
  }
  const columnBidding =
    NFTInfo?.ownerWalletAddress === account
      ? [
          {
            title: 'Address',
            dataIndex: 'address',
            width: 100,
            render: (address: string) => (
              <a
                className="value"
                href={
                  window.location.origin +
                  `/user-profile/${address}/onstore/readyToSell`
                }
                target="_blank"
              >
                {getCompactString(address, 6)}
              </a>
            ),
          },
          {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
            render: (price: Number) => (
              <div className="token">
                {formatNumber(price)}
                <img src={Token} alt="" />
              </div>
            ),
          },
          {
            title: 'Action',
            dataIndex: 'action',
            render: (_: any, record: any) => {
              if (isProcessing) {
                return <ButtonProccesing />
              }
              return (
                <ButtonTrade onClick={confirmSellToken(record)}>
                  {'Confirm'}
                </ButtonTrade>
              )
            },
            width: 100,
          },
        ]
      : [
          {
            title: 'Address',
            dataIndex: 'address',
            width: 100,
            render: (address: string) => (
              <a
                className="value"
                href={
                  window.location.origin +
                  `/user-profile/${address}/onstore/readyToSell`
                }
                target="_blank"
              >
                {getCompactString(address, 6)}
              </a>
            ),
          },
          {
            title: 'Price',
            dataIndex: 'price',
            width: 100,
            render: (price: Number) => (
              <div className="token">
                {formatNumber(price)}
                <img src={Token} alt="" />
              </div>
            ),
          },
        ]
  return (
    <TableStyled
      columns={columnBidding}
      dataSource={bids}
      size="middle"
      scroll={{ x: 300, y: 300 }}
    />
  )
}

export default BiddingTable