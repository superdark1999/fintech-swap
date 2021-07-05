import React from 'react'
import QRCode from 'qrcode.react'
import { Modal, Button } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import useCopyToClipboard from 'components-v2/CopyToClipBoard'
import { ButtonBuy } from 'components-v2/Button'
function QRCodeComp(props) {
  const { isShow, setShowQR, url } = props
  const [isCopied, handleCopy] = useCopyToClipboard(3000)
  return (
    <Modal
      onCancel={() => setShowQR(false)}
      title="QR Code Product"
      visible={isShow}
      width={400}
      footer={null}
    >
      <div>
        <QRCode size={300} value={url} level="H" />
        {
          <ButtonBuy
            style={{ width: '100%', margin: '10px 0' }}
            onClick={() => handleCopy(url)}
          >
            {!isCopied ? 'Copy Link' : <CheckOutlined />}
          </ButtonBuy>
        }
      </div>
    </Modal>
  )
}

export default QRCodeComp
