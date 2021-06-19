import React from 'react'
import { Button, notification } from 'antd'
const getNotificationStyle = (type) => {
  return {
    success: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #b7eb8f',
      backgroundColor: '#f6ffed',
    },
    warning: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #ffe58f',
      backgroundColor: '#fffbe6',
    },
    error: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #ffa39e',
      backgroundColor: '#fff1f0',
    },
    info: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #91d5ff',
      backgroundColor: '#e6f7ff',
    },
    open: {
      color: 'rgba(0, 0, 0, 0.65)',
      border: '1px solid #91d5ff',
      backgroundColor: '#e6f7ff',
    },
  }[type]
}

export default (
  type,
  { message, description, duration = 3, titleBtn = 'Confirm' },
  callback,
) => {
  const btn = (
    <Button type="primary" size="small" onClick={() => callback?.()}>
      {titleBtn}
    </Button>
  )
  notification[type]({
    message,
    description,
    style: getNotificationStyle(type),
    duration: duration,
    onClick: () => {
      return callback?.()
    },
    onClose: () => {
      return callback?.()
    },
    btn: type === 'open' ? btn : '',
  })
}
