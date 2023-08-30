import React, { useContext } from 'react'
import { useFetchRecipient } from '../../hooks/useFetchRecipients';
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import '../../index.css';
import avatar from '../../assets/avatar.svg';
import { ChatContext } from '../../context/chatContext';
import { unreadNotificationsFunc } from '../../utils/unreadNotifications';
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import moment from 'moment';

const UserChat = ({ chat, user }) => {

    const { recipientUser } = useFetchRecipient(chat, user);
    const {onlineUsers , notification} = useContext(ChatContext);
    const unreadNotifications = unreadNotificationsFunc(notification);
    const thisUserNotification = unreadNotifications?.filter(
   

        n => n.senderId === recipientUser?._id
    );
    const {latestMessage} = useFetchLatestMessage(chat);

    const truncateText = (text) => {
        let shortText = text.substring(0, 20);
      
        if (text.length > 20) {
          shortText = shortText + "...";
        }
      
        return shortText;
      };


    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id)

    return (

        <Stack direction='horizontal' gap={3} className="user-card align-times-center p-2 justify-content-between" role="button">
            <div className='d-flex'>
                <div className='me-2'>
                    <img src={avatar} height="35px" />
                </div>
                <div className='text-content'>
                    <div className='name'>
                        {recipientUser?.userName}
                    </div>
                    <div className='text'>
                        {latestMessage?.text && (
                            <span>{truncateText(latestMessage?.text)}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className='d-flex flex-column align-items-end'>

                <div className='date'>
                    {moment(latestMessage?.createdAt).calendar()}
                </div>
                <div className={thisUserNotification.length > 0 ? 'this-user-notifications': ""}>{thisUserNotification?.length > 0 ? thisUserNotification?.length : ''}</div>
                <div className={isOnline?'user-online':''}></div>

            </div>
        </Stack>
    )

}

export default UserChat;
