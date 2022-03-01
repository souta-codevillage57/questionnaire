import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKCVSHPwSw39YyRxxXSQTOx0NWgey60sc",
  authDomain: "questionnaire-952b8.firebaseapp.com",
  projectId: "questionnaire-952b8",
  storageBucket: "questionnaire-952b8.appspot.com",
  messagingSenderId: "707952636984",
  appId: "1:707952636984:web:81d5936b535a98663ea2cd"
}

firebase.initializeApp(firebaseConfig);

export default firebase 