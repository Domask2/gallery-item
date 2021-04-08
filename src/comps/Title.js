import React, { useState, useRef } from "react";
import { projectFireStore, timestamp } from "../firebase/config";

const Title = () => {
  const [url, setUrl] = useState("");
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

  const handleSubmitFile = (e) => {
    e.preventDefault();

    if (url) {
      const collectionRef = projectFireStore.collection("images");
      const createdAt = timestamp();
      collectionRef.add({ url, createdAt });
      setUrl("");
    } else if (files) {
      const fileReader = new FileReader();
      fileReader.readAsText(files[0], "UTF-8");
      fileReader.onload = (e) => {
        const jsonfile = JSON.parse(e.target.result);
        jsonfile.galleryImages.forEach((el) => {
          const collectionRef = projectFireStore.collection("images");
          const createdAt = timestamp();
          const url = el.url;
          collectionRef.add({ url, createdAt });

          inputRef.current.value = null;
          setFiles(null);
        });
      };
    } else {
      console.log('Введите URL или загрузите файл JSON')
    }
  };

  return (
    <form className="subscribe-form">
      <label className="input-wrapper">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-text"
        />
        {/* <input type="submit" onClick={handleSubmitText} value="Загрузить" /> */}
      </label>
      <label>
        <input
          type="file"
          accept="application/JSON"
          onChange={(e) => setFiles(inputRef.current.files)}
          ref={inputRef}
          style ={{width: 120}}
        />
        {/* <input type="submit" onClick={handleSubmitFile} /> */}
      </label>
      <input type="submit" onClick={handleSubmitFile} value="Загрузить"/>
    </form>
  );
};

export default Title;
