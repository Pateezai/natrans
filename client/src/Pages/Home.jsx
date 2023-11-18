import React from 'react'
import Navbar from '../components/Navbar/Navbar'
// import Booking from '../modules/Booking/Booking'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
// import Hotels from '../components/etc/Hotels'

const Home = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Home