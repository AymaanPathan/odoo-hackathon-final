import  { useContext, useRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import nextArrow from './arrow.png'
import prevArrow from './prev.png'
import { ShopContext } from '../../Context/ShopContext';
import { Link } from 'react-router-dom';

function Trending() {
  const {Allproduct} = useContext(ShopContext)
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 2000,
    swipeToSlide: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const next = () => {
    sliderRef.current.slickNext();
  };

  const prev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className='main mt-24'>
      <h2 className='text-2xl ml-5 font-poppins text-gray-700'>Trending This Week</h2>
      <hr className='h-4 mt-1' />
      <div className='flex justify-end gap-6 mr-8'>
   <img onClick={()=>prev()} className='cursor-pointer w-6 h-6' src={prevArrow} alt="" />
      <img onClick={()=>next()} className='cursor-pointer w-6 h-6' src={nextArrow} alt="" />
      </div>

      <Slider ref={sliderRef} {...settings} className='w-[90%]'>
        {Allproduct.map((item, i) => {
          if(item.id>=55) {
            return   <div key={i} className='text-center mt-6 ml-6'>
          <Link to={`/product/${item.id}`}><img className='cursor-pointer ml-16 h-80 w-64' src={item.image} alt={item.name} /></Link> 
            <p className='mt-3 text-lg font-bold'>{item.name}</p>
            <div className='flex justify-center gap-4 items-center'>
              <p className='text-gray-500 line-through'>{item.oldPrice}</p>
              <p className='text-red-500 '>{item.newPrice}</p>
            </div>
          </div>
          }
         
        })}
      </Slider>
    </div>
  );
}

export default Trending;
