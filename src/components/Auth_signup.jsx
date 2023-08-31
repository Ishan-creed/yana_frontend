import { React, useState } from 'react'
import { useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";
import icon from '../assets/pigeon.png';



const Auth_signup = () => {

   const {authInfo,updateAuthInfo,registerUser,authError,isAuthLoading} = useContext(AuthContext);

    // const [isSignUp, setIsSignUp] = useState(true);


    // const switchMode = () => {

    //     setIsSignUp((prevIsSignup) => !prevIsSignup);

    // }

    return (
        <div className='auth__form-container'>

            <div className='auth__form-container_fields'>
            <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}>
            <img style={{color:"white",height:"70px",marginLeft:"9px",marginBottom:"20px"}} src={icon}></img>
            <h3 style={{marginLeft:"8px"}}>You are not alone</h3>
            </div>
                <div className='auth__form-container_fields-content'>
                    <p>Sign Up</p>
                    <form onSubmit={registerUser}>
                   
                            <div className='auth__form-container_fields-content_input'>
                                <label htmlFor='userName'>Choose a username for yourself - which reflects you the best</label>
                                <input name='userName' type='text' onChange={(e)=> updateAuthInfo({...authInfo,userName:e.target.value})} required />
                            </div>
                       
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='email'>Enter your email</label>
                            <input name='email' type='text' onChange={(e)=> updateAuthInfo({...authInfo,email:e.target.value})} required />
                        </div>
                     
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Enter Password</label>
                            <input name='password' type='password' onChange={(e)=> updateAuthInfo({...authInfo,password:e.target.value})} required />
                        </div>
                        <div className='auth__form-container_fields-content_button'>
                            <button>Sign Up</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account'>
                        <p>
                            

                                 Already have an Account?
                           
                            
                            <span>
                                {isAuthLoading?(<div className='loader'></div>): ''}
                                <Link to='/authlogin' className="link-dark text-decoration-none" style={{textDecoration:"none",color:"black",marginLeft:"5px"}}>
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
