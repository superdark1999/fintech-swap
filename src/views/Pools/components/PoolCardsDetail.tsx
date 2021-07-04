import React, {useState, useEffect, useMemo, useCallback} from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { useWeb3React } from '@web3-react/core'
import { useParams } from 'react-router-dom'
import { Pool} from 'config/constants/types';
import useGetStateData from 'hooks/useGetStakeData';
import { isTransactionRecent, useAllTransactions, useTransactionAdder } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import { useContract,  useStakingContract  } from 'hooks/useContract'
import SMART_CHEF_ABI from 'config/abi/smartChef.json'
import { useHookPools } from '../Store';



import UnStakeModal from './UnStakeModal';
import DepositModal from './DepositModal';
import PoolCardDetails from './PoolCardDetails';



// const stakingData = {
//   name: 'Lucky',
//   depositSymbol: 'XLUCKY2',
//   rewardSymbol: 'XLUCKY1',
//   depositToken: "0xeDa153eF21dCE7BAe808B0265d86564cc26524b6", // XLucky2
//   rewardToken: "0x5c2aaadd1fce223baaefb1cf41ce872e9d8b986a", // XLucky
//   stakingContract: "0x1dde4Fc6ca8121Cb11E988b524B275855F98aAA6",
  
// }

function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

interface HarvestProps {
  stakingData: Pool
}

function FetchPoolData() {
  const param: any = useParams()

  const [state, actions] = useHookPools();
  const { poolDetail } = state;

  useEffect(() => {
    const fetchPool = () => {
      actions.getPoolDetail(param.id)
    }

    fetchPool();
  }, [actions, param.id])

  if (poolDetail)
    return <PoolCardsDetail stakingData={poolDetail}/>
  return <div>loading</div>
}

const PoolCardsDetail: React.FC<HarvestProps> = ({ stakingData }) => {

  const [depositModal, setDepositModal] = useState(false);
  const [withdrawModal, setWithdrawModel] = useState(false);
  const [isUnStaking, setIsUnStaking] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const [isHarvesting, setIsHarvesting] = useState(false);
  const { account } = useWeb3React()

  const stakingContract = useStakingContract(stakingData?.stakingAddress);
  const { userAmount, userRewardDebt} = useGetStateData(stakingData);

  const addTransaction = useTransactionAdder()
  const contract = useContract(stakingData?.stakingAddress,SMART_CHEF_ABI );


  useEffect(() => {
    if (contract){
      contract.on('Withdraw',  () => {
        setIsUnStaking(false);

      })
      contract.on('Deposit',  () => {
        if (isDepositing)
          setIsDepositing(false);
        else
          setIsHarvesting(false);
      })
    }
  }, [contract, isDepositing])

  const depositToggle = () => setDepositModal(!depositModal);
  const unStakeToggle = () => setWithdrawModel(!withdrawModal);

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const getStatus = useCallback(() =>{
    const pending = sortedRecentTransactions.filter((tx) => !tx.receipt).map((tx) => tx.hash)
    return !!pending.length

  }, [sortedRecentTransactions])


  return (
    <>
      <Page>
        <BoxDetail>
          <BoxHead>
            <figure>
              <img src="../images/icon-logo.png" alt=""/>
            </figure>
            <h2>Lucky Swap</h2>
            <span>Deposit LuckySwap Tokens and earn LUCKY</span>
          </BoxHead>

          <PoolCardDetails 
            userRewardDebt={userRewardDebt} 
            userAmount={userAmount} 
            onUnStakeToggle={unStakeToggle}
            onDepositToggle={depositToggle}
            stakingContract={stakingContract}
            addTransaction={addTransaction}
            account={account}
            stakingData={stakingData}
            getStatus={getStatus}
            isDepositing={isDepositing}
            isUnStaking={isUnStaking}
            isHarvesting={isHarvesting}
            setIsHarvesting={setIsHarvesting}
          />

          <p className="line__bot"><img src="../images/icon-starts.png" alt=""/>
          Every time you stake and unStake EL tokens, the contract will automatically harvest HCATS rewards for you!
          </p>
        </BoxDetail>
      </Page>

      <DepositModal 
        depositModal={depositModal}
        depositToggle={depositToggle}
        depositSymbol={stakingData.depositTokenSymbol}
        stakingContract={stakingContract}
        addTransaction={addTransaction}
        account={account}
        stakingData={stakingData}
        setIsDepositing={setIsDepositing}
      />

      <UnStakeModal 
        withdrawModal={withdrawModal} 
        unStakeToggle={unStakeToggle}
        stakingContract={stakingContract}
        addTransaction={addTransaction}
        userAmount={userAmount}
        setIsUnStaking={setIsUnStaking}

      />
    </>
  )
}


const BoxHead = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 35px;

  figure {
    background: #212628;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.5);
    width: 96px;
    height: 96px;
    border-radius: 4px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 76px;
    }
  }

  h2 {
    color: #f5c606;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
  }

  span {
    color: #fff;
    font-size: 18px;
    line-height: 18px;
  }
`

const BoxDetail = styled.div`
  .box {
    &__item {
      background: rgb(41 41 41);
      box-shadow: 0px 0px 11px 0px rgb(29 26 26 / 57%);
      border-radius: 10px;
      padding: 46px 18px 18px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      figure {
        &.background {
          background: #212628;
          box-shadow: 0px 0px 12px rgb(0 0 0 / 50%);
          border-radius: 4px;
          padding: 16px;

          img {
            width: 70px;
          }
        }
      }

      .content {
        margin-top: 36px;
        margin-bottom: 26px;
        text-align: center;

        &__title {
          font-size: 36px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 5px;
        }

        &__des {
          font-size: 16px;
          color: #b9b9b9;
        }
      }
    }

    &__footer {
      border-top: 1px solid #D8D8D8;
      padding-top: 20px;
      width: 100%;
      text-align: center;

      button {
        background: #f5c606;
        margin-right: 20px;
        border-radius: 4px;
        font-weight: 600;
        width: 100%;
        max-width: 200px;
        min-height: 40px;
        border-color: transparent;
        color: #2b2e2f;


        &:hover {
          opacity: 0.7;
        }

        &:focus {
          border-color: transparent;
          box-shadow: none;
        }
      }
    }
  }

  .line__bot {
    color: #fff;
    font-size: 16px;
    margin-top: 50px;

    img {
      margin-right: 10px;
    }
  }
`



export default FetchPoolData
