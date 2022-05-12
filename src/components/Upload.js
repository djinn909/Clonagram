import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import {storage} from '../App'; 
import {ref , uploadBytes , listAll , getDownloadURL, uploadBytesResumable , deleteObject} from 'firebase/storage'; 
import {v4} from 'uuid'; 
import { arrayUnion, connectFirestoreEmulator } from "firebase/firestore";  
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../App";
import { query, collection, getDocs, where } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore";  
import { addDoc , updateDoc , arrayRemove } from "firebase/firestore"; 






function Upload() {

let imageUpload=useRef('0');
// const [imageUpload , setImageUpload] = useState(null); 



const [imgUrl, setImgUrl] = useState(null);
const [progresspercent, setProgresspercent] = useState(0);
const [imageName , setImageName] = useState(); 

const [user, loading, error] = useAuthState(auth);
const [name, setName] = useState(""); 
const [imageDesc , setImageDesc] = useState();
const navigate = useNavigate();
const fetchUserName = async () => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    setName(data.uid);
    console.log(name);
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};


const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target?.files[0]
    if (!file) {
        return;
    }
    const storageRef = ref(storage, `files/${name}/${file.name}`); 
    ; 
    setImageDesc(file.name);
    
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          console.log('hellaaaa')
          setImageName(storageRef); 
          
        });
      }
    );
  }

const textConsole = (e) => {
    console.log(e.target.files); 
} 

const cancelUpload = (e) => {
    //const fileToDelete = ref(storage, `files/${file.name}`)
        deleteObject(imageName).then(() => {
            console.log('DELETED SUCCESSFUL erzz5656z65t6z5'); 
            setImgUrl(null);
        })
} 

const navDash =async  (e) => {
  console.log(name)
  const doc1 = doc(db, "users" , name); 
  const pic = {
    url: imgUrl, 
    id: v4(),
    name: imageDesc, 
    dateAdd: "zerzr"
  }
  await updateDoc(doc1 , {
    pictures: arrayUnion(pic)
  });
  
  navigate("/dashboard");
  
}

useEffect(() => {
  if (loading) return;
  if (!user) return navigate("/");
  fetchUserName();
}, [user, loading]); 


  return (
    <div className="upload">
        

        <div className="App">
      <div  className='form'>
        <input onChange={handleSubmit} type='file' /> 
        <input type="textfield" name="" id="" placeholder="Type caption" />
        <button onClick={navDash} >Post</button> 
        <button onClick={cancelUpload} >Cancel </button>
      </div>
      {
        !imgUrl &&
        <div className='outerbar'>
          <div className='innerbar' style={{ width: `${progresspercent}%` }}>{progresspercent}%</div>
        </div>
      }
      {
        imgUrl &&
        <img src={imgUrl} alt='uploaded file' height={200} />
      }
    </div>
    </div>
  )
}

export default Upload