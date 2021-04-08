import React, { useState, useRef } from 'react';
import { projectFireStore, timestamp } from '../firebase/config';

const Title = () => {
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState(null);
  const inputRef = useRef(null);

  const handleSubmitText = (e) => {
    e.preventDefault();

    const collectionRef = projectFireStore.collection('images');
    const createdAt = timestamp();

    collectionRef.add({ url, createdAt });
    setUrl('');
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (files) {
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
    }
  };

  return (
    <form>
      <label>
        Введите URL картинки:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        <input type="submit" onClick={handleSubmitText} value="Загрузить" />
      </label>
      <label>
        Загрузите файл JSON
        <input
          type="file"
          accept="application/JSON"
          onChange={(e) => setFiles(inputRef.current.files)}
          ref={inputRef}
        />
        <input type="submit" onClick={handleSubmitFile} />
      </label>
    </form>
  );
};

export default Title;
