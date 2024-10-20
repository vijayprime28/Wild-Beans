'use client';

import React, { useEffect, useState } from 'react';
import { cartStore, userStore } from '@/zustand/store';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RxCross1 } from "react-icons/rx";
import CartCard from './CartCard';
import { useFormState } from 'react-dom';
import { createOrder } from '@/actions/order-actions';

const Cart = ({ setOpenCart }) => {
    const cart = cartStore((state) => state.cart);
    const user = userStore((state) => state.user);
    const [price, setPrice] = useState(0);
    const increaseCount = cartStore((state) => state.increaseCount);
    const decreaseCount = cartStore((state) => state.decreaseCount);
    const removeItem = cartStore((state) => state.removeItem);
    const clearCart = cartStore((state) => state.clearCart);

    const [state, formAction] = useFormState(createOrder.bind(null, { items: cart, userId: user.id }));

    useEffect(() => {
        var sum = 0;
        cart.forEach(item => {
            sum += item.price * item.count
        });
        setPrice(sum);
    }, [cart]);

    return (
        <div className='w-screen h-screen ease-in-out flex items-center justify-center z-30 absolute top-0 left-0 bg-[rgba(0,0,0,0.6)] font-poppins'>

            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ ease: 'easeInOut', duration: 0.3 }} className='w-[22rem] lg:w-[30rem] h-[80%] relative bg-[#FDFEFE] rounded-3xl flex flex-col gap-4 overflow-hidden py-2'>

                <div className='flex items-center justify-center relative z-50 w-full border-b-[1px] border-gray-300 p-2'>

                    <span className='text-lg text-[#262626] font-medium'>Shopping Cart</span>

                </div>


                {
                    cart.length === 0 ?
                        <div className='flex flex-col items-center justify-center flex-1 w-full gap-2 px-20 py-10 text-center'>

                            <div className='relative w-[13rem] aspect-square'>

                                <Image src={'/images/empty-cart.png'} alt='empty-cart' fill sizes='208' className='object-contain' priority />


                            </div>

                            <span className='text-2xl font-semibold text-[#1F3A31]'>Your Cart Is Empty</span>

                            <span className='text-[#006241]'>Looks like you haven&apos;t added anything to your cart yet.</span>


                            <button onClick={(e) => {
                                e.stopPropagation();
                                setOpenCart(false);
                            }} className='bg-[#006241] hover:bg-[#1F3A31] rounded-xl p-2 text-white font-medium'>
                                Continue Shopping
                            </button>


                        </div>
                        :
                        <div className='flex flex-col w-full h-full gap-2'>


                            <div className='flex-1 w-full bg-[#F9FAFB] overflow-y-auto'>

                                <div className='flex flex-col w-full'>
                                    <span className='px-4 font-medium text-black'>Order Items</span>

                                    {cart.map((item) => {
                                        return (
                                            <CartCard key={item._id} item={item} increaseCount={increaseCount} decreaseCount={decreaseCount} removeItem={removeItem} />
                                        );
                                    })}

                                </div>
                            </div>


                            <div className='flex h-1/6 items-start w-full px-4 py-2 border-t-[1px] border-gray-300'>

                                <div className='flex flex-col items-start w-1/2 lg:w-1/4'>
                                    <span className='text-sm text-gray-500'>Total</span>
                                    <span className='text-lg font-medium'>INR {price}</span>
                                </div>

                                <form className='w-1/2 lg:w-3/4' action={formAction} onSubmit={(e) => {
                                    clearCart();
                                }}>
                                    <button className='p-4 w-full bg-[#006241] hover:bg-[#1F3A31] rounded-xl text-white'>
                                        Order
                                    </button>
                                </form>
                            </div>

                        </div>

                }

                <button onClick={(e) => { setOpenCart(false) }} className='z-50 flex items-center absolute top-[2%] right-[5%] justify-center w-7 h-7'>

                    <RxCross1 size={20} />

                </button>

            </motion.div>

        </div>
    )
}

export default Cart