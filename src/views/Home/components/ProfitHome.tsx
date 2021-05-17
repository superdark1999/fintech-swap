import React from 'react'
import styled from 'styled-components'

const ProfitHomeContainer = styled.div`
  max-height: 280px;
  margin-top: 30px;
  display: flex;
`
const CardProfit = styled.div`
  background-color: #00a7e1;
  color: #245288;
  flex: 1;
  height: 233px;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  .top-profit {
    flex: 1;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    align-items: center;
    display: flex;
  }
  .bottom-profit {
    flex: 1;
    align-items: center;
    display: flex;
  }
`
function ProfitHome() {
  return (
    <ProfitHomeContainer>
      <CardProfit style={{ marginRight: '20px' }}>
        <div className="top-profit">
          <div>A</div>
        </div>
        <div className="bottom-profit">
          <div>B</div>
        </div>
      </CardProfit>
      <CardProfit style={{ marginLeft: '20px' }}>B</CardProfit>
    </ProfitHomeContainer>
  )
}

export default ProfitHome
