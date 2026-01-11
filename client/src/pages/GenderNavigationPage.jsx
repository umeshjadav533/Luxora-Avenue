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
  const pageImage = assets.pageData.find(page => page.name === categoryPage);
  
  useEffect(() => {
    const filteredData = products.filter(product => product.category === categoryPage);
    setCategoryProductData(filteredData);
  }, [products, categoryPage])
  return (
    <div>
      <Slider
          data={pageImage.img}
          superLargeDesktop={1}
          desktop={1}
          tablet={1}
          mobile={1}
          sliderPerMove={1}
          loop={true}
          renderItem={(image) => (
            <img src={image} className='w-full h-[100vh] object-cover' />
          )}
        />


      {categoryProductData.length > 0 && (
        <div className='grid grid-cols-5 gap-2 my-5 mx-5'>
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
