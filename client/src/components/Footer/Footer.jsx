import React from 'react'
import {MdOutlineCopyright} from 'react-icons/md'
const Footer = () => {
  return (
    <>
    <div className='min-w-[270px] w-full bg-slate-300 flex flex-col items-center'>
      
      <div className=" m-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        <div className="footer__col">
          <h3 className='mb-4 text-xl font-semibold text-slate-900'>Na-trans</h3>
          <p className='mb-4 text-slate-400 cursor-pointer transition-all duration-75 hover:text-slate-900'>
            WDM&Co is a premier hotel booking website that offers a seamless and
            convenient way to find and book accommodations worldwide.
          </p>
        </div>
        <div className="footer__col">
          <h4 className='mb-4 text-lg font-semibold text-slate-900'>Company</h4>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>About Us</p>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>Contact Us</p>
        </div>
        <div className="footer__col">
          <h4 className='mb-4 text-lg font-semibold text-slate-900'>Legal</h4>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>FAQs</p>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>Terms & Conditions</p>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>Privacy Policy</p>
        </div>
        <div className="footer__col">
          <h4 className='mb-4 text-lg font-semibold text-slate-900'>Resources</h4>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>Social Media</p>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>Help Center</p>
          <p className='mb-4 text-slate-400 text-sm cursor-pointer transition-all duration-75 hover:text-slate-900'>Partnerships</p>
        </div>

      </div>
      <div className=" text-sm font-light text-slate-400">
        Copyright © 2023 Natrans. All rights reserved.
      </div>

    </div>
    </>
  )
}

export default Footer