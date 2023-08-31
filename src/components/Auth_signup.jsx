import { React, useEffect, useState } from 'react'
import { useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import icon from '../assets/pigeon.png';



const Auth_signup = () => {


    const { authInfo, updateAuthInfo, registerUser, authError, isAuthLoading } = useContext(AuthContext);



    const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {

        setShowPopup(true);


        return () => {
            setShowPopup(false);
        };
    }, []);

    const close = () =>{
        setShowPopup(false);
    }


    return (
        <div className='auth__form-container'>

<div className={`popup ${showPopup ? 'popup' : 'popup_no'}`} id="how-it-works">
  <div className="popup-content">
  
    <h2 className="popup-title">Explore Like-Minded Connections with YANA</h2>
    <div className="popup-purpose">
      <h3>Purpose:</h3>
      <p>Connect with like-minded thinkers in real time.</p>
    </div>
    <div className="popup-steps">
      <h3>Steps:</h3>
      <ol>
        <li>
          <strong>Choose a Username:</strong>
          <p>Select a unique username that reflects your identity and personality.</p>
        </li>
        <li>
          <strong>Log In:</strong>
          <p>Sign in to your account to access the application's features.</p>
        </li>
        <li>
          <strong>Share Your Current Thought:</strong>
          <p>Express the thought that's on your mind at the moment.</p>
        </li>
        <li>
          <strong>Search for Similar Thoughts:</strong>
          <p>Initiate a search to find others who are thinking along the same lines.</p>
        </li>
        <li>
          <strong>Discover Similar Minds:</strong>
          <p> Explore a list of users who are currently sharing your thought.</p>
        </li>
        <li>
          <strong>Connect and Chat:</strong>
          <p>Initiate chats with those who have similar thoughts.</p>
        </li>
        <li>
          <strong>Engage in Meaningful Conversations:</strong>
          <p>Share your perspectives, discuss ideas, and connect with people who truly understand.</p>
        </li>
      </ol>
    </div>
    <div className="popup-application-purpose">
      <h3>Purpose of the Application:</h3>
      <p>The application aims to provide a platform where individuals can instantly connect with others who share their current thoughts. By offering real-time matches and chats, the app encourages meaningful interactions among like-minded people. It's a space to share ideas, engage in discussions, and foster connections based on shared thoughts, creating a unique and engaging social experience.</p>
    </div>
    <div className='auth__form-container_fields-content_button'>
    <button onClick={close}>Continue</button>
    </div>
  </div>
</div>


            <div className='auth__form-container_fields'>
                <div style={{ textAlign: "center", display: "flex", justifyContent: "center" }}>
                    <img style={{ color: "white", height: "70px", marginLeft: "9px", marginBottom: "20px" }} src={icon}></img>
                    <h3 style={{ marginLeft: "8px" }}>You are not alone</h3>
                </div>
                <div className='auth__form-container_fields-content'>
                    <p>Sign Up</p>
                    <form onSubmit={registerUser}>

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='userName'>Choose a username for yourself - which reflects you the best</label>
                            <input name='userName' type='text' onChange={(e) => updateAuthInfo({ ...authInfo, userName: e.target.value })} required />
                        </div>

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='email'>Enter your email</label>
                            <input name='email' type='text' onChange={(e) => updateAuthInfo({ ...authInfo, email: e.target.value })} required />
                        </div>

                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Enter Password</label>
                            <input name='password' type='password' onChange={(e) => updateAuthInfo({ ...authInfo, password: e.target.value })} required />
                        </div>
                        <div className='auth__form-container_fields-content_button'>
                            <button>Sign Up</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>


                            Already have an Account?


                            <span>
                                {isAuthLoading ? (<div className='loader'></div>) : ''}
                                <Link to='/authlogin' className="link-dark text-decoration-none" style={{ textDecoration: "none", color: "black", marginLeft: "5px" }}>
                                    Sign In
                                </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth_signup
