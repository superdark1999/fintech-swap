import React, {useState, useEffect}from 'react'
import styled from 'styled-components'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import BigNumber from 'bignumber.js'

import useUtilityToken from 'hooks/useUtilityToken';

export default function DepositModal({ 
  depositModal, 
  depositToggle, 
  depositSymbol,  
  value, 
  onChangeValue,
  stakingContract,
  addTransaction,
  account,
  stakingData,
  setIsDepositing
}) {
  const [balance, setBalance] = useState(0);
  const {balanceOf, approve, allowance} =  useUtilityToken(stakingData.depositToken);


  useEffect(() => {
    const fetchBalance = async () => {
      const bal = await balanceOf(account);
      setBalance(parseFloat((bal /1e18).toFixed(4)));
    }
    if (account)
      fetchBalance()
  },[account, balanceOf])

  const handleDeposit = async () => {
    if (stakingContract) {
      setIsDepositing(true);
      depositToggle()
      const args = [new BigNumber(value).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas.deposit(...args)
      .catch(() => console.log("Fail estimate gas deposit"));
       stakingContract
        .deposit(...args, { gasLimit: gasAm })
        .then((response: any) => {
          addTransaction(response, {
            summary: 'Deposit successfully!',
          })
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
  }


  return (
    <div>
      
      <Modal isOpen={depositModal} toggle={depositToggle}>
        <ModalHeader toggle={depositToggle}></ModalHeader>

        <ModalBody>
          <Title>Deposit LuckySwap Tokens</Title>
          <Available>{balance} {depositSymbol}</Available>

          <BoxInput>
            <input type="text" id="fname" name="fname" placeholder="0.000"
              value={value}
              onChange={onChangeValue}
              />
            <BoxLink>
              <span className="text-lucky">{depositSymbol}</span>
              <BoxButton>
                <Button>Max</Button>
              </BoxButton>
            </BoxLink>
          </BoxInput>
        </ModalBody>

        <ModalFooter>
          <CancelButton>
          <Button color="primary" onClick={depositToggle}>Cancel</Button>
          </CancelButton>
          <Button color="secondary" onClick={handleDeposit} disabled={false}>Deposit</Button>
        </ModalFooter>
      </Modal>
      
    </div>
  )
}


const BoxInput = styled.div`
  display: flex;
  align-items: center;
  background: #4d4d50;
  border-radius: 10px;
  height: 72px;
  padding: 0px 16px;
  margin: 16px 0px 48px;

  input {
    flex: 1 1 0%;
    width: 0px;
    background: none;
    border: 0px;
    color: #fff;
    font-size: 18px;
    height: 56px;
    margin: 0px;
    padding: 0px;
    outline: none;
  }
`

const Title = styled.h5`
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;
`
const Available = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
`

const BoxLink = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
`

const BoxButton = styled.div`
  margin-left: 12px;

  button {
    width: 100%;
    font-weight: 500;
    text-align: center;
    border-radius: 10px;
    outline: none;
    border: 1px solid transparent;
    text-decoration: none;
    display: flex;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
    cursor: pointer;
    position: relative;
    z-index: 1;
    background-color: #f5c606;
    color: #2b2e2f;
    font-family: "Baloo Da";
    padding: 0px 10px;
    height: 40px;
  }
`

const CancelButton = styled.div`
  button {
    color: #2b2e2f;
    border: none;
    :hover{
      opacity: .8;
      color: #2b2e2f;
    }
  }

`