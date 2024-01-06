import  memoize from 'lodash/memoize';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAsdPXi7m3etlD0Siq1yRdNQKmuGXoZr00",
  authDomain: "prodsnap-io.firebaseapp.com",
  databaseURL: "https://prodsnap-io-default-rtdb.firebaseio.com",
  projectId: "prodsnap-io",
  storageBucket: "prodsnap-io.appspot.com",
  messagingSenderId: "406892475104",
  appId: "1:406892475104:web:cbc06925895b8e49f99685",
  measurementId: "G-NVC7KT2V5Q"
};

// Initialize Firebase
export const initFirebase = memoize(() => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  return { auth }
 })