import React from 'react'

const OrderPage = () => {
  return (
    <div className='mt-[80px] h-[calc(100vh-80px)] p-6 grid grid-cols-4 gap-6'>
      
      {/* Filter Sidebar */}
      <div className='col-span-1 bg-white rounded-2xl shadow-md p-5'>
        <h3 className='mb-4 text-lg font-semibold'>Order Status</h3>
        <ul className='flex flex-col gap-3 text-sm'>
          <li className='flex items-center gap-2'>
            <input type='checkbox' className='accent-black' />
            <span>On the Way</span>
          </li>
          <li className='flex items-center gap-2'>
            <input type='checkbox' className='accent-black' />
            <span>Delivered</span>
          </li>
          <li className='flex items-center gap-2'>
            <input type='checkbox' className='accent-black' />
            <span>Cancelled</span>
          </li>
          <li className='flex items-center gap-2'>
            <input type='checkbox' className='accent-black' />
            <span>Returned</span>
          </li>
        </ul>
      </div>

      {/* Orders List */}
      <div className='col-span-3 bg-white rounded-2xl shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>My Orders</h2>
        {/* Orders cards will come here */}
      </div>

    </div>
  )
}

export default OrderPage
