"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 mt-5 border-t bg-blue-100 border-gray-100">
      <div
        className="flex max-md:flex-col flex-wrap
           justify-between gap-5 px-6 py-10 sm:px-16"
      >
        <div className="flex flex-col justify-start items-start gap-6">
          <Image
            src="amplify.svg"
            alt="logo"
            width={30}
            height={10}
            className="object-contain"
          />
          <p className="text-base text-gray-700">
            HIS 2024 <br /> All rights reserved &copy;
          </p>
        </div>
      </div>

      <div className="flex items-center flex-wrap mt-10 border-t border-gray-100 justify-between sm:px-16 px-6 py-10">
        <p>@2023 HIS All rights reserved</p>
        <div className="footer__copyrights-link">
          <Link href="/" className="text-gray-500">
            Privacy Policy
          </Link>
          <Link href="/home" className="text-gray-500">
            Terms of use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
