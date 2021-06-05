import React, {useEffect, useRef, useState} from 'react'
import Cart from 'components-v2/CardItem'
import { HotArtWorksStyled } from './styled'
import useArtworkServices from '../../../../services/ArtworkServices'; 
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons';
import { useActiveWeb3React } from '../../../../wallet/hooks'

function HotArtWorks() {
  const divRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    divRef.current.scrollLeft += 260;
  };
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260;
  };
  const [NFTs,setNFTs] = useState([])
  const {getNFT} = useArtworkServices()
  const { account } = useActiveWeb3React()
  useEffect(()=>{
    getNFT({}).then(({status, data})=>{
      if(status==200){
        setNFTs(data?.data||[])
      }
    })
  },[])
    return (
        <HotArtWorksStyled>
            <div className="header-artists">
                <div className="title-artists">HOT ARTWORK 🔥</div>
                <div className="more-artists">View more</div>
            </div>
            <RightCircleOutlined className="scroll-left" onClick={scrollLeft} style={{ fontSize: 24 }}/> 
            <LeftCircleOutlined className="scroll-right" onClick={scrollRight} style={{ fontSize: 24 }}/>     
            <div className="content-artwork" ref={divRef}> 
            {
              NFTs.map( item => (
                <Cart width="320px" height="480px" data={item}/>
              ))
            } 
            </div>
        </HotArtWorksStyled>
    )
}

export default HotArtWorks;