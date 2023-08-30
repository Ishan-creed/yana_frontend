import { createContext, useState, useEffect, useCallback } from "react";
import { async } from "react-input-emoji";
import { getRequest, baseUrl, postRequest } from "../services";
import { io } from 'socket.io-client';
import notificationSound from '../assets/myTone2.mp3';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {

    const [userChats, setUserChats] = useState(null);
    const [userChatsError, setUserChatsError] = useState(null);
    const [userChatsLoading, setUserChatsLoading] = useState(false);
    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [isMessageLoading, setMessageLoading] = useState(null);
    const [messagesError, setMessagesError] = useState(null);
    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const  [notification,setNotification] = useState([]);
    const [allUsers,setAllUsers] = useState([]);
    const [thoughtError,setThoughtError] = useState(null);


    console.log("notification:", notification);

    const [thought,setThought] = useState({

        thought:"",
        id1:"",
        id2:""

    })

    const updateThought = useCallback((thought)=>{
        setThought(thought);
    },[]);

    
    


    useEffect(() => {
        const newSocket = io("https://yana-socket.onrender.com");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        }

    }, [user]);



    useEffect(() => {

        if (socket === null) return;

        socket.emit("addNewUser", user?._id);
        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        })

        return () => {
            socket.off("getOnlineUsers");
        };

    }, [socket]);


    //send message live....

    useEffect(() => {

        if (socket === null) return;

        const recipientId = currentChat?.members?.find((id) => id !== user?._id);

        socket.emit("sendMessage", { ...newMessage, recipientId })

    }, [newMessage]);


    // receiveMessage And notification

    useEffect(() => {

        if (socket === null) return;

         socket.on("getMessage",res=>{

            if(currentChat?._id !== res.chatId) return 

            setMessages((prev)=> [...prev,res]);

         });

         socket.on("getNotification",(res)=>{
            
            const isChatopen = currentChat.members.some(id => id === res.senderId);

            if(isChatopen){
                setNotification(prev => [{...res,isRead:true},...prev])
            }
            else{
                setNotification(prev=>[res,...prev]);

            }

         })

         return ()=>{
            socket.off("getMessage");
            socket.off("getNotification");
         }

    }, [socket,currentChat]);


    useEffect(() => {

        const getUsers = async () => {

            const response = await getRequest(`${baseUrl}/users`);

            if (response.error) {
                return console.log("Error fethcing users", response);
            }

            const pChats = response.filter((u) => {

                return u?._id !== user?._id && u?.thought === user?.thought;

            });

           

            setPotentialChats(pChats);
            console.log("potentialChats, thought",potentialChats,user?.thought);
            setAllUsers(response);
        };

        getUsers();

    }, [userChats,user]);

    useEffect(() => {

        const getUserChats = async () => {

            if (user?._id) {

                setUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                setUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError(response);
                }

                setUserChats(response);

                // if(notification){
                //     const audio = new Audio(notificationSound);
                //     audio.play()
                // }
            }


        }

        getUserChats();

    }, [user,notification]);


    useEffect(() => {

        const getMessages = async () => {


            setMessageLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

            setMessageLoading(false);

            if (response.error) {
                return setMessagesError(response);
            }

            setMessages(response);


        }

        getMessages();

    }, [currentChat])

    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {

        if (!textMessage) return console.log("You must type somethis...");

        const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
            chatId: currentChatId,
            senderId: sender._id,
            text: textMessage
        }));

        if (response.error) {
            return setSendTextMessageError(response);
        }

        setNewMessage(response);
        setMessages((prev) => [...prev, response]);
        setTextMessage("");



    }, [messages])

    const updateCurrentChat = useCallback((chat) => {

        setCurrentChat(chat);

    }, [])


    const createChat = useCallback(async (firstId, secondId) => {

        const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({
            firstId,
            secondId,
        }));

        if (response.error) {
            return console.log("Error creating chat", response);
        }

        setUserChats((prev) => [...prev, response]);


    }, []);


     const markAllNotificationsAsRead = useCallback((notifications)=>{

     const mNotifications = notifications.map(n => { return {...n , isRead : true}});

     setNotification(mNotifications);
    

    },[])


     


    return <ChatContext.Provider value={{
        userChats,
        userChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessageLoading,
        messagesError,
        sendTextMessage,
        sendTextMessageError,
        onlineUsers,
        notification,
        allUsers,
        markAllNotificationsAsRead


    }}>
        {children}
    </ChatContext.Provider>

}
