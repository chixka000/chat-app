import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth, signInWithEmailAndPassword } from 'lib/data/firebase';
import { Alert, Box, Button, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';

export default function SignupFromComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setError(false);

      // Delay login by 1.5 seconds. Auto-logged in, redirect to index if successful
      setTimeout(async () => {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/');
      }, 1500);

    } catch (error) {
      setSuccess(false);
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
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
        {success && ( // Display success message if registration was successful
          <Alert severity="success" style={{ marginBottom: 10 }}>
            Registration successful!
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
          <Button type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </div>
      </form>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" align="center">
          Already have account? <Link href="/">Login</Link>
        </Typography>

      </Box>
    </Box>
  );
}