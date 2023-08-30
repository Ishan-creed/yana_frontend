import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/chatContext";

const PotentialChats = () => {

    const {user} = useContext(AuthContext);
    const { potentialChats,createChat,onlineUsers } = useContext(ChatContext);
    console.log("PotentialChats", potentialChats);

    return (

        <>
            <div className="all-users">
                {potentialChats && potentialChats.map((u,index) => {

                    return(

                    <div>
                      <div className="single-user" key={index} onClick = {()=> createChat(user._id,u._id)}>
                       {u.userName}
                        <span className={
                           onlineUsers?.some((user)=> user?.userId === u?._id) ?
                            "user-online":""
                            }></span>
                      </div>
                    </div>
                    )
                })}
            </div>
        </>

    );
}

export default PotentialChats;