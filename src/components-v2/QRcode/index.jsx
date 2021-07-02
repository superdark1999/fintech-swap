import React from 'react'
import QRCode from 'qrcode.react'
import { Modal } from 'antd'
function QRCodeComp(props) {
  const { isShow, setShowQR, url } = props
  return (
    <Modal
      onCancel={() => setShowQR(false)}
      title="QR Code Product"
      visible={isShow}
      width={400}
      footer={null}
    >
      <QRCode size={300} value={url} level="H" />
    </Modal>
  )
}

export default QRCodeComp
