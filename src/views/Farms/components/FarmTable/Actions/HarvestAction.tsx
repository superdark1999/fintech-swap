import React, { useState, useRef, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Button } from '@luckyswap/uikit'
import BigNumber from 'bignumber.js'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { getBalanceNumber } from 'utils/formatBalance'
import { useHarvest } from 'hooks/useHarvest'
import useI18n from 'hooks/useI18n'
import { usePriceLuckyBusd } from 'state/hooks'
import { useCountUp } from 'react-countup'
import { useFarmNFTContract, useFarmsContract } from 'hooks/useContract'

import { ActionContainer, ActionTitles, Title, Subtle, ActionContent, Earned, Staked } from './styles'
import { FarmType } from '../../../../../constants/index'

const WrapAction: React.FC<FarmWithStakedValue> = (props) => {
  const { type } = props
  const newFarmContract = useFarmNFTContract()
  const farmContract = useFarmsContract()

  const render = () => {
    switch (type) {
      case FarmType.LUCKYSWAP:
        return <HarvestAction {...props} farmContract={farmContract} />
      case FarmType.SPACEHUNTER:
        return <HarvestAction {...props} farmContract={newFarmContract} />
      default:
        return <HarvestAction {...props} farmContract={farmContract} />
    }
  }
  return <> {render()} </>
}

const HarvestAction: React.FunctionComponent<FarmWithStakedValue> = ({ pid, userData, farmContract }) => {
  const { account } = useWeb3React()
  const earningsBigNumber = userData && account ? new BigNumber(userData.earnings) : null
  const cakePrice = usePriceLuckyBusd()
  let earnings = null
  let earningsBusd = 0
  let displayBalance = '?'

  if (earningsBigNumber) {
    earnings = getBalanceNumber(earningsBigNumber)
    earningsBusd = new BigNumber(earnings).multipliedBy(cakePrice).toNumber()
    displayBalance = earnings.toLocaleString()
  }

  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const TranslateString = useI18n()

  const { countUp, update } = useCountUp({
    start: 0,
    end: earningsBusd,
    duration: 1,
    separator: ',',
    decimals: 3,
  })
  const updateValue = useRef(update)

  async function _onReward() {
    console.log('claim : ', farmContract.address)
    if (farmContract) {
      const args = [pid, new BigNumber(0).times(new BigNumber(10).pow(18)).toString()]
      await farmContract
        .deposit(...args, { gasLimit: 200000 })
        .then((response: any) => {
          console.log('response>>', response)
        })
        .catch((error: any) => {
          // setAttempting(false)
          console.log(error)
        })
    }
  }

  useEffect(() => {
    updateValue.current(earningsBusd)
  }, [earningsBusd, updateValue])

  return (
    <ActionContainer className="border-r">
      {/* <ActionTitles>
        <Title>BEST</Title>
        <Subtle>{TranslateString(999, 'EARNED')}</Subtle>
      </ActionTitles> */}

      <ActionContent>
        <div>
          <Earned>{displayBalance}</Earned>
          <Staked>~{countUp}USD</Staked>
        </div>
        <Button
          variant="tertiary"
          disabled={!earnings || pendingTx || !account}
          onClick={async () => {
            setPendingTx(true)
            await _onReward()
            setPendingTx(false)
          }}
          mb="10px"
        >
          {TranslateString(562, 'Harvest')}
        </Button>
      </ActionContent>
    </ActionContainer>
  )
}

export default WrapAction
