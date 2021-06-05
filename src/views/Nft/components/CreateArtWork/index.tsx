import React, {useState} from 'react'
import styled from 'styled-components'
import { Form, Input, InputNumber, Button,Radio, Modal, Row, Col, Checkbox} from 'antd';
import UploadFile from 'components-v2/Upload/index'
import { UploadOutlined, EditOutlined, PictureOutlined} from '@ant-design/icons';
import { ButtonStyle } from 'components-v2/cart/styled'

import {GroupButton, RadioButton} from './styled'

const CreateArtWork: React.FC = () => {
    const [showModalCreateArtist, setShowModalCreateArtist] = React.useState<boolean | null>(false)
    const formRef = React.useRef() as React.MutableRefObject<any>;
    const [artwork, setArtWork] =  useState<any>()
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
      };
      const validateMessages = {
        required: '${label} is required!',
        types: {
          email: '${label} is not a valid email!',
          number: '${label} is not a valid number!',
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

    const createArtist = (values: object) => {
      console.log(values);
    };

    const normFile = (e: any) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    };
    
    const handleSubmit = async () => {
      formRef.current
      .validateFields()
      .then((values: any) => {
        console.log('values: ', values)
        setArtWork(values)    
      })
    }
    console.log(artwork)
    return (
      <Row gutter={24} style={{justifyContent: 'center'}}>
        <Col xl={{ span: 18}} md={{ span: 18 }} xs={{span: 24}}>
          <CreateArtWorkStyled> 
            <Form  ref={formRef} style={{width: '100%'}} layout="vertical" name="nest-messages" validateMessages={validateMessages} initialValues={{artistsName: "phat"}} >
                <Form.Item 
                    name="radio-artwork-type" 
                    label="Select artwork type"
                    rules={[{ required: true, message: 'This Field is required!' }]}
                >
                  <GroupButton>
                      <RadioButton style={{height: 100}} value="picture"> Picture</RadioButton>
                      <RadioButton style={{height: 100}} value="gif">Gif</RadioButton>
                      <RadioButton style={{height: 100}} value="video">Video</RadioButton>
                      <RadioButton style={{height: 100}} value="audio">Audio</RadioButton>
                      <RadioButton style={{height: 100}} value="special">Special</RadioButton>
                   </GroupButton>
                        
                </Form.Item>
                <Row gutter={24}>
                    <Col  xl={{ span: 12}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 12}}> 
                      <Form.Item 
                          name="radio-group-standard" 
                          label="Select artwork standard"
                          rules={[{ required: true, message: 'This Field is required!' }]}
                      >
                          <GroupButton>
                            <RadioButton style={{height: 60}} value="Bep721 ">Bep721 </RadioButton>
                            <RadioButton style={{height: 60}} value="Bep1155">Bep1155</RadioButton>
                        </GroupButton>
                      </Form.Item>
                    </Col>
                  </Row>
                
                <Row gutter={24}>
                    <Col  xl={{ span: 12}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 12}}> 
                      <Form.Item
                        name="upload-artwork"
                        label="Upload cover"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                        rules={[{ required: true, message: 'This Field is required!' }]}
                      >
                        <UploadFile  />
                      </Form.Item>
                    </Col>

                    <Col xl={{ span: 12}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 12}}>
                      <Form.Item 
                        name='artworkName'
                        label="Artwork name"
                        rules={[{ required: true, message: 'This Field is required!' }]}
                      >
                          <Input style={{borderRadius: '100px'}} placeholder="Enter the artwork name"/>
                      </Form.Item>
                      <Form.Item>
                        <Button  shape='round' onClick={() => setShowModalCreateArtist(true)}>
                          <EditOutlined /> Create artists
                        </Button>               
                      </Form.Item>
                      <Form.Item 
                          name='artistsName'
                          label="Artists name"
                          // rules={[{ required: true, message: 'This Field is required!' }]}
                      >
                          <Input style={{borderRadius: '100px'}}  placeholder="Enter the artist name"/>
                          
                      </Form.Item>
                      <Form.Item 
                        name={'introduction'} 
                        label="Introduction"
                      >
                        <Input.TextArea style={{borderRadius: '16px', resize: 'none'}} placeholder="Enter the brief introduction" maxLength={1000} showCount={true}  autoSize={false}/>
                      </Form.Item>
                      <Form.Item name={['user', 'portfolio']} label="Social media/Portfolio link">
                          <Input style={{borderRadius: '100px'}} placeholder="Personal website, Instagram, Twitter, ect."/>
                      </Form.Item>      
                  </Col>
                </Row>

                 <Row style={{justifyContent: 'center'}}>
                   <Col xl={{ span: 12}} md={{ span: 24 }} xs={{span: 24}} xxl={{span: 12}}> 
                    <Checkbox style={{textAlign: 'center'}}>I declare that this is an original artwork. I understand that no plagiarism is allowed, and that the artwork can be removed anytime if detected.</Checkbox>
                  </Col>
                </Row>

                  <ButtonStyle onClick={handleSubmit} style={{width: 300, margin: '20px auto'}}>Create</ButtonStyle>
                <Row style={{justifyContent: 'center'}}>
                  <Col xl={{ span: 12}} md={{ span: 24 }} xs={{span: 24} } xxl={{span: 12}}> 
                  <p style={{textAlign: 'center', fontWeight: 500}}>*Mint an NFT charges 0.01BNB Please do not upload any sensitive content</p>
                  </Col>
                </Row>
            </Form>
              

