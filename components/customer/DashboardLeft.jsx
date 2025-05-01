import React from 'react'
import Link from 'next/link'

const DashboardLeft = () => {
  return (
    // <div className="dashboard_left w-full sm:max-w-[180px] sm:min-w-[180px] md:max-w-[240px] md:min-w-[240px] bg-siteBlack p-2 rounded  md:min-h-[400px] text-xl font-medium flex-1" >
    <div className="dashboard_left  bg-siteBlack p-2 rounded  md:min-h-[400px] text-xl font-medium col-span-6 sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1" >
      <ul className=''>
        <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/dashboard">Dashboard</Link></li>
        <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/dashboard/">History</Link></li>
        <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/dashboard/">Settings</Link></li>
      </ul>
    </div>

  )
}

export default DashboardLeft