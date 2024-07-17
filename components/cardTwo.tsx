"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCardProps } from "@/types";

interface CardProps {
  cardData: FeatureCardProps;
}

const CardTwo = ({ cardData }: CardProps) => {
  // console.log(cardData)
  const { title, description, image, url } = cardData;
  return (
    <div className=" w-full sm:min-w-[50%] sm:w-[70%] border-white rounded-3xl relative top-0">
      <div className="flex">
        <div className="bg-white h-[150px] rounded-tl-lg rounded-br-3xl w-[40%] border-8 border-white absolute flex px">
          <div className="mt-auto shadow shadow-md w-full rounded-full h-[70px] flex px-1 gap-2">
            <div className="w-full h-[60px] sm:w-[60px] relative border-2 border-blue-600 bg-white rounded-full my-auto">
              <Image
                src={"/doc2.jpeg"}
                fill
                alt="First Aide"
                content="cover"
                className="my-auto rounded-full"
              />
            </div>
            <div className="w-[70%] flex">
              <div className="my-auto">
                <p>Explore our expertise</p>
                <p className="text-[12px]">Explore our expertise</p>

                <p> More Coming</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="h-[50px] w-[2px] bg-white rounded-full absolute right-[50%]"> </div> */}
      </div>
      <div className="w-full bg-blue-600 border-4 border-white min-h-[300px] flex rounded-3xl">
        <Image
          src={image}
          height={300}
          width={300}
          alt="First Aide"
          content="cover"
          className="my-auto"
        />
      </div>
      {/* <div className="px-3">
          <h1 className="font-bold text-lg py-4">{title}</h1>
          <p className="pb-10 text-gray-500"></p>
        </div> */}
      <div className="flex">
        {/* <div className="h-[50px] w-[4px] bg-white rounded-full absolute left-[49.5%] bottom-0.5"> </div> */}
        {/* <div className="bg-red-300 h-[60px] rounded-br-lg rounded-tl-lg w-[50%] border-4 border-white absolute bottom-0 right-0">
                <p className="text-black">Hello</p>
            </div> */}

        {/* <div className="bg-red-300 h-[60px] rounded-lg w-[50%] absolute bottom-0 right-0">
                <p className="text-black">Hello</p>
            </div> */}
        {/* <div className='mt-20'>
                                <Link href=''  className='text-white bg-black shadow shadow-lg border rounded-full px-8 py-3'>Get Started</Link>
                            </div> */}
        {/* <button className="flex -mt-10 mb-5 mx-auto py-1 justify-center shadow shadow-lg rounded-full w-[50%] ">
            <p className="my-auto">Continue</p>
            <svg className="my-auto" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" d="M11.05 12L7.175 6.575q-.35-.5-.087-1.037T7.975 5q.25 0 .475.113t.35.312L13.5 12l-4.7 6.575q-.125.2-.35.313T7.975 19q-.6 0-.875-.537t.075-1.038zM17 12l-3.875-5.425q-.35-.5-.088-1.037T13.926 5q.25 0 .475.113t.35.312L19.45 12l-4.7 6.575q-.125.2-.35.313t-.475.112q-.6 0-.875-.537t.075-1.038z"/></svg>
          </button> */}
      </div>
    </div>
  );
};

export default CardTwo;
