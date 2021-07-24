import React, { useState } from 'react'
import styled from 'styled-components'
import { Text, Input, Button, SearchIcon } from '@luckyswap/uikit'
import useI18n from 'hooks/useI18n'
// import Search from '../../../../../public/images/search.svg'


interface PastLotterySearcherProps {
  initialLotteryNumber: number
  onSubmit: (num: number) => void
}

const Wrapper = styled.div`
  margin-bottom: 24px;
`

const SearchWrapper = styled.div`
  position: relative;
`
const InputWrapper = styled.div`
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`
const StyledInput = styled(Input)`
  padding-right: 30px;
  border: 1px solid;
  background:'#FFFFFF';
  color: #828282; 
  padding-left: 50px;
`
const ButtonWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translate(0%, -50%);
  width: auto;
  
`

const PastLotterySearcher: React.FC<PastLotterySearcherProps> = ({ initialLotteryNumber, onSubmit }) => {
  const [lotteryNumber, setLotteryNumber] = useState(initialLotteryNumber)
  const [isError, setIsError] = useState(false)
  const TranslateString = useI18n()

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    onSubmit(lotteryNumber)
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(evt.currentTarget.value, 10)

    // The max value will always be the initialLotteryNumber which equals
    // the latest lottery round
    setIsError(value > initialLotteryNumber)
    setLotteryNumber(value)
  }

  return (
    <Wrapper>
      {/* <Text>{TranslateString(742, 'Select lottery number:')}</Text> */}
      <form onSubmit={handleSubmit}>
        <SearchWrapper>
          <ButtonWrapper>
            <Button variant="secondary" type="submit" scale="sm" disabled={isError}>
              {/* {TranslateString(744, 'Search')} */}
              <SearchIcon style={{fill:"#828282", width:"25px"}}/>
              {/* <img width="20px" src="../images/search.png" alt="" /> */}
            </Button>
          </ButtonWrapper>
          <InputWrapper>
            <StyledInput
              value={lotteryNumber}
              type="number"
              isWarning={isError}
              max={initialLotteryNumber}
              onChange={handleChange}
              placeholder="Enter Round Number..."
              style={{background:'#FFFFFF', color:"#828282", paddingLeft:"50px"}}
            />
          </InputWrapper>
          
        </SearchWrapper>
      </form>
    </Wrapper>
  )
}

export default PastLotterySearcher
