import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  Form,
  Input,
  InputNumber,
  Button,
  Radio,
  Modal,
  Row,
  Col,
  Checkbox,
} from 'antd'
import UploadFile from 'components-v2/Upload/index'
import { ButtonStyle } from 'components-v2/cart/styled'
import useArtworkServices from '../../../../services/ArtworkServices'
import useNFTServices, { NFT_ADDRESS } from '../../../../services/NFTServices'
import { useActiveWeb3React } from '../../../../wallet/hooks'
import useUserStore from '../../../../store/userStore'

import { GroupButton, RadioButton } from './styled'
import axios from 'axios'

const ModalCreateArtist = ({ visible, onCancel, createArtist }) => {
  const formRef = React.useRef()
  const formArtistRef = React.useRef() 
  const { createNFT, getNFT, updateHashInfoNFT } = useArtworkServices()
  const { account } = useActiveWeb3React()
  const { approveLevelAmount, mintNFT } = useNFTServices()
  const [isProccessing, setIsProcessing] = useState(false)
  const [userState, userActions] = useUserStore()
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }


  return (
    <Modal
      title="Create Artist"
      visible={visible}
      onCancel={onCancel}
      footer={false}
      destroyOnClose
      maskClosable={false}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        paddingBottom: 0,
      }}
      width={1000}
    >
      <Form
        ref={formArtistRef}
        labelCol={{ span: 24 }}
        name="nest-messages"
        onFinish={createArtist}
        layout="vertical"
      >
        <Row gutter={24}>
          <Col xl={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              name="cover"
              label="Upload cover"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <UploadFile maxWidth="1000px" maxHeight="250px" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              name="avatar"
              label="Upload Avatar"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <UploadFile maxWidth="400px" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: 'This Field is required!' }]}
            >
              <Input
                style={{ borderRadius: '100px' }}
                placeholder="Your full name or nickname or bussiness name"
              />
            </Form.Item>
            <Form.Item
              name="socialLink"
              label="Social media/Portfolio link "
              rules={[{ required: true, message: 'This Field is required!' }]}
            >
              <Input
                style={{ borderRadius: '100px' }}
                placeholder="Persional website, Instagram, Twitter, etc"
              />
            </Form.Item>
            <Form.Item
              name={'biography'}
              label="bio"
              rules={[{ required: true, message: 'This Field is required!' }]}
            >
              <Input.TextArea
                style={{ borderRadius: '16px' }}
                placeholder="Please write something about yourself"
              />
            </Form.Item>

            <ButtonStyle
              type="submit"
              style={{ width: 200, margin: '20px auto' }}
            >
              Create
            </ButtonStyle>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}
const CreateArtWorkStyled = styled.div`
  margin: 40px auto;
  max-width: 1100px;
  background: #f9fafb;
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #e7ebef;
  border-radius: 32px;
  .ant-modal-content {
    overflow: auto;
    border-radius: 24px;
  }
`
export default ModalCreateArtist
