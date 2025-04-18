'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '@/lib/api/authApi';
import Image from 'next/image';
import ArrowDown from '../images/arrow_down.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleDropdown = () => {
    if (isMobile) setIsOpen(!isOpen);
  };

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

  return (
    <header className='py-6'>
      <div className='container max-w-sitemax px-4 mx-auto'>
        <div className='header_wrapper flex justify-between items-center text-siteBlack relative'>
          <a href='/'>
            <Image
              src='/images/logo_lotus.png'
              alt='Logo image'
              width={100}
              height={120}
            />
          </a>

          {/* Mobile Toggle */}
          {isMobile && (
            <div
              className='cursor-pointer z-30'
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Image
                src='/icons/menu.svg' // Update this to your menu icon
                alt='menu'
                width={30}
                height={30}
              />
            </div>
          )}

          <nav
            className={`text-xl font-medium main_menu list-none flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-4 transition-all duration-300 bg-white md:bg-transparent absolute md:static top-full md:top-auto left-0 w-full md:w-auto p-6 md:p-0 shadow-md md:shadow-none z-20 ${
              isMobile ? (isMobileMenuOpen ? 'block' : 'hidden') : 'flex'
            }`}
          >
            <li>
              <Link href='/'>Home</Link>
            </li>

            <li
              className='cursor-pointer list-none relative flex gap-[2px] items-center has_children'
              onMouseEnter={() => !isMobile && setIsOpen(true)}
              onMouseLeave={() => !isMobile && setIsOpen(false)}
              onClick={toggleDropdown}
            >
              <span className='flex gap-[2px] items-center'>
                Shop
                <Image src={ArrowDown} width={16} height={16} alt='arrow down' />
              </span>
              
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className='submenu_wrap absolute left-0 pt-4 z-20 top-full'
                    variants={menuVariants}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                  >
                    <ul className='sub_menu bg-gray-300 min-w-[200px] px-4 py-2 rounded shadow-lg'>
                      <li>
                        <Link href='#'>Product 1</Link>
                      </li>
                      <li>
                        <Link href='#'>Product 2</Link>
                      </li>
                      <li>
                        <Link href='#'>Product 3</Link>
                      </li>
                      <li>
                        <Link href='#'>Product 4</Link>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {user ? (
              <>
                <li>
                  <Link href='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href='/login'>Login</Link>
                </li>
                <li>
                  <Link href='/register'>Register</Link>
                </li>
                <li>
                  <Link href='/dashboard'>Dashboard</Link>
                </li>
              </>
            )}
          </nav>

          <div className='header_right cart_wrap flex items-center gap-2 cursor-pointer z-10'>
            <p className='cart_amount font-bold text-xl'>
              $<span>100.00</span>
            </p>
            <div className='cart_icon_wrap relative'>
              <Image
                className='mb-[7px]'
                src='/images/Cart.svg'
                alt='Cart Image'
                width={32}
                height={32}
              />
              <p className='quantity absolute text-sm -top-6 -right-3 font-semibold bg-siteBlack rounded-full p-1 text-white'>
                10
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
