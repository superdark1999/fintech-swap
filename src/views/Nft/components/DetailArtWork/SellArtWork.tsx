import React, { useEffect, useState } from 'react'
import { Row, Col, Rate, Table, Modal, Input, Form } from 'antd'
import Copy from 'assets/images/copy.svg'
import Facebook from 'assets/images/facebook.svg'
import Telegram from 'assets/images/telegram.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import Checkmark from 'assets/images/checkmark.svg'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'
import { ButtonStyle, ButtonBuyStyle } from 'components-v2/cart/styled'
import { SwapOutlined, CloseOutlined, StarFilled } from '@ant-design/icons'
import {
  DetailStyled,
  ReviewStyled,
  ScrollReview,
  FooterStyled,
  ImageStyled,
  DetailTabpane,
  HeaderStyled,
} from './styled'
import { dataHistory, columnHistory} from './Mock'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useMarketServices,{MARKET_ADDRESS} from 'services/web3Services/MarketServices'; 
import useLuckyServices from 'services/web3Services/LuckyServices'; 
import useUserStore from 'store/userStore'
import { useActiveWeb3React } from 'wallet/hooks'
import { useParams } from 'react-router-dom'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import Hammer from 'assets/images/hammer.svg'
import { Link } from 'react-router-dom'
import {getPrice} from 'utils'
import notification from 'components-v2/Alert'


import _ from 'lodash'
const { TabPane } = Tabs


