import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Notification from './chat/notification';
import icon from '../assets/pigeon.png';

const NavBar = () => {


    const { user, logOutUser, updateThought, thought, updateUser } = useContext(AuthContext);
    const [title, setTitle] = useState("");
    const [welcome, setWelcome] = useState("");
    const [buttonStyle, setButonStyle] = useState({
        background:"black",
        color:"white",
        padding:"5px",
        borderRadius:"5px",
        marginLeft:"5px"
    });
    const [selectStyle, setSelectStyle] = useState({
        background:"black",
        color:"white",
        padding:"5px",
        borderRadius:"5px",
        marginLeft:"5px"
    });

    const smallButtonStyle = {

        padding: "2px 5px",
        fontSize: "12px",
        background: "black",
        color: "white",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer"

    }

    const smallSelectStyle = {

        padding: "2px", background: "black", color: "white", borderRadius: "10px", fontSize: "12px"

    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {

                setTitle("");
                setWelcome("");
                setSelectStyle(smallSelectStyle);
                setButonStyle(smallButtonStyle);

            } else {

                setTitle("YANA");
                setWelcome("Logged in as ");
                setSelectStyle({
                    background:"black",
                    color:"white",
                    padding:"5px",
                    borderRadius:"5px",
                    marginLeft:"5px"
                });
                setButonStyle({    
                background:"black",
                color:"white",
                padding:"5px",
                borderRadius:"5px",
                marginLeft:"5px"});
            }
        };

        // Initial check
        handleResize();

        // Add event listener to listen for screen size changes
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        <p style={{ textAlign: "center", color: "white", marginTop: "20px" }}>Made with ❤️ and care by Ishan Verma 🙂 ~ <b>YANA</b></p>
            <Navbar bg='light' className='mb-4' style={{ height: "3.75rem", color: "black", marginLeft: "20px", marginRight: "20px", borderRadius: "15px" }}>
                <Container >

                    <h4>
                        <Link to='/' className="link-dark text-decoration-none" style={{ textDecoration: "none" }}>

                            {title}

                            <img style={{ color: "white", height: "30px", marginLeft: "9px" }} src={icon}></img>

                        </Link>
                    </h4>
                    {user && (
                        <>
                            <span className='text-danger'><b>{welcome}{user?.userName}</b></span>

                            <form onSubmit={updateUser}>
                                <select style={selectStyle} onChange={(e) => updateThought({ ...thought, thought: e.target.value, id: user._id })} required >
                                    <option value="Select your thought">Thoughts ?</option>
                                    <option value="">Other option</option>
                                    <option value="Life">Life</option>
                                    <option value="Music">Music</option>
                                    <option value="College">College</option>
                                    <option value="Placement">Placement</option>
                                    <option value="Relationship">Relationship</option>
                                    <option value="FriendShip">FriendShip</option>
                                    <option value="Family">Family</option>
                                    <option value="People">People</option>
                                </select>
                                <button style={buttonStyle}>Search</button>
                            </form>
                        </>
                    )}
                    <Nav>
                        <Stack direction='horizontal' gap={3} >
                            <Notification />
                            {!user && (<> <Link to='/authSignup' className="link-dark text-decoration-none">
                                Register
                            </Link>
                                <Link to='/authlogin' className="link-dark text-decoration-none">
                                    Login
                                </Link></>)}

                            {user ?
                                <button style={{ color: "white", background: "black", borderRadius: "10px", padding: "5px" }} onClick={logOutUser}>Logout</button> :
                                ''
                            }
                        </Stack>
                    </Nav>
                </Container>

            </Navbar>

        </>
    )

};

export default NavBar;
