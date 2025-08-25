import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import { Outlet } from 'react-router'
import ScrollController from '../components/ScrollController/ScrollController'

const Layout = () => {
  return (
    <div className='w-full'>
      <ScrollController/>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout