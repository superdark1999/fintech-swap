import React, { useEffect, useState, useRef, useMemo } from 'react'
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
import Earn from './Earn'
import useCopyToClipboard from 'components-v2/CopyToClipBoard/index'
import { HeartOutlined, CheckOutlined } from '@ant-design/icons'
import { useParams, useHistory, useRouteMatch } from 'react-router-dom'
import { getCompactString } from 'utils'
import { isMobile } from 'react-device-detect'
import GetTypeSocial from 'components-v2/GetTypeSocial'
import _, { isEmpty } from 'lodash'
import useMarketServices from 'services/web3Services/MarketServices'
import Filter from '../Filter'
import ProgressBar from 'components-v2/ProgressBar'



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
    } else if (e === 'earn') {
      history.push(`/my-profile/earn/#`)
    }
  }
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
            activeKey={match?.params?.tab}
            onChange={onChangeTab}
          >
            <TabPane tab="On Store" key="onstore">
              <TabOnSale />
            </TabPane>
            <TabPane tab="My Collection" key="mycollection">
              <TabMyCollection />
            </TabPane>
            <TabPane tab="Earn" key="earn">
              <Earn />
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
  const [NFTs, setNFTs] = useState([])
  const { getNFT } = useArtworkServices()
  const { account } = useActiveWeb3React()
  // const { tab } = useParams()
  const match = useRouteMatch()
  
  let paramsSearch = useMemo(
    () => new URLSearchParams(window.document.location.search.substring(1)),
    [],
  )

  const [searchParams, setSearchParams] = useState(paramsSearch.get('search'))
  //const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectDatePrice, setSelectDatePrice] = useState('desc')
  const [typeSort, setTypeSort] = useState('desc')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (match?.params?.tab == 'onstore') {
  
      const params = _.pickBy(
        {
          status: 'readyToSell',
          NFTType: ['buy', 'auction', 'swap-store'],
          ownerWalletAddress: account,type: filterType === 'all' ? '' : filterType,
          title: '' || searchParams?.toLowerCase(),
          sort: typeSort,
          sortBy:
            selectDatePrice === 'asc' || selectDatePrice === 'desc'
              ? 'createdAt'
              : 'price',
        },
        _.identity,
      )

      setLoading(Math.random() * (80 - 40 + 1) + 40)
      getNFT(params).then(({ status, data }) => {
        if (status == 200) {
          setLoading(100)
          setNFTs(data?.data || [])
        }
      })
    }
  }, [match?.params?.tab, filterType, searchParams, typeSort])

  const handleInputOnchange = (e) => {
    const { value } = e.target
    setSearchParams(value) 
  }
  
  return (
    <>
      <Row align="middle" justify="end">
        <Filter
        styleFilter={'onstore'}
        selectType={filterType}
        setSelectType={setFilterType}
        handleInputOnchange={handleInputOnchange}
        // setPage={setPage}
        searchParams={searchParams}
        setSelectSort={setTypeSort}
        sort={typeSort}
        selectDatePrice={selectDatePrice} 
        setSelectDatePrice={setSelectDatePrice}
        
      />
      <ProgressBar loading={loading} setLoading={setLoading} />

      </Row>
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
  // console.log('option: ', option)
  //const formRef = useRef(null)
  const match = useRouteMatch()
  const [optionChecked, setOptionChecked] = useState(match?.params?.option || '')

  const [loading, setLoading] = useState(true)
  const [renderData, setRenderData] = useState([])
  const { getNFT } = useArtworkServices()
  const { account } = useActiveWeb3React()
  const [offerList, setOfferList] = useState([])
  const [refresh, setRefresh] = useState(false)

  let paramsSearch = useMemo(
    () => new URLSearchParams(window.document.location.search.substring(1)),
    [],
  )

  const [searchParams, setSearchParams] = useState(paramsSearch.get('search'))
  //const [filterMethod, setFilterMethod] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [selectDatePrice, setSelectDatePrice] = useState('desc')
  const [typeSort, setTypeSort] = useState('desc')

  const marketServicesMethod = useMarketServices()

  useEffect(()=>{
    if(marketServicesMethod&&account){
      marketServicesMethod.getOffersByWalletAddress(account).then((data)=>{
        const tempOfferList = data.map(item=>{
          return {tokenId:Number(item?.[0]),offerFor:Number(item?.[1])}
        })
        setOfferList(tempOfferList)
      })
    }
  },[account,!!marketServicesMethod])

  useEffect(() => {
    if (optionChecked) {
      const query = {
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
      const params = _.pickBy(
        {
          ownerWalletAddress: account,
          status: query.status,
          // NFTType: filterMethod ? filterMethod : ['auction', 'swap-store', 'buy'],
          type: filterType === 'all' ? '' : filterType,
          title: '' || searchParams?.toLowerCase(),
          sort: typeSort,
          sortBy:
            selectDatePrice === 'asc' || selectDatePrice === 'desc'
              ? 'createdAt'
              : 'price',
        },
        _.identity,
      )

      setLoading(Math.random() * (80 - 40 + 1) + 40)
      getNFT(params).then(({ status, data }) => {
        if (status == 200) {
          setLoading(100)
          setRenderData(data?.data || [])
        }
      })
    }
  }, [optionChecked, filterType, searchParams, typeSort, refresh])

  const onHandleOptionCheck = (e) => {
    setOptionChecked(e.target.value)
  }

  const mergerData =
    renderData?.map?.((item) => {
      const tData =
        _.find(offerList, (it) => it.tokenId == item.tokenId) || null
      if (tData) {
        return { ...item, ...tData }
      }
      return item
    }) || []
  

  const handleInputOnchange = (e) => {
    const { value } = e.target
    setSearchParams(value) 
  }

  return (
    <>
      <Row align="middle" justify="space-between">
        <GroupButton style={{justifyContent:"space-around"}} defaultValue={match?.params?.option}>
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
        {/* <SearchInput maxWidth="300px" placeholder="Search items" /> */}
        <Filter
        styleFilter={'collection'}
        selectType={filterType}
        setSelectType={setFilterType}
        handleInputOnchange={handleInputOnchange}
        // setPage={setPage}
        searchParams={searchParams}
        setSelectSort={setTypeSort}
        sort={typeSort}
        selectDatePrice={selectDatePrice} 
        setSelectDatePrice={setSelectDatePrice}
        
      />
      <ProgressBar loading={loading} setLoading={setLoading} />

      </Row>
      <ListCart className="list-artwork">
        {mergerData.map((item) => {
          return (
            <MyCollectionCard
              key={item?._id}
              data={item}
              option={optionChecked}
              reloadList={setRefresh}
            />
          )
        })}
      </ListCart>
      {/* <Loadmore/>  */}
    </>
  )
}
