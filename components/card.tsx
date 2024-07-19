
"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCardProps } from "@/types";

interface CardProps {
  cardData: FeatureCardProps;
}

const Card = ({ cardData }: CardProps) => {
  const { title, description, image, url } = cardData;
  return (
    <div className=" min-w-[30%] w-[70px] shadow shadow-lg rounded-lg border-white rounded-b-xl relative top-0">
      <div className="flex">
        <div className="bg-red-300 h-[60px] rounded-tl-lg rounded-br-lg w-[50%] border-4 border-white absolute">
          <p className="text-black">Hello</p>
        </div>
      </div>
      <div className="w-full bg-blue-500 border-4 border-white min-h-[300px] flex rounded-lg">
        <Image
          src={image}
          height={300}
          width={300}
          alt="First Aide"
          content="cover"
          className="my-auto"
        />
      </div>
      <div className="flex">
         <div className="bg-red-300 h-[60px] rounded-br-lg rounded-tl-lg w-[50%] border-4 border-white absolute bottom-0 right-0">
          <p className="text-black">Hello</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
