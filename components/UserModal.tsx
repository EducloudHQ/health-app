"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FeatureCardProps } from "@/types";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

interface CardProps {
  cardData: {
    email: string;
    image: string;
  };
}

export default function UserModal({ cardData }: CardProps) {
  const { email, image } = cardData;
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.replace("/signin");
  };

  return (
    <div className="min-w-[200px] absolute right-8 bg- min-h-[100px] px-4 py-8 shadow shadow-2xl">
      <div className="h-[150px] w-full bg-blue-600 rounded-lg relative">
        <Image src={"/doc.png"} fill alt="First Aide" />
        <div className="absolute bottom-0 bg-black/40 py-2 w-full rounded-b-lg">
          <p className="text-white text-center text-[12px] mx-[3px]">{email}</p>
        </div>
      </div>

      <div className="flex">
        {/* <div className="h-[50px] w-[4px] bg-white rounded-full absolute left-[49.5%] bottom-0.5"> </div> */}
      </div>

      <div className="mt-8">
        <button
          onClick={handleSignOut}
          className="text-white bg-blue-700 shadow shadow-lg  rounded-full px-5 py-1"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
