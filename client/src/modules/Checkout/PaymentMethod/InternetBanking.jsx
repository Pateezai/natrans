import React from 'react'
import {BsFillCreditCardFill, BsQrCode} from 'react-icons/bs'
import Script from 'react-load-script'
import { CreateInternetBankingCharge } from '../../../helper/handling/payment-handling'

const InternetBanking = ({checkoutInfo}) => {
    const { from, to, date, fare, passenger  } = checkoutInfo.routeInfo
    // const [fee, setFee] = useState(3.65)
    const total = ((fare*passenger)+((fare*passenger)*(365/100))+((fare*passenger)*(7/100)))*100
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
            frameLabel:'Test Shop',
            submitLabel:'PAY NOW',
            buttonLabel:'Pay witn Omise'
        })
    }

    const omiseInternetBankingHandler = () => {
        OmiseCard.open({
            frameDescription: 'Invoice #123123',
            amount: parseInt(total) ,
            submitFormTarget: '#InternetBankingForm',
            onCreateTokenSuccess: (token) => {
                console.log(token)
                // console.log('work?',
                let InternetBankingChargePromise = CreateInternetBankingCharge({email, name:prefix + fname + " " + lname , amount:parseInt(total), token})
                InternetBankingChargePromise.then(res => {
                    const {authorizeUri} = res.data
                    console.log(authorizeUri)
                    if(authorizeUri){
                      window.location.href = authorizeUri
                    }
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

    const InternetBankingConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod:'internet_banking',
            // otherPaymentMethod:[
            //   "bill_payment_tesco_lotus",
            //   "alipay",
            //   "rabbit_linepay",
            //   "alipay",
            //   "truemoney"
            // ]
        })
        OmiseCard.configureButton('#InternetBanking')
        OmiseCard.attach()
    }

    const handleInternetBanking = (e) => {
        e.preventDefault()
        InternetBankingConfigure()
        omiseInternetBankingHandler()
    }

  return (
    <div className='w-1/3 sm:w-full'>
        <Script
        url="https://cdn.omise.co/omise.js"
        onLoad={handleLoadScript}
        />
        <form id='InternetBankingForm'>
            <button id='InternetBanking' className='rounded-sm flex items-center bg-slate-300 w-full justify-between gap-2 py-2 px-4 ring-2 ring-transparent transition-all duration-75 hover:shadow focus:text-sky-600 focus:ring-blue-400'
            onClick={handleInternetBanking}>
                <div className="text-start">
                    <h1 className='text-sm font-semibold'>Internet Banking</h1>
                    <span className='text-xs font-light'>Transaction fee may apply</span>
                </div>
                <div className="">
                    <BsFillCreditCardFill size={20}/>
                </div>
            </button>
        </form>
    </div>

  )
}

export default InternetBanking