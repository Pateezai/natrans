import React, { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { useFormik } from "formik";
import LandingBanner from "../../components/Carousel/LandingBanner.jsx";
import { useNavigate } from "react-router-dom";
import Hotels from "../../components/etc/Hotels";
import { CgSwap } from "react-icons/cg";
import { AiOutlineClear } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { MdPersonPinCircle, MdLocationPin } from "react-icons/md";
import { PiArrowFatRightFill, PiArrowFatDownFill } from "react-icons/pi";
import { GetSelectedRoute } from "../../helper/handling/data-handling";
// import Ticket from "./components/Ticket";
import { useRouteStore } from "../../store/store";

const Booking = () => {
  const navigate = useNavigate();
  const [passenger, setPassenger] = useState(1);
  const [currentDate, setCurrentDate] = useState("");
  const [search, setSearch] = useState(false);
  // const [detail, setDetail] = useState({ passenger: 1, currentDate: null, search: false })
  const [data, setData] = useState({ isLoading : false, apiData: undefined, status : null, serverError: null })
  const routeDetail = useRouteStore(state => state.RouteDetail);

  const setRouteDetail = useRouteStore(state => state.setRouteDetail)
  const {isLoading, apiData, status} = data;
  const [cities, setCities] = useState([
    { name: "Nathon Pier", id: "1" },
    { name: "Chaweang", id:"2" },
  ]);

  const currentDay = new Date();
  const year = currentDay.getFullYear();
  const month = String(currentDay.getMonth() + 1).padStart(2, "0");
  const day = String(currentDay.getDate()).padStart(2, "0");
  const hours = String(currentDay.getHours()).padStart(2, "0");
  const currentMinutes = currentDay.getMinutes();
  const minutes = String(currentMinutes).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  const formattedDate = `${year}-${month}-${day}`;

  
  const formik = useFormik({
    initialValues: {
      from: cities[0].name,
      to: cities[1].name,
      date: formattedDate,
      passenger: "1" || formik.values.passenger,
      depart_time: "should get from db",
      arrive_time: "should get from db",
    },
    onSubmit: async (values, actions) => {

      try {
        setData(prev => ({ ...prev, isLoading: true }))
        GetSelectedRoute(values);
        let { data, status } = await GetSelectedRoute(values);

        if(status === 200){

          setData(prev => ({ ...prev, apiData:data, status: status }))
        }
        setData(prev => ({ ...prev, isLoading: false }))
        
      } catch (error) {
        setData(prev => ({ ...prev, isLoading: false, serverError: error }))
      }
      setCurrentDate(formik.values.date);
      setSearch(true);
      setPassenger(formik.values.passenger);
      // console.log(apiData? apiData:'not yet')

    },
  });

  const handleClear = () => {
    const emptyFormValues = {
      from: cities[0].name,
      to: cities[1].name,
      date: formattedDate,
      passenger: passenger,
      depart_time: "should get from db",
      arrive_time: "should get from db",
    };

    formik.setValues(emptyFormValues);
  };

  const handleSwap = () => {
    formik.setFieldValue("from", formik.values.to);
    formik.setFieldValue("to", formik.values.from);
  };


  const handleOnClick = async (route, period, index) => {
    // console.log(route, period, index)
    // console.log('from', route.start_location)
    // console.log('to', route.end_location)
    // console.log('date', route.date.slice(0, 10))
    // console.log('fare', route.fare)
    // console.log('passenger', passenger)
    // console.log('desc', period.desc)
    // console.log('start_time', period.start_time)
    // console.log('end_time', period.end_time)
    // console.log('index', index)
    const currentTime = new Date().getTime();
    const routeTimestamp = currentTime +15 * 60 * 1000; // 15 minutes in milliseconds
    console.log(apiData)
    setRouteDetail({
      routeId:route.id,
      periodId:period.id,
      from: route.start_location,
      to: route.end_location,
      date: route.date.slice(0, 10),
      duration: route.duration,
      fare: route.fare,
      passenger: passenger,
      desc: period.desc,
      start_time: period.start_time,
      end_time: period.end_time,
      timestamp: routeTimestamp,
      available_seat: period.available_seat,
      reserved_seat: period.reserved_seat,
    })
  

    navigate("../checkout");

  };


  return (
    <>
      <LandingBanner />
      <div className="min-w-[270px] max-w-[1200px] m-auto sm:p-2 p-4 flex flex-col gap-2">
        <div className="booking flex flex-col p-2  gap-4 bg-slate-200 rounded shadow-md">
          <div className="flex sm:flex-col gap-1">
            <form
              action=""
              id="routeform"
              className="m-auto grid grid-cols-4 md:grid-cols-2 sm:grid-cols-1 w-full gap-1"
              onSubmit={formik.handleSubmit}
            >
              <div className="flex flex-col p-2">
                <span className="text-sm font-semibold">From</span>
                <div className="flex">
                  <select
                    name="from"
                    id="from"
                    className="h-full w-full px-4 py-1 rounded-sm border outline-none border-slate-400"
                    onChange={(e) =>
                      formik.setFieldValue("from", e.target.value)
                    } // Changed to setFieldValue
                    {...formik.getFieldProps("from")}
                  >
                    <option value="">Select</option>
                    {cities.map((city, index) => (
                      <option
                        value={city.name}
                        key={index}
                        disabled={city.name === formik.values.to} // Fixed comparison
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="p-1 flex items-center justify-center bg-slate-300 rounded-e-sm">
                    <CgSwap
                      size={20}
                      onClick={handleSwap}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-sm font-semibold">To</span>
                <div className="flex">
                  <select
                    name="to"
                    id="to"
                    className="h-full w-full px-4 py-1 rounded-sm border border-slate-400 outline-none"
                    onChange={(e) => formik.setFieldValue("to", e.target.value)} // Changed to setFieldValue
                    {...formik.getFieldProps("to")}
                  >
                    <option value="">Select</option>
                    {cities.map((city, index) => (
                      <option
                        value={city.name}
                        key={index}
                        disabled={city.name === formik.values.from} // Fixed comparison
                      >
                        {city.name}
                      </option>
                    ))}
                  </select>
                  <div className="p-1 flex items-center justify-center bg-slate-300 rounded-e-sm">
                    <CgSwap
                      size={20}
                      onClick={handleSwap}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-2">
                <span className="text-sm font-semibold">Date</span>
                <input
                  type="date"
                  min={formattedDate}
                  className="w-full h-full rounded-sm border border-slate-400 outline-none px-4"
                  {...formik.getFieldProps("date")}
                />
              </div>
              <div className="flex flex-col p-2">
                <span className="text-sm font-semibold">Passenger</span>
                <div className="flex">
                  <select
                    name="passenger"
                    id="passenger"
                    className="h-full w-full px-4 py-1 rounded-sm border border-slate-400 outline-none"
                    {...formik.getFieldProps("passenger")}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    <option value="1">1 person</option>
                    <option value="2">2 persons</option>
                    <option value="3">3 persons</option>
                    <option value="4">4 persons</option>
                    <option value="5">5 persons</option>
                    <option value="6">6 persons</option>
                    <option value="7">7 persons</option>
                    <option value="8">8 persons</option>
                  </select>
                  <div className="p-[6px] flex items-center justify-center bg-slate-300 rounded-e-sm">
                    <AiOutlineClear
                      onClick={handleClear}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </form>
            <button
              className="w-24 sm:w-full sm:py-2 rounded font-bold text-white bg-sky-300"
              type="submit"
              form="routeform"
            >
              Search
            </button>
          </div>
        </div>

        {search ? (
          <div className="flex flex-col gap-12 pt-10 py-32">
            <h1 className="text-center p-2 text-xl font-semibold tracking-wider">
              Relevant Search
            </h1>
            {isLoading? 
                (
                <>
                <Skeleton className='h-32 sm:h-56'/>
                <Skeleton className='h-32 sm:h-56'/>
                </>
                ):(
                <>
                {apiData? (<>
                
            {apiData.length === 0 ? (
              <>
                <>
                  <h1 className="text-xl font-semibold text-center">
                    There're no relevant search, Please try again
                  </h1>
                </>
              </>
            ) : (
              <>
                {apiData?.map((route, index) => {
                  //   const periods = []
                  //   route.periods.filter((time) => {
                  const periods = route.periods.filter((time) => {
                    // console.log(route.date >= formattedDate)
                    if(route.date >= formattedDate){
                        if (formattedDate === currentDate) {
                          const start_time = time.start_time;
                          // Split the start_time and formattedTime into hours and minutes
                          const [startHours, startMinutes] = start_time.split(":");
                          const [formattedHours, formattedMinutes] = formattedTime.split(":");
                          
                          // Convert hours and minutes to total minutes
                          const startTotalMinutes = parseInt(startHours) * 60 + parseInt(startMinutes);
                          const formattedTotalMinutes = parseInt(formattedHours) * 60 + parseInt(formattedMinutes);
                          
                          // Check if start_time is greater than formattedTime + 15 minutes
                          const validPeriod = startTotalMinutes > formattedTotalMinutes +15;
                          // console.log(start_time, formattedTime, validPeriod);
                          // const start_time = time.start_time;
                          // const ValidPeriod = start_time > formattedTime;
                          // console.log(start_time, formattedTime)
                          return validPeriod;
                        } else {
                          return true;
                        }
                    }else{
                        return ''
                    }
                  });

                  if (periods.length === 0) {
                    return (
                      <div className="text-xl font-semibold text-center" key={index}>
                        <p>There're no any available period today!</p>
                      </div>
                    );
                  }

                  return periods.map((period, index) => (
                    <div
                      className="flex sm:flex-col bg-slate-100 p-4 transition-all duration-150 shadow-md rounded peer-checked/ticket:hidden"
                      key={index}
                    >
                      <div className="detail w-3/4 sm:w-full flex justify-between">
                        <div className="from w-3/4 sm:w-full flex flex-col items-center justify-center">
                          <span className="flex items-center gap-2">
                            <span className="flex flex-col items-center justify-center">
                              <MdPersonPinCircle size={30} />
                              <span className="uppercase text-xs font-light">
                                from
                              </span>
                            </span>
                            <h3 className="text-3xl font-bold">
                              {period.start_time}
                            </h3>
                          </span>
                          <p className="text-xl font-medium">
                            {route.start_location}
                          </p>
                          <p className="text-md">
                            {new Date(route.date).toISOString().slice(0, 10)}
                          </p>
                        </div>
                        <div className="icon flex flex-col items-center justify-center">
                          <PiArrowFatRightFill
                            size={30}
                            className="sm:hidden"
                          />
                          <PiArrowFatDownFill
                            size={30}
                            className="hidden sm:block"
                          />
                        </div>
                        <div className="to w-3/4 sm:w-full flex flex-col items-center justify-center">
                          <span className="flex items-center gap-2">
                            <span className="flex flex-col items-center justify-center">
                              <MdLocationPin size={30} />
                              <span className="uppercase text-xs font-light">
                                to
                              </span>
                            </span>
                            <h3 className="text-3xl font-bold">
                              {period.end_time}
                            </h3>
                          </span>
                          <p className="text-xl font-medium">
                            {route.end_location}
                          </p>
                          <p className="text-md">
                            {new Date(route.date).toISOString().slice(0, 10)}
                          </p>
                        </div>
                      </div>
                      <div className="button w-1/4 sm:w-full flex flex-col items-center justify-center gap-1">
                        <p>{period.available_seat - period.reserved_seat} Available</p>
                        <button
                          onClick={() => handleOnClick(route, period, index)}
                          className="px-4 py-1 rounded-full sm:rounded bg-sky-300 text-white sm:order-3 sm:w-full sm:p-2 font-semibold"
                        >
                          {route.fare * passenger}฿
                        </button>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            {passenger} <BsFillPersonFill size={18} />,
                          </span>
                          <span className="flex items-center">
                            {route.fare * passenger}฿/
                            <BsFillPersonFill size={18} />
                          </span>
                        </div>
                      </div>
                    </div>
                  ));
                })}
              </>
            )}
                </>):(<>
                <h1 className="text-center font-semibold ">
                  Database connection error please contact support 
                  <span>
                    <button className="underline text-blue-500 mx-1 font-normal">Click</button>
                  </span> 
                </h1>
                </>)}
                </>)}
          </div>
        ) : null}

        <Hotels />
      </div>
    </>
  );
};

export default Booking;
