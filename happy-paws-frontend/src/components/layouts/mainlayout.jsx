import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../navbar"
import Footer from "../footer"

export default function MainLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

