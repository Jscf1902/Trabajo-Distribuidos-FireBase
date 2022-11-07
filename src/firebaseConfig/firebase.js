//Codigo de configuracion de Firebase
//Nombre del proyecto de firebase crud-distribuido
//Enviado al correo victora.pedrazab@utadeo.edu.co con permisos de editor

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import{getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCUDeWELJBdwAyzNwfPWDRlCu7Imir-T_E",
  authDomain: "crud-distribuidos-90ac4.firebaseapp.com",
  projectId: "crud-distribuidos-90ac4",
  storageBucket: "crud-distribuidos-90ac4.appspot.com",
  messagingSenderId: "121267034068",
  appId: "1:121267034068:web:032b1062e3d994367d2841"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db=getFirestore(app)