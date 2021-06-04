import React, {useEffect, useRef, useState} from 'react'
import Cart from '../utilComponent/cart/'
import { HotArtWorksStyled } from './styled'
import useArtworkServices from '../../../../services/ArtworkServices'; 
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
const data = [
  "https://cdna.artstation.com/p/assets/images/images/037/877/182/large/valerie-frenzel-mermay-preview.jpg?1621539045",
  "https://cdnb.artstation.com/p/assets/images/images/037/632/131/large/creative-castel-mermaid013.jpg?1620891195",
  "https://cdnb.artstation.com/p/assets/images/images/037/438/875/large/vasilisa-grishina-.jpg?1620372379",
  "https://cdnb.artstation.com/p/assets/images/images/037/989/679/large/joshua-brian-smith-lycan-rider-final.jpg?1621876402",
  "https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915",
  "https://cdna.artstation.com/p/assets/images/images/037/877/182/large/valerie-frenzel-mermay-preview.jpg?1621539045",
  "https://cdnb.artstation.com/p/assets/images/images/037/632/131/large/creative-castel-mermaid013.jpg?1620891195",
  "https://cdna.artstation.com/p/assets/images/images/037/773/218/large/paulette-arochena-asset.jpg?1621285527",
  "https://cdna.artstation.com/p/assets/images/images/037/773/218/large/paulette-arochena-asset.jpg?1621285527",
  "https://cdnb.artstation.com/p/assets/images/images/037/438/875/large/vasilisa-grishina-.jpg?1620372379",
  "https://cdnb.artstation.com/p/assets/images/images/037/989/679/large/joshua-brian-smith-lycan-rider-final.jpg?1621876402",
  "https://cdnb.artstation.com/p/assets/images/images/038/107/499/large/maciej-janaszek-template-4k.jpg?1622187915",
  "https://cdna.artstation.com/p/assets/images/images/037/877/182/large/valerie-frenzel-mermay-preview.jpg?1621539045",
  "https://cdnb.artstation.com/p/assets/images/images/037/632/131/large/creative-castel-mermaid013.jpg?1620891195",
  "https://cdna.artstation.com/p/assets/images/images/037/773/218/large/paulette-arochena-asset.jpg?1621285527",

]

function HotArtWorks() {
  const divRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    divRef.current.scrollLeft += 260;
  };
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260;
  };
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
              data.map( item => (
                <Cart url={item}/>
              ))
            }
              
            </div>
        </HotArtWorksStyled>
    )
}

export default HotArtWorks;