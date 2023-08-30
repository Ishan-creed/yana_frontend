import { useEffect,useState } from "react";
import { getRequest,baseUrl } from "../services";


export const useFetchRecipient = (chat,user) =>{

    const [recipientUser,setRecipientUser] = useState(null);
    const [error,setError] = useState(null);

    const recipientId = chat?.members.find((id)=> id !== user?._id);

    useEffect(()=>{

        const getUser = async()=>{

         if(!recipientId) return null;

         const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

         if(response.error){

            return setError(error);

         }

         if(response!== null){
         setRecipientUser(response);
         }

        };

        getUser();

    },[recipientId])
    return {recipientUser,error};
    
}