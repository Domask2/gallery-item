import React, { useState, useRef } from 'react';
import { projectFireStore, timestamp } from '../../firebase/config';

const Form = () => {
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState(null);
  const inputRef = useRef(null);

  // const handleSubmitText = (e) => {
  //   e.preventDefault();
  //   if (url) {
  //     const collectionRef = projectFireStore.collection("images");
  //     const createdAt = timestamp();
  //     collectionRef.add({ url, createdAt });
  //     setUrl("");
  //   }
  // };
  console.log(url);
  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (url) {
      const collectionRef = projectFireStore.collection('images');
      const createdAt = timestamp();
      collectionRef.add({ url, createdAt });
      setUrl('');
    } else if (files) {
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], 'UTF-8');
      fileReader.onload = (e) => {
        const jsonfile = JSON.parse(e.target.result);
        jsonfile.galleryImages.forEach((el) => {
          const collectionRef = projectFireStore.collection('images');
          const createdAt = timestamp();
          const url = el.url;
          collectionRef.add({ url, createdAt });
          inputRef.current.value = null;
          setFiles(null);
        });
      };
    } else {
      console.log('Введите URL или загрузите файл JSON');
    }
  };

  return (
    <form className="form-img">
      <label className="form-img__wrapper-text">
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
          }}
          className="form-img__input-text"
          placeholder="Введите URL or JSON"
        />
        {/* <input type="submit" onClick={handleSubmitText} value="Загрузить" /> */}
      </label>

      <div className="form-img__container-file">
        <label className="form-img__wrapper-file">
          <input
            type="file"
            accept="application/JSON"
            onChange={(e) => {
              setFiles(inputRef.current.files);
              setUrl(e.target.value);
            }}
            ref={inputRef}
            className="form-img__input-file"
          />
          <span className="input__file-button-text">Выберите файл</span>
          {/* <input type="submit" onClick={handleSubmitFile} /> */}
        </label>

        <input
          className="form-img__container-file__btn"
          type="submit"
          onClick={handleSubmitFile}
          value="Загрузить"
        />
      </div>
    </form>
  );
};

export default Form;
