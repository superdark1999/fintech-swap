import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  /* background: ${({ theme }) => theme.card.background}; */
  background: linear-gradient(45deg, rgb(35 35 35) 30%, rgb(45 45 45) 100%);
  box-shadow: 0px 0px 11px 0px rgb(16 16 16 / 57%);
  border-radius: 16px;
  margin: 16px 0px;
  margin-bottom: 60px;
`

const TableWrapper = styled.div`
  overflow: scroll;

  @media (min-width: 768px) {
    overflow: visible;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`

const TableBody = styled.tbody`
  & tr {
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const Tab = styled.div`
  display: grid;
  grid-template-columns: 350.73px 165px 1fr 1fr 1fr 1fr;
  width: 100%;
  height: 30px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding: 30px 32px;
  color: #fff;
`

const Item = styled.td`
  padding-right: 30px;

  &:first-of-type {
    padding-left: 18px;
    padding-right: 0;

    @media (min-width: 768px) {
      padding-left: 32px;
    }
  }



  &:last-child {
    padding-right: 0;
  }
`

const Text = styled.div`
  position: relative;
  width: fit-content;
  font-weight: 600;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`

const ArrowUp = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 4px 6px 4px;
  border-color: transparent transparent #8C8C8C transparent;
  margin-bottom: 3px;
`  

const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 6px 4px 0 4px;
  border-color: #8C8C8C transparent transparent transparent;
`  
const TableHeader = styled.tr`
  color: white;
`
const FarmTable: React.FC<ITableProps> = (props) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const TranslateString = useI18n()
  const { data, columns } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container>


      <TableContainer>
        <Tab>
          
        </Tab>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <thead>
              <TableHeader>
                <Item>
                  <Text>LP Tokens Name

                    <Arrow>
                      <ArrowUp></ArrowUp>
                      <ArrowDown></ArrowDown>
                    </Arrow>
                  </Text>
                </Item>

                <Item>
                  <Text>LP Platform
                    <Arrow>
                      <ArrowUp></ArrowUp>
                      <ArrowDown></ArrowDown>
                    </Arrow>
                  </Text>
                </Item>

                <Item>
                  <Text>Earned
                    <Arrow>
                      <ArrowUp></ArrowUp>
                      <ArrowDown></ArrowDown>
                    </Arrow>
                  </Text>
                </Item>

                <Item>
                  <Text>APR
                    <Arrow>
                      <ArrowUp></ArrowUp>
                      <ArrowDown></ArrowDown>
                    </Arrow>
                  </Text>
                </Item>

                <Item>
                  <Text>TLV
                    <Arrow>
                      <ArrowUp></ArrowUp>
                      <ArrowDown></ArrowDown>
                    </Arrow>
                  </Text>
                </Item>
              </TableHeader>
            </thead>
            <TableBody>
              {rows.map((row) => {
                return <Row {...row.original} key={`table-row-${row.id}`} />
              })}
            </TableBody>
          </StyledTable>
        </TableWrapper>
        <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {TranslateString(999, 'To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer>
      </TableContainer>
    </Container>
  )
}

export default FarmTable
