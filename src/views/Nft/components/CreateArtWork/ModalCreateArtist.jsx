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
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { useActiveWeb3React } from 'wallet/hooks'
import useUserStore from 'store/userStore'
import { GroupButton, RadioButton } from './styled'
import axios from 'axios'
import { RegexWebsiteURL } from '../../constants'
const ModalCreateArtist = ({ visible, onCancel, createArtist }) => {
  const formArtistRef = React.useRef()

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
              name="coverImage"
              label="Upload banner"
              valuePropName="fileList"
            >
              <UploadFile maxWidth="1000px" maxHeight="250px" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              name="avatarImage"
              label="Upload Avatar"
              valuePropName="fileList"
            >
              <UploadFile maxWidth="400px" />
            </Form.Item>
          </Col>
          <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: 'This Field is required' },
                {
                  maxLength: 20,
                  message: 'Value should be less than 20 character',
                },
              ]}
            >
              <Input
                style={{ borderRadius: '100px' }}
                placeholder="Your full name or nickname or bussiness name"
              />
            </Form.Item>
            <Form.Item
              name="socialMediaLink"
              label="Social media/Portfolio link "
              rules={[
                {
                  pattern: RegexWebsiteURL,
                  message: 'This URL is not correct.',
                },
              ]}
            >
              <Input
                style={{ borderRadius: '100px' }}
                placeholder="Personal website, Instagram, Twitter, etc"
              />
            </Form.Item>
            <Form.Item
              name={'biography'}
              label="bio"
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

export default ModalCreateArtist
