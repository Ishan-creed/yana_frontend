import { React, useState } from 'react'
import { useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { AuthContext } from '../context/AuthContext';
import { Navigator } from 'react-router-dom';
import { Link } from "react-router-dom";
import icon from '../assets/pigeon.png';


const Auth_login = () => {

   const {authInfo,updateAuthInfo,loginUser,authError,isAuthLoading} = useContext(AuthContext);



    return (
        <div className='auth__form-container'>

            <div className='auth__form-container_fields'>
            <div style={{textAlign:"center",display:"flex",justifyContent:"center"}}>
            <img style={{color:"white",height:"70px",marginLeft:"9px",marginBottom:"20px"}} src={icon}></img>
            <h3 style={{marginLeft:"8px"}}>YOLO</h3>
            </div>
                <div className='auth__form-container_fields-content'>
                    <p>Sign In</p>
                    <form onSubmit={loginUser}>
                       
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='email'>Enter your email</label>
                            <input name='email' type='text' onChange={(e)=> updateAuthInfo({...authInfo,email:e.target.value})} required />
                        </div>
                     
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Enter Password</label>
                            <input name='password' type='password' onChange={(e)=> updateAuthInfo({...authInfo,password:e.target.value})} required />
                        </div>
                        <div className='auth__form-container_fields-content_button'>
                            <button>Sign In</button>
                        </div>
                    </form>
                    <div className='auth__form-container_fields-account' style={{color:"white"}}>
                        <p>
                           

                            Don't have an account?
                            
                            <span>
                                {isAuthLoading?( <div className='loader'></div> ): ''}
                                <Link to='/authSignup' className="link-dark text-decoration-none" style={{textDecoration:"none",marginLeft:"5px"}}>
                                Sign Up
                            </Link>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth_login;
