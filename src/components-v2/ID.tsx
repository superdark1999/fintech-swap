import React from 'react'
import styled from 'styled-components'

export default function ID(props: { children?: any, width?: string, id?: boolean, fontSize?: string }) {
  const { children, width, id, fontSize } = props
  return (
    <IdStyled width={width} fontSize={fontSize}>
      {id && <div className="id">ID:</div>}
      {children && <div className="number">{children}</div>}
    </IdStyled>
  )
}

interface StyledProps {
  width?: string
  fontSize?: string
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
    color: #35A5FC;
    font-size: ${props => props.fontSize || '16px'};
    font-weight: 600;
    white-space: nowrap; 
    width: ${props => props.width || '200px'}; 
    overflow: hidden;
    text-overflow: ellipsis; 
    >img {
      margin-top: -3px;
      margin-left: 5px;
    }
  }
`
