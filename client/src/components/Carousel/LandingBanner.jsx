import React from 'react'
//  import header from '../../assets/header.jpg'


import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'

const LandingBanner = () => {

  const slideImages = [
    {
      url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 1'
    },
    {
      url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
      caption: 'Slide 2'
    },
    {
      url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
      caption: 'Slide 3'
    },
  ];
  return (
    <>
     <Carousel infiniteLoop showThumbs={false} autoPlay className=' min-w-[270px]'>
     {slideImages.map((slideImage, index) => (
        <div key={index} className='flex items-center justify-center h-[400px]'>
          <img src={slideImage.url} alt={slideImage.caption} className='h-[700px]'/>
        </div>
      ))}
      </Carousel>

    {/* 
     <div className='min-w-[270px] m-auto flex flex-col'>

         <div className="booking flex flex-col gap-4">
             <div className="max-h-[400px] overflow-hidden rounded-sm">
                 <img src={header} alt="" className='object-cover'/>
             </div>
         </div>

     </div> 
     */}
    </>
  )
}

export default LandingBanner