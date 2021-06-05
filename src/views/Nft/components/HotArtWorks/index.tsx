import React, {useRef} from 'react'
import Cart from 'components-v2/CardItem'
import { HotArtWorksStyled } from './styled'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
const data = [
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/cfe06a402ff54798b0285eceffdc6a2a.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/2b061704f09e4bd485ebd66cf8b5f4fa.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/689d6bf2d7cd4866b5e521fd6fdf851b.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/cfe06a402ff54798b0285eceffdc6a2a.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/2b061704f09e4bd485ebd66cf8b5f4fa.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/689d6bf2d7cd4866b5e521fd6fdf851b.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/a0c90da902454397994995a3fcf50b8d.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif",
  "https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif",


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