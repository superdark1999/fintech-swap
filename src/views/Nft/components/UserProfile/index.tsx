import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs} from 'antd';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from 'components-v2/cart/styled'
import  Copy from 'assets/images/copy.svg'
import useArtworkServices from '../../../../services/ArtworkServices'; 
import { useActiveWeb3React } from '../../../../wallet/hooks'
import useUserStore from '../../../../store/userStore'
import OnsSaleCard from './OnSaleCard'
import MyCollectionCard from './MyCollectionCard'

import { HeartOutlined } from '@ant-design/icons';
import {useParams} from "react-router-dom";
const { TabPane } = Tabs;


const UserProfile: React.FC = () => {
  const [userState, userActions] = useUserStore()
  const { tab, option } = useParams();
  useEffect(()=>{
    console.log(tab,option)
  },[])
  return (
    <UserProfileStyled>
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
          <Tabs defaultActiveKey={tab} >
            <TabPane tab="On sale" key="onsale"> 
              <TabOnSale />    
            </TabPane>
            <TabPane tab="My Collection" key="mycollection">
              <TabMyCollection/>
            </TabPane>
            <TabPane tab="Settings"></TabPane>
          </Tabs>

          </Col>
      </Row>

    </UserProfileStyled>
  )
}
export default UserProfile

const TabOnSale: React.FC = ()=>{
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

const TabMyCollection: React.FC = ()=>{
  const { option } = useParams();
  const [optionChecked, setOptionChecked] = useState(option)
  const [renderData,setRenderData] = useState([])
  const {getNFT} = useArtworkServices()
  const { account } = useActiveWeb3React()
  useEffect(()=>{
    const query = {
      ownerWalletAddress: account,
      status:'approved'
    }
    getNFT(query).then(({status, data})=>{
      if(status==200){
        setRenderData(data?.data||[])
      }
    })
  },[])

  useEffect(()=>{
    if(optionChecked){
      const query = {
        ownerWalletAddress: account,
        status:optionChecked
      }
      getNFT(query).then(({status, data})=>{
        if(status==200){
          setRenderData(data?.data||[])
        }
      })
    }
  },[optionChecked])

  const onHandleOptionCheck =(option:any)=> ()=>{
    setOptionChecked(option)
  }

  return(
    <>
          <Row align="middle" justify="space-between">
                <GroupButton>
                  <RadioButton width="auto" borderRadius="10px" value="All" onClick={onHandleOptionCheck('all')} checked={optionChecked=='all'}>All </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Approved" onClick={onHandleOptionCheck('approved')}  checked={optionChecked=='approved'} >Approved </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Pending" onClick={onHandleOptionCheck('pending')}  checked={optionChecked=='pending'}>Pending </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Reject" onClick={onHandleOptionCheck('reject')}  checked={optionChecked=='reject'}>Reject</RadioButton>
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
