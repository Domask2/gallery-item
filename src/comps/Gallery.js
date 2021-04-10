import React, { useState, useEffect } from "react";
import { projectFireStore, projectStorage } from "../firebase/config";
import Drag from "./Drag";
import { Img } from "react-image";

const Gallery = () => {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(loading);
  useEffect(() => {
    const unsub = projectFireStore
      .collection("images")
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id, name: doc.data().name });
        });
        setDocs(documents);
      });
    return () => unsub();
  }, []);

  // console.log(docs)

  const deleteImage = (e) => {
    const collectionRef = projectFireStore.collection("images");
    collectionRef.doc(e.target.getAttribute("data")).delete();
    if (e.target.getAttribute("name")) {
      var desertRef = projectStorage.ref().child(e.target.getAttribute("name"));
      desertRef
        .delete()
        .then(() => {
          console.log("delete");
        })
        .catch((error) => {
          console.log("error is a fail");
        });
    }
  };

  return (
    <main className="main">
      <div className="container">
        {docs.length > 0 && <Drag />}
        <div className="main__images">
          {docs &&
            docs.map((doc) => (
              <div className="main__images__item" key={doc.id}>
                {/* <div className={loading ? "" : "loading"}>asdasdasds</div> */}
                {/* <img
                  className="main__images__item__img"
                  src={doc.url}
                  alt="uploaded pic"
                  onLoad={() => setLoading(false)}
                /> */}

                <Img
                  className="main__images__item__img"
                  src={[doc.url]}
                  loader={<div className="lds-dual-ring"></div>}
                />

                <button
                  className="main__images__btn"
                  onClick={deleteImage}
                  data={doc.id}
                  name={doc.name}
                >
                  Удалить
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
