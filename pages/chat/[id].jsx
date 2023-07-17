import { Box } from "@mui/material";
import ChatComponent from "components/messages/ChatComponent";
import ChatNavbar from "components/messages/ChatNav";
import UserListComponent from "components/user/UserListComponent";
import { useEffect, useState } from "react";

export default function chatPage() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user) {
            const fetchUsers = async () => {
                const usersCollectionRef = collection(firebaseDB, 'users');
                const usersSnapshot = await getDocs(usersCollectionRef);
                const usersData = [];

                for (const docRef of usersSnapshot.docs) {
                    const userDoc = doc(firebaseDB, 'users', docRef.id);
                    const userSnapshot = await getDoc(userDoc);
                    const userData = userSnapshot.data();

                    // Exclude the current user
                    if (userSnapshot.id !== auth.currentUser.uid) {
                        const userWithId = {
                            id: docRef.id,
                            ...userData
                        };
                        usersData.push(userWithId);
                    }
                }
                setUsers(usersData);
            };
            fetchUsers();
        }
    }, [user]);


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
            <Box sx={{ width: '20%', borderRight: '1px solid gray', overflow: 'auto', bgcolor: '#1C1C1C', color: 'white' }}>
                <UserListComponent users={users} />
            </Box>
            <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <ChatNavbar user={user} />
                <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
                    <ChatComponent messages={messages} />
                </Box>
            </Box>
        </Box>
    )
}