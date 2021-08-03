import React from 'react'
import { Modal, Form, Input, Button } from 'antd'
import { TokenKind } from 'graphql/language/tokenKind'

const getCompactString = (str: string, sepLen: number) => {
  if (!str || typeof str !== 'string') {
    return ''
  }
  const strLen = str.length || 0
  return `${str.slice(0, sepLen)}...${str.slice(strLen - sepLen, strLen)}`
}

function ModalSubmit(props: any) {
  const { isShowModalSubmit, setShowModalSubmit, onSubmit, formRef, token } = props

  return (
    <Modal
      title="Submit Staking"
      visible={isShowModalSubmit}
      onCancel={() => setShowModalSubmit(false)}
      footer={null}
      width={400}
    >
      <Form
        ref={formRef}
        onFinish={onSubmit}
        style={{ width: '100%' }}
        fields={[
          {
            name: ['tokenID'],
            value: token?.tokenID,
          },
          {
            name: ['contractAddress'],
            value: getCompactString(token?.contractAddress, 10),
          },
          {
            name: ['name'],
            value: token?.name,
          },
          {
            name: 'description',
            value: token?.description,
          },
        ]}
      >
        <div style={{ marginBottom: '6px' }}>
          Name<span style={{ color: 'red', marginRight: '4px' }}>*</span>
        </div>
        <Form.Item name="name" validateTrigger="onChange">
          <Input
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
            }}
            disabled={token?.name}
            placeholder="Enter name card to..."
          />
        </Form.Item>
        <div style={{ marginBottom: '6px' }}>
          Description<span style={{ color: 'red', marginRight: '4px' }}>*</span>
        </div>
        <Form.Item name="description" validateTrigger="onChange">
          <Input
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
            }}
            disabled={token?.description}
            placeholder="Enter description to..."
          />
        </Form.Item>
        <div style={{ marginBottom: '6px' }}>
          URL Token<span style={{ color: 'red', marginRight: '4px' }}>*</span>
        </div>
        <Form.Item name="urlToken" validateTrigger="onChange">
          <Input
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
            }}
            placeholder="Enter url token to..."
          />
        </Form.Item>

        <div style={{ marginBottom: '6px' }}>Token ID</div>
        <Form.Item name="tokenID" validateTrigger="onChange">
          <Input
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
            }}
            disabled
          />
        </Form.Item>
        <div style={{ marginBottom: '6px' }}>Contract Address</div>
        <Form.Item name="contractAddress" validateTrigger="onChange">
          <Input
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              width: '100%',
            }}
            disabled
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button htmlType="submit">Submit</Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ModalSubmit
