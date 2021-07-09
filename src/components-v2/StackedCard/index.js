import React from 'react'
import styled from 'styled-components'

export default function index({listItem= []}) {
  return (
    <Section>
      <section id="slider">
      {
        listItem.slice(0,5).map((item, i) => {
          return (
              <input type="radio" name="slider" id={`s${i+1}`} defaultChecked={i===Math.round(listItem.length/2 -1)}/>
              
          )
        })
      }
      {
        listItem.slice(0,5).map((src, i) => {
          return (
            <label for={`s${i+1}`} id={`slide${i+1}`} >
              <img key={i} src={`https://dashboard.luckyswap.exchange/${src.link}`} alt="banner" />
            </label>
          )
        })
      }
      </section>
    </Section>
  )
}

const Section = styled.div`

  [type=radio] {
    display: none;
  }

  @media only screen and (max-width: 600px) {
      #slider {
      height: 120px;
      position: relative;
      perspective: 1000px;
      transform-style: preserve-3d;
      label {
        margin: auto;
        width: 340px;
        height: 120px;
        border-radius: 4px;
        position: absolute;
        left: 0; right: 0;
        cursor: pointer;
        transition: transform 0.4s ease;
        border-radius: 24px;
        > img {
          width: 340px;
          height: 120px;
        }
      }
    }
  }

  @media only screen and (min-width: 768px) {
    #slider {
      height: 200px;
      position: relative;
      perspective: 1000px;
      transform-style: preserve-3d;
      label {
        margin: auto;
        max-width: 1150px;    
        width: 100%;
        height: 380px;
        border-radius: 4px;
        position: absolute;
        left: 0; right: 0;
        cursor: pointer;
        transition: transform 0.4s ease;
        border-radius: 24px;
        > img {
          max-width: 1150px;    
          height: 380px;
          width: 100%;
        }
      }     
    }
  }   

  @media only screen and (min-width: 992px) {
    #slider {
      height: 300px;
      position: relative;
      perspective: 1000px;
      transform-style: preserve-3d;
      label {
        margin: auto;
        max-width: 850px;    
        width: 100%;
        height: 300px;
        border-radius: 4px;
        position: absolute;
        left: 0; right: 0;
        cursor: pointer;
        transition: transform 0.4s ease;
        border-radius: 24px;
        > img {
          max-width: 850px;    
          height: 300px;
          width: 100%;
        }
      }     
    }
  }   

    

#s1:checked ~ #slide4, #s2:checked ~ #slide5,
#s3:checked ~ #slide1, #s4:checked ~ #slide2,
#s5:checked ~ #slide3 {
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
  transform: translate3d(-30%,0,-200px);
}

#s1:checked ~ #slide5, #s2:checked ~ #slide1,
#s3:checked ~ #slide2, #s4:checked ~ #slide3,
#s5:checked ~ #slide4 {
  box-shadow: 0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2);
  transform: translate3d(-15%,0,-150px);
}

#s1:checked ~ #slide1, #s2:checked ~ #slide2,
#s3:checked ~ #slide3, #s4:checked ~ #slide4,
#s5:checked ~ #slide5 {
  box-shadow: 0 13px 25px 0 rgba(0,0,0,.3), 0 11px 7px 0 rgba(0,0,0,.19);
  transform: translate3d(0,0,0);
}

#s1:checked ~ #slide2, #s2:checked ~ #slide3,
#s3:checked ~ #slide4, #s4:checked ~ #slide5,
#s5:checked ~ #slide1 {
  box-shadow: 0 6px 10px 0 rgba(0,0,0,.3), 0 2px 2px 0 rgba(0,0,0,.2);
  transform: translate3d(15%,0,-150px);
}

#s1:checked ~ #slide3, #s2:checked ~ #slide4,
#s3:checked ~ #slide5, #s4:checked ~ #slide1,
#s5:checked ~ #slide2 {
  box-shadow: 0 1px 4px 0 rgba(0,0,0,.37);
  transform: translate3d(30%,0,-200px);
}
`



