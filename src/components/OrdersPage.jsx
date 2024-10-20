'use client';

import React from 'react';
import { userStore } from '@/zustand/store';
import Image from 'next/image';
import Link from 'next/link';
import OrderCard from './OrderCard';

const OrdersPage = () => {
    const user = userStore((state) => state.user);
    return (
        <div className='w-full h-full'>

            {
                user && user.orders.length > 0 ?
                    <div className='flex flex-col w-full h-full gap-4 font-poppins'>

                        <span className="text-xl font-semibold">Order History</span>

                        <div className='flex flex-1 overflow-y-auto'>

                            <div className='flex flex-col items-start w-full gap-4'>

                                {
                                    user.orders.map((order) => {
                                        return (
                                            <OrderCard key={order._id} order={order} />
                                        )
                                    })
                                }

                            </div>
                        </div>



                    </div>
                    :
                    <div className='flex flex-col items-center justify-center w-full h-full gap-4 pb-[10%]'>

                        <div className='relative w-[80%] aspect-square lg:w-[35%]'>
                            <Image src={'/images/empty-folder.png'} fill alt='cover' priority className='object-contain' sizes='100' />
                        </div>
                        <span className='text-2xl font-semibold text-[#1F3A31]'>Your Order History is Empty</span>

                        <span className='text-[#006241]'>Looks like you haven&apos;t ordered anything yet.</span>

                        <Link href={'/'} className='bg-[#006241] hover:bg-[#1F3A31] rounded-xl p-2 text-white font-medium'>
                            Continue Shopping
                        </Link>

                    </div>
            }

        </div>
    )
}

export default OrdersPage