import React from 'react';
import { Box, Avatar, Typography } from '@mui/material';

const ChatNavbar = ({ user }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ marginRight: '10px' }} alt={user.name} src={user.profilePicture} />
                <Typography variant="h6">{user.name}</Typography>
            </Box>
        </Box>
    );
};

export default ChatNavbar;