import React, { useEffect, useRef, useState } from 'react'
import Cart from 'components-v2/CardItem'
import { HotArtWorksStyled } from './styled'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import {Card} from 'antd'

function HotArtWorks() {
  const divRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const scrollLeft = () => {
    divRef.current.scrollLeft += 260
  }
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260
  }
  const [NFTs, setNFTs] = useState([])
  const { getNFT } = useArtworkServices()
  useEffect(() => {
    getNFT({
      status: 'readyToSell',
    }).then(({ status, data }) => {
      if (status == 200) {
        setNFTs(data?.data || [])
        setLoading(false)
      }
    }).catch((err)=>{
      setLoading(false)
    })
  }, [])
  return (
    <HotArtWorksStyled>
      <div className="header-artists">
        <div className="title-artists">HOT ARTWORK</div>
        <div className="more-artists">View more</div>
      </div>
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
      <div className="content-artwork" ref={divRef}>
       {loading?
        [1,2].map(item=>
        <Card 
          style={{ 
            width: 300,height: 450, 
            margin: '0 8px',
            borderRadius:'8px',
            border:'1px solid rgba(0,0,0,.05)' 
          }} 
          loading={true}>
        </Card>)
        :
        NFTs.map((item) => (
          <Cart width="320px" height="480px" data={item} />
        ))
        }
      </div>
    </HotArtWorksStyled>
  )
}

export default HotArtWorks
