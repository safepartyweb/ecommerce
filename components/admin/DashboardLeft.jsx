import React from 'react'
import Link from 'next/link'

const DashboardLeft = () => {
  return (
    <div className="dashboard_left w-full sm:max-w-[180px] md:max-w-[240px] bg-siteBlack p-2 rounded  md:min-h-[400px] text-xl font-medium" >
      <ul className=''>
        <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin">Dashboard</Link></li>
        <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin/products">Products</Link></li>
        <li className='border-b border-gray-500 py-2 px-2  text-white font-medium'><Link href="/admin/orders">Orders</Link></li>
        <li className='py-1 px-2  text-white font-medium'><Link href="/admin/users/">Users</Link></li>
      </ul>
    </div>

  )
}

export default DashboardLeft