import React, { useContext,useEffect,useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/chatContext';
import ChatBox from './chat/ChatBox';
import PotentialChats from './chat/PotentialChats';
import UserChat from './chat/userChat';

const Chat = () => {
  const { user,updateThought,thought,updateUser } = useContext(AuthContext);
  const { userChats, userChatsLoading,updateCurrentChat } = useContext(ChatContext);

  console.log("UserChats", userChats);

  const [stackDirection, setStackDirection] = useState('horizontal');
  const [gap, setGap] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setStackDirection('vertical');
        setGap(1);
      } else {
        setStackDirection('horizontal');
        setGap(5);
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
    <Container style={{paddingBottom:"60px"}}>
   
    <h6 style={{color:"white",marginBottom:"20px"}}>Matched Users with the same thought:</h6>
    <hr style={{color:"white"}}></hr>
    <PotentialChats/>
    <hr style={{color:"white"}}></hr>

   
      {userChats?.length < 1 ? null : (
        <Stack
          direction={stackDirection} gap={gap} className="align-items-start" style={{marginBottom:"20px"}}>
          <Stack style={{ flexGrow: 1, minWidth: 0 }} className='messages-box box flex-grow-0 pe-3' gap={4}>
       

            {userChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
