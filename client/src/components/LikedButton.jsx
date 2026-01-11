import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { Heart } from 'lucide-react';

const LikedButton = ({id, likedButtonSize = 25}) => {
  const { wishListProduct, addwishList } = useContext(StoreContext);
  const isLiked = wishListProduct.includes(id);
  return (
    <button onClick={()=>addwishList(id)} className='hover:scale-110 transition cursor-pointer'>
      <Heart size={likedButtonSize} fill={isLiked ? 'black' : 'none'}/>
    </button>
  )
}

export default LikedButton
