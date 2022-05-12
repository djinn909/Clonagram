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


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState(""); 
  const [userId , setUserId] = useState(); 
  const [pics , setPics] = useState([]);
  const navigate = useNavigate(); 
   
  const [imageList , setImageList] = useState([]);
  let countId = 0;

  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      
      console.log(pics);
      setName(data.name); 
      setPics(data.pictures);
       setUserId(data.uid);
      console.log(userId); 

     
 
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
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
         <button className="dashboard__btn" onClick={logout}>
          Logout
         </button>
       </div>
       <div>
         {pics.map((item) => {
           
           return (
           <Link  key={item.id} to={`/dashboard/${item.id}`}>
           <img  src={item.url} alt='' /> 

           
           </Link>
         )})}
       </div>
     </div>
  );
}
export default Dashboard;