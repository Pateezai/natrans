import React, { useState } from 'react'
import header from '../../assets/header.jpg'
import availableRoutes from '../../data/sample.json'

const ProtoBooking = () => {
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [date, setDate] = useState("")
    const [seat, setSeat] = useState("1")
    const [routes, setRoutes] = useState([])
    const [search, setSearch] = useState(false)
    const currentDate = new Date().toISOString().slice(0, 10);
    
    // const routes = availableRoutes.route;
    // formatDate will be do in react hooks
    // const formatDate = (dateString) => {
    //     const options = { year: 'numeric', month: 'short', day: '2-digit' };
    //     return new Date(dateString).toLocaleDateString('en-US', options);
    //   };
      
    //   // Helper function to format the time as "hh:mm AM/PM"
    //   const formatTime = (dateString) => {
    //     return new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    //   };
    const cities = availableRoutes.path



    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(from)
        // console.log(to)
        // console.log(date)
        // const currentDate = new Date().toISOString()
        // console.log(currentDate)
        // const currenTime = new Date().toLocaleTimeString('th', { hour: '2-digit', minute: '2-digit' })
        // console.log(currenTime)
        // console.log(seat)
        // const filterRoute = availableRoutes.route.filter((route)=>{
        //     return (
        //         route.from === from &&
        //         route.to === to && 
        //         route.date.includes(date)
        //     )
        // })
        // setRoutes(filterRoute)
        // setSearch(!search)
    }

  return (
    <div className='border-2 max-w-[1200px] m-auto p-4 flex flex-col gap-2'>
        <div className="booking flex flex-col gap-4">
            <div className="border-2 max-h-[400px] overflow-hidden rounded-xl">
                <img src={header} alt="" className='object-cover'/>
            </div>
            <div className="flex p-2 sm:flex-col gap-1 border-2">
                <form action="" id='routeform' className=' m-auto grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-full gap-1' onSubmit={handleSubmit}>
                    <div className="border-2 flex flex-col p-1 gap-1">
                        <span>From</span>
                        <div className="flex">
                            <select name="from" id="from" className='h-full w-full px-4 py-1 border-2'>
                            {/* <select name="from" id="from" className='h-full w-full px-4 py-1 border-2' onChange={(e)=>setFrom(e.target.value)}> */}
                                <option value="">Select</option>
                                {cities.map((city, index)=>(
                                    <option value={city.label} key={city.code} disabled={city.label == to}>
                                        {city.label}
                                    </option>
                                ))}
                            </select>
                            <p className='border-2'>swap</p>
                        </div>
                    </div>
                    <div className="border-2 flex flex-col p-1 gap-1">
                         <span>To</span>
                        <div className="flex">
                        <select name="to" id="to" className='h-full w-full px-4 py-1 border-2'>
                        {/* <select name="to" id="to" className='h-full w-full px-4 py-1 border-2' onChange={(e)=>setTo(e.target.value)}> */}
                                <option value="">Select</option>
                                {cities.map((city, index)=>(
                                    <option value={city.label} key={city.code} disabled={city.label == from}>
                                        {city.label}
                                    </option>
                                ))}
                            </select>
                            <p className='border-2'>swap</p>
                        </div>
                    </div>
                    <div className="border-2 flex flex-col p-1 gap-1">
                        <span>Date</span>
                        <input type="date" id='date' min={currentDate} defaultValue={currentDate} className='border-2'/>
                        {/* <input type="date" id='date' min={currentDate} defaultValue={currentDate} onChange={(e)=>setDate(e.target.value)} className='border-2'/> */}
                    </div>
                    <div className="border-2 flex flex-col p-1 gap-1">
                        <span>Passenger</span>
                        <div className="flex">
                            <select name="passenger" id="passenger" className='h-full w-full px-4 py-1 border-2'>
                            {/* <select name="passenger" id="passenger" className='h-full w-full px-4 py-1 border-2' onChange={(e)=>setSeat(e.target.value)}> */}
                                <option value="" disabled>Select</option>
                                <option value="1">1 person</option>
                                <option value="2">2 persons</option>
                            </select>
                            <p className='border-2'>swap</p>
                        </div>
                    </div>
                </form>
                <button className='border-2 w-24 sm:w-full' type='submit' form='routeform'>search</button>
            </div>

        </div>

        
        <div className="res border-2 flex flex-col gap-8">
            <h1 className='text-center'>Relevant Search</h1>

            {routes.map((route, index)=>(
            <div className="flex sm:flex-col" key={index}>
                <div className="detail w-3/4 sm:w-full border-2 border-pink-700 flex justify-between">
                    <div className="from w-3/4  border-2 flex items-center justify-center">
                        {route.from}
                    </div>
                    <div className="icon border-2 border-blue-200 flex flex-col items-center justify-center">
                        {new Date(route.date).toLocaleString()}
                        {/* <p>
                            {formatDate(route.date)}
                        </p> */}
                        {/* <p>
                            {formatTime(route.date)}
                        </p> */}

                    </div>
                    <div className="to w-3/4  border-2 flex items-center justify-center">
                        {route.to}
                    </div>
                </div>
                <div className="button w-1/4 sm:w-full border-2 border-blue-400 flex flex-col items-center justify-center">
                    <p>{seat} Passenger</p>
                    <button className='border-2 px-4 py-1 rounded-full bg-sky-300 text-white'>{route.fare*seat}</button>
                    <p>{route.fare}/person</p>
                </div>
            </div>
            ))}

        </div>



    </div>
  )
}

export default ProtoBooking