{/* MODAL CREATE ARTIST */}
            <Modal
              title="Create Artist"
              visible={showModalCreateArtist}
              onCancel={() => setShowModalCreateArtist(false)}
              footer={false}
              destroyOnClose
              maskClosable={false}
              style={{ borderRadius: '16px', overflow: "hidden", paddingBottom: 0}}
              width={1000}
            >
              <Form  labelCol={{span: 24}} name="nest-messages" onFinish={createArtist} layout="vertical">
                <Row gutter={24}> 
                  <Col xl={{ span: 24}} md={{ span: 24 }}  xs={{ span: 24 }}>
                    <Form.Item
                      name="cover"
                      label="Upload cover"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: 'This Field is required!' }]}
                    >
                      <UploadFile maxWidth="1000px" maxHeight="250px"/>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col  xl={{ span: 12}} md={{ span: 24 }}  xs={{ span: 24 }}>
                    <Form.Item
                      name="avatar"
                      label="Upload Avatar"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[{ required: true, message: 'This Field is required!' }]}
                    >
                      <UploadFile maxWidth="400px"/>
                    </Form.Item>
                  </Col>
                  <Col  xl={{ span: 12}} md={{ span: 24 }} xs={{ span: 24 }}>
                    <Form.Item 
                      name='name' 
                      label="Name"
                      rules={[{ required: true, message: 'This Field is required!' }]}
                    >
                        <Input style={{borderRadius: '100px'}} placeholder="Your full name or nickname or bussiness name"/>                  
                    </Form.Item>
                    <Form.Item 
                      name='link'
                      label="Social media/Portfolio link "
                      rules={[{ required: true, message: 'This Field is required!' }]}
                    >
                        <Input style={{borderRadius: '100px'}} placeholder="Persional website, Instagram, Twitter, etc"/>                  
                    </Form.Item>
                    <Form.Item 
                      name={'bio'} 
                      label="bio"
                      rules={[{ required: true, message: 'This Field is required!' }]}
                    >
                        <Input.TextArea style={{borderRadius: '16px'}} placeholder="Please write something about yourself"/>                 
                    </Form.Item>
                    
                    <ButtonStyle onClick={()=>{}} style={{width: 200, margin: '20px auto'}}>Create</ButtonStyle>
                  </Col>             
                </Row>
              </Form>

            </Modal>
        </CreateArtWorkStyled>
      </Col>
    </Row>    
    )
}
const CreateArtWorkStyled = styled.div`
    margin: 40px auto;
    max-width: 1100px;
    background: #F9FAFB;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #E7EBEF;
    border-radius: 32px;
    .ant-modal-content {
      overflow: auto;
      border-radius: 24px
    }
`
export default CreateArtWork