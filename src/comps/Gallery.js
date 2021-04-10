import React, { useState, useEffect } from "react";
import { projectFireStore, projectStorage } from "../firebase/config";
import Drag from "./Drag";

const Gallery = () => {
  const [docs, setDocs] = useState([]);

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
  
  console.log(docs)

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
        {
          docs.length>0 && <Drag/>
        }
        <div className="main__images">
          {docs &&
            docs.map((doc) => (
              <div className="main__images__item" key={doc.id}>
                <img src={doc.url} alt="uploaded pic" />
                <button className="main__images__btn" onClick={deleteImage} data={doc.id} name={doc.name}>
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
