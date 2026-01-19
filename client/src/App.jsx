import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import StudioPage from './pages/StudioPage'
import { StoreContext } from './Context/StoreContext'
import ImageSlider from './components/ImageSlider'
import CartPage from './pages/CartPage'
import WishListPage from './pages/WishListPage'
import GenderNavigationPage from './pages/GenderNavigationPage'
import SearchPage from './pages/SearchPage'
import ProfilePage from './pages/ProfilePage'
import OrderPage from './pages/OrderPage'
import Account_settingPage from './pages/Account_settingPage'

const App = () => {
  const { openImages, productImages } = useContext(StoreContext);
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/:categoryPage' element={<GenderNavigationPage />} />
        <Route path='/studio' element={<StudioPage />} />
        <Route path='/product/:productId' element={<ProductPage />} />
        <Route path='/orders' element={<OrderPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/account-setting' element={<Account_settingPage />} />
        <Route path='/wishlist' element={<WishListPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>
      <Footer />

      {openImages && (
        <ImageSlider images={productImages}/>
      )}
    </div>
  )
}

export default App
