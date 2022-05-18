// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5PIB_4YGTLPKZpRofYnkGl3KjGaEW9Q4",
  authDomain: "task-to-do-175c4.firebaseapp.com",
  projectId: "task-to-do-175c4",
  storageBucket: "task-to-do-175c4.appspot.com",
  messagingSenderId: "790007336735",
  appId: "1:790007336735:web:12ff11b71069463845ea2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//el objeto db es la conexión a la bbdd
const db = getFirestore();

const saveTask = (title, description) =>
  //añado un documento a la collection que usa la conexion de la db
  addDoc(collection(db, "tasks"), { title, description });

const getTasks = () => getDocs(collection(db, "tasks"));

const getOneTask = (id) => getDoc(doc(db, "tasks", id));

const onGetTasks = (callback) => onSnapshot(collection(db, "tasks"), callback);

/*  solo voy a eliminar una tarea así que le paso doc, la conexion de la bd, la collection
  en la que esta y el id para eliminar */
const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export {
  saveTask,
  getTasks,
  onGetTasks,
  onSnapshot,
  collection,
  db,
  deleteTask,
  getOneTask,
  updateTask
};