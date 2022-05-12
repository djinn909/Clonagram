
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import React from 'react'; 
import {BrowserRouter as Router , Switch , Outlet, Route , Routes} from 'react-router-dom'; 
import Nav from "./components/Nav"; 
import Home from "./components/Home"
import Login from "./components/Login"; 
import Dashboard from "./components/Dashboard"; 
import Register from "./components/Register"; 
import Reset from "./components/Reset";
import { Link } from 'react-router-dom'; 
import { collection, doc, setDoc , getDoc, getDocs, query, where, addDoc } from "firebase/firestore"; 
import uniqid from 'uniqid'; 
import { getAuth, signInWithEmailAndPassword, useSignInWithGoogle , signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import './App.css'; 
import {signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"; 
import {getStorage} from "firebase/storage";
import Upload from "./components/Upload"; 
import PictureDetail from "./components/PictureDetail";
  

const firebaseConfig = {
  apiKey: "AIzaSyCiIcRcIMP7ZAQHglcI-bNT43kFaUxre5I",
  authDomain: "clonagram-9e016.firebaseapp.com",
  projectId: "clonagram-9e016",
  storageBucket: "clonagram-9e016.appspot.com",
  messagingSenderId: "1031665002008",
  appId: "1:1031665002008:web:8d90ec0c1906878f50856d"
};


const app = initializeApp(firebaseConfig); 
const db = getFirestore(app); 
const auth = getAuth();
const googleProvider = new GoogleAuthProvider(); 
export const storage = getStorage(app)

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await setDoc(doc(db, "users" , user.uid), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err); 
    alert(err.message);
  }
};

const logInWithEmailAndPassword = (auth, email, password) => {
      
        signInWithEmailAndPassword(auth, email, password);
      }
        

const registerWithEmailAndPassword = async (name, email, password) => {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users" , user.uid), {
          uid: user.uid,
          name,
          authProvider: "local",
          email,
          pictures: [], 
        });
        
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }; 

const sendPasswordReset = async (email) => {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

const logout = () => {
      signOut(auth);
    };




const writeCities = async() => {

const usersCol = collection(db, "users"); 




await setDoc(doc(usersCol, "Mark"), {
    name: "John Doe", 
    id:uniqid(), 
    email: "johndoe@mailo.com", 
    picture: "johndoeprofile.jpg",
    followers: ["" , ""], 
    pictures : ["" , ""] }); 
    
}; 

const getCities = async() => {
const docRef = doc(db, "cities", "SF");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}}

const navLayout = () => {
  <>
  <Nav />
  <Outlet /> 
  </>
}

writeCities(); 
getCities();

const AppLayout = () => (
  <>
    <Nav />
    
        <Outlet /> 
      
  </>
);

function App() { 

  

  return (

    <Router> 
      
      
      <Routes> 

        <Route path='/' element={<Login/>} /> 
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/reset" element={<Reset />} />
      <Route path="/" element={<AppLayout />} >
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/upload" element={<Upload />} /> 
        <Route path="/dashboard/:robert" element={<PictureDetail />} />
      </Route>
      </Routes>

    

    </Router>
  );
} 




export default App;
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  signInWithEmailAndPassword,
};
