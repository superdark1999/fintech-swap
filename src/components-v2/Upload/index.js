import React from 'react'
import ImageUploading from 'react-images-uploading'
import styled from 'styled-components'
import { Button } from 'antd'
import _ from 'lodash'
import { CloseCircleFilled } from '@ant-design/icons'

const UploadStyled = styled.div`
  max-height: ${(props) => props.maxHeight || '350px'};
  min-height: 350px;
  width: 100%;
  max-width: ${(props) => props.maxWidth || '480px'};
  background-color: #fff;
  border: 1px dashed ${({ errors }) => (!errors ? '#e7ebef' : 'red')};
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
    color: ${({ errors }) => (!errors ? '#333435' : 'red')};
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
  const [errors, setErrors] = React.useState(null)

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList[0]?.data_url)
    props.onChange(imageList[0]?.data_url)
    setErrors(null)
  }
  console.log(errors)
  return (
    <>
      <ImageUploading
        // multiple
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
        acceptType={['png', 'jpeg', 'jpg']}
        maxFileSize={5 * 1024 * 1024}
        onError={(e) => {
          setErrors(e)
        }}
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
          <UploadStyled
            errors={errors}
            maxWidth={props.maxWidth}
            maxHeight={props.maxHeight}
          >
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
                  Support: png / jpg / jpeg,
                  {/* Suggested ratio: 1:1 */}
                  Size: ≤ 5MB
                </p>
              </div>
            )}
          </UploadStyled>
        )}
      </ImageUploading>
      {errors ? (
        <div style={{ color: 'red', marginTop: '6px' }}>
          {errors.maxNumber && (
            <span>Number of selected images exceed max number</span>
          )}
          {errors.acceptType && (
            <span>Your selected file type is not allow</span>
          )}
          {errors.maxFileSize && (
            <span>Selected file size exceed max file size</span>
          )}
          {errors.resolution && (
            <span>Selected file is not match your desired resolution</span>
          )}
        </div>
      ) : null}
    </>
  )
}

export default Upload
