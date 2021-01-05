import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: 'Africa' },
  { key: 2, value: 'Europe' },
  { key: 3, value: 'Asia' },
  { key: 4, value: 'Australia' },
];

function UploadProductPage(props) {
  const [title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState(0);
  const [Cintinent, setCintinent] = useState(1);
  const [Images, setImages] = useState([]);

  const titleChangeHandler = (e) => {
    setTitle(e.currentTarget.value);
    console.log(title);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.currentTarget.value);
  };

  const priceChangeHandler = (e) => {
    setPrice(e.currentTarget.value);
  };

  const continentChangeHandler = (e) => {
    setCintinent(e.currentTarget.value);
  };

  const updataImages = (newImages) => {
    setImages(newImages);
  };

  const submitHandler = () => {
    if (!title || !Description || !Price || !Cintinent || !Images) {
      return alert('모든 값을 넣어주셔야 합니다.');
    }
    //서버에 채움 값들을 request로 보내준다.

    const body = {
      //로그인 된 사람의 아이디
      writer: props.user.userData._id,
      title: title,
      description: Description,
      price: Price,
      images: Images,
      continents: Cintinent,
    };

    Axios.post('/api/product', body).then((res) => {
      if (res.data.success) {
        console.log('성공');
        alert('상품 업로드에 성공 했습니다.');
        props.history.push('/');
      } else {
        alert('상품 업로드에 실패 했습니다. ');
      }
    });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>

      <Form>
        {/*Drop Zone*/}
        <FileUpload refreshfunction={updataImages} />
        <br />
        <br />
        <label>아름</label>
        <Input onChange={titleChangeHandler} value={title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={continentChangeHandler} value={Cintinent}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={submitHandler}>확인</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
