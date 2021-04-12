import React, { useState, useRef, useEffect } from 'react';
import { projectFireStore, timestamp } from '../../firebase/config';
import { AiOutlineDownload } from 'react-icons/ai';

const Form = () => {
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState(null);
  const [errorInput, setErrorInput] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setErrorInput(false);
    }, 2000);
  }, [errorInput]);

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
          if (el === undefined) return;
          const collectionRef = projectFireStore.collection('images');
          const createdAt = timestamp();
          const url = el.url;

          collectionRef.add({ url, createdAt });
          inputRef.current.value = null;
          setFiles(null);
        });
      };
    } else {
      setErrorInput(true);
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
      </label>

      <div className="form-img__container-file">
        <label className="form-img__wrapper-file">
          <input
            type="file"
            accept=".JSON"
            onChange={() => {
              setFiles(inputRef.current.files);
            }}
            ref={inputRef}
            className="form-img__input-file"
          />
          <span className="input__file-button-text">
            <AiOutlineDownload />
            {files ? 'Выбран 1 файл' : 'Выберите файл'}
          </span>
        </label>

        <input
          className="form-img__container-file__btn"
          type="submit"
          onClick={handleSubmitFile}
          value="Загрузить"
        />
      </div>

      {errorInput && <div className="form-img__error">Введите URL или загрузите JSON файл</div>}
    </form>
  );
};

export default Form;
