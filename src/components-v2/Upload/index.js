import React, {useState} from "react";
import "antd/dist/antd.css";
import { Upload, message } from "antd";
import {InboxOutlined} from '@ant-design/icons'
const Dragger = Upload.Dragger;

const UploadFile = (props) => {
  const [fileList, setFileList] = useState();
    const temp = {
      // disabled: file?.fileList?.length >= 2,
      name: "file",
      onRemove: (file)=>{
        setFileList(() => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) =>{
        console.log('file: ', file)
        if (fileList.length === 0) {
          setFileList([...fileList, file]);
        } else{
          message.error('Only upload one file');
          setFileList( [...fileList]);
        }
        return false;
      },
    };

    const onChange = (info) => {
      console.log('info: ', info)
      const { status } = info.file;
      setFileList(info.fileList)
      props.onChange(info);
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

return (
  <Dragger {...temp} onChange={onChange}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Kéo thả file để upload</p>
      <p className="ant-upload-hint">File đính kèm tối đa 10mb</p>
      {/* {singleFile ? (
        <b>chỉ upload một file</b>
      ) : (
        <p>Có thể upload nhiều file cùng lúc</p>
      )} */}
    </Dragger>
  )
}

export default UploadFile