import React from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import styled from "styled-components";
import { Button } from 'antd'
import _ from 'lodash'
import { CloseCircleFilled } from '@ant-design/icons'

const UploadStyled = styled.div`
  /* min-width: 480px; */
  max-height: ${props => props.maxHeight || '350px'};
  min-height:  350px;
  max-width: ${props => props.maxWidth || '480px'};
  /* background: ${props => props.url ? `url('${props.url})`: '#fff'}; */
  background-color: #fff;
  border: 1px dashed #E7EBEF;
  box-sizing: border-box;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  >img {
    /* position: absolute; */
    display: block;
    max-height: ${props => props.maxHeight || '350px'};
    max-width: ${props => props.maxWidth || '480px'};
    width: auto;
    height: auto;
    /* bottom: 0;
    top: 0;
    left: 0;
    right: 0; */
    /* border-radius: 20px; */
  }
  >.remove-image {
    position: absolute;
    top: -5px;
    right: -5px;
  }
  .upload-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >button {  
      border: 1px solid #333435;
      box-sizing: border-box;
      border-radius: 100px;
      padding: 0px 16px;
      width: 200px;
      margin-bottom: 5px;
      }
      >p{
        width: 200px;
        text-align: center
      }
  }
   
    
`

export function Upload(props) {
  const [images, setImages] = React.useState();

  const onChange = (imageList,addUpdateIndex) => {
    setImages(imageList);
    props.onChange(imageList)
  };

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
          dragProps
        }) => (
          // write your building UI
          <UploadStyled maxWidth={props.maxWidth} maxHeight={props.maxHeight}>
            {_.get(imageList, '[0].data_url') && <CloseCircleFilled className="remove-image" onClick={onImageRemove}/>}
            {_.get(imageList, '[0].data_url') && <img src={_.get(imageList, '[0].data_url')} alt="" width="100" />}
            { !_.get(imageList, '[0].data_url') && (
              <div className="upload-image">
                <Button type="" style={isDragging ? { color: "red" } : undefined}
                    onClick={onImageUpload}
                >
                  Upload
                </Button>
                <p>Support: png / jpg / gif
                  {/* Suggested ratio: 1:1 */}
                  Size: ≤ 10MB
                </p>
                
              </div>
              )
              }
          </UploadStyled>
        )}
      </ImageUploading>
  );
}


export default Upload

