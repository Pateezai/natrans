import React, { useEffect, useState } from 'react'
// import inside from '../../assets/inside_v1.jpeg'
import {BiTransfer, BiCopyright, BiSolidBank} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { PiArrowFatRightFill, PiArrowFatDownFill } from 'react-icons/pi'
import { MdPersonPinCircle, MdLocationPin, } from 'react-icons/md'
import { IoTicketSharp } from 'react-icons/io5'
import { BsDashLg, BsFillPersonFill } from 'react-icons/bs'
import { RiBusFill } from 'react-icons/ri'
import { FaPersonWalkingLuggage } from 'react-icons/fa6'
import * as validate from '../../helper/validate/validate'
import CreditCard from './PaymentMethod/CreditCard'
import axios from "axios";
import QRpayment from './PaymentMethod/QRpayment'
import MobileBanking from './PaymentMethod/MobileBanking'
import { useCheckoutStore, useRouteStore } from '../../store/store'
import { CgKey } from 'react-icons/cg'
import BusDetail from './BusDetail/BusDetail'


// axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_SERVER_DOMAIN;

const Checkout = () => {
    const navigate = useNavigate();
    const [payment, setPayment] = useState('')
    // const [Checkout, setCheckout] = useState()
    const [info, setInfo] = useState(false)
    const routeDetail = useRouteStore(state => state.RouteDetail);
    // console.log(routeDetail)
    const setCheckoutDetail = useCheckoutStore(state => state.setCheckoutDetail)
    const CheckoutDetail = useCheckoutStore(state => state.CheckoutDetail);
    const currentDay = new Date();
    const year = currentDay.getFullYear();
    const month = String(currentDay.getMonth() + 1).padStart(2, "0");
    const day = String(currentDay.getDate()).padStart(2, "0");
    const hours = String(currentDay.getHours()).padStart(2, "0");
    const currentMinutes = currentDay.getMinutes();
    const minutes = String(currentMinutes).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    const formattedDate = `${year}-${month}-${day}`;
    useEffect(()=>{
        if (routeDetail) {
            console.log(routeDetail.available_seat, routeDetail.reserved_seat)
            // console.log(routeDetail, 'useEffect')
            const currentTime = new Date().getTime();
          if (formattedDate == routeDetail.date && formattedTime>routeDetail.start_time || currentTime >= routeDetail.timestamp) {
            localStorage.removeItem('route-detail')
            setCheckoutDetail({});
            if(!localStorage.getItem('route-detail')){
                navigate("../");
                // const ProtectedRoute = ({children}) =>{
                //     if(!currentUser){
                //       return <Navigate to='/login'/>
                //     }
                //     return children
                //   }
                
            }
          }
        }
        setCheckoutDetail({});


    }, [routeDetail])
    // console.log(routeDetail)
    const formik = useFormik({
        initialValues: {
          identnumber:'',
          prefix: "Mr.",
          fname: '',
          lname: '',
          email: '',
          phone: '',
          note: '',
          accept: false,
        },
        validationSchema:validate.passengerInfo,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: async (values, actions) => {
            const currentTime = new Date().getTime();
            const routeTimestamp = currentTime +15 * 60 * 1000; // 15 minutes in milliseconds
        
            // console.log('click')
            // console.log(values)
            setInfo(true)
            //send to backend no need to store state this is just example 
            setCheckoutDetail({
                issue_date:formattedDate,
                identnumber:values.identnumber,
                // fname:values.fname,
                // lname:values.lname,
                // prefix:values.prefix,
                pname:values.prefix+ values.fname + " " + values.lname,
                email:values.email,
                phone:values.phone,
                note:values.note,
                accept:values.accept,
                timestamp:routeTimestamp,

            })
            // console.log(CheckoutDetail)

        }
        })
    
  return (
    <>
    <div className="bg-slate-300 text-slate-400 py-2 px-8 flex items-center gap-1 sele font-light text-sm"> <Link to={'../'} className='hover:text-slate-500 hover:underline'>Home</Link>  <p className='select-none'>/</p><Link to={'../checkout'} className='text-md underline text-slate-500'>Route Detail</Link></div>
    <div className='min-w-[270px] max-w-[1200px] min-h-screen m-auto flex flex-col gap-4 px-2 py-10 md:px-4 md:py-20 lg:px-4 lg:py-20 xl:px-4 xl:py-20'>
        {/* <h1 className='text-xl font-semibold text-center'>Your Selected Route Detail</h1> */}


        <div className="min-w-[270px] border border-slate-900 rounded overflow-hidden relative">
            <div className="bg-slate-900 flex items-center justify-between pr-6 ">
                {/* <h2 className='text-xl font-semibold text-start px-6 py-2 text-white'>Passenger Ticket</h2> */}
                <h2 className='text-xl font-semibold text-start px-6 py-2 text-white flex items-center gap-2'>Ticket Detail <IoTicketSharp size={24}/></h2>
            </div>
            <input type="checkbox" name="ticket" id="ticket"  className='peer/ticket sr-only'/>
            <label className='cursor-pointer' htmlFor='ticket'>
                <BsDashLg  className={`text-white transition-all duration-150 absolute top-3 right-4`} size={20}/> 
            </label>
            <div className="flex flex-col bg-slate-100 p-4 transition-all duration-150 peer-checked/ticket:hidden md:flex-row lg:flex-row xl:flex-row" >
                <div className="detail w-full flex-col flex justify-between md:w-3/4 md:flex-row lg:w-3/4 lg:flex-row xl:w-3/4 xl:flex-row">
                    <div className="from w-full flex flex-col items-center justify-center md:w-3/4 lg:w-3/4 xl:w-3/4">
                        <span className='flex items-center gap-2'>
                            <span className='flex flex-col items-center justify-center'>
                                <MdPersonPinCircle size={30}/>
                                <span className='uppercase text-xs font-light'>from</span>
                            </span>
                            <h3 className='text-3xl font-bold'>
                                {routeDetail.start_time}
                            </h3>
                        </span>
                        <p className='text-xl font-medium'>
                            {routeDetail.from}
                        </p>
                        <p className='text-md'>
                            {routeDetail.date}
                        </p>
                    </div>
                    <div className="icon flex flex-col items-center justify-center">
                        <PiArrowFatRightFill size={30} className='hidden md:block lg:block xl:block'/>
                        <PiArrowFatDownFill size={30} className='block md:hidden lg:hidden xl:hidden'/>
                    </div>
                    <div className="to w-full flex flex-col items-center justify-center md:w-3/4 lg:w-3/4 xl:w-3/4">
                        <span className='flex items-center gap-2'>
                            <span className='flex flex-col items-center justify-center'>
                                <MdLocationPin size={30}/>
                                <span className='uppercase text-xs font-light'>to</span>
                            </span>
                            <h3 className='text-3xl font-bold'>
                                {routeDetail.end_time}
                                </h3>
                        </span>
                        <p className='text-xl font-medium'>
                            {routeDetail.to}
                        </p>
                        <p className='text-md'>
                            {routeDetail.date}
                        </p>
                    </div>
                </div>
                <div className="button w-full flex flex-col items-center justify-center md:w-1/4 lg:w-1/4 xl:w-1/4">
                    <p className='flex items-center'> 
                    {routeDetail.passenger}  Passenger
                    
                    </p>
                    <div className='border-2 px-4 py-1 rounded-full bg-sky-300 text-white'>
                        {routeDetail.passenger * routeDetail.fare}
                        </div>
                    <div className='flex items-center gap-3'>
                        <span className='flex items-center gap-1'>
                        {routeDetail.passenger} <BsFillPersonFill size={18}/>,
                        </span>
                        <span className='flex items-center'>
                        {routeDetail.fare}฿/<BsFillPersonFill size={18}/>
                        
                        </span>
                        
                    </div>
                </div>
            </div>
        </div>
        
        <div className="cardetail min-w-[270px] border border-slate-900 rounded overflow-hidden relative">

            <div className="bg-slate-900 flex items-center justify-between pr-6">
                {/* <h2 className='text-xl font-semibold text-start px-6 py-2 text-white'>Passenger Ticket</h2> */}
                <h2 className='text-xl font-semibold text-start px-6 py-2 text-white flex items-center gap-2'>Bus Detail <RiBusFill size={24}/></h2>
            </div>
                <input type="checkbox" name="bus" id="bus"  className='peer/bus sr-only'/>
                <label className='cursor-pointer' htmlFor='bus'>
                    <BsDashLg  className={`text-white transition-all duration-150 absolute top-3 right-4`} size={20}/> 
                </label>
                <div className="flex flex-col transition-all duration-150 bg-slate-100 peer-checked/bus:hidden md:flex-row lg:flex-row xl:flex-row">

                    <div className="w-full flex items-center justify-center p-2 md:w-1/3 lg:w-1/3 xl:w-1/3">
                        <BusDetail/>
                        {/* <div className="w-72 h-36 overflow-hidden flex items-center justify-center">
                            <img src={inside} alt="" className='object-contain scale-75'/>
                        </div> */}
                    </div>

                    <div className="w-full p-2 flex flex-col justify-between md:w-3/4 lg:w-3/4 xl:w-3/4">
                        <div className="flex flex-wrap items-center justify-start gap-4 p-2">
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>From:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.from}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>To:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.to}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Departure Time:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.start_time}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Arrival Time:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.end_time}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Duration:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.duration}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Date:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.date}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Passenger:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.passenger}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Price:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.fare}
                                ฿/Seat</p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Total Price:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.fare * routeDetail.passenger}
                                ฿</p>
                        </div>
                        <br />
                        <div className="flex items-start gap-1">
                            <h1 className='font-semibold  text-end'>Note:</h1>
                            <p className='break-words font-light text-slate-500'>Please specific your drop point if any, <span className='font-semibold uppercase underline'>no additional charging</span></p>
                        </div>
                        </div>
                        <div className="">
                            <h1 className='text-xs text-slate-300 flex flex-wrap items-center justify-center gap-1'>
                            <span className='font-semibold uppercase text-xs flex items-center gap-1'>
                            <BiCopyright/>
                            Natrans
                            </span> 
                            Take you to everywhere <BiTransfer size={20}/>
                            </h1>
                        </div>
                    </div>
                    
                </div>
        


        </div>
        
