import React, { useEffect, useState } from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseDB } from 'lib/data/firebase';

const ChatNavbar = ({ userId }) => {
    const [userData, setUserData] = useState(null);

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
        </Box>
    );
};

export default ChatNavbar;