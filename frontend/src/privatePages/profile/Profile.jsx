import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react';

const Profile = () => {

  const user = useUser();

  useEffect(() => {
    console.log(user)
  },[user])

  return (
    <div>Profile</div>
  )
}

export default Profile