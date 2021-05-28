import React from 'react'
import styled from 'styled-components'
import { Form, Input, InputNumber, Button,Radio,Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const CreateArtWork: React.FC = () => {
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
                <Form.Item name="radio-artwork-type" label="Select artwork type*">
                    <Radio.Group>
                        <Radio value="picture">picture</Radio>
                        <Radio value="gif">gif</Radio>
                        <Radio value="video">video</Radio>
                        <Radio value="audio">audio</Radio>
                        <Radio value="special">special</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="radio-group-standard" label="Select artwork standard*">
                    <Radio.Group>
                        <Radio value="bep721">bep721</Radio>
                        <Radio value="bep1155">bep1155</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name={['user', 'artworkName']} label="Artwork name*">
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'artistsName']} label="Artists name*">
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'introduction']} label="Introduction">
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
                    <Upload name="logo" action="/upload.do" listType="picture">
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
                </Form>
        </CreateArtWorkStyled>
    )
}
const CreateArtWorkStyled = styled.div`
    width: 1000px;
    height: 78vh;
    margin: auto;
    margin-top: 40px;
    background: #F9FAFB;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #E7EBEF;
    border-radius: 32px;
`
export default CreateArtWork
