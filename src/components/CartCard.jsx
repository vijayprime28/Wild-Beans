import Image from 'next/image';
import React from 'react';
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi2";

const CartCard = ({ item, increaseCount, decreaseCount, removeItem }) => {
    return (
        <div className='flex justify-start w-full gap-2 p-4'>

            <div className='relative w-16 aspect-square'>
                <Image src={item.image} fill sizes='64px' className='object-contain rounded-xl' alt='cover' />
            </div>

            <div className='flex flex-col justify-between flex-1'>
                <div className='flex items-center justify-between w-full'>
                    <span className='font-medium text-[#1F3A31]'>{item.displayName}</span>

                    <span className='text-lg text-[#006241] font-medium'>INR {item.count * item.price}</span>
                </div>

                <div className='flex items-center gap-3'>

                    <button onClick={() => {
                        if (item.count === 1) {
                            removeItem(item);
                        }
                        else {
                            decreaseCount(item);
                        }
                    }} className='flex items-center justify-center w-5 h-5 rounded-full hover:bg-[#D7E4DD] border-[1px] border-gray-300 text-[#006241]'>
                        <HiOutlineMinus size={15} />
                    </button>

                    <span className='text-lg font-medium'>{item.count}</span>


                    <button onClick={() => {
                        increaseCount(item);
                    }} className='flex items-center justify-center w-5 h-5 rounded-full hover:bg-[#D7E4DD] border-[1px] border-gray-300 text-[#006241]'>
                        <HiOutlinePlus size={15} />
                    </button>
                </div>
            </div>

        </div >
    )
}

export default CartCard