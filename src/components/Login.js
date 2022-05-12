import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth,  signInWithGoogle } from "../App";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth"; 
import screens from '../screens.png' 
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button'; 
import { createTheme } from '@mui/material/styles';



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate(); 
  const navDiv = document.getElementById('navigator'); 
  
  const theme = createTheme({
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });
  
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="login">
      
      <div className="loginimg"><img src={screens} alt="" /> </div>

      <div className="login__container"> 
        <h4>Clonagram</h4> 

        <TextField id="outlined-basic" label="Email" variant="outlined" size="small"
        type="email"
        className="login__textBox"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
  placeholder="Email" /> 
         

          {/*<input
            type="text"
            className="login__textBox"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
/> */}
  
        <TextField id="outlined-basics" label="Password" variant="outlined" size="small"
        type="password"
        className="login__textBox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
placeholder="Password" /> 
       {/*<div className="loginpass">
          <input
            type="password"
            className="login__textBox"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
/> 
</div> */}
        <Button variant="contained" color="primary"  className="login__btn"
          onClick={() => signInWithEmailAndPassword(auth, email, password)}>
          Login</Button>
       

        <Button variant="contained" color='secondary' className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google</Button>
        
        <div className="resetpass">
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}
export default Login;