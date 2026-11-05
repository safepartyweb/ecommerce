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
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MSW6PCMP');
          `}
        </Script>
      </head>



      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased scroll-smooth`}
      >
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MSW6PCMP"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>



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