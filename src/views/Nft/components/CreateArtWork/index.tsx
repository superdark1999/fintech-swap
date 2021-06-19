import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Row, Col, Checkbox, Progress } from 'antd'
import UploadFile from 'components-v2/UploadMedia'
import { EditOutlined,SyncOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import { ButtonStyle } from 'components-v2/cart/styled'
import useArtworkServices from 'services/axiosServices/ArtworkServices'
import useUserServices from 'services/axiosServices/UserServices'
import useNFTServices from 'services/web3Services/NFTServices'
import { useActiveWeb3React } from 'wallet/hooks'
import useUserStore from 'store/userStore'
import { CreateArtWorkStyled } from './styled'
import { GroupButton, RadioButton } from './styled'
import ModalCreateArtist from './ModalCreateArtist'
import notification from 'components-v2/Alert'

const TextAreaStyled = styled(Input.TextArea)`
  &.ant-input-textarea > textarea {
    border-radius: 16px;
    height: 148px;
  }
`

const CreateArtWork: React.FC = () => {
  const [showModalCreateArtist, setShowModalCreateArtist] =
    React.useState<boolean | null>(false)
  const formRef = React.useRef() as React.MutableRefObject<any>
  const { createNFT, updateHashInfoNFT } = useArtworkServices()
  const { updateProfile } = useUserServices()
  const { account } = useActiveWeb3React()
  const { mintToken } = useNFTServices()
  const [isProccessing, setIsProcessing] = useState(false)
  const [userState, userActions] = useUserStore()
  const [form] = Form.useForm()
  const history = useHistory()
  const [checkPolicy,setCheckPolicy] = useState(false)
  const [typeArtWork, setTypeArtWork] = useState('image')
  const [isOnUpload,setIsOnUpload] = useState(false)
  const [NFTInfo, setNFTInfo] = useState(null)
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
      coverImage: values?.coverImage,
      avatarImage: values?.avatarImage,
      name: values?.name,
      socialMediaLink: values?.socialMediaLink,
      biography: values?.biography,
    }
    updateProfile(artistData)
      .then(({ data, status }) => {
        notification('success', {
          message: 'Create Artist success',
          description: '',
        })
        form.setFieldsValue({ artistName: artistData.name })
        userActions.updateUserInfo(data?.data)
        setShowModalCreateArtist(false)
      })
      .catch((err) => {
        notification('error', {
          message: err?.message || 'Something went wrong please try again',
          description: '',
        })
      })
  }

  useEffect(() => {
    form.setFieldsValue({ artistName: userState.name })
  }, [userState.name])

  const onGoToPendingArtWork = ()=>{
    history.push('/my-profile/mycollection/pending')
  }

  useEffect(()=>{
    if(isProccessing&&!isOnUpload&&NFTInfo){
      const {url, NFTid} = NFTInfo
      mintToken(url)
      .then((mintData: any) => {
        const txHash = mintData?.hash
        updateHashInfoNFT({ NFTid, txHash }).then(({ status, data }) => {
          if (status === 200) {
            notification('success', {
              message: 'Create NFT success',
              description: '',
            },onGoToPendingArtWork)
          }
        })
      })
      .catch((err: any) => {
        setNFTInfo(null)
        setIsProcessing(false)
        notification('error', {
          message:
            err?.message || 'Something went wrong please try again',
          description: '',
        })
      })
    }
  },[isProccessing,isOnUpload,NFTInfo])

  const onCreateNFT = async (values: any) => {
    if(checkPolicy){
    setIsProcessing(true)
    setIsOnUpload(true)
    const mintData = {
      title: values?.artworkName || '',
      description: values?.introduction || '',
      type: values?.[`type`] || 'image',
      content: values?.[`content`] || '',
      ownerWalletAddress: account || '',
    }
    createNFT(mintData)
      .then(({ data, status }) => {
        if (status === 200) {
          const url = data?.data?.contentUrl || ''
          const NFTid = data?.data?._id || ''
          setNFTInfo({url,NFTid})
        }
      })
      .catch((err: any) => {
        setIsProcessing(false)
        notification('error', {
          message: 'Something went wrong please try again',
          description: '',
        })
      })
    }
  }
  const onCheckPolicy = (e:any) =>{
    setCheckPolicy(e.target.checked)
  }
  const onHandleTypeArtWork = (e:any)=>{
    if(!e.target.value){
      return notification('info', {
        message: 'Announce',
        description: 'This feature will be comming soon',
      })
    }
    return setTypeArtWork(e.target.value) 
  }

  const renderGroupButton = ()=>{
    if(isProccessing&&!isOnUpload){
      return(
        <ButtonStyle
          type="submit"
          style={{ width: 300, margin: '20px auto' }}
        >
          <div className="btn-submit">Processing    <SyncOutlined /></div>
        </ButtonStyle>
      )
    }
    if(!isProccessing&&!isOnUpload){
      return(
        <ButtonStyle
          type="submit"
          style={{ width: 300, margin: '20px auto' }}
        >
          Create
        </ButtonStyle>
      )
    }
    if(isOnUpload){
      return ( 
      <ButtonStyle
          type="submit"
          style={{ width: 300, margin: '20px auto' }}
        >
          <div>Processing <Proccessing timeProcess={5000} onEndProccess={()=>{setIsOnUpload(false)}}/></div>
      </ButtonStyle>)
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
            onFinish={onCreateNFT}
          >
            <Form.Item
              name="type"
              label="Select artwork type"
              rules={[{ required: true, message: 'This Field is required!' }]}
              initialValue="image"
            >
              <GroupButton defaultValue="image">
                <RadioButton style={{ height: 100 }} value="image" onChange={onHandleTypeArtWork} >
                  Picture
                </RadioButton>
                <RadioButton style={{ height: 100 }} value="gif" onChange={onHandleTypeArtWork} >
                  Gif
                </RadioButton>
                <RadioButton style={{ height: 100 }} value="video" onChange={onHandleTypeArtWork} >
                  Video
                </RadioButton>
                <RadioButton style={{ height: 100 }} onChange={onHandleTypeArtWork} >
                  Audio
                </RadioButton>
                <RadioButton style={{ height: 100 }} onChange={onHandleTypeArtWork} >
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
                  initialValue="Bep721"
                >
                  <GroupButton defaultValue="Bep721">
                    <RadioButton style={{ height: 60 }} value="Bep721">
                      Bep721
                    </RadioButton>
                    {/* <RadioButton style={{ height: 60 }} value="Bep1155">
                      Bep1155
                    </RadioButton> */}
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
                  name="content"
                  label="Upload Image"
                  valuePropName="content"
                  // getValueFromEvent={normFile}
                  rules={[
                    { required: true, message: 'This Field is required!' },
                  ]}
                >
                  <UploadFile isFormData type={typeArtWork} />
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
                  <TextAreaStyled
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
                <Checkbox style={{ textAlign: 'center',color:checkPolicy?'':'red' }} onChange={onCheckPolicy}>
                  I declare that this is an original artwork. I understand that
                  no plagiarism is allowed, and that the artwork can be removed
                  anytime if detected.
                </Checkbox>
              </Col>
            </Row>

              {renderGroupButton()}
           
            <Row style={{ justifyContent: 'center' }}>
              <Col
                xl={{ span: 12 }}
                md={{ span: 24 }}
                xs={{ span: 24 }}
                xxl={{ span: 12 }}
              >
                  <p style={{ textAlign: 'center', fontWeight: 500 }}>
                    <span style={{color:'red'}}>*</span>Mint an NFT charges 0.01BNB Please do not upload any
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

const Proccessing = ({timeProcess,onEndProccess}:any)=>{
  const [processPercent, setProcessPercent] = useState(0)
  useEffect(()=>{
    if(processPercent==100){
      onEndProccess()
    }
    const timer = setInterval(()=>{
      setProcessPercent(processPercent+1)
    },timeProcess/100)
    return()=>{
      clearInterval(timer)
    }
  },[processPercent])
  return(
   <Progress width={20} strokeWidth={15} type="circle" percent={processPercent} showInfo={false} />
  )
}

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
