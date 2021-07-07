import React, { useEffect, useRef, useState } from 'react'
import Cart from 'components-v2/CardItem'
import { HotArtWorksStyled } from './styled'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import { RightCircleOutlined, LeftCircleOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Link } from 'react-router-dom'
import useIO from 'hooks/useIo'
import useConfigStore from 'store/configStore'

function HotSwap() {
  const [observer, setElements, entries] = useIO({
    threshold: 0.25,
    root: null,
  })

  const divRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [configState, configAction] = useConfigStore()
  const scrollLeft = () => {
    divRef.current.scrollLeft += 300
  }
  const scrollRight = () => {
    divRef.current.scrollLeft -= 360
  }
  const [NFTs, setNFTs] = useState([])
  const { getNFT } = useArtworkServices()

  useEffect(() => {
    getNFT(
      {
        status: 'readyToSell',
        NFTType: 'swap-store',
      },
      true,
    )
      .then(({ status, data }) => {
        if (status == 200) {
          setNFTs(data?.data || [])
          setLoading(false)
          configAction.updateConfig({
            showLoading: false,
          })
        }
      })
      .catch((err) => {
        // setLoading(false)
      })
  }, [])

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove('lazy')
        observer.unobserve(lazyImage)
      }
    })
  }, [entries, observer])

  useEffect(() => {
    if (NFTs.length) {
      let img = Array.from(document.getElementsByClassName('lazy'))
      setElements(img)
    }
  }, [NFTs, setElements])

  return (
    <HotArtWorksStyled>
      <div className="header-artists">
        <div className="title-artists">HOT SWAP</div>
        <Link className="more-artists" to="/explore?search=hot-swap">
          View more
        </Link>
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
        {NFTs.map((item, i) => (
          <Cart key={i} width="320px" height="480px" data={item} isLazy />
        ))}
      </div>
    </HotArtWorksStyled>
  )
}
export default HotSwap
