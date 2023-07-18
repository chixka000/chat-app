import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography, IconButton } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { auth, firebaseDB } from 'lib/data/firebase';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';

const ChatNavbar = ({ userId }) => {
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const userDocRef = doc(firebaseDB, 'users', userId);
                    const userSnapshot = await getDoc(userDocRef);
                    if (userSnapshot.exists()) {
                        setUserData(userSnapshot.data());
                    }
                } catch (error) {
                    console.error(error);
                }
            };

            fetchUserData();
        }
    }, [userId]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            // Handle any additional logout actions or redirects
            router.push('/')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                backgroundColor: '#00A36C',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ marginRight: '10px' }} alt={userData?.name} src={userData?.profilePicture} />
                <Typography variant="h6" color={'white'}>{userData?.name}</Typography>
            </Box>
            <IconButton onClick={handleLogout} color="inherit">
                <ExitToAppIcon sx={{ color: 'white' }} />
            </IconButton>
        </Box>
    );
};

export default ChatNavbar;