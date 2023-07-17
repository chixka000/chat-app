import { Box } from "@mui/material";
import ChatComponent from "components/messages/ChatComponent";
import ChatNavbar from "components/messages/ChatNav";
import UserListComponent from "components/user/UserListComponent";
import AuthContext from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function ChatPage() {
    const router = useRouter();
    const { id } = router.query;

    // Sample messages data
    const messages = [
        {
            id: 1,
            profilePicture: 'https://images.pexels.com/photos/17585373/pexels-photo-17585373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            time: '10:30 AM',
            text: 'Hello there!'
        },
        {
            id: 2,
            profilePicture: 'https://images.pexels.com/photos/17585373/pexels-photo-17585373.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            time: '11:00 AM',
            text: 'How are you doing?'
        },
        {
            id: 3,
            profilePicture: 'https://images.pexels.com/photos/17573995/pexels-photo-17573995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  ',
            time: '11:30 AM',
            text: 'I am doing great. Thanks for asking!'
        }
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            <UserListComponent />
            <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ChatNavbar userId={id} />
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    <ChatComponent messages={messages} />
                </Box>
            </Box>
        </Box>
    )
}