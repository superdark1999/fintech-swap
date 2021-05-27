import React from 'react'
import {HotArtistsStyled} from './styled'
import Crown from '../../../../assets/images/crown.svg'
import Checkmark from '../../../../assets/images/checkmark.svg'


const dataMock = [
  {
    avt: "https://www.35express.org/wp-content/uploads/2021/05/su-nghiep-cua-doanh-nhan-hang-canada-35express.jpg",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://www.35express.org/wp-content/uploads/2021/05/su-nghiep-cua-doanh-nhan-hang-canada-35express.jpg",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/tLtX2NEAdKYmj7PwslQ5M1cqC1krdd0-uep5ijBPA0Vb7SPvl47m-n5UTPSr9m_1usp0rjwHqPCV8cHA8D9FfAuiG1Bt2b-td6m4ueytul8",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/tLtX2NEAdKYmj7PwslQ5M1cqC1krdd0-uep5ijBPA0Vb7SPvl47m-n5UTPSr9m_1usp0rjwHqPCV8cHA8D9FfAuiG1Bt2b-td6m4ueytul8",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  },
  {
    avt: "https://lh3.googleusercontent.com/proxy/tLtX2NEAdKYmj7PwslQ5M1cqC1krdd0-uep5ijBPA0Vb7SPvl47m-n5UTPSr9m_1usp0rjwHqPCV8cHA8D9FfAuiG1Bt2b-td6m4ueytul8",
    name: "Airframe",
    rank: "GOLD ARTIST",
    images: [
      "https://ict-imgs.vgcloud.vn/2021/03/03/14/google-bao-chi-de-tiep-can-ban-quyen-hang-loat-tua-game-hang-dau.jpg",
      "https://yt3.ggpht.com/ytc/AAUvwnhRTK4GvGPzEpGvqPOtiSXkDcx0WCF8AXIo0qArww=s900-c-k-c0x00ffffff-no-rj",
      "https://static.game24h.vn/upload/2018/2018-4/game/2018-12-21/pubg-minecraft.png",
    ]
  }
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
