import React, {useRef} from 'react'
import Cart from '../utilComponent/cart/'
import { HotArtWorksStyled } from './styled'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'

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
              [1,2,3,4,5,6].map( item => (
                <Cart />
              ))
            }
              
            </div>
        </HotArtWorksStyled>
    )
}

export default HotArtWorks;