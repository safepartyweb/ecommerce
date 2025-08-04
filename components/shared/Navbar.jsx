'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useLogOutMutation } from '@/lib/api/authApi';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowDown from '../../images/arrow_down.png';
import { logout } from '@/store/authSlice';
import { setCredentials } from '@/store/authSlice';

export default function Navbar() {

  const { userInfo } = useSelector((state) => state.auth);
  const {cartItems} = useSelector((state) => state.cart);
  const [logOut] = useLogOutMutation();
  console.log("userInfo from navbar state", userInfo)
  // console.log("cartItemscart", cartItems)
  const cartCount = cartItems.reduce((prev,cur) => prev + cur.quantity,0);
  const cartTotal = cartItems.reduce((prev,cur) => prev + (cur.quantity * cur.price),0);
  // console.log("cartCount",cartCount)
  // console.log("cartTotal",cartTotal)

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);  // State to check if it's client side
  const dispatch = useDispatch()
  const [showProfile, setShowProfile] = useState(false)


  const handleLogout = async () => {
    try {
      dispatch(logout())
      const logOutHandler = await logOut();
      // console.log("logOutHandler", logOutHandler)
      if(userInfo.role == 'customer'){
         window.location.href = '/login'
      }else if(userInfo.role == 'affiliate'){
        window.location.href = '/affiliate/login'
      }else{
        window.location.href = '/admin-login'
      }
      
     
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    setIsClient(true);  // Ensures the component renders only on the client side
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
        when: 'beforeChildren',
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo');
      if (userInfo) {
        dispatch(setCredentials(JSON.parse(userInfo)));
      }
    }
  }, [dispatch]);

  if (!isClient) {
    return null; // Prevent rendering before the component has been hydrated
  }

  return (
    <>
      <div className="top_bar flex justify-center px-4 py-2 bg-gray-300 text-sm font-medium">Free Shipping | 10% Off First Order</div>
      <header className=' border-gray-500 py-4 relative z-[40]'>
        <div className='container max-w-sitemax px-4 mx-auto'>
          <div className='header_wrapper flex justify-between items-center text-siteBlack relative'>
            <div className="header_left flex gap-10 items-center">
              
              <Link href='/'>
                <Image
                  src='/images/logo-4-8-final.png'
                  alt='Logo image'
                  width={80}
                  height={90}
                />
              </Link>


              
              {/* Desktop Nav */}
              <nav
                className={`text-xl font-medium main_menu list-none hidden lg:flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 transition-all duration-300 bg-white md:bg-transparent absolute md:static top-full md:top-auto left-0 w-full md:w-auto p-6 md:p-0 shadow-md md:shadow-none z-20`}
              >
                {/* <li>
                  <Link href='/'>Home</Link>
                </li> */}
                <li>
                  <Link href='/shop'>Shop</Link>
                </li>

                <li>
                  <Link href='/reviews'>Reviews</Link>
                </li>
                <li className='relative has_children group'>
                  <div className="flex gap-1 items-center">
                    Support
                    <Image className='mt-1.5' src="/images/arrow_down.svg" alt="Down arrow" width={18} height={18} />
                  </div>
                  
                  {/* <ul className="dropdown absolute -left-[25px]  w-[140px] flex flex-col gap-4 bg-siteBlack text-white z-[50] p-4 invisible group-hover:visible transition-all duration-300 top-[20px] group-hover:top-full "> */}
                  <ul className="absolute -left-[25px] w-[140px] flex flex-col gap-4 bg-siteBlack text-white z-[50] p-4 opacity-0 pointer-events-none translate-y-2 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                    <li className='text-center'><Link className='text-center w-full' href='/contact'>Contact</Link></li>
                    <li className='text-center'><Link className='text-center w-full' href='/faq'>FAQ</Link></li>
                    {/* <li className='text-center'><Link className='text-center w-full' href='/contact'>Contact</Link></li> */}
                  </ul>
                  
                </li>

              </nav>
              {/* End Desktop Nav */}

              {/* Mobile Nav */}
              <nav

                className={`mobile_nav flex flex-col text-xl font-medium main_menu list-none lg:hidden items-start gap-6 md:gap-4 transition-all duration-300 bg-siteSecondBlack text-white absolute left-0 w-full shadow-md md:shadow-none z-20 p-6 ${
                  isMobileMenuOpen 
                    ? 'opacity-100 visible top-full' 
                    : 'opacity-0 invisible top-[50px] pointer-events-none'
                }`}
              >
                <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <Link href='/'>Home</Link>
                </li>

                <li  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className='cursor-pointer list-none relative flex gap-[2px] items-center has_children'
                >
                  <Link href='/shop'>Shop</Link>
                </li>

                <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
                  <Link href='/about'>About</Link>
                </li>
                <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
                  <Link href='/contact'>Contact</Link>
                </li>

                {userInfo ? (
                  <>
                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
                      <Link href='/dashboard'>Dashboard</Link>
                    </li>
                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
                      <button className='cursor-pointer' onClick={handleLogout}>Logout</button>
                    </li>
                  </>
                ) : (
                  <>
                    <li onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
                      <Link href='/login'>Login</Link>
                    </li>
                  </>
                )}

              </nav>
              {/* End Mobile Nav */}
            </div>




            
            <div className="flex">
              { ( userInfo?.role !== 'admin') &&  
                <Link href="/cart">
                  <div className='header_right cart_wrap flex items-center gap-2 cursor-pointer z-10'>
                    <p className='cart_amount font-bold text-xl'>
                      $<span>{cartTotal}</span>
                    </p>
                    <div className='cart_icon_wrap relative'>
                      <Image
                        className='mb-[7px]'
                        src='/images/Cart.svg'
                        alt='Cart Image'
                        width={32}
                        height={32}
                      />
                      <p className='quantity absolute text-sm -top-6 -right-3 font-semibold bg-siteBlack rounded-full p-1 text-white w-8 h-8 flex items-center justify-center'>
                        {cartCount}
                      </p>
                    </div>

                    
                  </div>
                </Link>
              }
              <div onMouseEnter={() => setShowProfile(true)} onMouseLeave={() => {setShowProfile(false)}} className="profile cursor-pointer pl-4 hidden lg:block">
                <Image  src="/images/user.svg" alt='profile' width={36} height={36} />
                
                
                  <div className={`dropdown absolute min-w-[150px]  h-auto right-0 bg-siteBlack text-white rounded transition-all duration-300 ${showProfile ? 'opacity-100 visible top-[65%]' 
                  : 'opacity-0 invisible top-[50px] pointer-events-none'}`}>
                    <ul>
                    {userInfo ? (
                    <>
                      { ( userInfo?.role == 'customer') &&
                        <li onClick={() => {setShowProfile(false)}} className='px-4 py-2 border-b border-white text-center font-medium' >
                          <Link href='/dashboard'>Dashboard</Link>
                        </li>
                      }
                      { ( userInfo?.role == 'affiliate') &&
                        <li onClick={() => {setShowProfile(false)}} className='px-4 py-2 border-b border-white text-center font-medium' >
                          <Link href='/affiliate/dashboard'>Dashboard</Link>
                        </li>
                      }

                      { ( userInfo?.role == 'admin') &&
                        <li onClick={() => {setShowProfile(false)}} className='px-4 py-2 border-b border-white text-center font-medium' >
                          <Link href='/admin'>Dashboard</Link>
                        </li>
                      }
                      <li onClick={() => {setShowProfile(false)}} className='px-4 py-2 border-b border-white text-center font-medium'>
                        <button className='cursor-pointer' onClick={handleLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li onClick={() => {setShowProfile(false)}} className='px-4 py-2 border-b border-white text-center font-medium'>
                        <Link href='/login'>Login</Link>
                      </li>
                    </>
                    )}
                    </ul>
                  </div>
                
                
              </div>

            </div>




            {/* Mobile Toggle */}

            <div className='cursor-pointer z-30 lg:hidden' 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} >
              <Image
                src='/images/menu.svg'
                alt='menu'
                width={46}
                height={46}
                className={`${isMobileMenuOpen ? 'hidden' : 'block'}`}
              />
              <Image
                src='/images/close-x.svg'
                alt='menu'
                width={46}
                height={46}
                className={`${isMobileMenuOpen ? 'block' : 'hidden'}`}
              />
            </div>

            
            
          </div>
        </div>
      </header>
    </>
  );
}
