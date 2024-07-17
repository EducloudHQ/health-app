"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCardProps } from "@/types";

interface CardProps {
  cardData: FeatureCardProps;
}

const ImageCard = ({ cardData }: CardProps) => {
  const { title, description, image, url } = cardData;
  return (
    <div className="w-full sm:min-w-[20%] sm:w-[27%] h-[300px] relative rounded-3xl ">
      <div className="w-full h-[25%]"></div>
      <div className="w-full h-[75%] rounded-3xl bg-blue-600">
        <Image src={"/doc.png"} fill alt="First Aide" className="my-auto" />
      </div>
      {/* <div className="w-full bg-blue- border-4 border-white min-h-[250px] flex rounded-3xl">
            <Image
                src={image}
                height={300}
                width={300}
                alt="First Aide"
                content="cover"
                className="my-auto"
            />
        </div> */}

      {/* <div className="flex">
            
        </div> */}
    </div>
  );
};

export default ImageCard;
