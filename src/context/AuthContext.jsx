import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest , putRequest } from "../services";
import { baseUrl } from "../services";
export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [authError, setAuthError] = useState(null);
    const [isAuthLoading, setisAuthLoading] = useState(false);
    const [thoughtError,setThoughtError] = useState(null);

    const [authInfo, setAuthInfo] = useState({
        userName: "",
        email: "",
        password: ""
        
    });

    const [thought,setThought] = useState({

        thought:"",
        id:""

    })

    console.log("thought", thought);

    console.log("Auth Info", authInfo);

    useEffect(() => {

        const user = localStorage.getItem(`User`)

        setUser(JSON.parse(user));
    }, []);

    const updateAuthInfo = useCallback((info) => {
        setAuthInfo(info);


    }, []);

    const updateThought = useCallback((thought)=>{
        setThought(thought);
    },[]);

    const registerUser = useCallback(async (e) => {

        e.preventDefault();
        setisAuthLoading(true);
        setAuthError(null);

        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(authInfo));

        setisAuthLoading(false);

        if (response.error) {
            return setAuthError(response);
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);

    }, [authInfo])

    const updateUser = useCallback(async (e)=>{

        e.preventDefault();
        setThoughtError(null);

        try{
        const response = await putRequest(`${baseUrl}/users/update`,JSON.stringify(thought));

        if(response.error){
            return setThoughtError(response);
        }

        localStorage.setItem("User",JSON.stringify(response));

        setThought("");

        window.location.reload();

  
    }
    catch(error){
        console.log("error",error);
    }
        

    },[thought]);

    const logOutUser = useCallback(() => {

        localStorage.removeItem(`User`);
        setUser(null);

    }, []);

    const loginUser = useCallback(async (e) => {

        e.preventDefault();
        setisAuthLoading(true);
        setAuthError(null);

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(authInfo));

        setisAuthLoading(false);

        if (response.error) {
            return setAuthError(response);
        }
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);

    }, [authInfo])

    return <AuthContext.Provider value={{ user, authInfo, updateAuthInfo, registerUser, authError, isAuthLoading, logOutUser, loginUser,updateThought,thought,setThought,updateUser }}>
        {children}
    </AuthContext.Provider>
}