import React from 'react'
import HeroSection from '../components/HeroSection'
import HotDeals from '../components/HotDeals'
import offer_image from '../assets/offer-poster/offer_image.webp'
import ProductSection from '../components/ProductSection'
import FeaturedProduct from '../components/FeaturedProduct'
import ShopByCategory from '../components/ShopByCategory'

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <ShopByCategory />
      <HotDeals />
      <ProductSection
        title="BEST SELLER"
        filterFn={(products) => products.filter(p => p.bestSeller)}
      />
      <div className='w-full h-[450px] my-10 overflow-hidden'>
        <h3 className='roker-font text-2xl text-center my-2'>BEST DEALS OF THE YEAR</h3>
        <img src={offer_image} className='w-full h-[400px] object-cover' />
      </div>
      <ProductSection
        title="NEW ARRIVAL"
        filterFn={(products) => products.filter(p => p.newArrival)}
      />
      <FeaturedProduct />
    </div>
  )
}

export default HomePage
