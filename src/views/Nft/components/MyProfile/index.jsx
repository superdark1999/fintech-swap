import React, { useEffect, useState, useRef } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs} from 'antd';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from 'components-v2/cart/styled'
import  Copy from 'assets/images/copy.svg'
import useArtworkServices from 'services/axiosServices/ArtworkServices'; 
import { useActiveWeb3React } from 'wallet/hooks'
import useUserStore from 'store/userStore'
import OnsSaleCard from './OnSaleCard'
import MyCollectionCard from './MyCollectionCard'
import TabSetting from './TabSetting'
import TableHistory from './TableHistory'

import { HeartOutlined } from '@ant-design/icons';
import {useParams,useHistory} from "react-router-dom";
const { TabPane } = Tabs;


export default () => {
  const [userState, userActions] = useUserStore()
  // console.log('userState: ', userState)

  const history = useHistory();
  const { tab, option } = useParams();
  const onChangeTab = (e)=>{
    if(e==='onsale'){
      history.push(`/my-profile/onsale/readyToSell`)
    }else if(e=='mycollection'){
      history.push(`/my-profile/mycollection/all`)
    }
    // else if(e=='setting'){
    //   history.push(`/user-profile/setting`)
    // }
  }
  return (
    <UserProfileStyled urlCover={userState?.coverImage}>
      <Row className="section header-profile">
          <Col className="header-profile-col" xxl={{ span: 24}}  xl={{ span: 20}} md={{ span: 20 }} xs={{span: 20}}>
             <img className="avatar" src={userState?.avatarImage}/>
          </Col>
      </Row>
      <Row className="section content-profile">
          <Col className="content" xxl={{ span: 24}}  xl={{ span: 20}} md={{ span: 20 }} xs={{span: 20}}>
            <div className="info-detail">
              <div>
                <div className="name">
                  <span>{userState?.name}</span>
                  <img src={Checkmark} />
                </div>
                <div className="rank">
                  <img src={Crown} /> {" "}
                  GOLD ARTIST
                </div>
              </div> 
              <div className="button-right">
                <ButtonStyle  className="btn-donate">
                  <HeartOutlined />
                  Donate
                </ButtonStyle>
                <img src={Copy} alt=""/>
              </div> 
            </div>
            <p className="description">
                {userState?.biography}
            </p>  
          <Tabs defaultActiveKey={tab} onChange={onChangeTab}>
            <TabPane tab="On sale" key="onsale"> 
              <TabOnSale />    
            </TabPane>
            <TabPane tab="My Collection" key="mycollection">
              <TabMyCollection/>
            </TabPane>
            <TabPane tab="Settings" key="setting">
              <TabSetting userState={userState}/>
            </TabPane>
          </Tabs>

          </Col>
      </Row>

    </UserProfileStyled>
  )
}

const TabOnSale = ()=>{
  const [loading, setLoading] = useState(true)
  const [NFTs,setNFTs] = useState([])
  const {getNFT} = useArtworkServices()
  const { account } = useActiveWeb3React()
  useEffect(()=>{
    const query = {
      status:'readyToSell',
      ownerWalletAddress: account
    }
    getNFT(query).then(({status, data})=>{
      if(status==200){
        setNFTs(data?.data||[])
      }
    })
  },[])
  return(
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
            {NFTs.map(item=>{
                  return(
                    <OnsSaleCard key={item?.id} data={item}/>
                  )
            })}
        </ListCart> 
      {/* <Loadmore/>  */}
    </>
  )
}

const TabMyCollection= ()=>{
  const { option } = useParams();
  const formRef = useRef(null)
  const [optionChecked, setOptionChecked] = useState(option)
  const [renderData,setRenderData] = useState([])
  const {getNFT} = useArtworkServices()
  const { account } = useActiveWeb3React()
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

  useEffect(()=>{
    console.log(optionChecked)
    if(optionChecked){
      const query = {
        ownerWalletAddress: account,
        status:optionChecked
      }
      if(optionChecked==='all'){
        delete query.status
      }
      getNFT(query).then(({status, data})=>{
        if(status==200){
          setRenderData(data?.data||[])
        }
      })
    }
  },[optionChecked])

  const onHandleOptionCheck = (e)=>{
    setOptionChecked(e.target.value)
  }

  return(
    <>
          <Row align="middle" justify="space-between">
                <GroupButton defaultValue={option}>
                  <RadioButton width="auto" borderRadius="10px" value="all"  onChange={onHandleOptionCheck} checked={optionChecked=='all'}>All </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="approved" onChange={onHandleOptionCheck}  checked={optionChecked=='approved'} >Approved </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="pending" onChange={onHandleOptionCheck}  checked={optionChecked=='pending'}>Pending </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="reject" onChange={onHandleOptionCheck}  checked={optionChecked=='reject'}>Reject</RadioButton>
                </GroupButton> 
                <SearchInput maxWidth="300px" placeholder="Search items"/>
              </Row>
              <ListCart className="list-artwork">
                {renderData.map(item=>{
                  return(
                    <MyCollectionCard key={item?.id} data={item}/>
                  )
                })}
              </ListCart> 
              {/* <Loadmore/>  */}
    </>
  )
}
