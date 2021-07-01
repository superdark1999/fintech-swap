import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import Gold from 'assets/ranking/gold.svg'
import { Row, Col, Tabs, Modal, Input, Form, Button } from 'antd'
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from 'components-v2/cart/styled'
import Copy from 'assets/images/copy.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import { useActiveWeb3React } from 'wallet/hooks'
import useUserStore from 'store/userStore'
import OnsSaleCard from './OnSaleCard'
import MyCollectionCard from './MyCollectionCard'
import TabSetting from './TabSetting'
import TableHistory from './Table'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'

import { HeartOutlined, CheckOutlined } from '@ant-design/icons'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { getCompactString } from 'utils'
import { isMobile } from 'react-device-detect'
import GetTypeSocial from 'components-v2/GetTypeSocial'
import { isEmpty } from 'lodash'
const { TabPane } = Tabs
export default () => {
  const [userState] = useUserStore()
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  const history = useHistory()
  const match = useRouteMatch()

  const onChangeTab = (e) => {
    if (e === 'onstore') {
      history.push(`/my-profile/onstore/all`)
    } else if (e === 'mycollection') {
      history.push(`/my-profile/mycollection/all`)
    } else if (e === 'settings') {
      history.push(`/my-profile/settings/#`)
    } else if (e === 'history') {
      history.push(`/my-profile/history/#`)
    }
  }
  console.log('userState: ', userState)
  return (
    <UserProfileStyled urlCover={userState?.coverImage}>
      <Row className="section header-profile">
        <Col
          className="header-profile-col"
          xxl={{ span: 24 }}
          xl={{ span: 20 }}
          md={{ span: 20 }}
          xs={{ span: 20 }}
        >
          <img className="avatar" src={userState?.avatarImage} />
        </Col>
      </Row>
      <Row className="section content-profile">
        <Col
          className="content"
          xxl={{ span: 24 }}
          xl={{ span: 20 }}
          md={{ span: 22 }}
          xs={{ span: 22 }}
        >
          <div className="info-detail">
            <div>
              <div className="name">
                <span className="wallet-address">
                  {userState?.name ||
                    getCompactString(userState?.walletAddress, 6)}
                </span>
                {/* <img src={Checkmark} /> */}
              </div>
              <div className="rank">
                <img src={Gold} /> GOLD ARTIST
              </div>
            </div>
            <div className="button-right">
              <a
                target="_blank"
                href={`https://bscscan.com/address/${userState?.walletAddress}`}
                title={userState?.walletAddress}
              >
                {isMobile
                  ? getCompactString(userState?.walletAddress, 6)
                  : getCompactString(userState?.walletAddress, 10)}
              </a>
              <ButtonStyle className="btn-donate">
                <HeartOutlined />
                Donate
              </ButtonStyle>
              <div
                className="copy"
                onClick={() =>
                  handleCopy(
                    `${window.location.origin}/user-profile/${userState?.walletAddress}/onstore/readyToSell`,
                  )
                }
              >
                {isCopied ? (
                  <span>
                    <CheckOutlined />
                  </span>
                ) : (
                  <>
                    <img src={Copy} alt="copy-artwork" />
                  </>
                )}
              </div>
            </div>
          </div>
          <p className="description">{userState?.biography}</p>
          <div className="description">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span>Social media/Portfolio link:</span>
              <GetTypeSocial
                string="website"
                url={`${window.location.origin}/user-profile/${userState?.walletAddress}/onstore/readyToSell`}
              />
              {!isEmpty(userState?.socialMediaLink) && (
                <GetTypeSocial
                  string={userState?.socialMediaLink}
                  url={userState?.socialMediaLink}
                />
              )}
            </div>
          </div>
          <Tabs
            className="tabs-profile"
            activeKey={match.params.tab}
            onChange={onChangeTab}
          >
            <TabPane tab="On Store" key="onstore">
              <TabOnSale />
            </TabPane>
            <TabPane tab="My Collection" key="mycollection">
              <TabMyCollection />
            </TabPane>
            <TabPane tab="Ranking" key="ranking">
              <TabMyCollection />
            </TabPane>
            <TabPane tab="History" key="history">
              <TableHistory />
            </TabPane>
            <TabPane tab="Settings" key="settings">
              <TabSetting userState={userState} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </UserProfileStyled>
  )
}

