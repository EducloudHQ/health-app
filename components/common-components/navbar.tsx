"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import Image from "next/image";
import { getCurrentUser } from "aws-amplify/auth";
import Link from "next/link";
import UserModal from "./UserModal";
const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [user, setUser]: any = useState();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getCurrentAuthenticatedUser();
    // console.log(user)
  }, [user]);

  const getCurrentAuthenticatedUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-full w-full sticky top-5 z-[105]">
      <div className="mx-auto bg-white/40 w-[85%] border bg-white bg-opacity-90  shadow-lg rounded-full">
        <div className="w-full px-8 py-3 bg-transparent">
          <header>
            <nav className="flex justify-between gap-2 md:gap-2 text-black">
              <div className="flex items-center">
                <Image
                  src="amplify.svg"
                  alt="logo"
                  width={30}
                  height={10}
                  className=""
                />
              </div>
              <div
                className={`md:relative z-20 max-md:mt-14 bg-transparent md:bg-transparent md:z-0 duration-1000 md:min-h-fit md:w-auto absolute top-[10%] left-0 w-full flex items-center px-8 ${
                  menu ? " block" : "hidden md:block"
                }`}
              >
                <ul className="flex max-md:bg-blue-100 max-md:rounded-md max-md:p-5 md:flex-row flex-col md:items-center gap-5 w-full md:w-fit">
                  <li>
                    <Link href={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link href={"/pharmacy"}>Pharmacies</Link>
                  </li>
                  <li>
                    <Link href={"/shop"}>Shop</Link>
                  </li>
                  {/* <li>
                    <Link href={"/question-response"}>Chat with AI</Link>
                  </li> */}
                  <li className="md:hidden flex flex-row flex-wrap items-center md:justify-center gap-2 w-full pb-5">
                    <Link
                      href="/signin"
                      className="border border-blue-500 text-blue-500 px-4 text-center max-w-24 text-[12px] py-1 rounded-full whitespace-nowrap w-[35%]"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/signup"
                      className="border border-blue-500 text-blue-500 px-4 text-center max-w-24 text-[12px] py-1 rounded-full whitespace-nowrap w-[35%]"
                    >
                      Sign Up
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex gap-4">
                {user ? (
                  <div className="text-blue-600">
                    <svg
                      onClick={() => {
                        setShowModal(!showModal);
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="gap-4 hidden md:flex">
                    <Link
                      href="/signin"
                      className="border border-blue-500 text-blue-500 px-4 text-[12px] py-1 rounded-full whitespace-nowrap"
                    >
                      Sign In
                    </Link>
                    {/* <Link
                      href="/signup"
                      className="bg-blue-500 text-white px-4 text-[12px] py-1 rounded-full whitespace-nowrap"
                    >
                      Sign Up
                    </Link> */}
                  </div>
                )}

                <div className="md:hidden flex items-center duration-500">
                  <div
                    onClick={() => {
                      setMenu(!menu);
                    }}
                  >
                    {menu ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4 18q-.425 0-.712-.288T3 17q0-.425.288-.712T4 16h16q.425 0 .713.288T21 17q0 .425-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12q0-.425.288-.712T4 11h16q.425 0 .713.288T21 12q0 .425-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7q0-.425.288-.712T4 6h16q.425 0 .713.288T21 7q0 .425-.288.713T20 8z"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </nav>
          </header>

          <div className={showModal ? "block" : "hidden"}>
            <UserModal
              cardData={{
                email: user?.signInDetails.loginId,
                image: "imageurl",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
