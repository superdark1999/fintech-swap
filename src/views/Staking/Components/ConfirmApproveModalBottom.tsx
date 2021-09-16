import { Button } from '@luckyswap/uikit'
import React from 'react'

export function ConfirmApproveModalBottom({ onApprove }: { onApprove: any }) {
  return (
    <>
      <Button mt="20px" onClick={onApprove} className="btn-supply">
        Approve
      </Button>
    </>
  )
}
