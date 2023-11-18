import React from 'react'
import {RxCross2} from 'react-icons/rx'


const GenerateQR = ({open, children, onClose}) => {


  return (
    <>
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 bg-slate-900/30"></div>
    <div className='fixed z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-scroll w-screen h-[60%]'>
        <div className="relative w-1/4 h-1/2 bg-white rounded-xl">
        <RxCross2 size={20}/>
        <h1 className='p-2 text-2xl font-light'>Scan this QR Code to continue</h1>
        {/* <img src={qrcode} alt="" className='border-2 m-auto'/> */}
        <span className='text-center text-lg p-4'>
            QR expired in
        <p className='text-xl font-light'>15:00</p>
        </span>
        </div>
    </div>
    </>
  )
}

export default GenerateQR