import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';

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
                        <img
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
                                backgroundColor: message.isCurrentUser ? '#00FFFF' : '#7FFFD4',
                                color: 'white',
                                borderRadius: '15px',
                                padding: '20px',
                                order: message.isCurrentUser ? 1 : 2,
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
                    sx={{ mr: 2, flexGrow: 1 }}
                />
                <Button variant="contained">Send</Button>
            </Box>
        </Box>
    );
};

export default ChatComponent;