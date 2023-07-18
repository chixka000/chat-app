import React from 'react';
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';

const ChatComponent = ({ messages, handleSendMessage, newMessage, setNewMessage, userId, receiverDataImg, senderDataImg }) => {
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
                            flexDirection: userId === message.senderId ? 'row-reverse' : 'row',
                        }}
                    >
                        {userId !== message.senderId && (
                            <Avatar
                                src={receiverDataImg}
                                alt="Profile"
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginRight: 10,
                                    borderRadius: '100%',
                                }}
                            />
                        )}

                        <Box
                            sx={{
                                display: 'flex',
                                maxWidth: '50%',
                                flexDirection: 'column',
                                flexGrow: 1,
                                backgroundColor: message.senderId === userId ? '#7FFFD4' : '#fff',
                                color: 'white',
                                borderRadius: '15px',
                                padding: '20px',
                                order: message.senderId === userId ? 1 : 2,
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                {new Date(message.time).toLocaleString('en-US', {
                                    hour: 'numeric',
                                    minute: 'numeric',
                                    hour12: true,
                                })}
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {message.text}
                            </Typography>
                        </Box>
                        {userId === message.senderId && (
                            <Avatar
                                src={senderDataImg}
                                alt="Profile"
                                style={{
                                    width: 40,
                                    height: 40,
                                    marginLeft: 10,
                                    borderRadius: '100%',
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
            <Box component="form" sx={{ display: 'flex', p: 2 }}>
                <TextField
                    id="outlined-basic"
                    label="Type a message"
                    variant="outlined"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    sx={{ mr: 2, flexGrow: 1, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '15px' }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: '#00A36C', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default ChatComponent;