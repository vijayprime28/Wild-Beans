import LoginForm from '@/components/LoginForm';
import { verifyAuth } from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const result = await verifyAuth();
    if (result.user) {
        return redirect('/');
    }
    return (
        <div className='flex items-center justify-center w-full h-full'>

            <LoginForm />

        </div>
    )
}

export default page