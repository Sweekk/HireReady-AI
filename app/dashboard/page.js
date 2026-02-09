import React from 'react'
import Navbar from '../../components/Navbar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function DashboardPage() {
  // const { user } = useContext(AuthContext)

  return (
    <div>
      <Navbar />
      <main style={{ padding: 16 }}>
        <h1>Dashboard</h1>
        <p>Welcome {user ? user.email : 'guest'}.</p>
      </main>
    </div>
  )
}
