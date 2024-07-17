"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCardProps } from "@/types";

interface CardProps {
  cardData: FeatureCardProps;
}

const FeatureCard = ({ cardData }: CardProps) => {
  // console.log(cardData)
  const { title, description, image, url } = cardData;
  return (
    <div className="min-w-[25%] hover:cursor-pointer w-[280px] mx-h-[400px] h-[400px]  shadow shadow-lg rounded-b-xl group relative">
      <div className="w-full h-[25%] bg-blue-200 rounded-t-xl overflow-hidden">
        <Image src={image} height={300} width={300} alt="" content="cover" />
      </div>
      <div className="px-3">
        <h1 className="font-bold text-lg py-4">{title}</h1>
        <p className="pb-10 text-gray-500">{description}</p>
      </div>
      <div className="hidden group-hover:flex w-full overflow-hidden rounded-xl z-50 absolute top-0 bg-white shadow shadow-xl">
        <div>
          <div className="h-">
            <Image src={image} height={500} width={500} alt="" />
          </div>
          <div className="px-4 text-black">
            <h1 className="font-bold text-lg py-4">{title}</h1>
            <p className="pb-10 text-gray-500">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