const DetaiArtWork = ({id}:any) => {
    const { getDetailNFT, buyItem } = useArtworkServices()
    const { account } = useActiveWeb3React()
    const [NFTDetail, setNFTDetail] = useState<any>({})
    const [loading, setLoading] = useState(true)
    const [isSelled, setIsSelled] = useState(false)
    const [price, setPrice] = useState(0)
    const [userState, userActions] = useUserStore()
    const marketServicesMethod = useMarketServices()
    const luckyServiceMethod = useLuckyServices()
    const [isProcessing, setIsProccessing] = useState(false)
    const [isShowModalSetPrice, setIsShowModalSetPrice] = useState(false)
    const { checkApproveLevelAmount } = useLuckyServices()
    useEffect(() => {
        getDetailNFT({ id }).then(({ status, data }) => {
        if (status == 200) {
            if (data?.data?.tokenId && marketServicesMethod) {
              marketServicesMethod?.getTokenPrice(data?.data?.tokenId)
                .then((data:any) => {
                const price = getPrice(data?._hex)
                if (price != -1) {
                    setLoading(false)
                    setPrice(price)
                }
                })
                .catch((err) => {
                  notification('error',{message:'Error',description:err.message})
                })
            }
            setNFTDetail(data?.data)
            setLoading(false)
        }
        })
    }, [])

  const onApproveBuyOnMarket = () => {
    setIsProccessing(true)

    if(luckyServiceMethod){
      luckyServiceMethod?.approveLevelAmount(MARKET_ADDRESS)
      .then(_.debounce(()=>{
        checkApproveLevelAmount(MARKET_ADDRESS)
        .then((dt: any) => {
          const allowance = Number(dt?._hex || 0) > 0
          notification('success',{message:'Success',description:'You can buy this NFT'})
          userActions.updateUserInfo({isCanBuy:allowance})
        })
        .catch((err:string) => {
            notification('error',{message:'Error',description:err})
            userActions.updateUserInfo({isCanBuy:false})
        })
        setIsProccessing(false)
      },25000))
        .catch(()=>{
          setIsProccessing(false)
      }) 
    }
  }

  const onBuyItem = () => {
    if(!marketServicesMethod){
      return 
    }
    if (!account) {
      return notification('error',{message:'Error',description:'Unblock your wallet to buy this item'})
    }
    if(account===NFTDetail.ownerWalletAddress){
      return notification('error',{message:'Error',description:`You can't buy your item`})
    }
    setIsProccessing(true)
    const tokenId = NFTDetail?.tokenId
    marketServicesMethod?.buyToken(tokenId).then((dt) => {
      if (dt?.hash) {
        buyItem({
          id: id,
          walletAddress: account,
        }).then(({ status }) => {
          if (status == 200) {
            setIsSelled(true)
            notification('succes',{message:'Success',description:`We will proccessing this action, you can check this item now on your pending profile`})
            setIsProccessing(false)
          }
        }).catch(()=>{
          notification('error',{message:'Error',description:`Something went wrong please try again`})
          setIsProccessing(false)
        })
      }
    }).catch(()=>{
      notification('error',{message:'Error',description:`Something went wrong please try again`})
      setIsProccessing(false)
    })
  }


  const renderButton = ()=>{
    if(isSelled) return null;
    if(isProcessing){
      return(
          <ButtonBuy> 
            Processing...
          </ButtonBuy>
      )
    }
    if(!account){
      return(
            <ButtonBuy onClick={onBuyItem}>Buy</ButtonBuy>
      )
    }
    if(userState?.isCanBuy){
      return(
          <ButtonBuy onClick={onBuyItem}>Buy</ButtonBuy>
      )
    }
    if(!userState?.isCanBuy){
      return(
          <ButtonBuy onClick={onApproveBuyOnMarket}>
            Allow to buy
          </ButtonBuy>
      )
    }
  }

  return (
    <Row>
      <Col
        className="gutter-row"
        style={{ width: '100%' }}
        xl={{ span: 16 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
      >
         <HeaderStyled className="header-detail">
          <Row align="middle"> 
            <div className="social-icon"><Link to="/"><CloseOutlined className="icon"/></Link></div>
            <div className="date-time">02h 31m 04s left 🔥 </div>
            <div className="rating">
              4.8 
              {' '}
              <StarFilled style={{color: '#fadb14'}} />
              {' '}
              <span style={{ fontWeight: 'normal', fontSize: 12, color: '#AFBAC5'}}>(15)</span>
              {' '}
              <img src={Hammer} alt=""/>
            </div>   
          </Row>
          
          <div className="social-icon">    
            <div className="icon"><img src={Facebook} alt="" /></div> 
            <div className="icon"><img src={Telegram} alt="" /></div> 
            <div className="icon"><img src={Copy} alt="" /></div> 
          </div>
        </HeaderStyled>
        <ImageStyled bgImage={NFTDetail?.contentUrl}>
          <div className="bg-image"></div>
          <img src={NFTDetail?.contentUrl} />
        </ImageStyled>
      </Col>
      <Col
        className="gutter-row"
        // style={{position: 'relative'}}
        xl={{ span: 8 }}
        md={{ span: 24 }}
        sm={{ span: 24 }}
      >
        <DetailStyled>

          <p className="title">{NFTDetail?.title}</p>

          <Row align="middle" justify="space-between">
            <div className="token">
              {price} LUCKY
              <img src={Token} alt="" />
            </div>
            {renderButton()}
          </Row>


          <p className="description">{NFTDetail?.description||''}</p>

          <p className="organize">
            <img src={Luckyswap} />
            <span className="name">LuckySwapStudio</span>
            <img src={Checkmark} />
          </p>

          <Tabs defaultActiveKey="1">
            <TabPane tab="Detail" key="1">
              <DetailTabpane>
                <div className="group-info">
                  <div className="info">
                    <div className="title">NFT Contract ID:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.contractAddress}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Token ID:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.tokenId}
                    </a>
                  </div>
                </div>
                <div className="group-info">
                  <div className="info">
                    <div className="title">Creator's Adress:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.createdBy}
                    </a>
                  </div>
                  <div className="info">
                    <div className="title">Owner Adress:</div>
                    <a className="value" href="/" target="_blank">
                      {NFTDetail && NFTDetail.ownerWalletAddress}
                    </a>
                  </div>
                </div>
              </DetailTabpane>
            </TabPane>

            <TabPane tab="History" key="2">
              <Table
                columns={columnHistory}
                dataSource={dataHistory}
                size="middle"
                scroll={{ x: 'calc(300px + 50%)', y: 700 }}
              />
            </TabPane>
            <TabPane tab="Reviews" key="4">
              <ScrollReview className="list-review">
                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>

                <ReviewStyled>
                  <div className="review-item">
                    <div>
                      <img src={Luckyswap} style={{ marginRight: 5 }} />
                      <span className="name">LuckySwapStudio</span>
                    </div>
                    <Rate style={{ fontSize: 12 }} disabled defaultValue={2} />
                  </div>
                  <div className="comment">This is amazing</div>
                  <div className="time">30 minutes ago</div>
                </ReviewStyled>
              </ScrollReview>
            </TabPane>
          </Tabs>

          <Row
            gutter={24}
            style={{
              position: 'fixed',
              width: '100%',
              bottom: 0,
              left: 0,
              justifyContent: 'flex-end',
              marginLeft: 0,
              marginRight: 0,
              zIndex: 2,
            }}
          >
            <Col
              xl={{ span: 8 }}
              md={{ span: 24 }}
              sm={{ span: 24 }}
              style={{
                position: 'unset',
                width: '100%',
                bottom: 0,
                padding: 0,
              }}
            >
              {/* {renderFooter()} */}
            </Col>
          </Row>
          <Modal 
            title="Set price" 
            visible={isShowModalSetPrice} 
            onCancel={()=>setIsShowModalSetPrice(false)} 
            footer={null}
            width={400}
          >
            <Form onFinish={()=>{}}>
                <Form.Item 
                  name="lucky" 
                  label="Price" 
                  rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Input style={{ borderRadius: '16px', overflow: 'hidden'}} placeholder="Enter price"/>
                </Form.Item>

                <Form.Item>
                  <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <button type="submit">Confirm</button>
                  </div>           
                </Form.Item>
            </Form>
          </Modal>
        </DetailStyled>
      </Col>
    </Row>
  )
}

export default DetaiArtWork
