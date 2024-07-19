
"use client";

import React from "react";
import Image from "next/image";
import { FeatureCardProps } from "@/types";

interface CardProps {
  cardData: FeatureCardProps;
}

const CardTwo = ({ cardData }: CardProps) => {
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
      <div className="flex">
      </div>
    </div>
  );
};

export default CardTwo;
