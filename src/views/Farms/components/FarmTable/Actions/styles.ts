import styled from 'styled-components'

export const ActionContainer = styled.div`
  /* padding: 16px; */
  /* background: rgb(41 41 41); */
  /* box-shadow: 0px 0px 11px 0px rgb(29 26 26 / 57%); */
  flex-grow: 1;
  flex-basis: 0;
  margin-bottom: 16px;

  &.border-r {
    border-right: 1px solid #8c8c8c;
  }
  

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 12px;
    margin-right: 12px;
    margin-bottom: 0;
    max-height: 100px;
  }

  ${({ theme }) => theme.mediaQueries.xl} {
    margin-left: 48px;
    margin-right: 0;
    margin-bottom: 0;
    max-height: 100px;
  }
`

export const ActionTitles = styled.div`
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 8px;
`

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.secondary};
`

export const Subtle = styled.span`
  color: ${({ theme }) => theme.colors.textSubtle};
`

export const ActionContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Earned = styled.div`
  font-weight: 600;
  font-size: 40px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`

export const Staked = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSubtle};
  padding: 10px 0;
`
