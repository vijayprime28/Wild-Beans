'use cliemt';

import React from 'react';
import { logout } from '@/actions/auth-actions';
import { userStore } from '@/zustand/store';

const Logout = () => {
    const logoutUser = userStore((state) => state.logoutUser);
    return (
        <form action={logout} onSubmit={(e) => {
            logoutUser();
        }} className=''>
            <button className='hover:text-[#0A5237] hover:underline'>Logout</button>
        </form>
    )
}

export default Logout