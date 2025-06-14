"use client"
import React from 'react'
import { logout } from '../actions/auth'
import useAuth from '../_hooks/useAuth'

const Home = () => {
  const {user, loading} = useAuth();
  console.log(user);
  return (
    <div>
      <button onClick={() => logout()} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  )
}

export default Home;