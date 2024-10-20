'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Loading from './Loading';

const AuthFormSubmitButton = ({ text }) => {
    const status = useFormStatus();
    return (
        <div className='w-full p-3 text-white text-xl font-light transition-all hover:font-normal bg-[#006241]'>
            {
                status.pending ?

                    <span className='relative flex items-center justify-center w-full'>
                        <span className='opacity-0'>{text}</span>
                        <Loading />
                    </span>
                    :
                    <button id='login-bth' className='w-full'>
                        {text}
                    </button>
            }
        </div>
    )
}

export default AuthFormSubmitButton