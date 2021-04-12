import React, { useEffect, useState } from 'react';
import { projectStorage, projectFireStore, timestamp } from '../firebase/config';
import ProgressBar from './ProgressBar';

const Drag = () => {
  const [imgDragArray, setImgDragArray] = useState([]);
  const [drag, setDrag] = useState(false);
  const [percent, setPercent] = useState(0);
  const [url, setUrl] = useState(null);
  const [errorDrag, setErrorDrag] = useState(false);

  const gragStarHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const gragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let files = e.dataTransfer.files;

    files = Array.from(files).filter(function (s) {
      if (s.type.includes('image')) {
        return s.type.includes('image');
      } else {
        setErrorDrag(true);
      }
    });

    setImgDragArray(files);
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorDrag(false)
    }, 2000);
  })

  useEffect(() => {
    if (imgDragArray.length > 0) {
      for (var i = 0; i < imgDragArray.length; i++) {
        const file = imgDragArray[i];
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFireStore.collection('images');
        setDrag(false);
        storageRef.put(file, { name: file.name }).on(
          'state_changed',
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            setPercent(percentage);
          },
          (error) => {
            setErrorDrag(true);
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            const name = await storageRef._delegate._location.path;
            setUrl(url);
            const createdAt = timestamp();
            await collectionRef.add({ url, createdAt, name });
          },
        );
      }
      setImgDragArray([]);
    }
  }, [imgDragArray]);

  return (
    <div>
      {drag ? (
        <div
          className="drop-area"
          onDragStart={(e) => gragStarHandler(e)}
          onDragLeave={(e) => gragLeaveHandler(e)}
          onDragOver={(e) => gragStarHandler(e)}
          onDrop={(e) => onDropHandler(e)}>
          Отпустить файлы для загрузки
        </div>
      ) : (
        <div
          className="drop-area"
          onDragStart={(e) => gragStarHandler(e)}
          onDragLeave={(e) => gragLeaveHandler(e)}
          onDragOver={(e) => gragStarHandler(e)}>
          Перетащите файлы чобы загрузить
        </div>
      )}
      {errorDrag && <div className="drop-area__error"> Допускаеются картинки в формате JPG or PNG</div>}
      <ProgressBar percent={percent} setPercent={setPercent} url={url} />
    </div>
  );
};

export default Drag;
