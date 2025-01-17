import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import BigNumber from 'bignumber.js'

import { calculateGasMargin } from 'utils'

export default function UnStakeModal({
  withdrawModal,
  unStakeToggle,
  stakingContract,
  addTransaction,
  userAmount,
  setIsUnStaking,
  rewardTokenSymbol,
  stakingData,
}) {
  const [value, setValue] = useState('')
  const [balanceError, setBalanceError] = useState('')

  useEffect(() => {
    if (parseInt(value) > userAmount.div(1e18)) setBalanceError('Exceed amount of deposit balance')
    else setBalanceError('')
  }, [value, userAmount])

  const handleUnStake = async () => {
    if (stakingContract) {
      setIsUnStaking(true)
      unStakeToggle()
      const args = [new BigNumber(value).times(new BigNumber(10).pow(18)).toString()]
      const gasAm = await stakingContract.estimateGas.deposit(...args).catch(() => console.log('Fail estimate gas'))
      // console.log('gasAm', gasAm)
      // console.log('0x01b7f3', calculateGasMargin(gasAm))
      stakingContract
        .withdraw(...args, { gasLimit: calculateGasMargin(gasAm) })
        .then((response: any) => {
          addTransaction(response, {
            summary: 'Unstake successfully!',
            attr1: `${stakingData?.stakingAddress}unstake`,
          })
        })
        .catch((error: any) => {
          console.log(error)
          setIsUnStaking(false)
        })
    }
  }

  const handleMaxAmount = (e) => {
    setValue(userAmount.div(1e18).toString())
  }
  return (
    <div>
      <Modal isOpen={withdrawModal} toggle={unStakeToggle}>
        <ModalHeader toggle={unStakeToggle}></ModalHeader>

        <ModalBody>
          <Title>
            UnStake <span>{rewardTokenSymbol}</span> Tokens
          </Title>
          <Available>
            <span>{userAmount.div(1e18).toFixed(2)} </span> {rewardTokenSymbol}
          </Available>

          <BoxInput>
            <input
              type="number"
              id="fname"
              name="fname"
              placeholder="0.000"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <BoxLink>
              <span className="text-lucky">{rewardTokenSymbol}</span>
              <BoxButton>
                <Button onClick={handleMaxAmount}>Max</Button>
              </BoxButton>
            </BoxLink>
          </BoxInput>
          <Error>{balanceError}</Error>
        </ModalBody>

        <ModalFooter>
          <CancelButton>
            <Button color="primary" onClick={unStakeToggle}>
              Cancel
            </Button>
          </CancelButton>
          <UnStakeButton>
            <Button
              color="primary"
              onClick={handleUnStake}
              disabled={value === '' || value === '0' || balanceError !== ''}
            >
              UnStake
            </Button>
          </UnStakeButton>
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

const Error = styled.div`
  color: red;
`

const Title = styled.h5`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 25px;

  span {
    font-size: 24px;
    color: #f5c606;
  }
`
const Available = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  font-size: 14px;
  font-weight: 600;

  span {
    font-size: 20px;
    margin-right: 5px;
    color: #f5c606;
  }
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
    font-family: 'Baloo Da';
    padding: 0px 10px;
    height: 40px;
    &:hover {
      background: #f5c606 !important;
      border-color: transparent;
      opacity: 0.7;
    }

    &:focus {
      background-color: #f5c606;
      box-shadow: 0 0 0 0.25rem rgb(77 77 80);
    }
  }
`

const UnStakeButton = styled.div`
  button {
    color: #2b2e2f;
    background-color: #f5c606 !important;
    border: none;
    :hover {
      opacity: 0.8;
      color: #2b2e2f;
      background-color: #f5c606 !important;
    }
    :disabled {
      opacity: 0.5;
      color: #2b2e2f;
      pointer-events: all;
      cursor: not-allowed !important;
    }
  }
`

const CancelButton = styled.div`
  button {
    background-color: #6c757d !important;
    border: none;
    :hover {
      opacity: 0.8;
    }
  }
`
