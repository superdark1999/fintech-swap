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
import UploadFile from 'components-v2/UploadMedia'
import {
  UploadOutlined,
  EditOutlined,
  PictureOutlined,
} from '@ant-design/icons'
import { useHistory } from "react-router-dom";
import { ButtonStyle } from 'components-v2/cart/styled'
import useArtworkServices from '../../../../services/ArtworkServices'
import useUserServices from '../../../../services/UserServices'
import useNFTServices, { NFT_ADDRESS } from '../../../../services/NFTServices'
import { useActiveWeb3React } from '../../../../wallet/hooks'
import useUserStore from '../../../../store/userStore'
import { CreateArtWorkStyled } from './styled'

import { GroupButton, RadioButton } from './styled'
import ModalCreateArtist from './ModalCreateArtist'
import axios from 'axios'

const CreateArtWork: React.FC = () => {
  const [showModalCreateArtist, setShowModalCreateArtist] =
    React.useState<boolean | null>(false)
  const formRef = React.useRef() as React.MutableRefObject<any>
  const formArtistRef = React.useRef() as React.MutableRefObject<any>
  const { createNFT, getNFT, updateHashInfoNFT } = useArtworkServices();
  const {updateProfile} = useUserServices()
  const { account } = useActiveWeb3React()
  const { approveLevelAmount, mintNFT } = useNFTServices()
  const [isProccessing, setIsProcessing] = useState(false)
  const [userState, userActions] = useUserStore()
  const [form] = Form.useForm()
  const history = useHistory();
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

  const createArtist = (values: any) => {
    const artistData = {
      walletAddress: account,
      coverImage: values?.cover?.[0]?.['data_url'],
      avatarImage: values?.avatar?.[0]?.['data_url'],
      name: values?.name,
      socialMediaLink: values?.socialLink,
      biography: values?.biography,
    }
    updateProfile(artistData).then(({data, status})=>{
      form.setFieldsValue({ artistName: artistData.name })
      userActions.updateUserInfo(data?.data)
      setShowModalCreateArtist(false)
    })
  }

  useEffect(()=>{
    form.setFieldsValue({ artistName: userState.name })
  },[userState.name])

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  const onCreateNFT = async (values: any) => {
    const mintData = {
      title: values?.artworkName || '',
      description: values?.introduction || '',
      type: values?.[`radio-artwork-type`] || 'image',
      content: values?.[`upload-artwork`]?.[0]?.[`data_url`] || '',
      ownerWalletAddress: account || '',
    }

    createNFT(mintData)
      .then(({data,status}) => {
        if(status===200){
        const url = data?.data?.contentUrl || ''
        const NFTid = data?.data?._id || ''
        mintNFT(url)
          .then((mintData: any) => {
            const txHash = mintData?.hash
            updateHashInfoNFT({ NFTid, txHash }).then(({status,data})=>{
              if(status==200){
                history.push('/user-profile/mycollection/pending')
              }
            })
          })
          .catch((err: any) => {
            alert('Something went wrong please try again')
          })
        }
      })
      .catch((err: any) => {
        alert('Something went wrong please try again')
      })
      .finally(() => {
        setIsProcessing(false)
      })
  }

  const handleSubmit = async () => {
    if (!isProccessing) {
      formRef.current.validateFields().then((values: any) => {
        setIsProcessing(true)
        onCreateNFT(values)
      })
    }
  }
  return (
    <Row gutter={24} style={{ justifyContent: 'center' }}>
      <Col xl={{ span: 18 }} md={{ span: 18 }} xs={{ span: 24 }}>
        <CreateArtWorkStyled>
          <Form
            ref={formRef}
            form={form}
            style={{ width: '100%' }}
            layout="vertical"
            name="nest-messages"
            validateMessages={validateMessages}
          >
            <Form.Item
              name="radio-artwork-type"
              label="Select artwork type"
              rules={[{ required: true, message: 'This Field is required!' }]}
            >
              <GroupButton>
                <RadioButton style={{ height: 100 }} value="image">
                  {' '}
                  Picture
                </RadioButton>
                <RadioButton style={{ height: 100 }} value="gif">
                  Gif
                </RadioButton>
                <RadioButton style={{ height: 100 }} value="video">
                  Video
                </RadioButton>
                <RadioButton style={{ height: 100 }} value="audio">
                  Audio
                </RadioButton>
                <RadioButton style={{ height: 100 }} value="special">
                  Special
                </RadioButton>
              </GroupButton>
            </Form.Item>
            <Row gutter={24}>
              <Col
                xl={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                xxl={{ span: 12 }}
              >
                <Form.Item
                  name="radio-group-standard"
                  label="Select artwork standard"
                  rules={[
                    { required: true, message: 'This Field is required!' },
                  ]}
                >
                  <GroupButton>
                    <RadioButton style={{ height: 60 }} value="Bep721 ">
                      Bep721{' '}
                    </RadioButton>
                    <RadioButton style={{ height: 60 }} value="Bep1155">
                      Bep1155
                    </RadioButton>
                  </GroupButton>
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col
                xl={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                xxl={{ span: 12 }}
              >
                <Form.Item
                  name="upload-artwork"
                  label="Upload cover"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[
                    { required: true, message: 'This Field is required!' },
                  ]}
                >
                  <UploadFile />
                </Form.Item>
              </Col>

              <Col
                xl={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                xxl={{ span: 12 }}
              >
                <Form.Item
                  name="artworkName"
                  label="Artwork name"
                  rules={[
                    { required: true, message: 'This Field is required!' },
                  ]}
                >
                  <Input
                    style={{ borderRadius: '100px' }}
                    placeholder="Enter the artwork name"
                  />
                </Form.Item>
                <Form.Item
                  name="artistName"
                  label="Artists name"
                  rules={[
                    {
                      required: true,
                      message: 'Please register artist info before continue.',
                    },
                  ]}
                >
                  <ArtistInput
                    setShowModalCreateArtist={setShowModalCreateArtist}
                  />

                  {/* <input value={userState?.name} style={{borderRadius: '100px'}} placeholder="The artist name" />  */}
                </Form.Item>

                <Form.Item name={'introduction'} label="Introduction">
                  <Input.TextArea
                    style={{ borderRadius: '16px', resize: 'none' }}
                    placeholder="Enter the brief introduction"
                    maxLength={1000}
                    showCount={true}
                    autoSize={false}
                  />
                </Form.Item>
                <Form.Item
                  name={['user', 'portfolio']}
                  label="Social media/Portfolio link"
                >
                  <Input
                    style={{ borderRadius: '100px' }}
                    placeholder="Personal website, Instagram, Twitter, ect."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ justifyContent: 'center' }}>
              <Col
                xl={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                xxl={{ span: 12 }}
              >
                <Checkbox style={{ textAlign: 'center' }}>
                  I declare that this is an original artwork. I understand that
                  no plagiarism is allowed, and that the artwork can be removed
                  anytime if detected.
                </Checkbox>
              </Col>
            </Row>

            <ButtonStyle
              onClick={handleSubmit}
              style={{ width: 300, margin: '20px auto' }}
            >
              {isProccessing ? `Proccessing ...` : `Create`}
            </ButtonStyle>
            <Row style={{ justifyContent: 'center' }}>
              <Col
                xl={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                xxl={{ span: 12 }}
              >
                <p style={{ textAlign: 'center', fontWeight: 500 }}>
                  *Mint an NFT charges 0.01BNB Please do not upload any
                  sensitive content
                </p>
              </Col>
            </Row>
          </Form>

          <ModalCreateArtist
            visible={showModalCreateArtist}
            onCancel={() => setShowModalCreateArtist(false)}
            createArtist={createArtist}
          />
        </CreateArtWorkStyled>
      </Col>
    </Row>
  )
}
export default CreateArtWork

const ArtistInput = ({ value, setShowModalCreateArtist }: any) => {
  return (
    <>
      <Input
        value={value}
        style={{ borderRadius: '100px', marginBottom: '20px' }}
        placeholder="The artist name"
        disabled
      />
      {!value && (
        <Button shape="round" onClick={() => setShowModalCreateArtist(true)}>
          <EditOutlined /> Create artists
        </Button>
      )}
    </>
  )
}
