// eslint-disable-next-line no-restricted-globals

import React, { useEffect, useState } from 'react'
import { Collapse, Button, CardBody, Card, Table } from 'reactstrap'
import { useHookAuseHookNTFirdrop } from '../Store'
import styled from 'styled-components'
import moment from 'moment'
const History: React.FC = () => {
  const [state, actions] = useHookNTF();
  let listADY: any = [];
  const isLoading: any = false;
  useEffect(() => {
    actions.getHistorys()
  }, [])
  return (
    <LuckyWrap>
      <Title>History</Title>

      <TableBox className={isLoading ? 'loading' : ''}>
        <BoxTitle>
          <TitleTable>Txn Hash.</TitleTable>
          <TitleTable> Bonus</TitleTable>
          <TitleTable>Date</TitleTable>
        </BoxTitle>
        {state.historys.filter(x=>x.to!=="0x01bb83b35576c9ac92af674e78d7c3ddf62093b6").map((item) => {
          return (
            <BoxRow key={`sum_order_${item.transactionHash}`}>
              <RowItem>
                <RowContent className="font-bold">
                  <a target="_blank" href={`https://etherscan.io/tx/${item.transactionHash}`} >{item.transactionHash.substr(0,30)}...</a>
                </RowContent>
                <RowContent style={{color:"rgb(255, 193, 7)"}}>{item.value/1e18}</RowContent>
                <RowContent>{moment(item.timestamp*1000).format("MM/DD/YYYY HH:mm:ss")}</RowContent>
              </RowItem>

            </BoxRow>
          )
        })}

      </TableBox>
    </LuckyWrap>
  )
}

const LuckyWrap = styled.div`
margin-top: 50px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    overflow-y: scroll;
    width: 345px;
  }

  .table-striped {
  

    tbody {
      tr {
    
        td {
          &:last-child {
            display: flex;
          }
        }
      }
    }
  }
`

const RowItem = styled.div`
  display: table;
  width: 100%;
`

const BoxRow = styled.div`
  display: table;
  width: 100%;



`

const RowContent = styled.div`
  display: table-cell;
  width: 300px;
  vertical-align: middle;
  padding: 4px 7px;
  color:white;
  &.font-bold {
    font-weight: 700;
  }
`

const TableBox = styled.div`
  width: 100%;
  font-size: 14px;
  display: table;
`

const BoxTitle = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 0;

  @media(min-width: 768px) {
    display: table;
  }
`

const TitleTable = styled.div`
  display: flex;
  width: 300px;
  padding: 0 7px;
  font-weight: 700;
  color:#7e96b8;
  @media(min-width: 768px) {
    display: table-cell;
    width: 23%;
  }
`

const Title = styled.h4`
  color: ${(props) => props.theme.color.navy};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 18px;
`
const ButtonCl = styled.button`
  width: 100%;
  max-width: 120px;
  font-weight: 600;
  color: ${(props) => props.theme.color.navy};
  background: linear-gradient(
    0deg,
    rgba(212, 255, 225, 1) 0%,
    rgba(148, 253, 255, 1) 100%
  );
  background-size: 200% auto;
  box-shadow: -1px 1px 0px 0px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.5s;
  border: none;
  padding: 5px;
  border-radius: 12px;
  margin: 0 !important;

  &:hover {
    background-position: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  &:focus {
    outline: none;
  }
`

const ButtonTb = styled.a`
  width: 100%;
  max-width: 120px;
  font-weight: 600;
  color: ${(props) => props.theme.color.navy};
  background-image: linear-gradient(
    to right,
    rgb(169, 226, 226) 0%,
    rgb(247, 252, 252) 50%,
    rgb(176, 228, 228) 100%
  );
  background-size: 200% auto;
  box-shadow: -1px 1px 0px 0px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  transition: 0.5s;
  border: none;
  padding: 5px 0;
  border-radius: 4px;
  width: 100%;
  max-width: 100px;
  border-radius: 12px;
  margin: 0 5px;
  text-align: center;

  &:hover {
    text-decoration: none;
    background-position: 100%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }

  &:focus {
    outline: none;
  }
`
export default History
