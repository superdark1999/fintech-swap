import React, { useEffect } from 'react'
import {
  Form,
  Input,
  Row,
  Col,
} from 'antd'
import UploadFile from 'components-v2/Upload'
import { ButtonStyle } from 'components-v2/cart/styled'
import useUserServices from 'services/axiosServices/UserServices'
import useUserStore from 'store/userStore'
import { useActiveWeb3React } from 'wallet/hooks'

const  TabSetting= () => {
  const {updateProfile} = useUserServices()
  const [userState, userActions] = useUserStore()
  console.log('userState: ', userState)
  const [form] = Form.useForm()
  const { account } = useActiveWeb3React()

  useEffect(() => {
    form.setFieldsValue(userState)
  }, [userState])

  const handleUpdateProfile = (values) => {
    const artistData = {
      walletAddress: account,
      coverImage: values?.coverImage,
      avatarImage: values?.avatarImage,
      name: values?.name,
      socialMediaLink: values?.socialMediaLink,
      biography: values?.biography,
    }
    updateProfile(artistData).then(({data, status})=>{
      userActions.updateUserInfo(data?.data)
    })
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      name="nest-messages"
      onFinish={handleUpdateProfile}
      layout="vertical"
      style={{maxWidth: 900,  margin: 'auto'}}
  >
    <Row gutter={24}>
      <Col xl={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <Form.Item
          name="coverImage"
          label="Change banner"
          // getValueFromEvent={normFile}
        >
          <UploadFile maxWidth="1000px" maxHeight="200px"/>
        </Form.Item>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col xl={{ span: 12 }} md={{ span: 24 }} xs={{ span: 24 }}>
        <Form.Item
          name="avatarImage"
          label="Change Avatar"
          // getValueFromEvent={normFile}
        >
          <UploadFile maxWidth="400px"/>
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
          name="socialMediaLink"
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
          type="submit"
          // onClick={handleUpdateProfile}
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
