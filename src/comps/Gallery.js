import React, { useState, useEffect } from "react";
import { projectFireStore, projectStorage } from "../firebase/config";
import Drag from "./Drag";

const Gallery = () => {
  const [docs, setDocs] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

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
                <img
                  src={doc.url}
                  alt="uploaded pic"
                  className={`main__images__item__img smooth-image image-${
                    imageLoaded ? "visible" : "hidden"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="smooth-preloader">
                    <svg
                      width="38"
                      height="38"
                      viewBox="0 0 38 38"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke="#fff"
                    >
                      <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)" strokeWidth="2">
                          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                          <path d="M36 18c0-9.94-8.06-18-18-18">
                            <animateTransform
                              attributeName="transform"
                              type="rotate"
                              from="0 18 18"
                              to="360 18 18"
                              dur="1s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </g>
                      </g>
                    </svg>
                  </div>
                )}

                <button
                  className={`main__images__btn smooth-image image-${
                    imageLoaded ? "visible" : "hidden"
                  }`}
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
