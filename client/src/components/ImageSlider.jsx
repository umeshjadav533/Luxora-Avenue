// import React, { useContext, useState } from 'react'
// import { X } from 'lucide-react'
// import { StoreContext } from '../Context/StoreContext'
// import Slider from './Slider';

// const ImageSlider = ({ images }) => {
//   const { openImages, setOpenImages } = useContext(StoreContext);
//   const [selectedImage, setSelectedImage] = useState(images[0])
//   console.log(images);
//   return (
//     <div
//       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
//       onClick={()=>setOpenImages(!openImages)}>
//       <div
//         className="bg-white w-[90vw] h-[90vh] rounded-xl relative p-4 flex items-center"
//         onClick={(e) => e.stopPropagation()}>
//         {/* Close button */}
//         <button
//           className="absolute top-3 right-3 text-black bg-[#eee] hover:bg-[#eee]/90 p-2 rounded-lg z-50 cursor-pointer"
//           onClick={() => setOpenImages(!openImages)}>
//           <X size={28} />
//         </button>

//         <div className='border w-[15%] h-[80vh] grid grid-cols-2 grid-row-6'>
//           {images.map((image) => (
//             <img src={image} alt='' className='object-contain border' onClick={()=>setSelectedImage(image)}/>
//           ))}
//         </div>
//        <div className="border w-full h-[80vh] overflow-hidden">
//           <Slider
//             data={images}
//             superLargeDesktop={1}
//             desktop={1}
//             tablet={1}
//             mobile={1}
//             showDots={true}
//             loop={true}
//             itemClass="h-full flex items-center justify-center"
//             leftArrowClass="border hover:bg-black hover:text-white transition absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full cursor-pointer z-50"
//             rightArrowClass="border hover:bg-black hover:text-white transition absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full cursor-pointer z-50"
//             renderItem={(image) => (
//               <img src={image} alt="" className="h-[80vh] object-contain border"/>
//             )}
//           />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default ImageSlider


import { useContext, useState } from "react";
import { X } from "lucide-react";
import { StoreContext } from "../Context/StoreContext";
import Slider from "./Slider";
const ImageSlider = ({ images }) => {
  const { openImages, setOpenImages } = useContext(StoreContext);
  const [selectedImage, setSelectedImage] = useState(images[0]);
  console.log(images);
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      onClick={() => setOpenImages(!openImages)}>

      <div onClick={(e) => e.stopPropagation()} className="bg-[#ECE9E2] w-full h-full relative p-4 flex-row-center-property gap-2">
    
        {/* Close button */}{" "}
        <button className="absolute top-3 right-3 text-black bg-[#fff] hover:bg-[#fff]/90 p-2 rounded-full z-50 cursor-pointer" onClick={() => setOpenImages(!openImages)}>
          <X size={28} />
        </button>
        {/* small images */}
        {/* <div className='w-[7%] h-full border flex flex-col justify-end items-center'>
           {images.map((image) => (
            <img src={image} alt='' className='w-[70px] h-[70px] object-contain border border-slate-400 ' onClick={()=>setSelectedImage(image)}/>
          ))}
        </div> */}
        <div className="w-full h-full overflow-hidden">
          <Slider
            data={images}
            superLargeDesktop={1}
            desktop={1}
            tablet={1}
            mobile={1}
            showDots={true}
            loop={true}
            itemClass="h-full flex items-center justify-center"
            buttonText={false}
            leftArrowClass='hover:bg-[#000] border-2 transition-color duration-300 absolute top-1/2 -translate-y-1/2 left-2 p-2 rounded-full group flex-row-between-property gap-2 px-4'
            rightArrowClass='hover:bg-[#000] border-2 transition-color duration-300 absolute top-1/2 -translate-y-1/2 right-2 p-2 rounded-full group flex-row-between-property gap-2 px-4'
            renderItem={(image) => (
              <img src={image} alt="" className="h-[100vh]" />
            )}
          />
        </div>
      </div>
    </div>
  );
};
export default ImageSlider;
