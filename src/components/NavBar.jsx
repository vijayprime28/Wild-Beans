'use client';

import React, { useState } from 'react';
import NavLinks from './NavLinks';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegUser } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";
import { logout } from '@/actions/auth-actions';
import { userStore } from '@/zustand/store';
import { IoCartOutline } from "react-icons/io5";
import Link from 'next/link';
import { cartStore } from '@/zustand/store';
import Cart from './Cart';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const logoutUser = userStore((state) => state.logoutUser);
    const cart = cartStore((state) => state.cart);
    const [openCart, setOpenCart] = useState(false);

    return (
        <div id='navbar' className='flex border-b-[1px] border-gray-200 items-center justify-between w-full h-full px-6 md:px-8 lg:px-20 xl:px-[28rem] font-poppins'>

            <button className='p-4 lg:hidden' onClick={() => { setIsOpen((prev) => !prev) }}>
                <FaRegUser size={20} />
            </button>


            <Link href={'/'} className='flex items-center gap-4'>
                <div className='relative w-8 h-8 lg:w-10 lg:h-10'>
                    <Image src={'/app-logo.svg'} fill sizes='40' className='object-contain' alt='logo' />
                </div>
                <h1 className='text-xl lg:text-2xl font-semibold text-[#006241] hover:text-[#4A9079]'>
                    Wild Beans
                </h1>
            </Link>

            <div className='hidden lg:flex'>


                <NavLinks setOpenCart={setOpenCart} />

            </div>


            <button onClick={() => { setOpenCart(true) }} className='relative rounded-full p-4 hover:text-[#0A5237] lg:hidden hover:bg-[#D7E4DD] transition-all'>

                {
                    cart.length > 0 &&
                    <div className='w-4 h-4 rounded-full flex items-center justify-center bg-[#006241] absolute top-[10%] right-[10%]'>

                        <span className='text-xs text-white'>{cart.length}</span>

                    </div>
                }

                <IoCartOutline size={25} />

            </button>

            <AnimatePresence mode='wait'>
                {
                    isOpen &&

                    <div className={`absolute lg:hidden z-30 top-0 left-0 ease-in-out w-screen h-screen transition-all duration-75 ${isOpen ? 'bg-[rgba(0,0,0,0.6)]' : 'bg-transparent'}`}>

                        <motion.div initial={{ x: '-100vw' }} animate={{ x: 0 }} exit={{ x: '-100vw' }} transition={{ duration: 0.35, ease: 'easeInOut' }}
                            className='h-full w-[70%] origin-left flex flex-col bg-white py-6 px-4'>

                            <div className='flex justify-end w-full px-4'>
                                <button className='text-gray-400 ' onClick={() => { setIsOpen((prev) => !prev) }}><RxCross2 size={25} /></button>
                            </div>

                            <div className='flex flex-col items-center self-center gap-2'>
                                <div className='relative w-[84px] h-[84px]'>
                                    <Image alt='logo' fill sizes='80' className='object-contain' src={'/app-logo.svg'} />
                                </div>

                                <span className='text-[#006241] text-lg font-medium'>
                                    Wild Beans
                                </span>
                            </div>

                            <div className='w-full h-[1px] my-2 rounded-lg bg-gray-200' />

                            <form className='w-full' action={logout} onSubmit={(e) => {
                                logoutUser();
                            }}>

                                <button className='flex items-center w-full gap-4'>
                                    <span className='text-[#006241]'><IoIosLogOut size={25} /></span>

                                    <span className='text-black '>Logout</span>
                                </button>

                            </form>



                        </motion.div>

                    </div>

                }
            </AnimatePresence>


            <AnimatePresence mode='wait'>
                {
                    openCart &&
                    <Cart setOpenCart={setOpenCart} />
                }
            </AnimatePresence>





        </div>
    )
}

export default NavBar