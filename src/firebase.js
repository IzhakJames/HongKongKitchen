import firebase from "firebase"

  const firebaseConfig = {
    apiKey: "AIzaSyBKkWaBaBQH83HF4r3thOswLU4_u7bbfQM",
    authDomain: "bt3103-week-6-b0cfd.firebaseapp.com",
    projectId: "bt3103-week-6-b0cfd",
    storageBucket: "bt3103-week-6-b0cfd.appspot.com",
    messagingSenderId: "648490427312",
    appId: "1:648490427312:web:ff43c163a9e76b77ca6c75",
    measurementId: "G-2NPYTRVXH5"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;