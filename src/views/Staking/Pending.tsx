import React, { useEffect, useState } from 'react'
import { Row } from 'reactstrap'
import { NFT } from '../../config/constants/types'
import { stakingNftService } from '../../services/index'
import notification from './Components/Alert'
import PendingToken from './Components/CardPending'

const Pending: React.FC = () => {
  const [pendingTokens, setPendingTokens] = useState<NFT[]>([])

  useEffect(() => {
    const fetchPendingTokens = async () => {
      try {
        const data = await stakingNftService.getPendingTokens()

        setPendingTokens(data)
      } catch (error) {
        notification('error', { message: 'Error', description: error?.message })
      }
    }

    fetchPendingTokens()
  }, [])

  return <Row>{pendingTokens.length > 0 && pendingTokens.map((token) => <PendingToken image={token.image} />)}</Row>
}

export default Pending
