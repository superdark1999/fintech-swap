import React, { useState } from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

const data = [
  {
    id: 1,
    title: 'Lottery',
    imgMini1: '../images/astronaut-thumb.png',
    imgMini2: '../images/bg-island-left.png',
    imgMain: '../images/bg-island-main.png',
    imgMain1: '../images/astronaut.png',
    imgMain2: '../images/astronaut-atm.png',
    route:'/lottery'
  },
  {
    id: 2,
    title: 'Staking NFT',
    imgMini1: '../images/cardNFT.png',
    imgMini2: '../images/bg-island-center.png',
    imgMain1: '',
    imgMain2: '',
    route:'/staking'
  },
  {
    id: 3,
    title: 'Coming soon',
    imgMini1: '../images/bg-question.png',
    imgMini2: '../images/bg-island-right.png',
    imgMain1: '',
    imgMain2: '',
    route:''
  },
]
const PlayToEarn = () => {
  const [gameId, setGame] = useState(1)
  const [island, setIsland] = useState(data[0])
  const BgGame = styled.div`
    width: 100%;
    height: calc(100vh - 64px);
    background: url('../images/bg-game.png') center center no-repeat;
    background-size: cover;
  `

  const BoxIsland = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 64px);
  `

  const MainIsland = styled.div`
    display: grid;
    justify-self: center;
    align-self: flex-end;
    position: relative;

    img {
      -webkit-filter: drop-shadow(0px 0px 0px rgba(255, 255, 255, 0.8));
      -webkit-transition: all 0.3s linear;
      -o-transition: all 0.3s linear;
      transition: all 0.3s linear;
    }

    &:hover {
      img {
        -webkit-filter: drop-shadow(0px 0px 8px rgba(0, 231, 255, 0.8));
      }
    }

    > img {
      width: 100%;
      max-width: 450px;
    }

    .full {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
    }
  `

  const BoxAstronaut = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .astronaut {
      position: absolute;
      top: -7px;
      left: 34%;
      width: 100%;
      max-width: 120px;
      z-index: 1;
    }

    .astronaut-atm {
      position: absolute;
      top: -57px;
      right: 92px;
      width: 100%;
      max-width: 100px;
    }
  `

  const ThreeIsland = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  `

  const Item = styled.div`
    justify-content: center;
    position: relative;
    cursor: pointer;

    &:hover {
      img.vert-move {
        -webkit-animation: mover 1.5s infinite alternate;
        animation: mover 1.5s infinite alternate;
      }

      &:hover {
        -webkit-filter: drop-shadow(0px 0px 8px rgba(0, 231, 255, 0.8));
      }
    }

    &.active-island {
      img {
        -webkit-filter: drop-shadow(0px 0px 8px rgba(0, 231, 255, 0.8));
      }
    }

    @keyframes mover {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-10px);
      }
    }

    &:first-of-type {
      img {
        width: 98px;

        @media (min-width: 768px) {
          width: 240px;
        }
      }
    }

    &:nth-child(2) {
      img {
        width: 340px;
      }
    }

    &:nth-child(3) {
      text-align: right;

      img {
        width: 100px;

        @media (min-width: 768px) {
          width: 140px;
        }
      }
    }
  `

  const BoxThumb = styled.div`
    position: absolute;

    &.left {
      top: -19%;
      left: 22%;

      @media (min-width: 768px) {
        top: -15px;
        left: 28%;
      }

      img {
        max-width: 55px;

        @media (min-width: 768px) {
          max-width: 95px;
        }
      }
    }

    &.center {
      top: -63%;
      left: 30%;

      @media (min-width: 768px) {
        top: -18px;
        left: 42%;
      }

      img {
        max-width: 50px;
      }
    }

    &.right {
      top: -20%;
      right: 37px;

      @media (min-width: 768px) {
        top: -10px;
        right: 53px;
      }

      img {
        max-width: 30px;
      }
    }

    img {
      width: 100%;
    }
  `

  const WrapBox = styled.div`
    position: fixed;
    top: 12%;
    left: -24%;
    width: 64%;

    svg {
      overflow: inherit;
    }

    .mover {
      animation: mover 4s infinite;
    }

    @keyframes mover {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }

    .head {
      transform-origin: 20% 80%;
      animation: head 4s infinite;
      transition: all linear;
    }

    @keyframes head {
      0% {
        transform: translate(0px, 0px) rotate(0deg);
      }
      50% {
        transform: translate(-2px, -12px) rotate(1deg);
      }
      100% {
        transform: translate(0px, 0px) rotate(0deg);
      }
    }

    #perna_esquerda {
      transform-origin: top left;
      transform-origin: 0% 20%;
      animation: perna_esquerda 4s infinite;
      transition: all linear;
    }

    @keyframes perna_esquerda {
      0% {
        transform: translate(0px, 0px) rotate(0deg);
      }
      50% {
        transform: translate(-9px, 31px) rotate(-2deg);
      }
      100% {
        transform: translate(0px, 0px) rotate(0deg);
      }
    }

    #perna_direita {
      transform-origin: 10% 0%;
      animation: perna_direita 4s infinite;
      animation-delay: 0.07s;
      transition: all linear;
      transform: translate(-1px, 0px) rotate(0deg);
    }

    @keyframes perna_direita {
      0% {
        transform: translate(-1px, 0px) rotate(0deg);
      }
      50% {
        transform: translate(-13px, 42px) rotate(-2.2deg);
        transform: translate(-13px, 42px) rotate(-2.3deg);
        transform: translate(-19px, 38px) rotate(-2.1deg);
        transform: translate(-15px, 38px) rotate(-2.3deg);
        transform: translate(-27px, 56px) rotate(-4deg);
      }
      100% {
        transform: translate(-1x, 0px) rotate(0deg);
      }
    }

    @keyframes tagClose {
      0% {
        transform: translateX(0px);
      }
      50% {
        transform: translateX(5px);
      }
      100% {
        transform: translateX(0px);
      }
    }

    .notebook g {
      animation: notebook 4s infinite;
      transition: all linear;
    }

    @keyframes notebook {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-2px);
      }
      100% {
        transform: translateY(0px);
      }
    }

    .notebook-light g {
      animation: notebook-light 4s infinite;
      transition: all linear;
    }

    @keyframes notebook-light {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.2;
      }
      100% {
        opacity: 1;
      }
    }
  `

  const TitleGame = styled.h2`
    text-align: center;
    color: #ffffff;
    font-size: 50px;
    font-weight: 700;
  `

  return (
    <BgGame>
      <WrapBox>
        <svg viewBox="0 0 1445.0834 580.2761">
          <defs>
            <linearGradient
              id="Gradiente_sem_nome_150"
              data-name="Gradiente sem nome 150"
              x1="3.2814"
              y1="453.8773"
              x2="921.2548"
              y2="453.8773"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f27075" stopOpacity="0" />
              <stop offset="0.5248" stopColor="#2d6cea" />
              <stop offset="0.5932" stopColor="#457dec" />
              <stop offset="0.7376" stopColor="#82a8f3" />
              <stop offset="0.9447" stopColor="#e4ecfc" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <linearGradient
              id="Gradiente_sem_nome_16"
              data-name="Gradiente sem nome 16"
              x1="939.9244"
              y1="351.193"
              x2="1492.4711"
              y2="243.7888"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2d3d54" />
              <stop offset="0.1341" stopColor="#2d3d54" stopOpacity="0.7621" />
              <stop offset="0.4043" stopColor="#2d3d54" stopOpacity="0.3478" />
              <stop offset="0.6262" stopColor="#2d3d54" stopOpacity="0.0928" />
              <stop offset="0.7707" stopColor="#2d3d54" stopOpacity="0" />
            </linearGradient>
            <filter id="AI_Desfoquegaussiano_4" name="AI_Desfoquegaussiano_4">
              <feGaussianBlur stdDeviation="4" />
            </filter>
            <linearGradient
              id="linear-gradient"
              x1="1021.6008"
              y1="714.8803"
              x2="1021.6008"
              y2="491.971"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#b9b9bd" />
              <stop offset="0.5039" stopColor="#fee7d5" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-2"
              x1="1015.1188"
              y1="715.6549"
              x2="1015.1188"
              y2="662.471"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#401737" />
              <stop offset="1" stopColor="#2d6cea" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-3"
              x1="1020.4081"
              y1="701.4192"
              x2="1020.4081"
              y2="673.7128"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-4"
              x1="1042.4303"
              y1="595.163"
              x2="1042.4303"
              y2="578.9113"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-5"
              x1="1010.7335"
              y1="660.0198"
              x2="1010.7335"
              y2="649.7516"
              gradientTransform="translate(1576.9212 -408.0767) rotate(85.1016)"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-6"
              x1="939.1844"
              y1="408.3795"
              x2="939.1844"
              y2="315.0461"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2d3d54" />
              <stop offset="0.1808" stopColor="#7b7c84" />
              <stop offset="0.3611" stopColor="#c1b6b0" />
              <stop offset="0.4899" stopColor="#edd9cb" />
              <stop offset="0.5551" stopColor="#fee7d5" />
              <stop offset="0.765" stopColor="#fef1e6" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-7"
              x1="902.9354"
              y1="401.3201"
              x2="954.2108"
              y2="401.3201"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="Gradiente_sem_nome_13"
              data-name="Gradiente sem nome 13"
              x1="1116.3619"
              y1="414.6718"
              x2="1116.3619"
              y2="380.2045"
              gradientTransform="matrix(-0.9977, -0.0673, -0.0673, 0.9977, 2069.0162, 74.1349)"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fee7d5" />
              <stop offset="1" stopColor="#ffc5a9" />
            </linearGradient>
            <linearGradient
              id="Gradiente_sem_nome_13-2"
              x1="205.2625"
              y1="396.867"
              x2="214.9458"
              y2="396.867"
              gradientTransform="matrix(0.992, 0.126, -0.126, 0.992, 801.135, -44.0006)"
              xlinkHref="#Gradiente_sem_nome_13"
            />
            <linearGradient
              id="Gradiente_sem_nome_13-3"
              x1="1131.8728"
              y1="395.588"
              x2="1141.556"
              y2="395.588"
              gradientTransform="matrix(-0.992, -0.126, -0.126, 0.992, 2090.6347, 119.7773)"
              xlinkHref="#Gradiente_sem_nome_13"
            />
            <linearGradient
              id="linear-gradient-8"
              x1="885.4584"
              y1="359.9616"
              x2="950.5125"
              y2="348.4908"
              xlinkHref="#linear-gradient"
            />
            <linearGradient
              id="linear-gradient-9"
              x1="899.0038"
              y1="360.5009"
              x2="980.0221"
              y2="360.5009"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#f27075" />
              <stop offset="0.5248" stopColor="#2d6cea" />
              <stop offset="0.5932" stopColor="#457dec" />
              <stop offset="0.7376" stopColor="#82a8f3" />
              <stop offset="0.9447" stopColor="#e4ecfc" />
              <stop offset="1" stopColor="#fff" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-10"
              x1="901.7687"
              y1="404.3587"
              x2="955.1403"
              y2="404.3587"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-11"
              x1="855.3938"
              y1="472.4557"
              x2="988.2765"
              y2="449.0249"
              xlinkHref="#linear-gradient"
            />
            <linearGradient
              id="linear-gradient-12"
              x1="957.1854"
              y1="420.1377"
              x2="966.852"
              y2="420.1377"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-13"
              x1="911.3371"
              y1="400.3877"
              x2="948.8464"
              y2="400.3877"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-14"
              x1="890.8894"
              y1="434.7924"
              x2="902.9896"
              y2="434.7924"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-15"
              x1="864.5134"
              y1="493.2369"
              x2="864.5134"
              y2="480.9984"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-16"
              x1="936.2392"
              y1="458.2563"
              x2="949.047"
              y2="458.2563"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-17"
              x1="880.6081"
              y1="418.679"
              x2="892.6152"
              y2="418.679"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-18"
              x1="896.9408"
              y1="366.1418"
              x2="896.9408"
              y2="351.4266"
              gradientTransform="translate(1018.2501 -599.6067) rotate(75.4121)"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-19"
              x1="928.1403"
              y1="464.5368"
              x2="952.6186"
              y2="464.5368"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-20"
              x1="957.7139"
              y1="347.5472"
              x2="816.6332"
              y2="103.1882"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#4eca7a" />
              <stop offset="0.047" stopColor="#4dc278" stopOpacity="0.939" />
              <stop offset="0.3699" stopColor="#438c69" stopOpacity="0.5406" />
              <stop offset="0.6354" stopColor="#3c645d" stopOpacity="0.2487" />
              <stop offset="0.8302" stopColor="#384b57" stopOpacity="0.0684" />
              <stop offset="0.9336" stopColor="#364254" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-21"
              x1="952.9233"
              y1="454.2961"
              x2="1034.4804"
              y2="454.2961"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#401737" />
              <stop offset="0.076" stopColor="#433e45" />
              <stop offset="0.2046" stopColor="#487a5c" />
              <stop offset="0.3143" stopColor="#4ba56c" />
              <stop offset="0.3994" stopColor="#4dc076" />
              <stop offset="0.4494" stopColor="#4eca7a" />
            </linearGradient>
            <linearGradient
              id="Gradiente_sem_nome_8"
              data-name="Gradiente sem nome 8"
              x1="919.4737"
              y1="344.12"
              x2="1010.7447"
              y2="344.12"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#401737" />
              <stop offset="0.1108" stopColor="#411e3a" />
              <stop offset="0.277" stopColor="#423341" />
              <stop offset="0.4782" stopColor="#45554e" />
              <stop offset="0.7066" stopColor="#488360" />
              <stop offset="0.955" stopColor="#4dbe76" />
              <stop offset="1" stopColor="#4eca7a" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-22"
              x1="997.7087"
              y1="458.4906"
              x2="997.7087"
              y2="452.282"
              gradientTransform="translate(1142.391 -631.7504) rotate(73.0472)"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-23"
              x1="941.5251"
              y1="595.9957"
              x2="1022.4679"
              y2="499.5318"
              xlinkHref="#linear-gradient"
            />
            <linearGradient
              id="linear-gradient-24"
              x1="988.6073"
              y1="623.721"
              x2="988.6073"
              y2="606.0954"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-25"
              x1="991.6126"
              y1="614.8744"
              x2="991.6126"
              y2="600.1377"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-26"
              x1="994.8687"
              y1="497.0958"
              x2="994.8687"
              y2="481.8919"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-27"
              x1="975.0767"
              y1="595.5689"
              x2="975.0767"
              y2="584.3129"
              gradientTransform="translate(1479.6015 -431.9493) rotate(85.1016)"
              xlinkHref="#linear-gradient-2"
            />
            <linearGradient
              id="linear-gradient-28"
              x1="821.4987"
              y1="382.8428"
              x2="816.8826"
              y2="385.073"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" />
            </linearGradient>
            <linearGradient
              id="linear-gradient-29"
              x1="821.8294"
              y1="381.4053"
              x2="828.1228"
              y2="381.4053"
              xlinkHref="#linear-gradient-28"
            />
          </defs>
          <g style={{ isolation: 'isolate' }}>
            <g id="corda" className="mover">
              <path
                d="M10.1381,523.7887a129.9984,129.9984,0,0,1,23.4478-28.0481,137.2,137.2,0,0,1,14.4833-11.4312,131.4185,131.4185,0,0,1,16.0282-9.3232A122.8008,122.8008,0,0,1,81.43,468.0534c2.9868-.9311,6.0182-1.7484,9.0912-2.4311q4.6143-.999,9.3441-1.5545a84.3237,84.3237,0,0,1,19.1751-.1527,64.1678,64.1678,0,0,1,19.0137,5.03,54.4889,54.4889,0,0,1,8.8048,4.9313,51.29,51.29,0,0,1,7.7448,6.6289,50.2482,50.2482,0,0,1,3.3489,3.8652l1.3657,1.7187c.416.5431.8833,1.0634,1.3227,1.5959,1.8007,2.11,3.7375,4.1481,5.7635,6.1129a126.0336,126.0336,0,0,0,27.638,19.9649A122.0777,122.0777,0,0,0,225.73,525.7655a88.8416,88.8416,0,0,0,32.9611,1.2545,76.21,76.21,0,0,0,7.9761-1.7469,72.5878,72.5878,0,0,0,7.7339-2.557,77.53,77.53,0,0,0,14.45-7.5716,100.2369,100.2369,0,0,0,23.87-23.0338,141.4885,141.4885,0,0,0,9.3889-14.208c1.4575-2.4627,2.7775-4.9956,4.1448-7.5432,1.4553-2.7422,2.9114-5.4836,4.4589-8.1762q4.6074-8.0952,9.8-15.8476,5.2212-7.7251,11.0333-15.0424A213.69,213.69,0,0,1,377.2119,404.11a180.8723,180.8723,0,0,1,30.526-22.0113,139.9645,139.9645,0,0,1,35.2769-14.33,104.4177,104.4177,0,0,1,38.5771-2.51,92.4736,92.4736,0,0,1,36.7547,12.78,110.5846,110.5846,0,0,1,28.7541,25.4918,144.872,144.872,0,0,1,10.9053,15.5219c1.6008,2.7056,3.2016,5.4117,4.6519,8.1864l1.113,2.0693,1.0443,2.0983,2.05,4.1369a222.2631,222.2631,0,0,0,17.4,30.2127,121.9379,121.9379,0,0,0,22.8687,25.18c8.7006,6.9742,18.6615,12.1735,29.2445,13.9654a50.7067,50.7067,0,0,0,15.9747.2238,56.6979,56.6979,0,0,0,15.497-4.6532,78.1028,78.1028,0,0,0,26.11-20.4673,99.4568,99.4568,0,0,0,9.81-13.8993c1.4532-2.45,2.7643-4.9855,4.01-7.5516l1.8876-4.0331c.6459-1.3956,1.3241-2.7754,1.9944-4.1585A228.387,228.387,0,0,1,730.51,418.6864a166.08,166.08,0,0,1,24.5238-27.74,121.2878,121.2878,0,0,1,14.8163-11.38,96.6508,96.6508,0,0,1,16.6384-8.7412,80.1964,80.1964,0,0,1,37.0089-5.8268c12.5584,1,24.5831,5.0685,35.5046,10.7034a148.2251,148.2251,0,0,1,30.0062,20.9443,250.8421,250.8421,0,0,1,25.2756,26.0567,1.5,1.5,0,0,1-2.2388,1.9964l-.0118-.0127a247.1063,247.1063,0,0,0-25.9278-24.6038,149.2618,149.2618,0,0,0-29.6935-19.15c-10.57-5.0008-21.9084-8.3606-33.3851-8.8706a72.891,72.891,0,0,0-33.3863,6.2489,88.3078,88.3078,0,0,0-14.9883,8.4326,112.4246,112.4246,0,0,0-13.4363,10.9474A144.7821,144.7821,0,0,0,749.3,410.4347a174.8567,174.8567,0,0,0-10.548,14.0031A217.9769,217.9769,0,0,0,721.4548,455.05c-.61,1.3342-1.2277,2.6648-1.8134,4.009l-1.8452,4.1693c-1.3191,2.8651-2.7168,5.6987-4.2729,8.45a110.8506,110.8506,0,0,1-10.6422,15.7293,88.3839,88.3839,0,0,1-29.8157,24.1271,69.0633,69.0633,0,0,1-18.8281,5.937,64.6783,64.6783,0,0,1-29.6086-2.2692,70.4885,70.4885,0,0,1-9.1971-3.605,88.2479,88.2479,0,0,1-16.52-10.25,135.2446,135.2446,0,0,1-25.883-27.606A225.59,225.59,0,0,1,554.0734,441.79l-1.9915-3.9177-.9819-1.9264-1.0427-1.8875c-1.358-2.5383-2.8467-4.9868-4.3273-7.4382a130.3666,130.3666,0,0,0-9.9445-13.85,95.8119,95.8119,0,0,0-25.1086-21.86,77.3089,77.3089,0,0,0-30.941-10.4064,85.0584,85.0584,0,0,0-16.4912-.2871,102.278,102.278,0,0,0-16.4418,2.7483,124.3046,124.3046,0,0,0-31.251,12.85,165.08,165.08,0,0,0-27.766,20.183,197.75,197.75,0,0,0-23.6736,25.2571q-5.3815,6.8186-10.2329,14.0516-4.8208,7.2434-9.1024,14.8357c-1.4388,2.5216-2.7905,5.0918-4.1444,7.66-1.4657,2.75-2.9455,5.5342-4.5528,8.2408a157.572,157.572,0,0,1-10.5269,15.8081,112.9818,112.9818,0,0,1-27.968,26.5646,93.3378,93.3378,0,0,1-17.5092,8.9514,89.2817,89.2817,0,0,1-19.0534,4.9525,102.9441,102.9441,0,0,1-38.6288-2.0733,134.4123,134.4123,0,0,1-35.1971-14.2581,139.3158,139.3158,0,0,1-29.8981-23.1059c-2.2146-2.29-4.3481-4.68-6.3677-7.2067-.4977-.6411-1.0125-1.2589-1.4918-1.9224l-1.3794-1.8546a37.9246,37.9246,0,0,0-2.4531-3.024,42.1378,42.1378,0,0,0-12.4763-9.4316c-9.5687-4.7971-21.0189-6.2548-32.3023-5.4208a107.2722,107.2722,0,0,0-33.3739,8.3137,134.2376,134.2376,0,0,0-30.1162,17.8426,136.8208,136.8208,0,0,0-24.7194,25.2979,1.5014,1.5014,0,0,1-2.48-1.6879Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#Gradiente_sem_nome_150)"
              />
            </g>
            <g id="sombra" className="mover">
              <polygon
                points="1014.415 579.28 1445.083 506 1445.083 0 935.544 179.578 964.718 478.747 1006.173 481.74 1014.415 579.28"
                opacity="0.5"
                fill="url(#Gradiente_sem_nome_16)"
              />
            </g>

            <g className="mover">
              <g id="perna_direita">
                <g>
                  <path
                    d="M992.6311,541.971s16.5475,14.15,28.2592,43.3251c0,0-12.3722,18.1773-12.5188,56.18-.113,9.8078-.9762,15.1741-6.56,18.9594s-2.9561,11.5342-.8326,17.66,1.3408,26.2773,6.7833,30.7222c2.9716,4.0283,11.4874,7.9222,19.7263,5.1s4.2611-19.822,0-31.072-3.7018-20.97,3.3935-34.235c7.975-20.8961,18.824-47.8231,19.6888-64.3149-1.1351-14.4918-16.7113-69.8251-50.34-92.3251Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="url(#linear-gradient)"
                  />
                  <path
                    d="M1000.102,662.471s-3.0626,3.7072.5312,14.7286-.4062,31.5214,14.0938,36.8964,16.625-4.875,16.625-4.875-6.25-.125-9.75,1.375-12.5,1.375-14.375-8.625-2.5-18.875-4.625-26.125A67.7506,67.7506,0,0,1,1000.102,662.471Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="url(#linear-gradient-2)"
                  />
                  <path
                    d="M1010.14,678.0461c-2.6633,3.6749,3.0967,22.4541,5.75,23,5.7105,1.1749,12.6934-.5054,15.14-3.9152,1.8216-2.0349-4.3858-14.5513-5.6358-23.4181C1018.6987,674.596,1012.7433,674.4545,1010.14,678.0461Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="url(#linear-gradient-3)"
                  />
                  <path
                    d="M1044.4325,579.0165c-5.854-1.5235-10.4011,13.9765-3.8712,15.9779S1050.2866,580.54,1044.4325,579.0165Z"
                    transform="translate(-9.9166 -135.4679)"
                    stroke="#401737"
                    strokeMiterlimit="10"
                    fill="url(#linear-gradient-4)"
                  />
                  <path
                    d="M1002.4737,495.4679s30.8673,22.6666,46.03,81.3333c2.0667,7.4949.1629,20.1667-18.3371,71-2.6667,6.1667-10.6227,14.0255-4.2764,34.3333s6.2882,26.4473,3.943,29.1154"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#f27075"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <ellipse
                    cx="1010.7335"
                    cy="654.8857"
                    rx="5.1484"
                    ry="2.4859"
                    transform="translate(262.0169 1470.5394) rotate(-85.1016)"
                    stroke="#401737"
                    strokeMiterlimit="10"
                    fill="url(#linear-gradient-5)"
                  />
                  <path
                    d="M992.6311,541.971s21.0711,19.9,28.2592,43.3251c-2.3965,3.8785-12.75,18.2551-12.4366,52.0051-.2029,9.23.1028,17.07-5.4487,21.9949s-5.9421,9.3821-2.3718,17.9035,1.694,24.3134,6.3821,30.6674,10.8195,7.7837,17.3163,6.8813,11.515-5.4217,6.13-22.8184-8.321-24.9914-2.1645-37.5377,22.8489-59.2709,22.2735-70.0961-14.153-67.0534-50.34-92.3251"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M994.8687,533.7961s19.3335,18.7743,26.5216,43.1c1.1882,4.5753,5.6945,6.45,2.9413,8.8253s-2.3794,6.2753-7.9413,21.0751-4.75,43-4.75,43"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1010.2939,660.0153s-1.4415,6.8488-10.4869,13.6975"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1013.21,656.3481s2.8795,1.849,12.68,3.698"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1000.8227,661.5461s-2.2442,4.6749,2.0058,15.6749,1.6024,30.2767,10.4262,33.1384,10.94-2.1849,18.6944-1.0991"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1025.3946,673.7128s-13.4424.5335-15.2543,4.3333,1.6869,21.5752,5.75,23,16.989-1.0826,15.4382-6.2"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1003.3245,692.5032a12.1949,12.1949,0,0,1,6.9694-3.9251"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            </g>

            <g id="corpo" className="mover">
              <path
                d="M899.7687,393.6377,932.6274,408.38l21.5834-3.8334,16.75-9.5s12-21.75,7.75-42-15-29-33.25-38c-9,5.75-34.25,29.75-34.25,29.75S894.5187,374.1377,899.7687,393.6377Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-6)"
              />
              <path
                d="M902.9354,395.8043s17.2362.57,51.2754,8.7418C930.38,412.8745,902.9354,395.8043,902.9354,395.8043Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-7)"
              />
              <g className="head">
                <path
                  d="M926.57,389.7179a6.66,6.66,0,0,1-13.32,0,5.3458,5.3458,0,0,1,.11-1.13,6.5994,6.5994,0,0,1-1.79-4.53,6.0626,6.0626,0,0,1,.16-1.42,6.6554,6.6554,0,1,1,10.95-5.09,6.1713,6.1713,0,0,1-.16,1.44,6.6044,6.6044,0,0,1,2.36,5.07,6.0132,6.0132,0,0,1-.1,1.13A6.6366,6.6366,0,0,1,926.57,389.7179Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <path
                  d="M961.595,380.0866c2.165,1.1365,1.9264,3.88.1311,4.308s1.0454,4.4908-3.146,4.4734S957.4677,377.92,961.595,380.0866Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <path
                  d="M942.8522,396.3715,940.16,406.5644s-7.6324,15.2344-24.2426-1.6361c0,0-.8587-2.9136-.75-27.5966C926.1879,383.3059,934.43,388.1977,942.8522,396.3715Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="url(#Gradiente_sem_nome_13)"
                />
                <path
                  d="M954.876,375.3526c.0078-3.9552,1.9186-7.4923,6.6768-6.8879s4.0177,14.0482-2.8856,15.1054S954.8658,380.5086,954.876,375.3526Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="url(#Gradiente_sem_nome_13-2)"
                />
                <path
                  d="M932.7448,400.9759l-12.4037-9.7235a7.2068,7.2068,0,0,0-.6159-.5123c-2.648-1.6212-4.558-13.4084-4.558-13.4084-.8945-14.3178,9.0338-30.2767,16.5232-32,14.9363-3.436,24.3905,5.045,28.7384,9.8838a10.1967,10.1967,0,0,1,2.4992,8.1058l-4.6342,24.6644a10.2726,10.2726,0,0,1-3.4183,5.88l-14.5364,9.116C938.5391,404.162,936.47,403.9116,932.7448,400.9759Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#fee7d5"
                />
                <path
                  d="M917.8783,369.3643c.9812-3.8317.0153-7.734-4.7429-8.3384s-7.402,12.5978-.9822,15.3471S916.5993,374.3591,917.8783,369.3643Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="url(#Gradiente_sem_nome_13-3)"
                />
                <path
                  d="M943.1824,362.2357s.6378,2.641-.3485,2.7981-7.604-.4215-13.13-.3465l-.034-1.3354A19.1822,19.1822,0,0,1,943.1824,362.2357Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <path
                  d="M949.06,367.2566s-1.2749,2.3461-.523,2.7707,6.2665,1.7138,10.7106,3.3236l.4116-1.2666A14.5827,14.5827,0,0,0,949.06,367.2566Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <path
                  d="M945.871,372.6707l-2.536-.6113-2.5914,9.8112s-2.0666-.24-1.4707,1.5357,7.13,4.6847,7.2826,1.9235S945.0946,380.8933,945.871,372.6707Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#ffc5a9"
                />
                <path
                  d="M917.3,373.4949l1.5177.3285s1.1986-9.8551,5.327-12.7849c-.2663,3.5957,1.9977.5327,1.8645-1.9977s2.93.2664,4.1285-1.4649-3.0631-.6659-1.465-2.53,2.53-3.9953,1.7313-6.3924.7991,1.0654,2.93,1.3317a6.411,6.411,0,0,0,3.5958-.5327s-.1554,2.34,1.9865,2.1686-1.0543-1.6359,1.476-2.8345c.6659,1.7313,3.8622,2.3972,5.86,1.5981s5.7266,2.93,3.4626,3.9953-3.4626,1.5982-2.3972,2.7967,6.2593.5327,5.1939-4.7943c1.7313,1.8645,7.3247.5327,5.0607,2.6635s-3.3294,4.1285-1.1986,4.7944.2664-2.53,2.3972-1.7313-.3995,5.1939,2.6635,6.5256l-1.1986,14.25s1.1986-7.924,2.93-8.19,1.8645,5.7931.1332,6.7254,2.6635,1.1985,3.1962-2.7967,1.3984-2.1309,2.8633-3.4626-2.3306-1.9311-2.0642-6.5923,4.528-5.1273,2.9965-7.4578c1.4649.3995,3.7289-1.3984,3.13-3.0631-1.2652,1.132-4.1285-.6659-3.5292-3.0631s4.5946-5.9263-.8656-6.8585c2.53-2.264,4.7943-7.8575.5327-9.056s-3.9953,4.6611-1.7313,4.1284.5327-1.5981,1.5981-1.7313-.6659,5.86-3.8621,1.7313-1.7313-8.1237-8.2569-7.9906c-3.1963-2.1308-.8011-3.3464.4651-2.5388s1.133-2.3887-1.93-1.9892-2.5969,2.73-4.9275,1.7313-1.132-4.9941-8.9894-5.5268c-1.1986,0-.8657-1.5315.3329-1.3983s1.2652-1.7979-.9988-1.7313-1.7979,4.0618-3.4626,2.8633-1.6647-5.1273-5.9929-4.4615-2.3972,5.1273-.2664,4.6612-.5327-1.7979.8657-2.1308,2.5969,2.4638.6658,2.73-5.0607-.5993-7.8574-1.5981-9.1226,1.5981-7.6576,6.8586c-1.3984-1.0654-4.5946-1.3984-5.46-.2s1.6647-.0666,2.0642.5327-1.2652,2.8633-2.53,1.5981-1.5981,1.465-.4661,1.9311c.2,1.9311-3.063,2.1308-2.7967,5.86-1.931-1.132-5.327.9322-3.9287,3.396s2.53.1331,1.9311-.4662,1.4649-1.132.9322.7991-7.1249,3.9953-4.9941,11.7195a.5911.5911,0,0,0,1.0654-.2c.4-.9323,2.3972,1.3983.7325,3.396s-1.465,7.924,1.8644,9.2557c.8657.4.1332,2.93-1.132,1.3318-1.1986,1.4649-.3995,4.7943,3.8622,5.0607,0,0-1.8645-10.2546,5.26-10.3212S917.3,373.4949,917.3,373.4949Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <g>
                  <path
                    d="M935.6665,376.8849a4.7267,4.7267,0,0,1-3.1191-1.2891,4.32,4.32,0,0,1-1.4566-4.3667l.0366-.127.126-.0415a9.6715,9.6715,0,0,1,2.9683-.5346c4.3711,0,4.8125,4.2964,4.8164,4.34l.0083.0918-.0532.0752A4.24,4.24,0,0,1,936.92,376.67,3.7432,3.7432,0,0,1,935.6665,376.8849Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="#fff"
                  />
                  <path
                    d="M934.2216,370.776a4.5172,4.5172,0,0,1,4.5673,4.1128,3.9963,3.9963,0,0,1-1.95,1.5449,3.49,3.49,0,0,1-1.1726.2006,4.4583,4.4583,0,0,1-2.9507-1.2234,4.0982,4.0982,0,0,1-1.3849-4.1125,9.3492,9.3492,0,0,1,2.8906-.5224m.0008-.5h0a9.9147,9.9147,0,0,0-3.0471.5472l-.2513.0824-.0734.2541a4.5678,4.5678,0,0,0,1.5312,4.6231,4.9769,4.9769,0,0,0,3.2848,1.3515,3.9891,3.9891,0,0,0,1.34-.2295,4.4742,4.4742,0,0,0,2.1906-1.7275l.1062-.15-.0167-.1833c-.0041-.0457-.4683-4.5676-5.0644-4.5676Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="#401737"
                  />
                </g>
                <g>
                  <path
                    d="M951.0991,380.5069a3.02,3.02,0,0,1-1.2124-.2431,2.6752,2.6752,0,0,1-.8183-.5381l-.0777-.0733V379.64a2.886,2.886,0,0,1-.3437-.4384l-.04-.0616v-.0127a4.2361,4.2361,0,0,1-.5517-1.7031l-.01-.0791.0371-.07c.0591-.1094,1.4693-2.6982,3.9-2.6982a5.1541,5.1541,0,0,1,3.5728,1.832l.0908.0918-.023.1279a4.7112,4.7112,0,0,1-1.7978,2.8594c-.0757.06-.1528.1162-.2334.1709v.0185l-.1372.08a.8253.8253,0,0,1-.1172.0742A4.3264,4.3264,0,0,1,951.0991,380.5069Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="#fff"
                  />
                  <path
                    d="M951.9831,374.8264a4.8588,4.8588,0,0,1,3.3942,1.7564,4.46,4.46,0,0,1-1.7045,2.7062,3.6813,3.6813,0,0,1-.33.2343v.0107c-.0427.0213-.0747.0532-.1173.0745a4.1458,4.1458,0,0,1-2.1269.6479,2.7748,2.7748,0,0,1-1.1119-.2217,2.4477,2.4477,0,0,1-.7459-.49v-.0106a2.44,2.44,0,0,1-.3834-.4688v-.0107a3.9171,3.9171,0,0,1-.554-1.662s1.37-2.5661,3.68-2.5661m0-.5c-2.58,0-4.0594,2.715-4.1211,2.8306l-.0747.14.02.1574a4.54,4.54,0,0,0,.55,1.7418v.0059l.08.1345a3.2278,3.2278,0,0,0,.3033.401v.0107l.1553.1584a2.9334,2.9334,0,0,0,.8958.5885,3.2617,3.2617,0,0,0,1.3067.2612,4.613,4.613,0,0,0,2.3879-.7214.6674.6674,0,0,0,.0881-.0568l.2762-.1382-.0015-.0566c.0457-.0334.0908-.0677.1359-.1038a4.9461,4.9461,0,0,0,1.8844-3.0078l.0461-.2548-.1815-.1847a5.39,5.39,0,0,0-3.7508-1.9059Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="#401737"
                  />
                </g>
                <path
                  d="M937.3186,375.0273a2.245,2.245,0,0,1-.4794,1.4064,4.1346,4.1346,0,0,1-4.1232-1.0229,2.3177,2.3177,0,1,1,4.6026-.3835Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <path
                  d="M953.3744,378.82a2.1591,2.1591,0,0,1-.1493.7884,3.5841,3.5841,0,0,1-3.2387.4261,2.45,2.45,0,0,1-.7459-.49v-.0107a2.4435,2.4435,0,0,1-.3834-.4688v-.0107a1.7965,1.7965,0,0,1-.0107-.2343,2.264,2.264,0,1,1,4.528,0Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <circle cx="942.1138" cy="242.2421" r="0.5304" fill="#fff" />
                <circle cx="926.361" cy="238.8282" r="0.5304" fill="#fff" />
                <path
                  d="M944.71,391.7078l-1.22,3.32s-.33-.04-.88-.14c-.32-.06-.72-.15-1.17-.26v-.01a17.5925,17.5925,0,0,1-8.07-4.19,2.4355,2.4355,0,0,1-.27-.29,9.7757,9.7757,0,0,1-1.3-1.68,7.771,7.771,0,0,1,1.78.65,37.16,37.16,0,0,0,10.43,2.56C944.24,391.6878,944.48,391.6978,944.71,391.7078Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#401737"
                />
                <path
                  d="M941.44,394.6178a17.5925,17.5925,0,0,1-8.07-4.19,4.84,4.84,0,0,1,3.9383,1.7283C939.3283,392.2262,941.12,393.4278,941.44,394.6178Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#f27075"
                />
                <path
                  d="M944.02,391.6522l-.33,1.0856a36.6045,36.6045,0,0,1-10.11-3.02v-.63A37.2192,37.2192,0,0,0,944.02,391.6522Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="#fff"
                />
              </g>
              <path
                d="M898.7687,392.6377s-27.6667-19.3334,3-63.5A95.213,95.213,0,0,1,944.602,314.971S894.7687,342.1377,898.7687,392.6377Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-8)"
              />
              <path
                d="M899.2279,392.7128l13.8079,7.7582s28.3334,9.6667,41.5,3.3333c4.3334-4.1666,14.5672-6.9,16.425-8.7582,10.3333-19.6666,21.3725-60.4116-25.5-80,0,0-24.2329,14.3334-33.5662,28.6667S897.8946,380.38,899.2279,392.7128Z"
                transform="translate(-9.9166 -135.4679)"
                opacity="0.2"
                fill="url(#linear-gradient-9)"
              />
              <path
                d="M902.9354,395.8043a8.166,8.166,0,0,1-1.1667,6.5c10,5.1667,29.0766,16.9836,53.3716,6.2418a11.2648,11.2648,0,0,1-.0383-5.0751S936.9354,413.471,902.9354,395.8043Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-10)"
              />
              <path
                d="M900.7687,402.3043c-47,28.5-45.8911,81.6667-41.491,88.9067,4.39,7.25,36.47-5.83,36.47-5.83s12.98,18.6608,21.72,38.28c36.5156-46.0456,69.07-46.59,69.07-46.59,11.731-62.7667-32.12-68.52-32.12-68.52S935.102,421.471,900.7687,402.3043Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-11)"
              />
              <path
                d="M958.6854,410.5543s5.6666,3.9167,6.6666,19.1667"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                stroke="url(#linear-gradient-12)"
              />
              <path
                d="M911.3371,399.2578a7.022,7.022,0,0,0,3.9522-4.7481c4.9607,5.4582,18.5857,10.6457,25.58,9.3688,2.6932,1.4644,7.9771,1.589,7.9771,1.589S935.5493,409.5478,911.3371,399.2578Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-13)"
              />
              <path
                d="M891.602,407.471s17.8715,9.6487,5.5608,55.5744"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                strokeMiterlimit="10"
                strokeWidth="3"
                stroke="url(#linear-gradient-14)"
              />
              <path
                d="M912.42,410.88a60.0481,60.0481,0,0,0,27.5157,33.4248c10.6666-11,7.1509-29.4248,7.1509-29.4248"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M931.602,413.221s10,31,10.75,51.25,10.75,24.75,10.75,24.75"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M857.477,482.471s3.625-3.625,9.5.5,5.625,8.875,1.875,9.75S859.227,494.846,857.477,482.471Z"
                transform="translate(-9.9166 -135.4679)"
                fill="url(#linear-gradient-15)"
              />
              <path
                d="M943.3852,315.8132s28.7815,9.3213,34.4481,37.1547c3.1226,20.3048-8.1666,41.5418-8.1666,41.5418s-14.0845,5.4725-16.2923,9.132.89,7.1372,7.5079,8.4817S978,419.1417,984,435.8881"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#f27075"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
              <path
                d="M963.4737,435.9211s1.9785-17.05-8.3334-27.375c12.9382,2.4249,26.6882,11.9249,30.4382,29.1749"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M960.2754,409.88s7.4268,8.4257,5.6149,26.0086"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M896.4737,485.38s16.0637,25.7771,20.6283,37.5915"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M936.2392,458.6039c7.33-3.23,14.3016-3.136,12.5288,1.5322"
                transform="translate(-9.9166 -135.4679)"
                stroke="#401737"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                fill="url(#linear-gradient-16)"
              />
              <path
                d="M890.1735,407.984s17.7026,9.4706,6.0955,54.8121"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M891.1931,412.7128c-3.34-3.0371-14.198,6.4085-9.3646,11.3333S896.2244,417.2879,891.1931,412.7128Z"
                transform="translate(-9.9166 -135.4679)"
                stroke="#401737"
                strokeMiterlimit="10"
                fill="url(#linear-gradient-17)"
              />
              <path
                d="M881.8285,424.0461s-21.1667,20.0137-21.8334,56.75"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M857.506,482.181s2.98-4.026,10.0184.8357,4.1688,10.05,0,9.9259"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M871.7938,489.4938s23.368-6.3725,34.368-13.4477,23.9785-7.75,23.9785-7.75"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M901.7577,394.7854s33.4445,18.3359,53.1326,8.7607"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M891.64,406.5461s19.9786-5.4248,7.5-14-19.5214-29.9248,2-63.25c22.5215-13.6584,44-14.5,44-14.5s56.5523,19.2788,25.25,80.25c-16.75,7.8-17.38,9.25-15.25,13.5-23.9381,13.5752-54.125-6.5259-54.125-6.5259"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M899.14,392.5461s-7.1881-47.5915,46-77.75"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <ellipse
                cx="896.9408"
                cy="358.7842"
                rx="7.4881"
                ry="5.0262"
                transform="translate(313.8979 1000.9764) rotate(-75.4121)"
                stroke="#401737"
                strokeMiterlimit="10"
                fill="url(#linear-gradient-18)"
              />
              <path
                d="M895.0549,366.0309s-2.2053,18.2692,3.5585,25.638"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M898.8268,351.5375s5.1683-28.9162,44.1683-36.7414"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M899.89,483.2961s10.5919,22.3137,20.4911,35.5907"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M928.14,462.7961s6.0153-5.2712,13.9351-4.8815,12.235,7.0138,9.92,11.5065-9.0214-1.0416-9.0214-1.0416a29.84,29.84,0,0,0-11.8334,2.6666"
                transform="translate(-9.9166 -135.4679)"
                stroke="#401737"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                fill="url(#linear-gradient-19)"
              />
              <path
                d="M899.14,463.211s12.5619-44.34-7.5-56.6649c0,0-44.5787,41.5738-32.32,83.6243,2.2585,6.0506,23.5983,1.7009,43.0534-8.2493s28.7669-10.875,28.7669-10.875l-3-8.25a182.8778,182.8778,0,0,1-30.9775.2493,56.1065,56.1065,0,0,0-27.2725,4.7507"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
              <path
                d="M909.0863,406.38l-2.1666,2s13.3333,5.6666,15.6666,6.1666l.6667-2.6666"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M938.753,414.2128l.5,1.8333s9.1667-1,13.8333-3a19.0564,19.0564,0,0,1-1.3333-2.6666"
                transform="translate(-9.9166 -135.4679)"
                fill="none"
                stroke="#401737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            <g className="notebook-light mover">
              <g id="Luz_notebook" data-name="Luz notebook">
                <polygon
                  points="920.544 340.836 699.044 171.078 943.044 50.578 1024.185 309.17 968.019 340.836 920.544 340.836"
                  opacity="0.3"
                  fill="url(#linear-gradient-20)"
                />
              </g>
            </g>

            <g className="notebook mover">
              <g id="notebook">
                <g>
                  <path
                    d="M960.98,426.7961s-7.25,28-7,47.25c-8.25.5,34.5,3.25,34.5,3.25l32.25,4.5,13.75-36.75S996.98,429.0461,960.98,426.7961Z"
                    transform="translate(-9.9166 -135.4679)"
                    fill="url(#linear-gradient-21)"
                  />
                  <path
                    d="M961.89,428.2961s38.9847,3.1718,70.8906,17.6195c-3.4476,9.1817-13.2788,34.57-13.2788,34.57"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#f27075"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                  <polygon
                    points="919.938 339.035 919.474 342.079 987.135 349.912 1010.745 346.008 943.724 338.328 919.938 339.035"
                    fill="url(#Gradiente_sem_nome_8)"
                  />
                  <polygon
                    points="987.135 349.912 919.474 342.079 919.938 339.035 943.724 338.328 1010.745 346.008 987.135 349.912"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M1020.6614,481.4756l13.9789-36.6795s-28.7976-12.4488-73.75-18.5c0,0-7.6048,28.1585-7.25,47.5"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M963.307,427.38s-6.5215,24.7418-7.6667,46.1666"
                    transform="translate(-9.9166 -135.4679)"
                    fill="none"
                    stroke="#401737"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <ellipse
                    cx="997.7087"
                    cy="455.3863"
                    rx="3.1573"
                    ry="2.4532"
                    transform="matrix(0.2916, -0.9565, 0.9565, 0.2916, 261.279, 1141.4889)"
                    stroke="#401737"
                    strokeMiterlimit="10"
                    fill="url(#linear-gradient-22)"
                  />
                </g>
              </g>
            </g>

            <g className="mover">
              <g id="perna_esquerda">
                <path
                  d="M991.001,623.821c-13.12-.85-31.79-4.18-25.96-17.18,5.84-13,6.81-19.09,3.39-37.54-3.43-18.46-4.76-28.16-4.76-28.16s.42-1.71-5.94,1.31c-6.35,3.02-28.03,3.22-37.87-14.49-.83-1.49-1.7966-2.99-2.6765-4.56,41.093-49.2852,69.6865-46.13,69.6865-46.13,26.17,1.73,17.35,19.43,14.16,40.42-3.19,21-13.28,79.17-6.55,85.16,4.9,5.02,13.46-1.44,17.93,4.19S1004.121,624.681,991.001,623.821Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="url(#linear-gradient-23)"
                />
                <path
                  d="M964.352,610.471s-1.0235,13.25,25.875,13.25c24.125,0,24.125-17.75,21.5-17.625s-8.2358,1.8874-15.375,10C990.852,622.346,974.227,621.096,964.352,610.471Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="url(#linear-gradient-24)"
                />
                <path
                  d="M993.602,600.1377s-12.0833,1.3333-13.5,6.5833,7.9167,10.25,10.3334,7.25,7.75-8.1667,12.8333-9.1667C996.9354,604.1377,994.1854,603.3043,993.602,600.1377Z"
                  transform="translate(-9.9166 -135.4679)"
                  fill="url(#linear-gradient-25)"
                />
                <path
                  d="M1005.0505,618.9679s8.4129-5.4653,7.1812-11.2952-9.3567.5617-14.8567-1.6966-7.3624-9.0082-5.2437-29.6332,9.9278-69.1257,11.1374-79.2471,1.512-22.638-27.6284-17.508c-8.05,1.91-25.4119,12.88-39.4011,25.63"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#f27075"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M992.5252,482.199c-7.9086,2.1253-7.0869,16.5547,3.7242,14.7392S1002.47,479.5265,992.5252,482.199Z"
                  transform="translate(-9.9166 -135.4679)"
                  stroke="#401737"
                  strokeMiterlimit="10"
                  fill="url(#linear-gradient-26)"
                />
                <path
                  d="M933.39,506.0461s34.959-36.6748,62.1986-27.5c14.1764,4.75,9.0959,17.0849,5.9487,38.1675s-12.5854,77.7877-7.3973,84.8976c3.9517,7.11,15.7092-1.3194,18.657,5.2286s-8.7618,21.2955-32.0736,15.7967-15.8943-13.9319-12.4781-22.4237,3.7632-13.9046.0614-33.9315-9.1881-40.4934,1.5833-62.7352"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
                <path
                  d="M920.3814,518.8868c3.4387,4.6121,6.7938,8.1337,9.5923,9.2509,20.9684,8.8333,21.64-35.9949,40.7916-27.2166,5.5632,2.55-.48,6.2166,1.375,8.8832s-7.2249,13.0753-1.9282,43.2237,5.4282,31.2681,5.4282,31.2681"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <ellipse
                  cx="975.0767"
                  cy="589.9409"
                  rx="5.6437"
                  ry="2.7251"
                  transform="translate(294.1124 1375.6136) rotate(-85.1016)"
                  stroke="#401737"
                  strokeMiterlimit="10"
                  fill="url(#linear-gradient-27)"
                />
                <path
                  d="M974.5948,595.564s.9407,11.2656-6.2878,18.1488"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M964.64,610.0461s3.3463,9.272,23.625,10.3611c8.8132,0,13.1124-14.7878,24.0253-14.4245"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M992.9737,600.2128s-12.6519,1.2-13.1485,7.1667,8.9921,9.1432,10.4818,7.1666,5.8708-8.3249,14.1492-10.1737"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M982.0107,612.3441s-3.7668,3.2018-3.537,9.7269"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M977.7919,590.1736a26.1994,26.1994,0,0,0,14.8392-.5025"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M917.102,522.971c5.6667,14.6667,27.2669,27.9836,46.3717,16.7418"
                  transform="translate(-9.9166 -135.4679)"
                  fill="none"
                  stroke="#401737"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </g>
            </g>
          </g>
        </svg>
      </WrapBox>

      <BoxIsland>
        <MainIsland>
          <BoxAstronaut>
            <img className="astronaut" src={island.imgMain1} alt="" />
            <img className="astronaut-atm" src={island.imgMain2} alt="" />
          </BoxAstronaut>
          <img src={island.imgMain} alt="" />

          <TitleGame>{island.title}</TitleGame>
          <Link to={island.route} className="full"></Link>
        </MainIsland>

        <ThreeIsland>
          <Item
            onClick={() => {
              setGame(1)
              setIsland(data[0])
            }}
            className={gameId === 1 ? 'active-island' : ''}
          >
            <BoxThumb className="left">
              <img src={data[0].imgMini1} alt="" />
            </BoxThumb>
            <img src={data[0].imgMini2} alt="" className="vert-move" />
          </Item>

          <Item
            onClick={() => {
              setGame(2)
              setIsland(data[1])
            }}
            className={gameId === 2 ? 'active-island' : ''}
          >
            <BoxThumb className="center">
              <img src={data[1].imgMini1} alt="" className="element" />
            </BoxThumb>
            <img src={data[1].imgMini2} alt="" className="vert-move" />
          </Item>

          <Item
            onClick={() => {
              setGame(3)
              setIsland(data[2])
            }}
            className={gameId === 3 ? 'active-island' : ''}
          >
            <BoxThumb className="right">
              <img src={data[2].imgMini1} alt="" className="element" />
            </BoxThumb>
            <img src={data[2].imgMini2} alt="" className="vert-move" />
          </Item>
        </ThreeIsland>
      </BoxIsland>
    </BgGame>
  )
}

export default PlayToEarn
