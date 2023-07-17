import React from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';

const ChatComponent = ({ messages }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Box sx={{ flex: 1, overflow: 'auto' }}>
                {messages.map((message, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mb: 2,
                            flexDirection: message.isCurrentUser ? 'row-reverse' : 'row',
                        }}
                    >
                        <Avatar
                            src={message.profilePicture}
                            alt="Profile"
                            style={{
                                width: 40,
                                height: 40,
                                marginRight: 10,
                                borderRadius: '100%',
                                order: message.isCurrentUser ? 2 : 1,
                            }}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                maxWidth: '50%',
                                flexDirection: 'column',
                                flexGrow: 1,
                                backgroundColor: message.isCurrentUser ? '#7FFFD4' : '#fff',
                                color: 'white',
                                borderRadius: '15px',
                                padding: '20px',
                                order: message.isCurrentUser ? 1 : 2,
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                {message.time}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {message.text}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box component="form" sx={{ display: 'flex', p: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Type a message"
                    variant="outlined"
                    sx={{ mr: 2, flexGrow: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}
                />
                <Button variant="contained" sx={{ backgroundColor: '#00A36C', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}>Send</Button>
            </Box>
        </Box>
    );
};

export default ChatComponent;