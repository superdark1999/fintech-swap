import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import Gold from 'assets/ranking/gold.svg'
import { Row, Col, Tabs } from 'antd'
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from 'components-v2/cart/styled'
import Copy from 'assets/images/copy.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import { useActiveWeb3React } from 'wallet/hooks'
import OnsSaleCard from './OnSaleCard'
import MyCollectionCard from './MyCollectionCard'
import useArtworkService from 'services/axiosServices/UserServices'
import { HeartOutlined, CheckOutlined } from '@ant-design/icons'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import useUserStore from 'store/userStore'
import { getCompactString } from 'utils'
import { isMobile } from 'react-device-detect'
import GetTypeSocial from 'components-v2/GetTypeSocial'
import { isEmpty } from 'lodash'
const { TabPane } = Tabs

const UserProfile = () => {
  const [user, setUser] = useState()
  const [userState] = useUserStore()

  const match = useRouteMatch()
  const { getUserDetail } = useArtworkService()
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  useEffect(() => {
    if (match.params?.id === userState.walletAddress) {
      history.push(`/my-profile/${match.params?.id}/onstore/readyToSell`)
    } else {
      getUserDetail(match.params?.id).then(({ data, status }) => {
        if (status === 200) {
          setUser(data)
        }
      })
    }
  }, [])

  const history = useHistory()
  const onChangeTab = (e) => {
    if (e === 'onstore') {
      history.push(`/user-profile/${match.params?.id}/onstore/readyToSell`)
    } else if (e === 'collection') {
      history.push(`/user-profile/${match.params?.id}/collection/all`)
    }
  }
  return (
    <UserProfileStyled urlCover={user?.coverImage}>
      <Row className="section header-profile">
        <Col
          className="header-profile-col"
          xxl={{ span: 24 }}
          xl={{ span: 20 }}
          md={{ span: 20 }}
          xs={{ span: 20 }}
        >
          <img className="avatar" src={user?.avatarImage} />
        </Col>
      </Row>
      <Row className="section content-profile">
        <Col
          className="content"
          xxl={{ span: 24 }}
          xl={{ span: 20 }}
          md={{ span: 20 }}
          xs={{ span: 20 }}
        >
          <div className="info-detail">
            <div>
              <div className="name">
                <span>
                  {user?.name
                    ? user?.name
                    : getCompactString(user?.walletAddress, 6)}
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
                    `${window.location.origin}/user-profile/${user?.walletAddress}/onstore/readyToSell`,
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
          <p className="description">{user?.biography}</p>
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
          <Tabs defaultActiveKey={match?.params?.tab} onChange={onChangeTab}>
            <TabPane tab="On store" key="onstore">
              <TabOnSale userAddress={match.params?.id} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </UserProfileStyled>
  )
}
export default UserProfile

const TabOnSale = ({ userAddress }) => {
  const [NFTs, setNFTs] = useState([])
  const { getNFT } = useArtworkServices()
  useEffect(() => {
    const query = {
      status: 'readyToSell',
      NFTType: ['buy', 'auction', 'swap-store'],
      ownerWalletAddress: userAddress,
    }
    getNFT(query).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [userAddress])
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
  // const { option } = useParams()
  const [optionChecked, setOptionChecked] = useState(option)
  const [renderData, setRenderData] = useState([])
  const { getNFT } = useArtworkServices()
  const { account } = useActiveWeb3React()
  const match = useRouteMatch()
  const { option= "" } = match?.params
  // useEffect(()=>{
  //   const query = {
  //     ownerWalletAddress: account,
  //     status:'approved'
  //   }
  //   getNFT(query).then(({status, data})=>{
  //     if(status==200){
  //       setRenderData(data?.data||[])
  //     }
  //   })
  // },[])

  useEffect(() => {
    if (optionChecked) {
      const query = {
        ownerWalletAddress: account,
        status: optionChecked,
      }
      if (optionChecked === 'all') {
        delete query.status
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
            borderRadius="10px"
            value="all"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'all'}
          >
            All{' '}
          </RadioButton>
          <RadioButton
            width="auto"
            borderRadius="10px"
            value="approved"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'approved'}
          >
            Approved{' '}
          </RadioButton>
          <RadioButton
            width="auto"
            borderRadius="10px"
            value="checkingReadyToSell"
            onChange={onHandleOptionCheck}
            checked={optionChecked == 'checkingReadyToSell'}
          >
            Pending{' '}
          </RadioButton>
          <RadioButton
            width="auto"
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
          return <MyCollectionCard key={item?._id} data={item} />
        })}
      </ListCart>
      {/* <Loadmore/>  */}
    </>
  )
}
