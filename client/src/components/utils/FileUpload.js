import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload({ refreshfunction }) {
  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formDate = new FormData();
    const config = {
      header: { 'content-type': 'multipart/fomr-data' },
    };
    formDate.append('file', files[0]);

    axios.post('/api/product/image', formDate, config).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setImages([...Images, res.data.filePath]);
        refreshfunction([...Images, res.data.filePath]);
      } else {
        alert('파일을 저장하는데 실패했습니다.');
      }
    });
  };

  const deleteHandler = (img) => {
    const curIndex = Images.indexOf(img);
    let newImages = [...Images];
    newImages.splice(curIndex, 1);
    setImages(newImages);
    refreshfunction(newImages);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              width: 300,
              height: 240,
              border: '1px solid lightgray',
              borderRadius: '3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>
        )}
      </Dropzone>
      <div
        style={{
          display: 'flex',
          width: '350px',
          height: '240px',
          overflowX: 'scroll',
        }}
      >
        {Images.map((img, index) => (
          <div onClick={() => deleteHandler(img)} key={index}>
            <img
              style={{ minWidth: '350px', width: '300px', height: '240px' }}
              src={`http://localhost:5000/${img}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
