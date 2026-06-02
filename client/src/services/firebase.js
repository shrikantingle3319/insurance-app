import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyC2m8ESDLTvl9qI6_CElpaKKYLMHIJHTCg",

  authDomain: "my-proj-87b27.firebaseapp.com",

  projectId: "my-proj-87b27",

  storageBucket: "my-proj-87b27.firebasestorage.app",

  messagingSenderId: "755923256798",

  appId: "1:755923256798:web:af473eee30bd100cc0494f",

  measurementId: "G-GZNTTWRMGT"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export {
  auth,
  provider
};