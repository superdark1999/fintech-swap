import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Form, Input, Button, Row, Col, Checkbox, Progress, Select } from 'antd'
import UploadFile from 'components-v2/UploadMedia'
import { EditOutlined, SyncOutlined } from '@ant-design/icons'
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
import { handleAlertMessage } from 'utils';
import _ ,{get}  from 'lodash'
import { isMobile } from 'react-device-detect'
const TextAreaStyled = styled(Input.TextArea)`
  &.ant-input-textarea > textarea {
    border-radius: 16px;
    height: 148px;
  }
`

const CreateArtWork: React.FC = () => {
  const [showModalCreateArtist, setShowModalCreateArtist] = React.useState<
    boolean | null
  >(false)
  const formRef = React.useRef() as React.MutableRefObject<any>
  const { createNFT, updateHashInfoNFT } = useArtworkServices()
  const { updateProfile } = useUserServices()
  const { account } = useActiveWeb3React()
  const NFTServiceMethod = useNFTServices()
  const [isProccessing, setIsProcessing] = useState(false)
  const [userState, userActions] = useUserStore()
  const [form] = Form.useForm()
  const history = useHistory()
  const [checkPolicy, setCheckPolicy] = useState(false)
  const [typeArtWork, setTypeArtWork] = useState('image')
  const [isOnUpload, setIsOnUpload] = useState(false)
  const [selectItems, setSelectItems] = useState([])
  const [processPercent, setProcessPercent] = useState(0)
  const listTag: any = []
  const { Option } = Select
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

  const onGoToPendingArtWork = () => {
    history.push('/my-profile/mycollection/pending')
  }

  const onMintNFT = (url:any, NFTid:any)=>{
    if (NFTServiceMethod) {
      const { mintToken } = NFTServiceMethod
      mintToken(url)
        .then((mintData: any) => {
          const txHash = mintData?.hash
          updateHashInfoNFT({ NFTid, txHash }).then(({ status, data }) => {
            if (status === 200) {
              notification(
                'open',
                {
                  message:
                    'Create NFT success,you can check NFT on pending collection',
                  description: '',
                  titleBtn: 'View detail',
                },
                onGoToPendingArtWork,
              )
            }
          })
        })
        .catch((err: any) => {
          setIsProcessing(false)
          notification('error', {
            message: handleAlertMessage(err?.message),
            description: '',
          })
        })
    }
  }

  const onUploadProcess = (progressEvent:any)=>{
    const tempProcessPercent = Number(((progressEvent.loaded /progressEvent.total)*100).toFixed(0)) ;
    setProcessPercent(tempProcessPercent)
    if(tempProcessPercent==100){
      setIsOnUpload(false)
    }
  }

  const onCreateNFT = async (values: any) => {
    if (checkPolicy && !isProccessing && !isOnUpload ) {
      setIsProcessing(true)
      setIsOnUpload(true)
      const mintData = {
        title: values?.artworkName || '',
        description: values?.introduction || '',
        type: values?.[`type`] || 'image',
        content: values?.[`content`] || '',
        ownerWalletAddress: account || '',
        tags: values?.tags || [],
        onUploadProcess: onUploadProcess
      }
      createNFT(mintData)
        .then(({ data, status }) => {
          if (status === 200) {
            const url = data?.data?.contentUrl || ''
            const NFTid = data?.data?._id || ''
            onMintNFT(url, NFTid)
          }
        })
        .catch((err: any) => {
          setIsProcessing(false)
          notification('error', {
            message:  get(err, 'response.data.message') || get(err, 'response.data.error') || 'Something went wrong please try again',
            description: '',
          })
        })
    }
  }
  const onCheckPolicy = (e: any) => {
    setCheckPolicy(e.target.checked)
  }
  const onHandleTypeArtWork = (e: any) => {
    if (!e.target.value) {
      return notification('info', {
        message: 'Announce',
        description: 'This feature will be coming soon',
      })
    }
    formRef.current?.resetFields(['content'])
    return setTypeArtWork(e.target.value)
  }

  const renderGroupButton = () => {
    if (isProccessing && !isOnUpload) {
      return (
        <ButtonStyle type="submit" style={{ width: 300, margin: '20px auto' }}>
          <div className="btn-submit">
            Processing <SyncOutlined />
          </div>
        </ButtonStyle>
      )
    }
    if (!isProccessing && !isOnUpload) {
      return (
        <ButtonStyle type="submit" style={{ width: 300, margin: '20px auto' }}>
          Create
        </ButtonStyle>
      )
    }
    if (isOnUpload) {
      const timeUpload: any = {
        image: 2000,
        gif: 4000,
        video: 7500,
      }
      return (
        <ButtonStyle type="submit" style={{ width: 300, margin: '20px auto' }}>
          <div>
            Uploading... {processPercent+'%'}
            {/* <Progress
              width={20}
              strokeWidth={15}
              type="circle"
              percent={processPercent}
              showInfo={false}
            /> */}
          </div>
        </ButtonStyle>
      )
    }
  }
  const OPTIONS = [
    'Art',
    'Music',
    'Games',
    'DeFi',
    'Meme',
    'Sports',
    'Abstract',
    'Space',
    'Lucky',
  ]
  const filteredOptions = OPTIONS.filter((o: any) => !selectItems.includes(o))
  return (
    <Row gutter={24} style={{ justifyContent: 'center', marginTop: 20}}>
       {isMobile && <h2 className="title-create-artwork">Create Artwork</h2>}
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
              rules={[{ required: true, message: 'This Field is required' }]}
              initialValue="image"
            >
              <GroupButton defaultValue="image">
                <RadioButton
                  value="image"
                  onChange={onHandleTypeArtWork}
                >
                  Picture
                </RadioButton>
                <RadioButton
                  value="gif"
                  onChange={onHandleTypeArtWork}
                >
                  Gif
                </RadioButton>
                <RadioButton
                  value="video"
                  onChange={onHandleTypeArtWork}
                >
                  Video
                </RadioButton>
                <RadioButton
                  style={{ background: '#f3f3f3', opacity: '.5' }}
                  onChange={onHandleTypeArtWork}
                >
                  Audio
                </RadioButton>
                <RadioButton
                  style={{ background: '#f3f3f3', opacity: '.5' }}
                  onChange={onHandleTypeArtWork}
                >
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
                    { required: true, message: 'This Field is required' },
                  ]}
                  initialValue="Bep721"
                >
                  <GroupButton defaultValue="Bep721">
                    <RadioButton  value="Bep721">
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
                    { required: true, message: 'This Field is required' },
                  ]}
                >
                  <UploadFile
                    isFormData
                    typeArtWork={typeArtWork}
                    resetUploadImage={() => {
                      formRef.current?.resetFields(['content'])
                    }}
                  />
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
                    { required: true, message: 'This Field is required' },
                    {
                      type: 'string',
                      max: 40,
                      message: 'This Field must be less than 40 characters',
                    },
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
                    maxLength={200}
                    showCount={true}
                    autoSize={false}
                  />
                </Form.Item>
                <Form.Item name="tags" label="Tags">
                  <Select
                    mode="multiple"
                    value={selectItems}
                    style={{ width: '100%' }}
                    onChange={(e: any) => setSelectItems(e)}
                    placeholder="Tags for your NFT"
                  >
                    {filteredOptions.map((item: any) => (
                      <Select.Option
                        style={{ borderRadius: '30px' }}
                        key={item}
                        value={item}
                      >
                        {item}
                      </Select.Option>
                    ))}
                  </Select>
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
                <Checkbox
                  style={{
                    textAlign: 'center',
                    color: checkPolicy ? '' : 'red',
                  }}
                  onChange={onCheckPolicy}
                >
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
                  <span style={{ color: 'red' }}>*</span>Mint an NFT charges
                  0.01BNB Please do not upload any sensitive content
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
        placeholder="Please create artist before create NFT"
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
