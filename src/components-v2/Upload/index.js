import React from 'react'
import ImageUploading from 'react-images-uploading'
import styled from 'styled-components'
import { Button } from 'antd'
import _ from 'lodash'
import { CloseCircleFilled } from '@ant-design/icons'

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

  > img {
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

export function Upload(props) {
  const [images, setImages] = React.useState()

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList[0]?.data_url)
    props.onChange(imageList[0]?.data_url)
  }
  return (
    <ImageUploading
      // multiple
      value={images}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <UploadStyled maxWidth={props.maxWidth} maxHeight={props.maxHeight}>
          {(images || props.value) && (
            <CloseCircleFilled
              className="remove-image"
              onClick={onImageRemove}
            />
          )}
          {(images || props.value) && (
            <img src={images || props.value} alt="" width="100" />
          )}
          {!(images || props.value) && (
            <div className="upload-image">
              <Button
                type=""
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
              >
                Upload
              </Button>
              <p>
                Support: png / jpg / gif
                {/* Suggested ratio: 1:1 */}
                Size: ≤ 10MB
              </p>
            </div>
          )}
        </UploadStyled>
      )}
    </ImageUploading>
  )
}

export default Upload
