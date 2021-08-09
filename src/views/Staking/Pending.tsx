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
      const data = await stakingNftService
        .getPendingTokens()
        .catch((error) => notification('error', { message: 'Error', description: error?.message }))

      setPendingTokens(data)
    }

    fetchPendingTokens()
  }, [])

  return (
    <Row>
      {pendingTokens.map((token) => (
        <PendingToken image={token.image} />
      ))}
    </Row>
  )
}

export default Pending
