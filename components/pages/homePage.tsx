"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import FeatureCard from "@/components/featurCard";
import { useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import Card from "../card";
import Navbar from "../common-components/navbar";
import Footer from "../footer";

function PartnersCarousel() {
  const carouselProducts = [
    {
      handle: "did",
      url: "https",
      img: "/facebook.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/disney.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/quora.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/samsung.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/spark.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/sass.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/apple.svg",
    },
    {
      handle: "did",
      url: "https",
      img: "/airbnb.svg",
    },
  ];
  const items = [0, 1];
  return (
    <div className="w-full scrollbar-hide py-7 md:py-10 overflow-x-auto inline-flex flex-nowrap px-5 gap-28 md:gap-40">
      {items.map((item) => (
        <ul
          key={item}
          className="flex items-center overflow-hidden animate-infinite-scroll justify-center md:justify-start  [&_img]:max-w-none gap-16 md:gap-52"
        >
          {carouselProducts.map((product, i) => (
            <li key={product.url}>
              <Link href={product.url}>
                <img src={product.img} />
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default function HomePage() {
  const client = generateClient<Schema>();
  const router = useRouter();

  // const userInput = "Book hotel";

  // Provide a bot name and user input
  // const response = async()=>{
  //    const res =  await Interactions.send({
  //         botName: "HotelBooking",
  //         message: userInput
  //     });

  //     console.log(res.message)
  // }

  // Log chatbot response
  // console.log(response.message);
  useEffect(() => {
    list();
    // response()
    // if(!localStorage.getItem('user')){
    //     router.replace('/signin')
    // }
  });
  const list = async () => {
    try {
      const res = await client.models.Pharmacy.list();
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-blue-100/40 -mt-14 overflow-hidden ">
        <div className="h-full w-full">
          <div className="h-full">
            <div className=" px-4 my-auto flex w-full">
              <div className="mt-[7.5rem] md:mt-40 mb-16 mx-auto  text-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold my-3 md:my-6 px-2">
                    Your Health is Our Greatest Priority
                  </h2>
                  <p className="leading-6">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Consequatur
                  </p>
                  <p className="leading-6">
                    Lorem ipsum, dolor sit amet consec
                  </p>
                </div>

                <div className="mt-6">
                  <div className="flex justify-center ">
                    <Link
                      href="/pharmacy"
                      className="text-white flex border-[3px] border-white items-center  bg-black shadow-xl rounded-full px-10 py-2.5"
                    >
                      <span>Explore more</span>
                      {"  "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 24 24"
                        className="pl-1 pt-1"
                      >
                        <path
                          fill="currentColor"
                          d="m13.692 17.308l-.707-.72l4.088-4.088H5v-1h12.073l-4.088-4.088l.707-.72L19 12z"
                        />
                      </svg>
                    </Link>
                  </div>
                  <div className="flex pt-4 justify-center ">
                    <div className="flex -space-x-4 rtl:space-x-reverse">
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                        src="https://www.flowbite.com/docs/images/people/profile-picture-5.jpg"
                        alt=""
                      />
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                        src="https://www.flowbite.com/docs/images/people/profile-picture-2.jpg"
                        alt=""
                      />
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                        src="https://www.flowbite.com/docs/images/people/profile-picture-3.jpg"
                        alt=""
                      />
                      <img
                        className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                        src="https://www.flowbite.com/docs/images/people/profile-picture-4.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="text-center pt-1">
                    <p>Join 1k+ doctors today</p>
                  </div>
                </div>
              </div>
            </div>
            <PartnersCarousel />
            <div className="h-10 bg-gradient-to-b from-blue-100/10 to-white"></div>
            <div className="w-screen bg-white pt-6">
              <div className="flex">
                <div className="mx-auto">
                  <h1 className="text-2xl md:text-4xl font-bold mb-2.5 md:mb-3">
                    Our Features
                  </h1>
                  <div className="flex justify-center w-full">
                    <div className="flex gap-1">
                      <div className="w-3 h-1 bg-blue-500 rounded-full"></div>
                      <div className="w-3 h-1 bg-blue-500 rounded-full"></div>
                      <div className="w-14 md:w-16 h-1 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 pb-20 md:px-24  h-fit pt-14 flex flex-wrap justify-center gap-8">
                <FeatureCard
                  cardData={{
                    title: "Pharmacies",
                    description:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
                    url: "",
                    image: "/pharm.png",
                  }}
                />
                <FeatureCard
                  cardData={{
                    title: "Basic First Aide",
                    description:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
                    url: "",
                    image: "/first-aide.png",
                  }}
                />
                <FeatureCard
                  cardData={{
                    title: "Basic First Aide",
                    description:
                      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
                    url: "",
                    image: "/first-aide.png",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
