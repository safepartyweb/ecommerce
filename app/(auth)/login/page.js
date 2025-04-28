"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import AnimatedBlock from "@/components/shared/MotionParent";


export default function LoginPage() {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("UserInfo from login page", userInfo)
  const router = useRouter();
  let locInfo;
  if (typeof window !== 'undefined') {
    locInfo = localStorage.getItem('userInfo')
  }

  useEffect(() => {
   
    if (userInfo || locInfo ) {
      router.push("/admin");
    }
  }, [userInfo]);


  /*
  useEffect(() => {
    console.log("Use Effect from login page")
    if (userInfo !== undefined && userInfo !== null) {
      router.push("/admin");
    }
  }, [userInfo, router]);

  if (userInfo) {
    return null; // Show nothing while redirecting
  }
*/
  return (
    <section className="sec_login py-6 md:py-10">
      <div className="container max-w-sitemax px-4 mx-auto">
        <div className="login_wrapper max-w-xl mx-auto border border-siteBlack rounded p-4 sm:p-8 md:p-16 flex flex-col items-center justify-center">
          <AnimatedBlock direction="up">
            <h1 className="text-2xl font-bold text-center mb-2">Welcome Back!</h1>
            <p className="text-lg font-medium mb-10 text-center">Please enter your credentials to login.</p>
          </AnimatedBlock>

          <AnimatedBlock direction="up">
            <AuthForm isLogin={true} />
            <p className="register_link mt-6 text-center">
              Don&apos;t have an account?{" "}
              <Link className="text-bold" href="/register">
                Register here.
              </Link>
            </p>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
