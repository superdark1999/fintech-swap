import React, { useState } from 'react'
import { Button, Upload, Image } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { get } from 'lodash'

const UploadForm = (props) => {
  const { isFormData } = props
  console.log('isFormData: ', isFormData)
  const [imageUrl, setUrlImage] = useState(false)
  const [type, setType] = useState(false)
  const [file, setFile] = useState(false)

  const beforeUpload = (file) => {
    console.log('file: ', file.type)
    getBase64(file)
    setType(file.type)
    setFile(file)
    return false
  }

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      if (!isFormData) {
        console.log('not form')
        props.onChange(reader.result)
      }
      setUrlImage(reader.result)
    })

    reader.readAsDataURL(img)
  }

  const handleRemove = () => {
    setUrlImage(false)
    setFile(false)
  }
  const handleUpload = ({ fileList }) => {
    if (isFormData) {
      console.log('form', get(fileList, '[0].originFileObj'))
      props.onChange(get(fileList, '[0].originFileObj'))
    }
  }

  return (
    <UploadStyled>
      {imageUrl && (
        <CloseCircleFilled className="remove-image" onClick={handleRemove} />
      )}
      {imageUrl && type.includes('video') ? (
        <video width="100%" controls>
          <source src={imageUrl} type={file.type} />
          Your browser does not support HTML5 video.
        </video>
      ) : (
        <Image className="image" src={imageUrl} />
      )}

      <Upload
        {...props}
        name="avatar"
        onChange={handleUpload}
        beforeUpload={beforeUpload}
        imageUrl={imageUrl}
        onRemove={handleRemove}
        style={{ width: '100%' }}
        showUploadList={false}
      >
        {!imageUrl && (
          <div className="upload-image">
            <Button>Upload</Button>
            <p>
              Support: png / jpg / gif/ MP4 Size: ≤ 10MB
              {/* Suggested ratio: 1:1 */}
            </p>
          </div>
        )}
      </Upload>
    </UploadStyled>
  )
}

export default UploadForm

const UploadStyled = styled.div`
  max-height: ${(props) => props.maxHeight || '350px'};
  min-height: 350px;
  max-width: ${(props) => props.maxWidth || '480px'};
  background-color: #fff;
  border: 1px dashed #e7ebef;
  box-sizing: border-box;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  span > .ant-upload-list-tex {
    display: none;
  }

  > video,
  > .ant-image > .ant-image-img {
    display: block;
    max-height: ${(props) => props.maxHeight || '350px'};
    max-width: ${(props) => props.maxWidth || '480px'};
    width: auto;
    height: auto;
  }

  > .remove-image {
    position: absolute;
    top: -5px;
    right: -5px;
  }
  .upload-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    > button {
      border: 1px solid #333435;
      box-sizing: border-box;
      border-radius: 100px;
      padding: 0px 16px;
      width: 200px;
      margin-bottom: 5px;
    }
    > p {
      width: 200px;
      text-align: center;
    }
  }
`
