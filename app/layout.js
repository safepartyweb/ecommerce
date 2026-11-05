import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContactWidget from "@/components/shared/ContactWidget";
import DataLayer from "@/components/analytics/DataLayer";
import Script from "next/script";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: {
    default: "Safe Party",
    template: "%s | Safe Party",
  },
  description: "Your safest party.",
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
        <Script id="my-custom-script" strategy="beforeInteractive">
          {`
            <script async src="https://www.googletagmanager.com/gtm.js?id=GTM-MSW6PCMP"></script>
            <script>
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            </script> 

          `}
        </Script>
      </head>



      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
        <DataLayer />
        <AuthProvider>
          <ToastContainer />
          <Navbar />
          <main>
            {children}
          </main>
          <Footer />
          <ContactWidget />
        </AuthProvider>
      </body>

    </html>
  );
}