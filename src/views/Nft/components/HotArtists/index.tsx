import React, { useRef } from 'react'
import { HotArtistsStyled } from './styled'
import Crown from 'assets/images/crown.svg'
import Checkmark from 'assets/images/checkmark.svg'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const dataMock = [
  {
    avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPsZT4V8zrd0nYA9PTMblmGC5tqUdq8BD-bQ&usqp=CAU',
    name: 'LuckySwapStudio',
    rank: 'GOLD ARTIST',
    images: [
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/cfe06a402ff54798b0285eceffdc6a2a.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/2b061704f09e4bd485ebd66cf8b5f4fa.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/689d6bf2d7cd4866b5e521fd6fdf851b.gif',
    ],
  },
  {
    avt: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-16/Giai-ma-ve-NFT---tai-san-ky-thuat-so-dang-non-fungible-tokens-1615879353-25-width660height398.jpg',
    name: 'LuckySwapStudio',
    rank: 'GOLD ARTIST',
    images: [
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/a0c90da902454397994995a3fcf50b8d.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif',
    ],
  },
  {
    avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGsIJxMUIFKJ0NUpQL96WqR0VdmdyKRKt1yg&usqp=CAU',
    name: 'Airframe',
    rank: 'GOLD ARTIST',
    images: [
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif',
    ],
  },
  {
    avt: 'https://btc66.vn/wp-content/uploads/2021/05/Khoi-luong-NFT-da-tang-hon-gap-ba-lan-ngay-ca-trong-boi-canh-gia-sup-do.jpg',
    name: 'LuckySwapStudio',
    rank: 'GOLD ARTIST',
    images: [
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif',
    ],
  },
  {
    avt: 'data:image/jpeg;base64,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',
    name: 'LuckySwapStudio',
    rank: 'GOLD ARTIST',
    images: [
      'https://cdna.artstation.com/p/assets/images/images/037/908/206/large/bis-biswas-ss1.jpg?1621623511',
      'https://cdna.artstation.com/p/assets/images/images/038/116/464/large/rene-puls-party.jpg?1622209640',
      'https://cdna.artstation.com/p/assets/images/images/038/019/226/large/svetlana-kostina-mermaid-23-m-as.jpg?1621955083',
    ],
  },
  {
    avt: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-16/Giai-ma-ve-NFT---tai-san-ky-thuat-so-dang-non-fungible-tokens-1615879353-25-width660height398.jpg',
    name: 'LuckySwapStudio',
    rank: 'GOLD ARTIST',
    images: [
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/88cedba608e94699ba114a36c0a81981.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/f8695348b9064cae934ea91aca485a17.gif',
      'https://d3ggs2vjn5heyw.cloudfront.net/static/nfts/artworks/9f90c1dcec8a4316a13343db0c45136c.gif',
    ],
  },
  {
    avt: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGsIJxMUIFKJ0NUpQL96WqR0VdmdyKRKt1yg&usqp=CAU',
    name: 'Airframe',
    rank: 'GOLD ARTIST',
    images: [
      'https://cdna.artstation.com/p/assets/images/images/037/960/840/large/savannah-tschirgi-main.jpg?1621795362',
      'https://cdna.artstation.com/p/assets/images/images/037/589/550/large/delaney-greaves-mermay-8.jpg?1620773706',
      'https://cdna.artstation.com/p/assets/images/images/038/135/308/large/jose-angeles-mermay.jpg?1622268628',
    ],
  },
  {
    avt: 'https://cdn.24h.com.vn/upload/1-2021/images/2021-03-16/Giai-ma-ve-NFT---tai-san-ky-thuat-so-dang-non-fungible-tokens-1615879353-25-width660height398.jpg',
    name: 'LuckySwapStudio',
    rank: 'GOLD ARTIST',
    images: [
      'https://cdna.artstation.com/p/assets/images/images/037/908/206/large/bis-biswas-ss1.jpg?1621623511',
      'https://cdna.artstation.com/p/assets/images/images/038/116/464/large/rene-puls-party.jpg?1622209640',
      'https://cdna.artstation.com/p/assets/images/images/038/019/226/large/svetlana-kostina-mermaid-23-m-as.jpg?1621955083',
    ],
  },
]
function HotArtists() {
  const divRef = useRef<HTMLDivElement>(null)
  const scrollLeft = () => {
    divRef.current.scrollLeft += 260
  }
  const scrollRight = () => {
    divRef.current.scrollLeft -= 260
  }
  return (
    <HotArtistsStyled>
      <div className="header-artists">
        <div className="title-artists">HOT ARTISTS</div>
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
      <div className="content-artists" ref={divRef}>
        {dataMock.map((item, i) => (
          <div className="card-artists" key={i}>
            <img
              className="avatar-artists"
              src={`https://i.pravatar.cc/150?img=${i + 1}`}
              alt=""
            />
            {/* gắn ID user ở đây */}
            <Link to="/user-profile/:id/onsale/readyToSell">
              <div className="name-artists">
                {item.name} <img src={Checkmark} />
              </div>
            </Link>
            <div className="rank-artists">
              <img src={Crown} /> {item.rank}
            </div>
            {/* <div className="line" />
                    <div className="list-image">
                      { item.images.map((img) => (
                         <div className="wrapper-image"> <img src={img} className="image" /></div>
                      ))
                      }
                    </div> */}
          </div>
        ))}
      </div>
    </HotArtistsStyled>
  )
}

export default HotArtists
