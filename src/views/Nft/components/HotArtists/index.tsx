import React from 'react'
import {HotArtistsStyled} from './styled'
import Crown from 'assets/images/crown.svg'
import Checkmark from 'assets/images/checkmark.svg'


const dataMock = [
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/SKse1B9axvgGHaQt4Lq3Jz1wdajppcGyXAl0EqweKikhKtM0X5TRyOZCalKm29AdLECT_vIbPk3amROJaQFPC57ANPTY03CQ9_oMIQbnoZA",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
]
function HotArtists() {
    return (
        <HotArtistsStyled>
            <div className="header-artists">
                <div className="title-artists">HOT ARTISTS 🔥</div>
                <div className="more-artists">View more</div>
            </div>
            <div className="content-artists" >               
            {
              dataMock.map((item, i) => (
                <div className="card-artists" key={i}>
                  <img className="avatar-artists" src={item.avt} alt=""/>
                  <div className="name-artists">
                    {item.name} {" "}
                    <img src={Checkmark} />
                  </div>
                  <div className="rank-artists">
                    <img src={Crown} /> {" "}
                    {item.rank}
                  </div>
                  <div className="line" />
                  <div className="list-image">
                    { item.images.map((img) => (
                        <img src={img} className="image" />
                    ))
                    }
                  </div>
                </div>
                )
                )}
              </div>
            
        </HotArtistsStyled>
    )
}

export default HotArtists
