import  { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {collection,doc,setDoc,getDoc} from 'firebase/firestore'
import db from '../firebase.js'
import {  useNavigate } from 'react-router-dom';
const Login = () => {
  const { setUser } = useContext(AuthContext);
  const history = useNavigate()
  const loginWithGoogle= async()=>{
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt:"select_account",
            })
            const auth = getAuth();
            try{
            const response= signInWithPopup(auth, provider);
            const authData = await response;
            
            //Store data in firebase
            if(authData.user){
              let obj={
                name: authData.user.displayName,
                email: authData.user.email,
                photoURL: authData.user.photoURL
              }
              setUser(obj)
                const userRef = collection(db, "users");
                const userDoc = doc(userRef, authData.user.uid);
                const snapshot = await getDoc(userDoc)
                if(!snapshot.exists()){
                await setDoc(userDoc, {
                    name: authData.user.displayName,
                    email: authData.user.email,
                    photoURL: authData.user.photoURL
                })
                }
            }
            history('/')
          }catch(error){
            console.log('Login error',error)
          }
        }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <Button
        variant="contained"
        startIcon={<GoogleIcon />}
        onClick={loginWithGoogle}
      >
        Login with Google
      </Button>
    </div>
  );
};

export default Login;
