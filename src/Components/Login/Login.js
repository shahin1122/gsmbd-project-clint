import React, { useContext } from 'react';
import { UserContext } from '../../App';
import firebase from "firebase/app"; 
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
const [loggedInUser , setLoggedInUser] = useContext(UserContext);


    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };



if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
 }else {
    firebase.app(); 
 }


 const handleGoogleSignIn=()=>{
    var provider = new firebase.auth.GoogleAuthProvider();



    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            
            var credential = result.credential;
            var token = credential.accessToken;
            //console.log(result.user);
            var {displayName , email , photoURL } = result.user;
            const signedInUser = {namee: displayName , email , photoURL}
            setLoggedInUser(signedInUser);
            history.replace(from);

            //console.log(user);

           
        }).catch((error) => {
            
            var errorCode = error.code;
            var errorMessage = error.message;
            var email = error.email;
            var credential = error.credential;
           
        });



}

    return (
        <div className="text-center">
           
            <h1 className="border border-primary text-center m-5 p-5"> <span className="text-primary">G</span> <span className="text-danger">o</span>  <span className="text-warning">o</span> <span className="text-primary">g</span> <span className="text-success">l</span> <span className="text-danger">e</span> </h1>
            <button className="btn btn-success " onClick={handleGoogleSignIn}>Sign in</button>
            
       
            
        </div>
    );
};

export default Login;