"use client";

import React from "react";
import Image from "next/image";
const Footer = () => {
  return (
    <footer className="shadow bg-blue-100 border-gray-100 dark:bg-gray-900 mt-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Image
              src="amplify.svg"
              alt="logo"
              width={30}
              height={10}
              classNameName=""
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Health info
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Pharmacies
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Chat with AI
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-white sm:mx-auto  lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          {new Date().getFullYear()}{" "}
          <a href="/" className="hover:underline">
            Health info
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
