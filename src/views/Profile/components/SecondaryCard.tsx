import styled from 'styled-components'
import { Text } from '@beswap/uikit'

const SecondaryCard = styled(Text)`
  border: 2px solid #f88520;
  border-radius: 16px;
`

SecondaryCard.defaultProps = {
  p: '24px',
}

export default SecondaryCard
