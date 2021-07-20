import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CheckCircleFilled } from '@ant-design/icons'
import Lucky from 'assets/images/token.svg'
import TextGradient from 'components-v2/ID'
import RenderMedia from './renderMedia'
export default function CardSwap(props: any) {
  const [playVideo, setplayVideo] = React.useState(false)
  const videoRef = React.useRef<HTMLVideoElement>();
  useEffect(() => {
    if (videoRef) {
      if (playVideo) {
        videoRef.current && videoRef.current.play()
      } else {
        videoRef.current && videoRef.current.pause()
      }
    }
  }, [playVideo])
  return (
    <CardSwapStyled style={{ ...props.style }} onMouseEnter={() => setplayVideo(true)} onMouseLeave={() => setplayVideo(false)}>
      {/* <img src={props.data?.contentUrl}/> */}
      <RenderMedia videoRef={videoRef} {...props} />
      <div className="filter">
        <div className="title">{props.data?.title}</div>
      </div>
      {
        props.value && props.setVisible && props.isRenderEdit && <div className="edit" onClick={() => props?.setVisible({ isOpen: true, value: props.value })}>Edit</div>
      }
    </CardSwapStyled>
  )
}

const CardSwapStyled = styled.div`
  width: 280px;
  height: 400px;
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
  }
  .filter {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(181.09deg, rgba(0, 0, 0, 0) 57.15%, #000000 110.73%);
    color: #ffffff;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 20px;
    .title {
      font-weight: 600;
      font-size: 20px;
    }
    .artist-name {
      font-weight: 600;
      font-size: 14px;
    }
  }
  .edit {
    border: 1px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 100px;
    padding: 8px 20px;
    text-align: center;
    background: #FFFFFF;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
`