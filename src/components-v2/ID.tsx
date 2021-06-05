import React from 'react'
import styled from 'styled-components'

export default function ID(props : { children? : any, width?: string}) {
  const { children, width } = props
  return (
    <IdStyled width={width}>
      <div className="id">ID:</div>
      {children && <div className="number">{children}</div>}
    </IdStyled> 
  )
}

interface StyledProps {
 width?: string
}

const IdStyled = styled.div<StyledProps>`
  display: flex;
  .id{
    color: #AFBAC5;
    font-weight: 600;
  }
  .number {
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    background: linear-gradient(270deg,#19A3DD -16.5%,#BADEB7 117.25%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 16px;
    font-weight: 600;
    white-space: nowrap; 
    width: ${ props => props.width || '200px' }; 
    overflow: hidden;
    text-overflow: ellipsis; 
    >img {
      margin-top: -3px;
      margin-left: 5px;
    }
  }
`
