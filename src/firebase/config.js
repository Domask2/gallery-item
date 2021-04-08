import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: 'AIzaSyATGJ4SSBYgrGhxyOyCVCG9WYUoiw5d9d8',
  authDomain: 'firegram-39e15.firebaseapp.com',
  databaseURL:
    'https://firegram-39e15-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'firegram-39e15',
  storageBucket: 'firegram-39e15.appspot.com',
  messagingSenderId: '1035538122088',
  appId: '1:1035538122088:web:6b563aa5a18446ad1a02dd',
});

const projectStorage = firebase.storage();
const projectFireStore = firebase.firestore();
const timestamp =
  firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFireStore, timestamp };
