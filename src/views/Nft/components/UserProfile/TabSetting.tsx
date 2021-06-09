import React, { useRef } from 'react'
import {
  Form,
  Input,
  Row,
  Col,
} from 'antd'
import UploadFile from 'components-v2/Upload'
import { ButtonStyle } from 'components-v2/cart/styled'

const  TabSetting: React.FC = () => {
  const formRef = React.useRef() as React.MutableRefObject<any>
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const createArtist = (values: any) => {
    console.log(values)
  }

  return (
    <Form
      ref={formRef}
      labelCol={{ span: 24 }}
      name="nest-messages"
      onFinish={createArtist}
      layout="vertical"
      style={{maxWidth: 900,  margin: 'auto'}}
  >
    <Row gutter={24}>
      <Col xl={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <Form.Item
          name="cover"
          label="Change banner"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <UploadFile maxWidth="1000px" maxHeight="200px" />
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <Form.Item
          name="avatar"
          label="Change Avatar"
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
        >
          <Input
            style={{ borderRadius: '100px' }}
            placeholder="Your full name or nickname or bussiness name"
          />
        </Form.Item>
        <Form.Item
          name="socialLink"
          label="Social media/Portfolio link "
        >
          <Input
            style={{ borderRadius: '100px' }}
            placeholder="Persional website, Instagram, Twitter, etc"
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
          // type="submit"
          style={{ width: 200, margin: '20px auto' }}
        >
          Update
        </ButtonStyle>
      </Col>
    </Row>
  </Form>
  )
}

export default TabSetting
