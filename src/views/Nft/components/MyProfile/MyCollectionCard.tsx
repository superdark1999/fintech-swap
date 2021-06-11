import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs, Modal, Input, Form, Button, Radio} from 'antd';

import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices from 'services/web3Services/MarketServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { useHistory } from "react-router-dom";
import { useActiveWeb3React } from '../../../../wallet/hooks'
import OnsSaleCard from './OnSaleCard'
import _ from 'lodash'

const options = [
  {
    label: "a",
    value: "a",
  },
  {
    label: "b",
    value: "b",
  }
]

export default function MyCollectionCard({ data }: any) {
  const [isNFTCanSell, setIsNFTCanSell] = useState(false)
  const [isProcessing, setIsPrcessing] = useState(true)
  const { isTokenReadyToSell, approveTokenToMarket } =useNFTServices()
  const {setTokenPrice,} = useMarketServices()
  const { updateNFTInfo, setPrice } = useArtworkServices()
  const history = useHistory();

  const formRef = useRef()

  const [lucky, setLucky] = useState()
  const [isShowModalSetPrice, setShowModalsetPrice] = useState(false)

  useEffect(() => {
    if (data?.tokenId) {
      isTokenReadyToSell(data?.tokenId)
        .then((data) => {
          setIsNFTCanSell(data)
        })
        .catch((err) => console.log(err))

      setIsPrcessing(false)
    }
  }, [data?.tokenId])

  const showModalSetProcePrice = () => {
    setShowModalsetPrice(true)
  }

  const onSellItem = (value: any) => {
    console.log('value: ', value)
    setIsPrcessing(true)
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    setTokenPrice(tokenId, value.lucky)
      .then((dt) => {
        if (dt?.hash) {
          setPrice({ id: data?.id }).then(({ status }) => {
            if (status == 200) {
              console.log('runnnnn')
              history.push('/my-profile/mycollection/checkingToSell')
            }else{
              alert('Something when wrong, please try again later.')
              setIsPrcessing(false)
            }
          })
        }
      }).catch((err) => {
        alert('Something when wrong, please try again later.')
        setIsPrcessing(false)
      })
      setShowModalsetPrice(false)
  }

  const onAllowSellItem = () => {
    const tokenId = data?.tokenId
    setIsPrcessing(true)
    approveTokenToMarket(tokenId)
      .then((dt) => {
        setTimeout(async () => {
          if (dt.hash) {
            const tempIsNFTCanSell = await isTokenReadyToSell(tokenId)
            setIsNFTCanSell(tempIsNFTCanSell)
            setIsPrcessing(false)
          }
        }, 20000)
      })
      .catch((err) => {
        alert('Something wrong, please try again later.')
        setIsPrcessing(false)
      })
  }
  const renderGroupAction = (status: any) => {
    if (status === 'approved') {
      return (
        <div className="group-button">
          <ButtonTrade height="45px">Send</ButtonTrade>
          {isProcessing ? (
            <ButtonBuy height="45px">Processing...</ButtonBuy>
          ) : isNFTCanSell ? (
            <ButtonBuy height="45px" onClick={showModalSetProcePrice}>
              {'Sell'}
            </ButtonBuy>
          ) : (
            <ButtonBuy height="45px" onClick={onAllowSellItem}>
              {'Allow to Sell'}
            </ButtonBuy>
          )}
          {/* <ButtonBuy height="45px">Auction</ButtonBuy>
              <ButtonBuy height="45px">Swap</ButtonBuy>
              <ButtonBuy height="45px">Public swap</ButtonBuy> */}
          <ButtonBuy borderRadius="100px" width="40px" height="45px">
            <img src={QRCode} />
          </ButtonBuy>
        </div>
      )
    } else if (status === 'pending') {
      return (
        <div className="group-button">
          <ButtonBuy height="45px">Processing...</ButtonBuy>
          <ButtonBuy borderRadius="100px" width="40px" height="45px">
            <img src={QRCode} />
          </ButtonBuy>
        </div>
      )
    } else if (status === 'reject') {
      return null
    }
  }

  return (
    <CartStyled>
      <Row gutter={24}>
        <Col
          xl={{ span: 8 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 8 }}
        >
          {
          data.type==='video' ?          
          <video width="100%" controls>
            <source
              src={data?.contentUrl}
              type="video/mp4"
            />
            Your browser does not support HTML5 video.
          </video>
          :
          <img className="avatar" src={data?.contentUrl} />        
          }
        </Col>
        <Col
          className="description space-vehicle"
          xl={{ span: 16 }}
          md={{ span: 24 }}
          xs={{ span: 24 }}
          xxl={{ span: 16 }}
        >
          <div>
            <div className="name">{data?.title}</div>
            {data?.TXHash && (
              <div style={{ display: 'flex', marginBottom: 10 }}>
                <div style={{ color: '#AFBAC5', fontWeight: 600 }}>
                  TXHash:{' '}
                </div>
                <div className="number">{data?.TXHash?.slice(1, 20)}...</div>
              </div>
            )}
          </div>
          <div>{renderGroupAction(data?.status)}</div>
        </Col>
      </Row>

      <Modal 
        title="Set price" 
        visible={isShowModalSetPrice} 
        onCancel={()=>setShowModalsetPrice(false)} 
        footer={null}
        width={400}
      >
        <Form ref={formRef} onFinish={onSellItem}>
            <Form.Item label="Type" name="type" >
              <Radio.Group
                options={options}
              />
            </Form.Item>
            <Form.Item 
              name="lucky" 
              label="Price" 
              rules={[{ required: true, message: 'This Field is required!' }]}
            >
                <Input style={{ borderRadius: '16px', overflow: 'hidden'}} placeholder="Enter price"/>
            </Form.Item>

            <Form.Item>
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <ButtonTrade htmlType="submit">Submit</ButtonTrade>
              </div>           
            </Form.Item>
        </Form>
      </Modal>
    </CartStyled>
  )
}