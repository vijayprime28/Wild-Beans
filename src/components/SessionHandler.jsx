import React from 'react';
import { getUserById, verifyAuth } from '@/lib/db';
import { redirect } from 'next/navigation';
import AppInitializer from './AppInitializer';

const SessionHandler = async ({ children }) => {

    const result = await verifyAuth();
    if (!result.user) {
        redirect('/login');
    }
    const user = await getUserById(result.user.id);
    const plainUser = JSON.parse(JSON.stringify(user));
    return (
        <AppInitializer user={plainUser}>
            {children}
        </AppInitializer>
    )
}

export default SessionHandler