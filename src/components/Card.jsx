'use client';

import React, { useState } from 'react';
import { cartStore } from '@/zustand/store';
import Image from 'next/image';
import { HiOutlinePlus } from "react-icons/hi2";
import AddToCartCard from './AddToCartCard';
import { AnimatePresence } from 'framer-motion';

const Card = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const cart = cartStore((state) => state.cart);
    return (
        <div onClick={() => { setIsOpen(true) }} className={`flex w-full items-start gap-3 p-2 ease-in bg-white rounded-2xl ${isOpen ? null : 'hover:bg-[#D7E4DD]'} transition-all cursor-pointer border-[1px] border-gray-300`}>

            <div className='relative w-24 h-24'>

                <Image src={item.image} fill sizes='96' alt='image' className='object-contain rounded-xl' />

            </div>

            <div className='flex flex-col justify-between flex-1 h-full'>

                <div className='flex flex-col'>
                    <span className='text-lg font-semibold'>{item.displayName}</span>
                    <span className='text-xs text-[#737385]'>{item.description}</span>
                </div>

                <div className='flex items-end justify-between w-full'>

                    <span className='font-medium'>INR {item.price}</span>


                    {
                        cart.some((i) => i._id === item._id) ?
                            <div className='w-7 h-7 rounded-full border-[#006241] border-[1px] flex items-center justify-center text-[#006241] text-sm'>
                                {
                                    cart.find((i) => i._id === item._id).count
                                }
                            </div>
                            :
                            <div className='w-7 h-7 rounded-full bg-[#006241] flex items-center justify-center text-white'>
                                <HiOutlinePlus size={20} />
                            </div>
                    }




                </div>

            </div>


            <AnimatePresence mode='wait'>
                {
                    isOpen &&
                    <AddToCartCard item={item} setIsOpen={setIsOpen} />
                }
            </AnimatePresence>

        </div>
    )
}

export default Card;