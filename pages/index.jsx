import { auth, firebaseDB } from 'lib/data/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Login from 'components/user/LoginForm';
import { Box, Button, CircularProgress, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export default function Home() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    })

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [])

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
            usersData.push(userData);
          }
        }
        setUsers(usersData);
      };
      fetchUsers();
    }

  }, [user]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box sx={{ width: '25%', borderRight: '1px solid gray', overflow: 'auto', bgcolor: '#1C1C1C', color: 'white' }}>
        <List component="nav">
          {users.length && users.map((user, index) => (
            <ListItem key={index} sx={{ py: 2 }}>
              <ListItemText primary={user.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ width: '75%', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ overflow: 'auto', height: '90%' }}>
          {/* Replace this with the messages */}
          <Typography variant="body1">Welcome to the chat!</Typography>
        </Box>
        <Box component="form" sx={{ display: 'flex', mt: 2 }}>
          <TextField
            id="outlined-basic"
            label="Type a message"
            variant="outlined"
            sx={{ mr: 2, flexGrow: 1 }}
          />
          <Button variant="contained">Send</Button>
        </Box>
      </Box>
    </Box>
  );
}
