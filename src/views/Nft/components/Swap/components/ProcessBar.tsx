import React from 'react'
import styled from 'styled-components'

export default function ProcessBar(props: {step: Number}) {
  return (
    <Styled className="container">
      <ul className="progressbar">
        <li className={ props.step >= 1 ? "active": ""}>ON SALE</li>
        <li className={ props.step >= 2 ? "active": ""}>MAKE OFFER</li>
        <li className={ props.step === 3 ? "active": ""}>CONFIRM</li>
      </ul>
    </Styled>
  )
}


const Styled = styled.div`
width: 100%;
margin: 40px auto;

.progressbar {
  counter-reset: step;
  display: flex;
  /* justify-content: center; */
}
.progressbar li {
  list-style: none;
  display: inline-block;
  width: 30.33%;
  position: relative;
  text-align: center;
  cursor: pointer;
}
.progressbar li:before {
  content: counter(step);
  counter-increment: step;
  width: 30px;
  height: 30px;
  line-height : 30px;
  border: 1px solid #ddd;
  border-radius: 100%;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  background-color: #fff;
}
.progressbar li:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 1px;
  background-color: #ddd;
  top: 15px;
  left: -50%;
  z-index : -1;
}
.progressbar li:first-child:after {
  content: none;
}
.progressbar li.active {
  color: green;
}
.progressbar li.active:before {
  border-color: green;
} 
.progressbar li.active + li:after {
  background-color: green;
}`
