import { Row, Col, Input, Select } from 'antd'
import React, { useRef, useState, useEffect} from 'react'
import { TradeArtWorkStyled, CardStyled, WrapperListCard, ListCard, StyledDefaultCart } from './styled'
import TextGradient from 'components-v2/ID'
import Token from 'assets/images/token.svg'
import Plus from 'assets/images/plus.svg'
import Swap from 'assets/images/swap.svg'
import { ButtonBuy, ButtonTrade } from 'components-v2/Button'
import { isMobile } from 'react-device-detect'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import Card from './Card'
import ModalSelectSwap from 'components-v2/ModalSelectSwap'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import Nfts from 'wallet/state/config/constants/nfts'

const DefaultCard = (props: any) => {
  return (
    <StyledDefaultCart onClick={() => props.setVisible({isOpen: true, value: props.value})}>
      <img src={Plus} style={{margin: 'auto 40px'}}/> 
    </StyledDefaultCart>
  )
}


const Trade: React.FC = () => {
  return (
    <Row justify="space-around">
      <img src={Plus} style={{margin: 'auto 40px'}}/>
      <CardStyled >
        <div className="name">Your offer</div>
        <Input className="input" placeholder='Enter price' bordered/>
        <Row>
          <TextGradient id={true} width="auto">100K LUCKY</TextGradient>
          {' '}<img src={Token} />
        </Row>
      </CardStyled>
      <img src={Swap} style={isMobile ? {transform: 'rotate(90deg)', margin: 'auto 40px'} : null}/>
    </Row>
  )
}

const OptionData = [
  {
   label: 'Lucky',
   value: 'Lucky',
  }
]
const { Option } = Select;

const SwapArtWork = (props: any) => {
  const [select, setSelect] = React.useState<string | null>('Lucky');
  const divRef = useRef(null)
  const [visible, setVisible] = useState<any>({isOpen: false, value: "my-item"});

  const [myItems, setMyItems] = useState<any>([]);

  const [itemSwap, setItemSwap] = useState<any>([]);



  const [NFTs, setNFTs] = useState([]);
  const { getNFT } = useArtworkServices()
  
  useEffect(() => {
    getNFT({
      status: 'readyToSell',
    }).then(({ status, data } : any) => {
      if (status === 200) {
        setNFTs(data?.data || [])
      }
    })
  }, [])

  const scrollLeft = () => {
    divRef.current.scrollLeft += 260
  }
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260
  }

  const getItemSelected = (data?: any) => {
    if (visible.value === 'my-item') {
      setMyItems(data)
    } else setItemSwap(data)
  }

  const renderListCard = () => {
    if (myItems.length > 3) {
      return (
        <WrapperListCard>
          <ListCard ref={divRef} numOfItem={myItems.length}>
            {
              myItems.map((card:any) => {
                return (
                  <Card key={card.id} data={card}  className="card-item" />
                )
              })
            }
          </ListCard>
          <RightCircleOutlined
            className="scroll-left"
            onClick={scrollLeft}
            style={{ fontSize: 24 }}
          />
          <LeftCircleOutlined
            className="scroll-right"
            onClick={scrollRight}
            style={{ fontSize: 24 }}
          />
        </WrapperListCard>
      )
    } else if (myItems.length === 2 || myItems.length === 3) {
      return (
        <ListCard ref={divRef} numOfItem={myItems.length}>
          {
              myItems.map((card:any) => {
                return (
                  <Card key={card.id} data={card}  className="card-item" />
                )
              })
            }
        </ListCard>
      )
    } else if (myItems.length === 1) return <Card  data={myItems[0]}  className="card-item" />
    else return <DefaultCard setVisible={setVisible} value='my-item'/>
  }

  return (
    <TradeArtWorkStyled>
      <Select className="select" style={{ width: 120, borderRadius: 30, textAlign: 'center' }} onChange={setSelect} defaultValue={select}>
        {OptionData.map((item, i) => (
            <Option  key={i} value={item.value}>{item.label} <img src={Token}/></Option>
        ))}
      </Select>
      <Row align="middle" style={{marginTop: 30}}>
        <Col xl={{ span: 8}} md={{ span:  24}} xs={{span: 24}}>
          {renderListCard()}
          { myItems.length > 0 && <Row justify="center"><ButtonBuy onClick={() => setVisible({isOpen: true, value: 'my-item'})}>Edit</ButtonBuy></Row> }
        </Col>
        <Col xl={{ span: 10}} md={{ span:  24}} xs={{span: 24}}>
          <Trade/>
        </Col>
        <Col xl={{ span: 6}} md={{ span:  24}} xs={{span: 24}}>
        {itemSwap[0] ? <Card data={itemSwap[0]}/> : <DefaultCard setVisible={setVisible} value='item-swap'/>}
        {itemSwap[0] && <Row justify="center"><ButtonBuy onClick={() => setVisible({isOpen: true, value: 'item-swap'})}>Edit</ButtonBuy></Row>       }
        </Col>
      </Row>
      <Row className="footer">
        <Col xl={{ span: 16}} md={{ span:  24}} xs={{span: 24}}>
          <Input.TextArea style={{borderRadius: '16px', resize: 'none'}} placeholder="Note for author" maxLength={1000}/>  
        </Col>     
        <Col xl={{ span: 5}} md={{ span:  8}} xs={{span: 24}}>
          <ButtonTrade width="100%">
            Offer now
          </ButtonTrade>
        </Col>
      </Row>
      <ModalSelectSwap 
        visible={visible} 
        setVisible={setVisible} 
        data={visible.value === 'my-item' ? NFTs : []} 
        getItemSelected={getItemSelected} 
        multiSelect={visible.value === 'my-item'}/>
    </TradeArtWorkStyled>

  )
}

export default SwapArtWork