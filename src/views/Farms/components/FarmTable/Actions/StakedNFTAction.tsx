import React, { useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { Button, useModal, IconButton, AddIcon, MinusIcon } from '@luckyswap/uikit'
import UnlockButton from 'components/UnlockButtonFarm'
import { useWeb3React } from '@web3-react/core'
import { useFarmUser } from 'state/hooks'
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard'
import StakeNFTModal from '../../StakeNFTModal'
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
  border: 2px solid #ffffff63;
  opacity: 0.8;
`
const TitleNFT = styled(Title)`
 color: white;
 margin-bottom: 
`
const Staked: React.FunctionComponent<FarmWithStakedValue> = ({ pid, lpSymbol, lpAddresses, quoteToken, token }) => {
  const [Nft, setNFT] = useState()
  const [visible, setVisible] = useState(false)
  const [myItems, setMyItems] = useState<any>([]);
  console.log("myItems.length:", myItems.length, myItems)
  const getItemSelected = (data?: any) => {
    setMyItems(data)
  }

  const NFTs = [
    {
      _id: '1',
      img:"https://lucky-swap.s3.ap-southeast-1.amazonaws.com/artwork/1627712694875.jpeg",
      name: "Rengar",
      bonus: 2,
    },
    {
      _id: '2',
      img:"https://lucky-swap.s3.ap-southeast-1.amazonaws.com/artwork/1627636979582.jpeg",
      name: "Till freitagz",
      bonus: 3,
    },
    {
      _id: '3',
      img:"https://lucky-swap.s3.ap-southeast-1.amazonaws.com/artwork/1628349564018.jpeg",
      name: "Ahri",
      bonus: 10,
    },
    {
      _id: '4',
      img:"https://lucky-swap.s3.ap-southeast-1.amazonaws.com/artwork/1627636979582.jpeg",
      name: "Till freitagz",
      bonus: 5,
    },
  ]
  
  return(
    <StakeNFT>
      <TitleNFT>
        Stake NFT to bonus your farm
      </TitleNFT>
      <BoxAction>
        <NFTChosen>
          <ImgNFT src={myItems.length === 0 ? "/images/farms/image.png" : myItems[0].img}/>
        </NFTChosen>
        <BonusAndAction>
          <Bonus>
            Bonused: {myItems.length === 0 ? "?" : myItems[0].bonus}%
          </Bonus>
          <StakeAction onClick={()=> setVisible(true)}>
            State
          </StakeAction>
        </BonusAndAction>

      </BoxAction>
      <StakeNFTModal
         title='STAKE YOUR NFT'
         visible={visible}
         setVisible={setVisible}
         data={NFTs}
         getItemSelected={getItemSelected}
        //  multiSelect={true}
         selectedItem={myItems}
      />

    </StakeNFT>
  )
}

export default Staked
