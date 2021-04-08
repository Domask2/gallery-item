import React, { useState, useEffect } from 'react';
import { projectFireStore, projectStorage } from '../firebase/config';

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
      var desertRef = projectStorage.ref().child(e.target.getAttribute('name'));
      desertRef
        .delete()
        .then(() => {
          console.log('delete');
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        });
    }
  };

  // console.log(docs);
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id}>
            <img src={doc.url} alt="uploaded pic" />
            <button onClick={deleteImage} data={doc.id} name={doc.name}>
              {' '}
              Удалить{' '}
            </button>
          </div>
        ))}
    </div>
  );
};

export default Gallery;
