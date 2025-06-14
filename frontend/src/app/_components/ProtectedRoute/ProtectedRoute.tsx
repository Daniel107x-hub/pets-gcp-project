import useAuth from '@/app/_hooks/useAuth'
import { redirect } from 'next/navigation';
import React from 'react'

function ProtectedRoute<T>(Component: React.ComponentType<T>){
    const {user, loading} = useAuth();
    if(loading) return "Loading page..."
    if(!user) redirect("/");
    return <Component />
}

export default ProtectedRoute