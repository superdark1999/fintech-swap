import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon } from '@luckyswap/uikit'
import UnlockButton from 'components/UnlockButtonFarm'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import { ActionContainer, ActionTitles, ActionContent, Earned, Title, Subtle } from './styles'

const StakeNFT = styled.div`

`
const BoxAction = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: space-between;
`
const NFTChosen = styled.div`
`
const BonusAndAction = styled.div`
  margin: auto 0;
`
const Bonus = styled.div`
  color: #5ffff8;
  margin-bottom: 14px;
`
const StakeAction = styled.div`
  cursor: pointer;
  border-radius: 16px;
  padding: 14px 24px;
  background-color: transparent;
  border: 2px solid rgb(255, 255, 255);
  box-shadow: none;
  color: rgb(255, 255, 255);
  :hover{
    opacity: 0.7;
  }
`
const ImgNFT = styled.img`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 30px;
  border: 2px solid #ffffff;
`
const TitleNFT = styled(Title)`
 color: white;
 margin-bottom: 
`
const Staked: React.FunctionComponent<FarmWithStakedValue> = ({ pid, lpSymbol, lpAddresses, quoteToken, token }) => {
  const [Nft, setNFT] = useState()
  const [open, setOpen] = useState(false)
  
  return(
    <StakeNFT>
      <TitleNFT>
        Stake NFT to bonus your farm
      </TitleNFT>
      <BoxAction>
        <NFTChosen>
          <ImgNFT src="/images/farms/image.png"/>
        </NFTChosen>
        <BonusAndAction>
          <Bonus>
            Bonused: 2%
          </Bonus>
          <StakeAction onClick={()=> setOpen(false)}>
            State
          </StakeAction>
        </BonusAndAction>

      </BoxAction>

    </StakeNFT>
  )
}

export default Staked
