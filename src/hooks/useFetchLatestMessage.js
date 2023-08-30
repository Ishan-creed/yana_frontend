import { useContext, useEffect, useState } from "react"
import { ChatContext } from "../context/chatContext"
import { baseUrl, getRequest } from "../services";


export const useFetchLatestMessage = (chat) =>{
    const {newMessage,notification} = useContext(ChatContext);
    const [latestMessage,setLatestMessage] = useState(null);


    useEffect(()=>{

        const getMessages = async ()=>{

            const response = await getRequest(`${baseUrl}/messages/${chat?._id}`);

            if(response.error){

                return console.log("Error getting messages...");

            }

            const latestMessage = response[response?.length-1];

            setLatestMessage(latestMessage);
        };

        getMessages();

    },[newMessage,notification])

    return {latestMessage};
}