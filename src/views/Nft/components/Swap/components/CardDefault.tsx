import React from 'react'
import styled from 'styled-components'
import Plus from 'assets/images/plus.svg'


export default (props: any) => {
  return (
    <StyledDefaultCart style={{ cursor: 'pointer' }} onClick={() => props.setVisible({ isOpen: true, value: props.value })}>
      <img src={Plus} style={{ margin: 'auto 40px' }} />
    </StyledDefaultCart>
  )
}

const StyledDefaultCart = styled.div`
    width: 280px;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #E7EBEF;
    box-sizing: border-box;
    border-radius: 24px;
`