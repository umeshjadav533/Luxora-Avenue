import { Box, CirclePower, CircleUserRound, Cog, Wallet } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ProfilePage = () => {
  return (
    <div className='mt-[80px] h-[calc(100vh-80px)] grid grid-cols-4 gap-5 p-5'>

      {/* Sidebar */}
      <div className='col-span-1 bg-white rounded-2xl shadow-md p-5'>
        <ul className='flex flex-col gap-3'>

          <li className='flex items-center gap-4 p-3 bg-gray-100 rounded-xl'>
            <CircleUserRound size={32} className='text-gray-700' />
            <div className='flex flex-col'>
              <span className='text-sm text-gray-500'>Hello,</span>
              <span className='text-lg font-semibold'>Umesh Jadav</span>
            </div>
          </li>

          <Link to='/orders' className='flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition'>
            <Box size={26} />
            <span className='font-medium'>Orders</span>
          </Link>

          <Link to='payment' className='flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition'>
            <Wallet size={26} />
            <span className='font-medium'>Payments</span>
          </Link>

          <Link to='account-setting' className='flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition'>
            <Cog size={30} />
            <span className='font-medium'>Account Settings</span>
          </Link>
        </ul>
        <button className='w-full flex items-center gap-4 p-3 rounded-lg text-red-600 hover:bg-red-50 transition'>
          <CirclePower size={26} />
          <span className='font-medium'>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className='col-span-3 bg-white rounded-2xl shadow-md p-6'>
        <h2 className='text-xl font-semibold mb-4'>Profile Details</h2>
        {/* Content here */}
      </div>

    </div>
  )
}

export default ProfilePage
