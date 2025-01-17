import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  color: #ffffff;
  font-weight: 600;
  font-size: 24px;
  line-height: 1.1;
  margin-bottom: 14px;
`

export default CardTitle
