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
import { margin } from 'polished';
import _ from 'lodash'
import userStore from '../../../../store/userStore';
const { TabPane } = Tabs;


const UserProfile: React.FC = () => {
  const [userState, userActions] = useUserStore()
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
          <Tabs defaultActiveKey="1" >
            <TabPane tab="On sale" key="1"> 
              <TabOnSale/>    
            </TabPane>
            <TabPane tab="My Collection" key="2">
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

  return(
    <>
          <Row align="middle" justify="space-between">
                {/* <GroupButton>
                  <RadioButton width="auto" borderRadius="10px" value="All">All  </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Pending" disabled>Game </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Approved">Art </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Cancelled" disabled>Music </RadioButton>
                </GroupButton>  */}
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
