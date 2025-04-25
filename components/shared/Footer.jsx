import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Bitcoin from '../../images/coins/bitcoin.png'
import Eth from '../../images/coins/ethlogo.png'
import Litecoin from '../../images/coins/litecoin.png'
import Transfer from '../../images/coins/transfer.png'
import AnimatedBlock from './MotionParent'


const Footer = () => {
  return (
    <AnimatedBlock className='' direction="up">
      <section className='sec_footer py-6 md:py-10 md:pb-0'>
            <div className='container max-w-sitemax px-8 mx-auto border-t bg-siteBlack text-white border-siteBlack py-10 rounded'>
              <div className="footer_wrap flex flex-col lg:flex-row gap-16 lg:gap-10 justify-center">
                
                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">Accepted Payments</p>
                  <div className="payment_icons_wrap flex gap-6 flex-col ">
                    <Image className='max-w-[120px]' src={Bitcoin} alt="payment logo" width={320} height={100} />
                    <Image className='max-w-[120px]' src={Eth} alt="payment logo" width={320} height={100} />
                    <Image className='max-w-[120px]' src={Litecoin} alt="payment logo" width={320} height={100} />
                    <Image className='max-w-[120px]' src={Transfer} alt="payment logo" width={320} height={100} />
                  </div>
                </div>

                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">How to pay</p>
                  <ul className='footer_list flex flex-col gap-4'>
                    <li><Link className='text-xl font-medium' href="#">Payment Tutorial</Link> </li>
                    <li><Link className='text-xl font-medium' href="#">Contact Us</Link> </li>
                  </ul>
                </div>

                <div className="footer_column w-full">
                  <Image src='/images/logo_lotus.png' alt="logo" width={150} height={200} />
                </div>

                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">Useful links</p>
                  <ul className='footer_list flex flex-col gap-4'>
                    <li><Link className='text-xl font-medium' href="#">Payment Tutorial</Link> </li>
                    <li><Link className='text-xl font-medium' href="#">Contact Us</Link> </li>
                  </ul>
                </div>

                <div className="footer_column w-full">
                  <p className="text-2xl font-bold mb-6">Members area</p>
                  <ul className='footer_list flex flex-col gap-4'>
                    <li><Link className='text-xl font-medium' href="#">Payment Tutorial</Link> </li>
                    <li><Link className='text-xl font-medium' href="#">Contact Us</Link> </li>
                  </ul>
                </div>


              </div>
              
            </div>
      </section>
    </AnimatedBlock>
    
  )
}

export default Footer