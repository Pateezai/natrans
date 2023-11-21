import React, { useState } from 'react'
import {BsFillCreditCardFill} from 'react-icons/bs'
import Script from 'react-load-script'
import { CreateCreditCharge } from '../../../helper/handling/payment-handling'
import LoadingModals from '../../../components/modals/LoadingModals'
import { useTicketStore } from '../../../store/store'
import { useNavigate } from 'react-router-dom'
import { subscribeWithSelector } from 'zustand/middleware'

const CreditCard = ({CheckoutDetail, routeDetail}) => {
   const {
        routeId,
        periodId,
        from, 
        to, 
        date, 
        duration,
        fare,
        passenger,
        desc,
        start_time,
        end_time,
   } = routeDetail
    const {
        issue_date,
        identnumber,
        // prefix,
        // fname,
        // lname,
        pname,
        email,
        phone,
        note,
        // accept,
     } = CheckoutDetail
    // console.log(Checkout)
     const price = (fare*passenger)
    //  console.log('price', price)
     const cardcharge = ((price)*(365/100))/100
    //  console.log('cardcharge', cardcharge)
     const vat = (cardcharge)*(7/100)
    //  console.log('vat', vat)
    const total = (
        parseInt((price + cardcharge + vat)*100)
        // have to multiply 100 cuz omise count the smallest currency unit in th baht = stang
    )
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    const setTicket = useTicketStore(state => state.setTicket)
    // const [data, setData] = useState({ isLoading : false, apiData: undefined, status : null, serverError: null })
    
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
    // console.log(fare)
    const omiseCardHandler = () => {
        OmiseCard.open({
            frameDescription: 'Invoice #123123',
            amount: parseInt(total) ,
            submitFormTarget: '#creditcard',
            onCreateTokenSuccess: (token) => {
                setIsLoading(true)


                // console.log(token)
                // console.log(amount)
                const values = {
                    method:'credit_card',
                    issue_date,
                    routeId,
                    periodId,
                    from, 
                    to, 
                    date, 
                    duration,
                    fare,
                    passenger, 
                    desc,
                    start_time,
                    end_time,
                    identnumber,
                    phone,
                    note,
                    // accept,
                    email, 
                    pname:pname, 
                    amount:parseInt(total), 
                    token,
                }
                try {
                    
                } catch (error) {
                    
                }
                let CreditChargePromise = CreateCreditCharge(values)
                
                CreditChargePromise.then(res => {
                    console.log('toy')
                    console.log(res.status)
                    console.log(res.data)
                    const { ticket_ref } = res.data
                    // const { ticket_qr } = res.data
                    const { authorizeUri } = res.data
                    const { return_uri } = res.data
                    let { amount } = res.data
                    let { status } = res.data
                    const {values} = res.data
                    //example url
                    //www.localhost.com/ticket?ref_id=asdasdasd
                    // console.log(values)
                    // const ticket = res.ticket
                    // console.log(res.ticket)
                    // console.log(ticket, 'ticket')
                    // console.log(authorizeUri)

                    // const parts = return_uri.split("/");
                    // const lastPart = parts[parts.length - 1];

                    // console.log(lastPart)
                    // console.log(return_uri)
                    // console.log(amount)
                    // console.log(status)
                    if(ticket_ref){
                        console.log(
                            setTicket({ticket:ticket_ref
                                // , qr:ticket_qr
                            })
                        )

                        if(authorizeUri){
                            localStorage.removeItem('route-detail')

                            // navigate(`../${lastPart}`);
                            window.location.href = authorizeUri
                        }
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

    const creditCardConfigure = () => {
        OmiseCard.configure({
            defaultPaymentMethod:'credit_card',
            otherPaymentMethod:[]
        })
        OmiseCard.configureButton('#creditcardbtn')
        OmiseCard.attach()
    }

    const handleCreditCard = (e) => {
        e.preventDefault()
        creditCardConfigure()
        omiseCardHandler()
    }

  return (
    <>
    {isLoading? (
        <>
        <LoadingModals/>
        </>
    ):(null)}

    <div className='w-full md:w-1/3 lg:w-1/3 xl:w-1/3'>
        <Script
        url="https://cdn.omise.co/omise.js"
        onLoad={handleLoadScript}
        />
        <form id='creditcard'>
            <button id='creditcardbtn' className='rounded-sm flex items-center bg-slate-300 w-full justify-between gap-2 py-2 px-4 ring-2 ring-transparent transition-all duration-75 hover:shadow focus:text-sky-600 focus:ring-blue-400'
            onClick={handleCreditCard}>
                <div className="text-start">
                    <h1 className='text-sm font-semibold'>Credit Card</h1>
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

export default CreditCard