const TabOnSale = () => {
  const [loading, setLoading] = useState(true)
  const [NFTs, setNFTs] = useState([])
  const { getNFT } = useArtworkServices()
  const { account } = useActiveWeb3React()
  const { tab } = useParams()
  useEffect(() => {
    if (tab == 'onstore') {
      const query = {
        status: 'readyToSell',
        NFTType: ['buy', 'auction', 'swap-store'],
        ownerWalletAddress: account,
      }
      getNFT(query).then(({ status, data }) => {
        if (status == 200) {
          setNFTs(data?.data || [])
        }
      })
    }
  }, [tab])
  return (
    <>
      {/* <Row align="middle" justify="space-between">     
        <GroupButton>
          <RadioButton width="auto" borderRadius="10px" value="All">All </RadioButton>
          <RadioButton width="auto" borderRadius="10px" value="Pending" disabled>Pending</RadioButton>
          <RadioButton width="auto" borderRadius="10px" value="Approved" >Approved</RadioButton>
          <RadioButton width="auto" borderRadius="10px" value="Cancelled" disabled>Cancelled</RadioButton>
        </GroupButton>
        <SearchInput maxWidth="300px" placeholder="Search items"/>
      </Row>  */}
      <ListCart className="list-artwork">
        {NFTs.map((item) => {
          return <OnsSaleCard key={item?._id} data={item} />
        })}
      </ListCart>
      {/* <Loadmore/>  */}
    </>
  )
}

const TabMyCollection = () => {
  const { option } = useParams()
  const formRef = useRef(null)
  const [optionChecked, setOptionChecked] = useState(option)

  const [renderData, setRenderData] = useState([])
  const { getNFT } = useArtworkServices()
  const { account } = useActiveWeb3React()

  useEffect(() => {
    if (optionChecked) {
      const query = {
        ownerWalletAddress: account,
        status: optionChecked,
      }
      if (optionChecked === 'all') {
        delete query.status
      }
      if (optionChecked === 'pending') {
        query.status = [
          'pending',
          'checkingReadyToSell',
          'checkingBuying',
          'checkingCancelling',
        ]
      }
      getNFT(query).then(({ status, data }) => {
        if (status == 200) {
          setRenderData(data?.data || [])
        }
      })
    }
  }, [optionChecked])

  const onHandleOptionCheck = (e) => {
    setOptionChecked(e.target.value)
  }

  return (
    <>
      <Row align="middle" justify="space-between">
        <GroupButton defaultValue={option}>
          <RadioButton
            width="auto"
            className="btn-filter"
            borderRadius="10px"
            value="all"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'all'}
          >
            All{' '}
          </RadioButton>
          <RadioButton
            width="auto"
            className="btn-filter"
            borderRadius="10px"
            value="approved"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'approved'}
          >
            Approved{' '}
          </RadioButton>
          <RadioButton
            width="auto"
            className="btn-filter"
            borderRadius="10px"
            value="pending"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'pending'}
          >
            Pending{' '}
          </RadioButton>
          <RadioButton
            width="auto"
            className="btn-filter"
            borderRadius="10px"
            value="reject"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'reject'}
          >
            Reject
          </RadioButton>
        </GroupButton>
        <SearchInput maxWidth="300px" placeholder="Search items" />
      </Row>
      <ListCart className="list-artwork">
        {renderData.map((item) => {
          return (
            <MyCollectionCard
              key={item?._id}
              data={item}
              option={optionChecked}
            />
          )
        })}
      </ListCart>
      {/* <Loadmore/>  */}
    </>
  )
}
