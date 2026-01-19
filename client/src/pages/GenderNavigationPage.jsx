import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StoreContext } from '../Context/StoreContext';
import Slider from '../components/Slider';
import ProductCard from '../components/ProductCard';
import ProductSection from '../components/ProductSection';

const GenderNavigationPage = () => {
  const { products, assets } = useContext(StoreContext);
  const { categoryPage } = useParams();
  const [categoryProductData, setCategoryProductData] = useState([]);
  const pageImages = assets.pageData.find(p => p.name === categoryPage);

  useEffect(() => {
  if (products.length > 0) {
      const filteredData =  products.filter(product => product.category === categoryPage);
      setCategoryProductData(filteredData);
    }
  }, [products, categoryPage]);

  console.log(pageImages);
  return (
    <div>
      {pageImages.img.length > 1 ? (
        <Slider
          data={pageImages.img}
          superLargeDesktop={1}
          desktop={1}
          tablet={1}
          mobile={1}
          sliderPerMove={1}
          showDots={true}
          loop={true}
          leftArrowClass='hover:bg-[#000] border-2 transition-color duration-300 absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full group flex-row-between-property gap-2 px-4'
          rightArrowClass='hover:bg-[#000] border-2 transition-color duration-300 absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full group flex-row-between-property gap-2 px-4'
          renderItem={(image) => (
            <img src={image} className='w-full h-[100vh] object-cover' />
          )}
        /> 
      ) : (
        <img src={pageImages.img[0]} className='w-full h-[100vh] object-cover'/>
      )}

      

      {categoryProductData.length > 0 && (
        
        <div className='grid grid-cols-5 gap-2 my-5 mx-5'>
          <h3 className='roker-font text-2xl col-span-5 underline underline-offset-7'>EXPLORE MORE</h3>
          {categoryProductData.slice(0,10).map((item) => (
            <ProductCard productItemData={item} key={item.id} />
          ))}
        </div>
      )}

      <ProductSection title='BEST SELLER' filterFn={(product) => product.filter(p => p.bestSeller && p.gender === categoryPage)}/>
      
      {categoryProductData.length > 0 && (
        <div className='grid grid-cols-5 gap-2 my-5 mx-5'>
          {categoryProductData.slice(10).map((item) => (
            <ProductCard productItemData={item} key={item.id} />
          ))}
        </div>
      )}

      <ProductSection title='NEW ARRIVAL' filterFn={(product) => product.filter(p => p.newArrival && p.gender === categoryPage)}/>

    </div>
  )
}

export default GenderNavigationPage;
