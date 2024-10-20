'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";
import { cartStore } from '@/zustand/store';
import { motion } from 'framer-motion';
import { RxCross1 } from "react-icons/rx";

const AddToCartCard = ({ item, setIsOpen }) => {
    const [count, setCount] = useState(1);
    const addItem = cartStore((state) => state.addItem);
    return (
        <div className='w-screen h-screen font-poppins flex items-center justify-center z-30 absolute top-0 left-0 bg-[rgba(0,0,0,0.6)]'>

            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.3 }} className='w-[22rem] lg:w-[30rem] relative bg-white rounded-3xl flex flex-col gap-4 overflow-hidden pb-2'>
                <button onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                }} className='w-7 h-7 z-50 rounded-full flex items-center justify-center bg-[#F9FAFB] absolute top-[5%] right-[5%] hover:bg-[#D7E4DD] text-[#006241]'>
                    <RxCross1 size={20} />
                </button>

                <div className='relative w-full h-[12rem] lg:h-[15rem]'>

                    <Image src={item.image} fill sizes='100' alt='cover' className='object-cover' />

                </div>

                <div className='flex flex-col w-full p-4 bg-[#F9FAFB]'>

                    <div className='flex flex-col gap-2'>
                        <span className='text-lg font-medium'>{item.displayName}</span>
                        <span className='text-sm text-[#737385]'>{item.description}</span>

                        <span className='text-xl font-medium text-[#006241]'>INR {count * item.price}</span>

                    </div>

                </div>

                <div className='w-full h-[1px] rounded bg-gray-300' />

                <div className='flex items-center justify-between w-full p-4'>

                    <div className='flex items-center gap-4'>

                        <button onClick={() => {
                            setCount((prev) => {
                                if (prev === 1) {
                                    return 1
                                }
                                else {
                                    return prev - 1
                                }
                            })
                        }} className='w-7 h-7 items-center justify-center flex rounded-full hover:bg-[#D7E4DD] border-[1px] border-gray-300 text-[#006241]'>
                            <HiOutlineMinus size={20} />
                        </button>

                        <span className='text-xl font-medium text-black'>
                            {count}
                        </span>

                        <button onClick={() => {
                            setCount((prev) => {
                                return prev + 1
                            })
                        }} className='w-7 h-7 items-center justify-center flex rounded-full hover:bg-[#D7E4DD] border-[1px] border-gray-300 text-[#006241]'>
                            <HiOutlinePlus size={20} />
                        </button>

                    </div>

                    <button onClick={(e) => {
                        e.stopPropagation();
                        addItem({ ...item, count: count });
                        setIsOpen(false);
                    }} className='bg-[#006241] hover:bg-[#1F3A31] rounded-xl p-2 text-white font-medium'>

                        Add to Cart

                    </button>

                </div>



            </motion.div>

        </div>
    )
}

export default AddToCartCard