import React, { useEffect, useState } from 'react'
import { UserProfileStyled, CartStyled, ListCart } from './styled'
import Checkmark from 'assets/images/checkmark.svg'
import Crown from 'assets/images/crown.svg'
import { Row, Col, Tabs} from 'antd';
import { RadioButton, GroupButton } from 'components-v2/RadioGroup'
import Loadmore from 'components-v2/Loadmore'
import { ButtonTrade, ButtonBuy } from 'components-v2/Button'
import SearchInput from 'components-v2/SearchInput'
import { ButtonStyle } from '../utilComponent/cart/styled'
import  Copy from 'assets/images/copy.svg'
import Token from 'assets/images/token.svg'
import Luckyswap from 'assets/images/luckyswap.svg'
import QRCode from 'assets/images/qr-code.svg'
import useArtworkServices from '../../../../services/ArtworkServices'; 
import useNFTServices from '../../../../services/NFTServices'; 
import { useActiveWeb3React } from '../../../../wallet/hooks'
import OnsSaleCard from './OnSaleCard'
import MyCollectionCard from './MyCollectionCard'

import { HeartOutlined } from '@ant-design/icons';
import { margin } from 'polished';
import _ from 'lodash'
const { TabPane } = Tabs;


const UserProfile: React.FC = () => {
  return (
    <UserProfileStyled>
      <Row className="section header-profile">
          <Col className="header-profile-col" xxl={{ span: 24}}  xl={{ span: 20}} md={{ span: 20 }} xs={{span: 20}}>
             <img className="avatar" src="https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915"/>
          </Col>
      </Row>
      <Row className="section content-profile">
          <Col className="content" xxl={{ span: 24}}  xl={{ span: 20}} md={{ span: 20 }} xs={{span: 20}}>
            <div className="info-detail">
              <div>
                <div className="name">
                  <span>gerbilpetroleum</span>
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
                gerbilpetroleum is an award winning illustrator with over 25 years experience in the industry. His eclectic art style is influenced by comic books, fantasy art, cartoons, film and all things pop culture.
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
      <Row align="middle" justify="space-between">     
        <GroupButton>
          <RadioButton width="auto" borderRadius="10px" value="All">All </RadioButton>
          <RadioButton width="auto" borderRadius="10px" value="Pending" disabled>Pending</RadioButton>
          <RadioButton width="auto" borderRadius="10px" value="Approved" >Approved</RadioButton>
          <RadioButton width="auto" borderRadius="10px" value="Cancelled" disabled>Cancelled</RadioButton>
        </GroupButton>
        <SearchInput maxWidth="300px" placeholder="Search items"/>
      </Row> 
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
      ownerWalletAddress: account
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
                <GroupButton>
                  <RadioButton width="auto" borderRadius="10px" value="All">All  </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Pending" disabled>Game </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Approved">Art </RadioButton>
                  <RadioButton width="auto" borderRadius="10px" value="Cancelled" disabled>Music </RadioButton>
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