{/* Another  */}
        {/* 
        <div className="cardetail min-w-[270px] border border-slate-900 rounded overflow-hidden relative">

            <div className="bg-slate-900 flex items-center justify-between pr-6">

                <h2 className='text-xl font-semibold text-start px-6 py-2 text-white flex items-center gap-2'>Bus Detail <RiBusFill size={24}/></h2>
            </div>
                <input type="checkbox" name="bus" id="bus"  className='peer/bus sr-only'/>
                <label className='cursor-pointer' htmlFor='bus'>
                    <BsDashLg  className={`text-white transition-all duration-150 absolute top-3 right-4`} size={20}/> 
                </label>
                <div className="items-center flex flex-col transition-all duration-150 bg-slate-100 peer-checked/bus:hidden">

                    <div className=" w-full flex items-center justify-between gap-4 p-8">
                        <div className="">Prev</div>
                        <div className="overflow-hidden flex items-center justify-center">
                            <img src={inside} alt="" className='object-contain'/>
                        </div>
                        <div className="">Prev</div>
                    </div>

                    <div className=" w-full p-2">
                        <div className="h-full flex  flex-row flex-wrap items-center justify-start  gap-4 p-2">
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>From:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.from}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>To:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.to}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Departure Time:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.start_time}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Arrival Time:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.end_time}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Duration:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.duration}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Date:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.date}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Passenger:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.passenger}
                                </p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Price:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.fare}
                                ฿/Seat</p>
                        </div>
                        <div className="flex items-center gap-1 ">
                            <h1 className='font-semibold  text-end'>Total Price:</h1>
                            <p className='font-light text-slate-500'>
                                {routeDetail.fare * routeDetail.passenger}
                                ฿</p>
                        </div>
                        <br />
                        <div className="flex items-start gap-1">
                            <h1 className='font-semibold  text-end'>Note:</h1>
                            <p className='break-words font-light text-slate-500'>Please specific your drop point if any, <span className='font-semibold uppercase underline'>no additional charging</span></p>
                        </div>
                        </div>
                        
                    </div>
                    
                </div>



        </div> 
        */}
{/* Another  */}
        
        <div className="passenger detail min-w-[270px] border rounded border-slate-900 overflow-hidden relative">
            <div className="bg-slate-900 flex items-center justify-between pr-6 ">
                {/* <h2 className='text-xl font-semibold text-start px-6 py-2 text-white'>Passenger Ticket</h2> */}
                <h2 className='text-xl font-semibold text-start px-6 py-2 text-white flex items-center gap-2'>Contact Detail <FaPersonWalkingLuggage size={24}/></h2>
            </div>
            <input type="checkbox" name="forminfo" id="forminfo"  className='peer/forminfo sr-only'/>
            <label className='cursor-pointer' htmlFor='forminfo'>
                <BsDashLg  className={`text-white transition-all duration-150 absolute top-3 right-4`} size={20}/> 
            </label>
            <form id='psginfo' className="form grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 p-4 bg-slate-100 transition-all duration-150 peer-checked/forminfo:hidden" onSubmit={formik.handleSubmit}>
                    
                    <div className="flex flex-col my-1">
                        <span className='font-semibold'>First Name</span>
                        <div className="flex ">
                            <select name="prefix" id="prefix" className='outline-none border rounded-l-sm border-opacity-50 border-slate-800' {...formik.getFieldProps('prefix')}>
                                <option value="Mr.">Mr.</option>
                                <option value="Mrs.">Mrs.</option>
                            </select>
                            <input type="text" className='w-full border-r border-y rounded-e-sm border-opacity-50 border-slate-800 px-3 py-1 text-lg font-light outline-none focus:border-opacity-100 focus:border-pink-700/50 placeholder:text-md'
                            placeholder='Fill your First Name' {...formik.getFieldProps('fname')}
                            />

                        </div>
                        <span className={formik.errors.fname ? `text-pink-700`:`hidden`}>Invalid</span>
                    </div>
                    <div className="flex flex-col my-1">
                        <span className='font-semibold'>Last Name</span>
                        <div className="flex flex-col">
                            <input type="text" className='w-full border rounded-sm border-opacity-50 border-slate-800 px-3 py-1 text-lg font-light outline-none focus:border-opacity-100 focus:border-pink-700/50 placeholder:text-md'
                            placeholder='Fill your Last Name' {...formik.getFieldProps('lname')}
                            />

                        <span className={formik.errors.lname ? `text-pink-700`:`hidden`}>Invalid</span>

                        </div>
                    </div>
                    <div className="flex flex-col my-1">
                        <span className='font-semibold'>ID/Passport No.</span>
                        <input type="text" className='border rounded-sm border-opacity-50 border-slate-800 px-3 py-1 text-lg font-light outline-none focus:border-opacity-100 focus:border-pink-700/50 placeholder:text-md'
                        placeholder='Fill your ID/Passport No.' {...formik.getFieldProps('identnumber')}
                        />
                          <span className={formik.errors.identnumber ? `text-pink-700`:`hidden`}>Invalid</span>
                    </div>
                    <div className="flex flex-col my-1">
                        <span className='font-semibold'>Email</span>
                        <input type="text" className='w-full border rounded-sm border-opacity-50 border-slate-800 px-3 py-1 text-lg font-light outline-none focus:border-opacity-100 focus:border-pink-700/50 placeholder:text-md'
                        placeholder='Fill your Email Address' {...formik.getFieldProps('email')}
                        />
                        <span className={formik.errors.email ? `text-pink-700`:`hidden`}>Invalid</span>

                    </div>
                    <div className="flex flex-col my-1">
                        <span className='font-semibold'>Phone</span>
                        <input type="text" className='border rounded-sm border-opacity-50 border-slate-800 px-3 py-1 text-lg font-light outline-none focus:border-opacity-100 focus:border-pink-700/50 placeholder:text-md'
                        placeholder='Fill your Phone Number' {...formik.getFieldProps('phone')}
                        />
                        <span className={formik.errors.phone ? `text-pink-700`:`hidden`}>Invalid</span>

                    </div>
                    <div className="flex flex-col my-1 col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <span className='font-semibold'>Note</span>
                        <textarea type="textarea" className='border rounded-sm border-opacity-50 border-slate-800 px-3 py-1 text-lg font-light outline-none focus:border-opacity-100 focus:border-pink-700/50 placeholder:text-md'
                        placeholder='Please note your drop point if any, NO ADDITIONAL CHARGED' {...formik.getFieldProps('note')}
                        />


                    </div>

                    <div className="col-span-1 my-1 gap-1 flex flex-wrap justify-center p-2 md:col-span-2 lg:col-span-2 xl:col-span-2">
                            <input 
                            type="checkbox" name="accept" id="accept" {...formik.getFieldProps('accept')}/>
                            I accept 
                            <p className='break-words font-medium uppercase'>na-trans<span className='font-normal lowercase'>'s</span></p>
                            <a href="#" className='underline break-words font-medium'>Terms of Services</a> 
                            and 
                            <a href="#" className='underline break-words font-medium'>Privacy policy</a> 
                            <span className={formik.errors.accept ? `text-pink-700`:`hidden`}>Please accept to continue</span>


                    </div>
                    <div className="col-span-1 my-1 p-4 flex items-center justify-center md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <button 
                        disabled={
                            formik.values.identnumber && formik.values.fname && formik.values.lname && formik.values.email && formik.values.phone && formik.values.accept ?
                            false:true
                        }
                        type='submit' form='psginfo' className=' disabled:bg-sky-600 rounded-full px-20 py-2 text-xl font-semibold bg-sky-400 disabled:text-slate-200 text-white'>Continue Payment</button>
                    </div>
            </form>
        </div>

        <div className={`payment min-w-[270px] border border-slate-900 rounded overflow-hidden relative`}>
            <div className={`bg-slate-900/30 w-full h-full absolute z-10 
            ${info? 'hidden' : ''}
            `}></div>
            <div className="bg-slate-900 flex items-center justify-between pr-6 ">
                {/* <h2 className='text-xl font-semibold text-start px-6 py-2 text-white'>Passenger Ticket</h2> */}
                <h2 className='text-xl font-semibold text-start px-6 py-2 text-white flex items-center gap-2'>Payment Detail</h2>
            </div>
            <input type="checkbox" name="payment" id="payment"  className='peer/payment sr-only'/>
            <label className='cursor-pointer' htmlFor='payment'>
                <BsDashLg  className={`text-white transition-all duration-150 absolute top-3 right-4`} size={20}/> 
            </label>
            <div className=" transition-all duration-150 peer-checked/payment:hidden">
                <div className=" flex justify-center">
                    <div className="py-4 px-8 bg-slate-300 w-full ">
                        <div className="flex justify-between px-2 mb-2">
                            <p>
                                Ticket from <span className='font-bold'>{routeDetail.from}</span> to <span className='font-bold'>{routeDetail.to}</span>
                            </p>
                            <p className='font-bold'>{routeDetail.passenger} seat</p>
                        </div>
                        <div className="flex justify-between px-2 mb-2">
                            <p>
                                Price per Seat
                            </p>
                            <p className='font-bold'>{routeDetail.fare} Bath</p>
                        </div>
                        <div className="flex justify-between px-2 border-y-2 border-slate-400">
                            <h1 className='text-xl font-semibold text-center'>Total:</h1>
                            <h1 className='text-xl font-semibold text-center'>
                                {routeDetail.passenger * routeDetail.fare}
                                Baht</h1>
                        </div>
                    </div>
                </div>
                <h1 className='text-lg font-medium bg-slate-200 pl-8 p-2'>Payment Method </h1>
                <div className="flex flex-col gap-2 w-full items-center justify-center p-4 bg-slate-100 md:flex-row lg:flex-row xl:flex-row">
                    <CreditCard 
                    CheckoutDetail={CheckoutDetail}
                    routeDetail={routeDetail}
                    />
                    {/* <InternetBanking
                    CheckoutDetail={CheckoutDetail}
                    routeDetail={routeDetail}
                    /> */}
                    {/* <Others
                    CheckoutDetail={CheckoutDetail}
                    routeDetail={routeDetail}
                    /> */}
                    
                    {/* <MobileBanking 
                    CheckoutDetail={CheckoutDetail}
                    routeDetail={routeDetail}
                    /> */}
                    {/* <QRpayment
                    CheckoutDetail={CheckoutDetail}
                    routeDetail={routeDetail}
                    /> */}
                </div>
            </div>
        </div>
        
        

    </div>
    </>
  )
}

export default Checkout