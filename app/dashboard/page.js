import React from 'react'

import { useContext } from 'react'
//import { AuthContext } from '../../context/AuthContext'
import Navbar_imp from './Navbar/page';
import HeroSection from './hero section/page';

export default function DashboardPage() {
  //const { user } = useContext(AuthContext)

  return (
    <div>
      <Navbar_imp/>
      <HeroSection/>
    </div>
  )
}
