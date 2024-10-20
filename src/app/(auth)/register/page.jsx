import RegisterForm from '@/components/RegisterForm';
import React from 'react';
import { verifyAuth } from '@/lib/db';
import { redirect } from 'next/navigation';

const page = async () => {
    const result = await verifyAuth();
    if (result.user) {
        return redirect('/');
    }
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <RegisterForm />
        </div>
    )
}

export default page