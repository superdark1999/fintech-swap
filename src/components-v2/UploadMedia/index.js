import React, { useState } from 'react'
import { Button, Upload, Image } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'
import { get } from 'lodash'
import notification from 'components-v2/Alert'

const typeInfo = {
  image: {
    accept: 'image/png, image/jpeg,image/jpg',
    supportText: 'Support: png / jpg Size: ≤ 5MB',
    size: 5,
  },
  gif: {
    accept: 'image/gif',
    supportText: 'Support: gif Size: ≤ 15MB',
    size: 15,
  },
  video: {
    accept: 'video/mp4',
    supportText: 'Support: mp4 Size: ≤ 40MB',
    size: 40,
  },
}

//configurations for the image uploader

const UploadForm = (props) => {
  const { isFormData, typeArtWork, resetUploadImage } = props
  const [imageUrl, setUrlImage] = useState(false)
  const [type, setType] = useState(false)
  const [file, setFile] = useState(false)

  const beforeUpload = (file) => {
    const isLtSize = file.size / 1024 / 1024 < size
    if (!isLtSize) {
      notification('error', {
        message: 'Error',
        description: `Image must smaller than ${size}MB!`,
      })
      return true
    }
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
    resetUploadImage()
    setUrlImage(false)
    setFile(false)
  }
  const handleUpload = ({ fileList }) => {
    if (isFormData) {
      props.onChange(get(fileList, '[0].originFileObj'))
    }
  }

  const { accept, supportText, size } = typeInfo[typeArtWork || 'image']

  return (
    <UploadStyled>
      {imageUrl && (
        <CloseCircleFilled className="remove-image" onClick={handleRemove} />
      )}
      {imageUrl && type.includes('video') ? (
        <video width="100%" controls muted>
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
        accept={accept}
      >
        {!imageUrl && (
          <div className="upload-image">
            <Button>Upload</Button>
            <p>{supportText}</p>
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
