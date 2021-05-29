import React from 'react'
import styled from 'styled-components'
import { Form, Input, InputNumber, Button,Radio, Modal } from 'antd';
import UploadFile from 'components-v2/Upload'
import { UploadOutlined, EditOutlined} from '@ant-design/icons';
const CreateArtWork: React.FC = () => {
    const [showModalCreateArtist, setShowModalCreateArtist] = React.useState<boolean | null>(false)
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
      /* eslint-enable no-template-curly-in-string */
      
    const onFinish = (values: any) => {
      console.log(values);
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
    
          
    return (
        <CreateArtWorkStyled>
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item 
                    name="radio-artwork-type" 
                    label="Select artwork type"
                    rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Radio.Group>
                        <Radio value="picture">picture</Radio>
                        <Radio value="gif">gif</Radio>
                        <Radio value="video">video</Radio>
                        <Radio value="audio">audio</Radio>
                        <Radio value="special">special</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item 
                    name="radio-group-standard" 
                    label="Select artwork standard"
                    rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Radio.Group>
                        <Radio value="bep721">bep721</Radio>
                        <Radio value="bep1155">bep1155</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item 
                    name={['user', 'artworkName']} 
                    label="Artwork name"
                    rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                  <Button style={{ transform: 'translateX(175px)'}} shape='round' onClick={() => setShowModalCreateArtist(true)}>
                    <EditOutlined /> Create artists
                  </Button>               
                </Form.Item>
                <Form.Item 
                    name={['user', 'artistsName']} 
                    label="Artists name"
                    rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Input />
                    
                </Form.Item>
                <Form.Item 
                  name={['user', 'introduction']} 
                  label="Introduction"
                >
                  <Input.TextArea />
                </Form.Item>
                <Form.Item name={['user', 'portfolio']} label="Social media/Portfolio link">
                    <Input />
                </Form.Item>
                <Form.Item
                    name="upload-artwork"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Support: png / jpg / gif, Ratio: 1:1, Size: ≤ 10MB"
                >
                    <UploadFile />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
            <Modal
              title="Create Artist"
              visible={showModalCreateArtist}
              onCancel={() => setShowModalCreateArtist(false)}
              footer={false}
              destroyOnClose
              maskClosable={false}
              style={{ borderRadius: '10px'}}
              width={800}
            >
              <Form  labelCol={{span: 6}} name="nest-messages" onFinish={createArtist}>
                <Form.Item
                  name="upload-artwork"
                  label="Upload"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="Support: png / jpg / gif, Ratio: 1:1, Size: ≤ 10MB"
                >
                    <UploadFile />
                </Form.Item>
                <Form.Item 
                  name={['user', 'artistsName']} 
                  label="Name"
                  rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Input />                  
                </Form.Item>
                <Form.Item 
                  name={['link', 'link']} 
                  label="Social media/Portfolio link "
                  rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Input />                  
                </Form.Item>
                <Form.Item 
                  name={['user', 'artistsName']} 
                  label="Artists name"
                  rules={[{ required: true, message: 'This Field is required!' }]}
                >
                    <Input.TextArea />                 
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
              </Form>
            </Modal>
        </CreateArtWorkStyled>
    )
}
const CreateArtWorkStyled = styled.div`
    width: 900px;
    /* height: 78vh; */
    margin: 40px auto;
    background: #F9FAFB;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #E7EBEF;
    border-radius: 32px;
`
export default CreateArtWork
