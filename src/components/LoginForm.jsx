'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useFormState } from 'react-dom';
import Link from 'next/link';
import AuthFormSubmitButton from './AuthFormSubmitButton';
import { login } from '@/actions/auth-actions';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction] = useFormState(login, { error: null })
    return (
        <div id="login-form" className='w-[90%] md:w-[60%] lg:w-[35%] xl:w-[25%] px-10 py-5 lg:py-10 gap-2 lg:gap-5  flex flex-col bg-white rounded-3xl'>

            <div className='flex items-center justify-center w-full gap-5'>

                <div className='relative w-20 h-20'>

                    <Image src='/app-logo.svg' fill sizes='80' className='object-contain' alt='logo' />

                </div>

                <div className='flex flex-col text-[#006241] font-poppins text-2xl'>

                    <span className='font-light'>Wild</span>
                    <span className='font-medium'>Beans</span>

                </div>


            </div>


            {
                state.error &&
                <div className='w-full text-center'>


                    <span className='text-sm text-red-500'>{state.error}</span>


                </div>
            }

            <div className='flex flex-col gap-2 font-poppins'>

                <span className='text-[#006241] font-semibold text-2xl'>Login</span>

                <span className='text-[#6B7280] font-medium'>
                    Sign in to continue your coffee journey
                </span>

                <div className='flex items-center gap-2'>

                    <span className='text-[#6B7280] font-light text-sm'>New User?</span>

                    <Link href='/register' className='text-[#006241]'>Register</Link>

                </div>

            </div>


            <form className='flex flex-col w-full gap-4 font-poppins' action={formAction}>

                <div className="relative items-center w-full px-2 py-1 border-2 border-[#006241] rounded-md 0 focus-within:ring-1 focus-within:ring-white">
                    <input
                        type="text"
                        id="floating_outlined_email"
                        name="email"
                        className="peer w-full appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:outline-0 "
                        placeholder=" "
                    />
                    <label
                        htmlFor="floating_outlined_email"
                        className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform  px-2 text-sm peer-placeholder-shown:text-gray-500 text-white duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-placeholder-shown:bg-transparent peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4  peer-focus:text-white peer-focus:bg-[#006241] bg-[#006241]"
                    >
                        Email
                    </label>
                </div>


                <div className="relative flex items-center w-full px-2 py-1 border-2 border-[#006241] rounded-md 0 focus-within:ring-1 focus-within:ring-white">
                    <input
                        type={`${showPassword ? "text" : "password"}`}
                        name="password"
                        autoComplete="off"
                        id="floating_outlined_pass"
                        className="peer flex-1 appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm focus:outline-0 "
                        placeholder=" "
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setShowPassword((prev) => {
                                return !prev;
                            });
                        }}
                        className='text-[#006241]'
                    >
                        {showPassword ? <IoEye size={25} /> : <IoEyeOff size={25} />}
                    </button>
                    <label
                        htmlFor="floating_outlined_pass"
                        className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4  scale-75 transform px-2 text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:bg-transparent text-white duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-white rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 peer-focus:bg-[#006241] bg-[#006241]"
                    >
                        Password
                    </label>
                </div>

                <AuthFormSubmitButton text='Login' />

            </form>




        </div>
    )
}

export default LoginForm