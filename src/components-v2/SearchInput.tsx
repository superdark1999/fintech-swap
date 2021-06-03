import React from 'react'
import styled from 'styled-components'
import {SearchOutlined} from '@ant-design/icons'
export default function SearchInput(props: Props) {
  return (
    <Search {...props}>
      <SearchOutlined className="icon-search"/>
      <input placeholder={props.placeholder || "Search tag"} />
    </Search>
  )
}

interface Props {
  maxWidth?: string,
  placeholder?: string,
}

const Search = styled.div<Props>`
  max-width: ${props => props.maxWidth || '100%'};
  background: #FFFFFF;
  border: 1px solid #E7EBEF;
  box-sizing: border-box;
  border-radius: 100px;
  height: 40px;
  width: calc(100% - 52px );  
  display: flex;
  align-items: center;
  padding: 10px;
  >input {
    width: 100%;
    border: none;
    border-radius: 100px;
    padding-left: 10px;
    :focus{
      outline: unset;
    }
  }
`