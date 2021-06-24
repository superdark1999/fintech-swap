import React, { useRef, useState, useEffect } from 'react'
import { HotArtistsStyled } from './styled'
import Crown from 'assets/images/crown.svg'
import Checkmark from 'assets/images/checkmark.svg'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import useUserServices from 'services/axiosServices/UserServices'
import useUserStore from 'store/userStore'
function HotArtists() {
  const divRef = useRef<HTMLDivElement>(null)
  const [users, setUsers] = useState([]);
  const [userState] = useUserStore()

  const { getUsers } = useUserServices()
  useEffect(() => {
    getUsers().then(({ data, status }) => {
      if (status === 200) {
        setUsers(data?.data?.filter((item: any) => item.name))
      }
    })
  }, [])

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
        <Link className="more-artists" to="/explore?search=hot-artists">View more</Link>
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
        {users.map((item, i) => (
          <Link to={ `/user-profile/${item.id}/onstore/readyToSell`}>
            <div className="card-artists" key={i}>
              <img
                className="avatar-artists"
                src={item.avatarImage}
                alt=""
              />
              {/* gắn ID user ở đây */}
              <div className="name-artists">
                {item.name} <img src={Checkmark} />
              </div>

              <div className="rank-artists">
                <img src={Crown} /> GOLD ARTIST
              </div>

              {/* <div className="line" />
                    <div className="list-image">
                      { item.images.map((img) => (
                         <div className="wrapper-image"> <img src={img} className="image" /></div>
                      ))
                      }
                    </div> */}
            </div>
          </Link>
        ))}
      </div>
    </HotArtistsStyled>
  )
}

export default HotArtists
