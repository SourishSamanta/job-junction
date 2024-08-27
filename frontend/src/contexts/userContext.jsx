import { useUser } from '@clerk/clerk-react';
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from "axios"
// Create the context
const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [jobPosts, setJobPosts] = useState();

  const {user} = useUser();

  const fetchJobPosts = async () => {

    const response = await axios.get(`${import.meta.env.VITE_API_URL}/job/my-jobs/${user.id}`);
    console.log(response);
    
    if (response.data.success === true) {
      setJobPosts(response.data.jobs)
    }
    
    else
    alert(response.data.message)
  }
  
const fetchUserData = async () => {
    //alert("hitting api from userContext.jsx")
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${user.id}`);
      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchJobPosts();
  }, [user]);

  return (
    <UserContext.Provider value={{ userData, setUserData , jobPosts, setJobPosts}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserData = () => {
  return useContext(UserContext);
};
