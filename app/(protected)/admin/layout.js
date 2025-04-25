'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserBootstrap from '@/hooks/useUserBootstrap';
import Loader from '@/components/Loader';
import Link from 'next/link';
import DashboardLeft from '@/components/admin/DashboardLeft';

export default function DashboardLayout({children}) {
  const { loading } = useUserBootstrap();
  const { user } = useSelector((state) => state.auth);
  


  useEffect(() => {


    if (!user) {
      // redirect('/login');
    }
    if(user){
    }
  }, [user]);

  if (!user) {
    return <Loader />; // or loading spinner
  }

  if (loading) return <Loader />;
  
  return (
    
    <section className="sec_admin ">
      <div className="container max-w-sitemax px-4 pl-0 mx-auto ">
        <div className="dashboard_wrapper flex gap-10 justify-between">
          
          <DashboardLeft />

          <div className="dashboard_right w-full py-6 md:py-10">
            {children}
          </div>

        </div>
        
      </div>
    </section>


  );
}