import React from 'react'
import ButtonHead from '../../Button/ButtonHead'
import Card from '../../Card'
import CardContent from '../../CardContent'
import CardIconWallet from '../../CardIcon/CardIconWallet'
import CardTitle from '../../CardTitle'

interface WalletCardProps {
  icon: React.ReactNode
  onConnect: () => void
  title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <CardContent>
      <CardIconWallet>{icon}</CardIconWallet>
      <CardTitle text={title} />
      <ButtonHead onClick={onConnect} text="Connect" />
    </CardContent>
  </Card>
)

export default WalletCard
