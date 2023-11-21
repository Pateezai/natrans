import React from 'react'
import hotel1 from '../../assets/hotel-1.jpg'
import hotel2 from '../../assets/hotel-2.jpg'
import hotel3 from '../../assets/hotel-3.jpg'
import hotel4 from '../../assets/hotel-4.jpg'
import hotel5 from '../../assets/hotel-5.jpg'
import hotel6 from '../../assets/hotel-6.jpg'


const Hotels = () => {
  return (
    <div className='max-w-[1200px] m-auto py-20'>
    <h2 className="text-4xl font-semibold text-slate-900 text-center">Samui's Popular Hotels</h2>

    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 ">

      <div className="overflow-hidden rounded-lg shadow-md ">
        <img src={hotel1} alt="popular hotel" className='w-full flex object-cover'/>
        <div className="popular__content px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className='text-xl font-semibold text-slate-900'>The Plaza Hotel</h4>
            <h4 className='text-xl font-semibold text-slate-900'>$499</h4>
          </div>
          <p className='text-slate-400'>New York City, USA</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-md ">
        <img src={hotel2} alt="popular hotel" className='w-full flex object-cover'/>
        <div className="popular__content px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className='text-xl font-semibold text-slate-900'>The Plaza Hotel</h4>
            <h4 className='text-xl font-semibold text-slate-900'>$499</h4>
          </div>
          <p className='text-slate-400'>New York City, USA</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-md ">
        <img src={hotel3} alt="popular hotel" className='w-full flex object-cover'/>
        <div className="popular__content px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className='text-xl font-semibold text-slate-900'>The Plaza Hotel</h4>
            <h4 className='text-xl font-semibold text-slate-900'>$499</h4>
          </div>
          <p className='text-slate-400'>New York City, USA</p>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg shadow-md ">
        <img src={hotel4} alt="popular hotel" className='w-full flex object-cover'/>
        <div className="popular__content px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className='text-xl font-semibold text-slate-900'>The Plaza Hotel</h4>
            <h4 className='text-xl font-semibold text-slate-900'>$499</h4>
          </div>
          <p className='text-slate-400'>New York City, USA</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-md ">
        <img src={hotel5} alt="popular hotel" className='w-full flex object-cover'/>
        <div className="popular__content px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className='text-xl font-semibold text-slate-900'>The Plaza Hotel</h4>
            <h4 className='text-xl font-semibold text-slate-900'>$499</h4>
          </div>
          <p className='text-slate-400'>New York City, USA</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg shadow-md ">
        <img src={hotel6} alt="popular hotel" className='w-full flex object-cover'/>
        <div className="popular__content px-8 py-4">
          <div className="flex items-center justify-between gap-4 mb-2">
            <h4 className='text-xl font-semibold text-slate-900'>The Plaza Hotel</h4>
            <h4 className='text-xl font-semibold text-slate-900'>$499</h4>
          </div>
          <p className='text-slate-400'>New York City, USA</p>
        </div>
      </div>

    </div>
  </div>
  )
}

export default Hotels