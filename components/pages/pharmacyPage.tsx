"use client";

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common-components/navbar";
import Link from "next/link";
import FeatureCard from "@/components/featurCard";
import Footer from "@/components/footer";
import { FormEvent, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import CardTwo from "../cardTwo";
import ImageCard from "../imageCard";
import Script from "next/script";

export default function PharmacyPage() {
  const client = generateClient<Schema>();
  const router = useRouter();
  const [filter, setFilter] = useState(false);
  const [lng, setLng] = useState(0);
  const [isLoading, setIsLoaing] = useState(true)
  const [pharmacies, setPharmacies]: any = useState([]);
  const [nearPharms, setNearPharms]: any = useState([]);

  const [location, setLocation]: any = useState();
  const [error, setError]: any = useState();
  const bucketName = "https://amplify-d2yrv03l6hwvow-ma-amplifyteamdrivebucket28-ts944jk2zo40.s3.amazonaws.com/pictures"
  

  useEffect(() => {
    getAllPharmacies();
  }, []);
  const getAllPharmacies = async () => {

  console.log(process.env.NEXT_AWS_ACCESS_KEY)
  console.log(process.env.NEXT_AWS_SECCRET_KEY)
  console.log(process.env.NEXT_INDEX_NAME)
    setIsLoaing(true)
    let latitude, longitude
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
           latitude = position.coords.latitude;
           longitude = position.coords.longitude;
          console.log(position)
          try {
            const response = await fetch(`/api?longitude=${longitude}&latitude=${latitude}`);
              const data = await response.json();
              console.log("Map Data>>>",data)
            setPharmacies(data.Results)
            setIsLoaing(false)
          } catch (err) {
            console.log(err);
            setIsLoaing(false)
          }
          setLocation({ latitude, longitude });
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
    
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/signin");
  };

  return (
    <>
      <NavBar />
      <div className="-mt-14 pt-4">
        <div className="h-full w-full">
          <div className="">
            <div className="px-4 my-auto flex w-full h-[65vh] md:h-[70vh] -mt-4 bg-blue-100/40">
              <div className="mt-32 md:mt-40 mx-auto  text-center">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold my-3 md:my-6 px-2">
                    Discover Top Rated Pharmacies Near You
                  </h2>
                  <p className="leading-6">
                    Lorem ipsum, dolor sit amet consectetur adip
                  </p>
                  <p className="leading-6">
                    Lorem ipsum, dolor sit amet consec
                  </p>
                </div>
                <div className="w-full flex mt-16 md:mt-24 justify-center">
                  <div className="animate-bounce bg-white dark:bg-slate-800 p-2 w-10 h-10 ring-1 ring-slate-900/5 dark:ring-slate-200/20 shadow-lg rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-500"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-10 bg-gradient-to-b from-blue-100/10 to-white"></div>
            <section className="pb-10 md:pb-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-manrope font-bold text-2xl md:text-4xl text-black  mb-10 md:mb-14 max-lg:text-center">
                  Nearby Phamacies
                </h2>

                {isLoading?
                  <div className="flex items-center justify-center w-[100%] text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24"><g><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".14"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".29" transform="rotate(30 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".43" transform="rotate(60 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".57" transform="rotate(90 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".71" transform="rotate(120 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" opacity=".86" transform="rotate(150 12 12)"/><rect width="2" height="5" x="11" y="1" fill="currentColor" transform="rotate(180 12 12)"/><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"/></g></svg>
                  </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  
                    {pharmacies?.length>0?pharmacies.map((pharmacy: any)=><div
                    
                    className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                      src={`/pharm.webp`}
                        alt=" image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="items-center">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          {pharmacy.Place.Label}
                        </h6>
                        <p><span className="text-sm text-gray-300">Country: {pharmacy.Places?.Country}</span></p><p><span className="text-sm text-gray-300">Municipality: {pharmacy.Places?.Municipality}</span></p>
                        <p><span className="text-sm text-gray-500">Distance from your current location: {Math.round((pharmacy.Distance/1000)*10)/10}km</span></p>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        {pharmacy.description}
                      </p>
                    </div>
                  </div>): <div>Ooops no near by pharmacies</div>
                  }

                </div>}
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
