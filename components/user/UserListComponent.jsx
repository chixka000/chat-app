import React, { useContext, useEffect, useState } from 'react';
import { Avatar, Box, List, ListItem, ListItemText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AuthContext from 'contexts/AuthContext';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { auth, firebaseDB } from 'lib/data/firebase';

const UserListComponent = () => {
  const [users, setUsers] = useState([]);
  const router = useRouter();
  const { user } = useContext(AuthContext);

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
    <Box sx={{ width: '25%', borderRight: '1px solid gray', overflow: 'auto', bgcolor: '#5D3FD3', color: 'white' }}>
      <List component="nav">
        {users.length > 0 &&
          users.map((user, index) => (
            <Link key={index} href={`/chat/${user.id}`}>
              <ListItem onClick={() => router.push(`/chat/${user.id}`)} sx={{ py: 2 }}>
                <Avatar sx={{ marginRight: '10px' }} alt={user?.name} src={user?.profilePicture} />
                <ListItemText primary={user.name} />
              </ListItem>
            </Link>
          ))}
      </List>
    </Box>
  );
};

export default UserListComponent;
