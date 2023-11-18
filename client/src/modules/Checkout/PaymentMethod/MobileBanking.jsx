import React from 'react'
import {BsFillCreditCardFill} from 'react-icons/bs'
import Script from 'react-load-script'
import { CreateMobileBankingCharge } from '../../../helper/handling/payment-handling'


const MobileBanking = ({checkoutInfo}) => {
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
            frameLabel:'Test-shop',
            submitLabel:'PAY NOW',
            buttonLabel:'Pay witn Omise'
        })
    }

    const omiseMobileBankingHandler = () => {
        OmiseCard.open({
            frameDescription: 'Invoice #123123',
            amount: parseInt(total) ,
            submitFormTarget: '#MobileBankingForm',
            onCreateTokenSuccess: (token) => {
                console.log(token)
                // console.log('work?',
                let MobileBankingChargePromise = CreateMobileBankingCharge({email, name:prefix + fname + " " + lname , amount:parseInt(total), token})
                MobileBankingChargePromise.then(res => {
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

    const MobileBankingConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod:'mobile_banking',
            otherPaymentMethod:[]

        })
        OmiseCard.configureButton('#MobileBanking')
        OmiseCard.attach()
    }

    const handleMobileBanking = (e) => {
        e.preventDefault()
        MobileBankingConfigure()
        omiseMobileBankingHandler()
    }

  return (
    <div className='w-1/3 sm:w-full'>
        <Script
        url="https://cdn.omise.co/omise.js"
        onLoad={handleLoadScript}
        />
        <form id='MobileBankingForm'>
            <button id='MobileBanking' className='rounded-sm flex items-center bg-slate-300 w-full justify-between gap-2 py-2 px-4 ring-2 ring-transparent transition-all duration-75 hover:shadow focus:text-sky-600 focus:ring-blue-400'
            onClick={handleMobileBanking}>
                <div className="text-start">
                    <h1 className='text-sm font-semibold'>Mobile Banking</h1>
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

export default MobileBanking