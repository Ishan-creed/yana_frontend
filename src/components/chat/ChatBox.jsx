import { useContext, useEffect, useRef, useState } from "react";
import { Stack } from "react-bootstrap";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipients";
import moment from 'moment';
import InputEmoji from 'react-input-emoji';
import icon from '../../assets/pigeon.png';

const ChatBox = () => {

    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessageLoading, sendTextMessage,sendTextMessageError} = useContext(ChatContext);
    const { recipientUser } = useFetchRecipient(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    const scroll = useRef()

    const handleClick= async () => {
        await sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
        setTextMessage(""); // Reset the input text after sending
      };

    useEffect(()=>{

        scroll.current?.scrollIntoView({behavior:"smooth"});

    },[messages])

    console.log(textMessage);

    if (!recipientUser) return (
        <p style={{ alignText: "center", width: "100%" }}>
            No conversation selected yet...
        </p>
    );

    if (isMessageLoading) return (
        <p style={{ alignText: "center", width: "100%" }}>
            Loading Chat....
        </p>
    );

    return <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{recipientUser?.userName}</strong>
        </div>
        <Stack gap={3} className="messages">
            {messages && messages.map((message, index) => <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}
            
           ref = {scroll}>
                <span>{message.text}</span>
                <span className="message-footer">{moment(message.createdAt).calendar()}</span>
            </Stack>)}
        </Stack>
        <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
            <InputEmoji setValue={textMessage} onChange={setTextMessage} fontFamily="nunito" borderColor="rgba(72,112,223,0.2)" />
            <button className="send-btn" onClick={()=>sendTextMessage(textMessage,user,currentChat._id ,setTextMessage)}>
            <img style={{color:"white",height:"30px"}} src={icon} onClick={handleClick}></img>

            </button>
        </Stack>
    </Stack>;

}

export default ChatBox;