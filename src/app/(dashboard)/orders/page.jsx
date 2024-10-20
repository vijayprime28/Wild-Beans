import OrdersPage from '@/components/OrdersPage'
import React from 'react'

const page = () => {
    return (
        <div className='w-full h-full px-6 overflow-y-auto pt-10 lg:pt-20 pb-10 md:px-8 lg:px-20 xl:px-[28rem] font-poppins'>
            <OrdersPage />
        </div>
    )
}

export default page