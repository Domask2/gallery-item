import React, { useEffect, useState } from "react";
import {
  projectStorage,
  projectFireStore,
  timestamp,
} from "../firebase/config";

const Drag = () => {
  const [imgDragArray, setImgDragArray] = useState([]);
  const [drag, setDrag] = useState(false);

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
      if (s.type.includes("image")) {
        return s.type.includes("image");
      } else {
        console.log("Допускаеются картинки в формате JPG or PNG");
      }
    });

    setImgDragArray(files);
  };

  useEffect(() => {
    if (imgDragArray.length > 0) {
      for (var i = 0; i < imgDragArray.length; i++) {
        const file = imgDragArray[i];
        const storageRef = projectStorage.ref(file.name);
        const collectionRef = projectFireStore.collection("images");
    
        storageRef.put(file, {name: file.name}).on(
          "state_changed",
          (snap) => {
            let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
            console.log(percentage);
          },
          (err) => {
            console.log(err);
          },
          async () => {
            const url = await storageRef.getDownloadURL();
            const name = await storageRef._delegate._location.path;
            
            const createdAt = timestamp();
            await collectionRef.add({ url, createdAt, name });
          }
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
          onDrop={(e) => onDropHandler(e)}
        >
          Отпустить файлы для загрузки
        </div>
      ) : (
        <div
          className="drop-area"
          onDragStart={(e) => gragStarHandler(e)}
          onDragLeave={(e) => gragLeaveHandler(e)}
          onDragOver={(e) => gragStarHandler(e)}
        >
          Перетащите файлы чобы загрузить
        </div>
      )}
    </div>
  );
};

export default Drag;
