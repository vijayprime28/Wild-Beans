import Image from 'next/image'
import React from 'react'

const OrderCard = ({ order }) => {
    const highestCountItem = order.items.reduce((maxItem, currentItem) => {
        return currentItem.count > maxItem.count ? currentItem : maxItem;
    }, order.items[0]);
    return (
        <div className='w-full p-2 justify-between flex bg-white shrink-0 rounded-2xl hover:bg-[#D7E4DD]'>

            <div className='flex h-full gap-2'>
                <div className='relative w-20 aspect-square'>
                    <Image fill sizes='80' alt='cover' className='object-contain rounded-2xl' src={highestCountItem.productId.image} />
                </div>

                <div className='flex flex-col gap-2'>

                    <span>#{order.orderId}</span>

                    <span className='text-xs font-medium text-gray-500'>{order.createdAt.toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: true
                    })}</span>

                </div>
            </div>

            <span className='text-[#1E3B31] text-lg font-medium'>
                INR {order.price}
            </span>

        </div>
    )
}

export default OrderCard