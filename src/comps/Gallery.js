import React, { useState, useEffect } from 'react';
import { projectFireStore, projectStorage } from '../firebase/config';
import Drag from './Drag';
import { AiOutlineDelete } from 'react-icons/ai';
import ImageLoader from 'react-loading-image/lib/index';
import SvgLoading from './SvgLoading';

const Gallery = () => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFireStore
      .collection('images')
      .orderBy('createdAt', 'desc')
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
    const collectionRef = projectFireStore.collection('images');
    collectionRef.doc(e.target.getAttribute('data')).delete();

    if (e.target.getAttribute('name')) {
      const desertRef = projectStorage.ref().child(e.target.getAttribute('name'));
      desertRef.delete().catch((error) => {
        throw error;
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
                <ImageLoader
                  className="main__images__item__img"
                  src={doc.url}
                  loading={() => <SvgLoading />}
                />

                <button
                  className="main__images__btn"
                  onClick={deleteImage}
                  data={doc.id}
                  name={doc.name}>
                  <AiOutlineDelete />
                </button>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
