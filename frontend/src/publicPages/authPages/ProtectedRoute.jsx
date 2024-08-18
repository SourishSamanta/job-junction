import React, { useEffect } from 'react';
import { SignedIn, SignedOut, RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }) => {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();
  const user = useUser();

  useEffect(() => {
    if (isLoaded && userId && user) {
      console.log(user)
      const checkUserSetup = async () => {
        try {
          // Replace with your API endpoint
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/check-user/${userId}`);
          console.log(response)
          if (response.data.success === true) {
            // User's data is saved, allow access to protected content
            const UserResponse = await axios.post(`${import.meta.env.VITE_API_URL}/user`,{
              username : user.fullName
            })
            localStorage.setItem('user_id', response.data.userID)
          } else {
            // Redirect to /setup/chooseRole if setup is not complete
            navigate('/setup/chooseRole');
          }
        } catch (error) {
          console.error('Error checking user setup:', error);
          // Handle the error, maybe navigate to an error page or show a message
        }
      };

      checkUserSetup();
    }
  }, [userId, isLoaded, navigate]);

  return (
    <>
      <SignedIn>
        {isLoaded && userId ? children : <div>Loading...</div>}
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
