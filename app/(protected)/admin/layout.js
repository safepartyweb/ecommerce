'use client';

import { useSelector } from 'react-redux';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import useUserBootstrap from '@/hooks/useUserBootstrap';
import Loader from '@/components/Loader';
import Link from 'next/link';
import DashboardLeft from '@/components/admin/DashboardLeft';
import AnimatedBlock from '@/components/shared/MotionParent';




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
      <div className="container max-w-sitemax px-4 mx-auto  ">
        <div className="dashboard_wrapper grid grid-cols-6 gap-6 md:gap-10 justify-between flex-col sm:flex-row">
          <AnimatedBlock direction="left">
            <DashboardLeft />
          </AnimatedBlock>
          

          <div className="dashboard_right py-6 md:py-10 px-4 col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-5">
            <AnimatedBlock direction="right">{children}</AnimatedBlock>
            
          </div>

        </div>
        
      </div>
    </section>


  );
}