import React, { useEffect, useState } from 'react'
import { Form, Input, Row, Col } from 'antd'
import UploadFile from 'components-v2/Upload'
import { ButtonStyle } from 'components-v2/cart/styled'
import useUserServices from 'services/axiosServices/UserServices'
import useUserStore from 'store/userStore'
import { useActiveWeb3React } from 'wallet/hooks'
import notification from 'components-v2/Alert'
import ButtonProcessing from 'components-v2/Button/btnProcessing'
import { ButtonBuy } from 'components-v2/Button'
import { RegexWebsiteURL } from '../../constants'
const TabSetting = () => {
  const { updateProfile } = useUserServices()
  const [userState, userActions] = useUserStore()
  const [form] = Form.useForm()
  const { account } = useActiveWeb3React()
  const [isProccessing, setIsProcessing] = useState(false)
  useEffect(() => {
    form.setFieldsValue(userState)
  }, [userState])

  const handleUpdateProfile = (values) => {
    setIsProcessing(true)
    const artistData = {
      walletAddress: account,
      coverImage: values?.coverImage,
      avatarImage: values?.avatarImage,
      name: values?.name,
      socialMediaLink: values?.socialMediaLink,
      biography: values?.biography,
    }
    updateProfile(artistData).then(({ data, status }) => {
      userActions.updateUserInfo(data?.data)
      if (status === 200) {
        notification('success', {
          message: 'Update information success',
          description: '',
        })
        setIsProcessing(false)
      } else {
        notification('error', {
          message: 'Update information fail',
          description: '',
        })
        setIsProcessing(false)
      }
    })
  }

  return (
    <Form
      form={form}
      labelCol={{ span: 24 }}
      name="nest-messages"
      onFinish={handleUpdateProfile}
      layout="vertical"
      style={{ maxWidth: 900, margin: 'auto' }}
    >
      <Row gutter={24}>
        <Col xl={{ span: 24 }} md={{ span: 24 }} xs={{ span: 24 }}>
          <Form.Item
            name="coverImage"
            label="Change banner"
            // getValueFromEvent={normFile}
          >
            <UploadFile maxWidth="1000px" maxHeight="200px" />
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
              disabled={userState.name ? true : false}
              style={{ borderRadius: '100px' }}
              placeholder="Your full name or nickname or bussiness name"
            />
          </Form.Item>
          <Form.Item
            name="socialMediaLink"
            label="Social media/Portfolio link "
            rules={[
              { pattern: RegexWebsiteURL, message: 'This URL is not correct.' },
            ]}
          >
            <Input
              style={{ borderRadius: '100px' }}
              placeholder="Persional website, Instagram, Twitter, etc"
            />
          </Form.Item>
          <Form.Item name={'biography'} label="bio">
            <Input.TextArea
              style={{ borderRadius: '16px' }}
              placeholder="Please write something about yourself"
            />
          </Form.Item>

          {isProccessing ? (
            <ButtonProcessing
              style={{ width: 200, margin: '20px auto' }}
              label="Updating"
            />
          ) : (
            <ButtonStyle
              type="submit"
              // onClick={handleUpdateProfile}
              style={{ width: 200, margin: '20px auto' }}
            >
              Update
            </ButtonStyle>
          )}
        </Col>
      </Row>
    </Form>
  )
}

export default TabSetting
