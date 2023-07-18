import React, { useState } from 'react';
import { createUserWithEmailAndPassword, auth, signInWithEmailAndPassword, firebaseDB, firebaseStorage } from 'lib/data/firebase';
import { Alert, Box, Button, CircularProgress, Link, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function SignupFormComponent({ toggleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess(true);
      setError(false);

      // Delay login by 1.5 seconds. Auto-logged in, redirect to index if successful
      setTimeout(async () => {

        // Upload profile picture to Firebase Storage
        const storageRef = ref(firebaseStorage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, profilePicture);

        // Get the download URL of the uploaded profile picture
        const downloadUrl = await getDownloadURL(storageRef);

        // Create a "users" document in Firestore with user information
        const userDocRef = doc(firebaseDB, 'users', auth.currentUser.uid);
        await setDoc(userDocRef, {
          email: email,
          password: password,
          name: name,
          profilePictsure: downloadUrl,
        });

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
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div style={{ marginBottom: 10 }}>
          <input
            type="file"
            accept="image/*"
            id="profilePicture"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="profilePicture">
            <Button component="span" variant="contained" color="primary">
              Upload Profile Picture
            </Button>
          </label>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button type="submit" fullWidth variant="contained" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
          </Button>
        </div>
      </form>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" align="center">
          Already have account? <Link onClick={toggleLogin} sx={{ cursor: 'pointer' }}>Login</Link>
        </Typography>

      </Box>
    </Box>
  );
}