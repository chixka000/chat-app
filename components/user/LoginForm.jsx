import React, { useState } from 'react';
import { signInWithEmailAndPassword, auth } from 'lib/data/firebase';
import { Button, TextField, Box, Typography, Alert } from '@mui/material';
import Link from 'next/link';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: 360 }}>
                {error && (
                    <Alert severity="error" style={{ marginBottom: 10 }}>
                        {error}
                    </Alert>
                )}
                <div style={{ marginBottom: 10 }}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginBottom: 10 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div style={{ marginTop: 20 }}>
                    <Button type="submit" fullWidth variant="contained">Login</Button>
                </div>
            </form>
            <Box sx={{ mt: 2 }}>
                <Typography variant="body2" align="center">
                    Not yet registered? <Link href="/signup">Signup</Link>
                </Typography>
            </Box>
        </Box>
    );
}