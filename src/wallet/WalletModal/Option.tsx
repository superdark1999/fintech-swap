import React from 'react'
import styled from 'styled-components'

const InfoCard = styled.button<{ active?: boolean }>`
  background-color: ${({ theme, active }) => (active ? theme.bg3 : theme.bg2)};
  padding: 1rem;
  outline: none;
  border: 0;
  // border-radius: 12px;
  width: 100% !important;

  &:focus {
    //border: 1px solid #bce8e8 !important;
  }
  //border-color: ${({ theme, active }) => (active ? 'transparent' : theme.bg3)};

  &:hover{
    //border: 1px solid #bce8e8 !important;
  }
`

const OptionCard = styled(InfoCard as any)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  padding: 1rem;
`

const OptionCardLeft = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
  justify-content: center;
  height: 100%;
`

const OptionCardClickable = styled(OptionCard as any)<{ clickable?: boolean }>`
    // box-shadow: 1px 4px 8px #ececec;
    background:white;
    //border-radius: 30px;
  &:hover {
    cursor: ${({ clickable }) => (clickable ? 'pointer' : '')};
    .icon-hover{
      display: block;
      border-radius: 50%;
      background-color: rgb(1 36 69 / 23%);
      width: 70px;
      height: 70px;
      top: 0;
      position: absolute;
      opacity: 0;
      animation: 1.5s cubic-bezier(0.36, 0.11, 0.89, 0.32) 0s infinite normal none running scaleIn;
    }
  }
  @keyframes scaleIn {
    from {
      transform: scale(0.5, 0.5);
      opacity: 0.5;
    }
    to {
      transform: scale(2.5, 2.5);
      opacity: 0;
    }
  }  

  &:focus{
    //border: solid 1px #035fd8!important;
  }
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
  grid-template-columns: 1fr 1fr;
  flex-direction: column-reverse;
  

`

const GreenCircle = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  justify-content: center;
  align-items: center;

  &:first-child {
    height: 8px;
    width: 8px;
    margin-right: 8px;
    background-color: ${({ theme }) => theme.green1};
    border-radius: 50%;
  }
`

const CircleWrapper = styled.div`
  color: ${({ theme }) => theme.green1};
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderText = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : ({ theme }) => theme.text1)};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
`

const SubHeader = styled.div`
  color: ${({ theme }) => theme.text1};
  margin-top: 10px;
  font-size: 12px;
`

const IconWrapper = styled.div<{ size?: number | null }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  position: relative;
  align-items: center;
  justify-content: center;
  & > img,
  span {
    height: ${({ size }) => (size ? size + 'px' : '24px')};
    width: ${({ size }) => (size ? size + 'px' : '24px')};
  }

`
const IconHover = styled.div`
  display: none;
`

export default function Option({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id
}: {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}) {
  const content = (
    <OptionCardClickable id={id} onClick={onClick} clickable={clickable && !active} active={active}>
      <OptionCardLeft>
        <HeaderText color={color}>
          {active ? (
            <CircleWrapper>
              <GreenCircle>
                <div />
              </GreenCircle>
            </CircleWrapper>
          ) : (
            ''
          )}
          {header}
        </HeaderText>
        {subheader && <SubHeader>{subheader}</SubHeader>}
      </OptionCardLeft>
      <IconWrapper size={size}>
        <img src={icon} alt={'Icon'} />
        <IconHover className="icon-hover"></IconHover>
      </IconWrapper>
    </OptionCardClickable>
  )

  return content
}
