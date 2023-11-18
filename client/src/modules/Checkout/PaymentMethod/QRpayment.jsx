import React, { useState } from 'react'
import {BsFillCreditCardFill, BsQrCode} from 'react-icons/bs'
import Script from 'react-load-script'
import GenerateQR from './QR/GenerateQR.jsx'
import { Outlet } from 'react-router-dom'
import { CreateQRCharge } from '../../../helper/handling/payment-handling.js'

const QRpayment = ({checkoutInfo}) => {
    const [QR, setQR] = useState('')

    const { from, to, date, fare, passenger  } = checkoutInfo.routeInfo
    // const [fee, setFee] = useState(3.65)
    const total = ((fare*passenger)+((fare*passenger)*(4/100)))*100
    // console.log(total)
    const { 
        identnumber,
        prefix,
        fname,
        lname,
        email,
        phone,
        note,
        accept,
     } = checkoutInfo.passengerInfo

    const handleLoadScript = () => {
        OmiseCard = window.OmiseCard
        OmiseCard.configure({
            publicKey:import.meta.env.VITE_OMISE_PUBLIC_KEY,
            currenct:'thb',
            frameLabel:'Na-trans',
            submitLabel:'PAY NOW',
            buttonLabel:'Pay witn Omise'
        })
    }

    const omiseQRpaymentHandler = () => {
        OmiseCard.open({
            frameDescription: 'Invoice #123123',
            amount: parseInt(total) ,
            submitFormTarget: '#QRpaymentForm',
            onCreateTokenSuccess: (token) => {
                console.log(token)
                let QRChargePromise = CreateQRCharge({email, pname:prefix + fname + " " + lname , amount:parseInt(total), token})
                QRChargePromise.then(res => {
                    // const {QR_Image, authorizeUri} = res.data
                    // console.log(QR_Image)
                    // setQR(QR_Image)
                    // if(authorizeUri){
                    //   window.location.href = authorizeUri
                    // }
                })
              /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
            },
            onFormClosed: () => {
              /* Handler on form closure. */
            },
          })
    }

    // const createCreditCardCharges = async () => {
    //     await axios.post('url', {
    //         email,
    //         name,
    //         amount,
    //         token,
    //     })
    // }

    const QRpaymentConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod:'promptpay',
            otherPaymentMethod:[
              "bill_payment_tesco_lotus",
              "alipay",
              "pay_easy",
              "net_banking",
              "convenience_store"
            ]
        })
        OmiseCard.configureButton('#QRpayment')
        OmiseCard.attach()
    }

    const handleQRpayment = (e) => {
        e.preventDefault()
        QRpaymentConfigure()
        omiseQRpaymentHandler()
    }

  return (
    <>
    {/* <GenerateQR/> */}
    {/* <Outlet/> */}
    <div className='w-1/3 sm:w-full'>
        <Script
        url="https://cdn.omise.co/omise.js"
        onLoad={handleLoadScript}
        />
        <form id='QRpaymentForm'>
            <button id='QRpayment' className='rounded-sm flex items-center bg-slate-300 w-full justify-between gap-2 py-2 px-4 ring-2 ring-transparent transition-all duration-75 hover:shadow focus:text-sky-600 focus:ring-blue-400'
            onClick={handleQRpayment}>
                <div className="text-start">
                    <h1 className='text-sm font-semibold'>QR promtpay</h1>
                    <span className='text-xs font-light'>Transaction fee may apply</span>
                </div>
                <div className="">
                    <BsFillCreditCardFill size={20}/>
                </div>
            </button>
        </form>
    </div>
    </>

  )
}

export default QRpayment