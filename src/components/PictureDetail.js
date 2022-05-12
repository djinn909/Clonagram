import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import {ref , uploadBytes , listAll , getDownloadURL, uploadBytesResumable , deleteObject} from 'firebase/storage';
import { auth, db, logout } from "../App";
import { query, collection, getDocs, where } from "firebase/firestore"; 
import { getStorage} from "firebase/storage";
import {storage} from '../App'; 
import { Link } from "react-router-dom";
import {v4} from 'uuid'; 
import { useParams } from "react-router-dom";

function PictureDetail() { 
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState(""); 
  const [userId , setUserId] = useState(); 
  const [pics , setPics] = useState([]);
  const navigate = useNavigate(); 
  const [clickedImage , setClicked] = useState({});

    let params = useParams(); 

    const fetchUserName = async () => {
      try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        
        
        setName(data.name); 
        setPics(data.pictures);
         setUserId(data.uid);
        console.log(userId); 
        console.log(params);
        console.log(data.pictures); 
       

        setClicked(data.pictures.find(picture => picture.id === params.robert)); 
        
   
      } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
      }
    }; 

    useEffect(() => {
      if (loading) return;
      if (!user) return navigate("/"); 
      
      fetchUserName();
      
    }, [user, loading]);


  return (

    <div>
      <div>Picture Detail</div>
      <img src={clickedImage.url} alt=""/>
    </div>
  )
}

export default PictureDetail;