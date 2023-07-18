import { auth, firebaseDB } from 'lib/data/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Login from 'components/form/LoginForm';
import { Box, Button, CircularProgress, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import UserListComponent from 'components/user/UserListComponent';
import ChatNavbar from 'components/messages/ChatNav';
import { useRouter } from 'next/router';

export default function Home() {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { id } = router.query;

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
            const userWithId = {
              id: docRef.id,
              ...userData
            };
            usersData.push(userWithId);
          }
        }
        setUsers(usersData);
      };
      fetchUsers();
    }
  }, [user]);

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <UserListComponent />
      <Box sx={{ width: '75%', display: 'flex', flexDirection: 'column' }}>
        <ChatNavbar userId={id} />
        <Typography variant="h1" sx={{ textAlign: 'center', color: '#32CD32	' }}>Welcome to my chat app</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Start chatting with friends and enjoy real-time communication.
        </Typography>
      </Box>
    </Box>
  );
}
