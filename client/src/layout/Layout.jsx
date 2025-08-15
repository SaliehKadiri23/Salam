import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <div className='w-full'>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout