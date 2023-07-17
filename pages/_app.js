import { useEffect, useState } from 'react';
import '../styles/globals.css'
import { onAuthStateChanged } from 'firebase/auth';
import { Box, CircularProgress } from '@mui/material';
import Login from 'components/form/LoginForm';
import { auth } from 'lib/data/firebase';
import SignupFormComponent from 'components/form/SignUpForm';
import AuthContext from 'contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleShowSignup = () => {
    setShowSignup(true);
    setShowLogin(false);
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    })

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [])


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

  if ((!showLogin && !showSignup && !user) || (showLogin && !user)) {
    return (
      <Login toggleSignUp={handleShowSignup} isLoading={isLoading} />
    );
  }

  if (showSignup && !user) {
    return (
      <SignupFormComponent toggleLogin={handleShowLogin} isLoading={isLoading} />
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  )
}

export default MyApp
