import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { StoreContext } from '../Context/StoreContext';

const Footer = () => {
    const { assets } = useContext(StoreContext);
  return (
    <div className='w-full bg-[#212121] p-5 text-white'>
      <div className='w-full grid grid-cols-4 '>
        {/* section 1 */}
        <div className='flex flex-col gap-10'>
          <div>
            <Link to="/" className='roker-font text-3xl text-white select-none'>Luxora Avenue</Link>
          </div>

          <div className='flex flex-col gap-5'>
            <b className=''>Subscribe to our emails</b>
            <div className='flex'>
              <input type='email' placeholder='Email Address' className='p-2 outline-none bg-white  text-black'/>
              <button type='submit' className='bg-white text-black text-sm font-bold p-2'>SIGN UP</button>
            </div>
          </div>

          {/* social media icon */}
          <div className='flex gap-2'>
            <a 
              href='' 
              className='border border-white rounded-full p-2 hover:bg-white hover:text-black'>
                <Facebook  size={30}/>
            </a>
            <a 
              href='' 
              className='border border-white rounded-full p-2 hover:bg-white hover:text-black'>
                <Instagram size={30}/>
            </a>
            <a 
              href='' 
              className='border border-white rounded-full p-2 hover:bg-white hover:text-black'>
                <Twitter size={30}/>
            </a>
            <a 
              href='' 
              className='border border-white rounded-full p-2 hover:bg-white hover:text-black'>
                <Youtube size={30}/>
            </a>
          </div>
        </div>

        {/* section 2 */}
        <div className='flex flex-col gap-4'>
          <b className='mb-10'>{assets.footerData[0].title}</b>
          {
            assets.footerData[0].links_data.map((data, index) => (
              <a href={data.link_url} key={index} className='text-sm hover:underline underline-offset-4'>{data.link_name}</a>
            ))
          }
        </div>

        {/* section 2 */}
        <div className='flex flex-col gap-4'>
          <b className='mb-10'>{assets.footerData[1].title}</b>
          {
            assets.footerData[1].links_data.map((data, index) => (
              <a href={data.link_url} key={index} className='text-sm hover:underline underline-offset-4'>{data.link_name}</a>
            ))
          }
        </div>

        {/* section 2 */}
        <div className='flex flex-col gap-4'>
          <b className='mb-10'>{assets.footerData[2].title}</b>
          {
            assets.footerData[2].links_data.map((data, index) => (
              <a href={data.link_url} key={index} className='text-sm hover:underline underline-offset-4'>{data.link_name}</a>
            ))
          }
        </div>
      </div>

      <hr className='my-5'/>
      <div className='flex justify-evenly'>
          {
            assets.footerData[3].links_data.map((data, index) => (
              <a href={data.link_url} key={index} className='text-sm hover:underline underline-offset-4'>{data.link_name}</a>
            ))
          }
      </div>
    </div>
  )
}

export default Footer