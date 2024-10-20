'use client';

import Link from 'next/link';
import React from 'react';
import { userStore } from '@/zustand/store';
import Logout from './Logout';
import { IoCartOutline } from "react-icons/io5";
import { cartStore } from '@/zustand/store';


const NavLinks = ({ setOpenCart }) => {
    const user = userStore((state) => state.user);
    const cart = cartStore((state) => state.cart);
    console.log(user);
    return (
        <div className='flex items-center gap-4 text-lg text-gray-600 font-poppins'>


            {
                user &&
                <span className='hover:text-[#0A5237] hover:underline'>
                    {user.username}
                </span>
            }

            <Link href='/orders' className='hover:text-[#0A5237] hover:underline'>
                Orders
            </Link>



            {
                user &&
                <Logout />
            }





            <button onClick={() => { setOpenCart(true) }} className='relative rounded-full p-4 hover:text-[#0A5237] hover:bg-[#D7E4DD] transition-all'>

                {
                    cart.length > 0 &&
                    <div className='w-5 h-5 rounded-full flex items-center justify-center bg-[#006241] absolute top-[5%] right-[5%]'>

                        <span className='text-sm text-white'>{cart.length}</span>

                    </div>
                }

                <IoCartOutline size={25} />

            </button>




        </div>
    )
}

export default NavLinks