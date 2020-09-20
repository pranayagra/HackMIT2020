import * as firebase from 'firebase';
import '@firebase/auth';
import 'firebase/firebase-firestore';
import '@firebase/firestore';

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/7.5.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="/__/firebase/7.5.0/firebase-analytics.js"></script>

// <!-- Initialize Firebase -->s
// <script src="/__/firebase/init.js"></script>

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAEn67hSe1wQ7EvcBeUCg3yrlWORHrKj9g",
    authDomain: "hackmit2020telehuggies.firebaseapp.com",
    databaseURL: "https://hackmit2020telehuggies.firebaseio.com",
    projectId: "hackmit2020telehuggies",
    storageBucket: "hackmit2020telehuggies.appspot.com",
    messagingSenderId: "12933073699",
    appId: "1:12933073699:web:c6b6b763fc3a298b815a96",
    measurementId: "G-1PYGD5QGRT"
  };
// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export {firebase};
// var firestore = firebase.firestore();

// export default firestore;