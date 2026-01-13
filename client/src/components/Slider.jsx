import Carousel from 'react-multi-carousel'
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Slider = ({ data, renderItem, superLargeDesktop = 5, desktop = 4, tablet = 2, mobile = 1, sliderPerMove = 1, showDots=false, outSideDots=false, loop=false, leftArrowClass, rightArrowClass, itemClass='', buttonText=true }) => {
  
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: superLargeDesktop
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: tablet
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: mobile
    }
  };

  const LeftArrow = ({ onClick }) => (
    <button onClick={onClick} className={leftArrowClass}>
      <ChevronLeft size={25} className='group-hover:text-white'/>
      {buttonText && (<span className='group-hover:text-white'>PREV</span>)}
    </button>
  );

  const RightArrow = ({ onClick }) => (
    <button onClick={onClick} className={rightArrowClass} aria-label="Next">
        {buttonText && (<span className='group-hover:text-white'>NEXT</span>)}
        <ChevronRight size={25} className='group-hover:text-white'/>
    </button>
  );

  return (
    <Carousel 
      responsive={responsive}
      swipeable
      showDots={showDots}
      renderDotsOutside={outSideDots}
      infinite={loop}
      slidesToSlide={sliderPerMove}
      customLeftArrow={<LeftArrow />}
      customRightArrow={<RightArrow />}
      itemClass={itemClass}>
      {data.map((item) => {
          return (
            renderItem(item)
          );
        })}
    </Carousel>
  )
}

export default Slider
