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
  const [pharmacies, setPharmacies]: any = useState([]);
  const [nearPharms, setNearPharms]: any = useState([]);

  useEffect(() => {
    getAllPharmacies();
  }, []);
  const getAllPharmacies = async () => {
    try {
      const pharms = await client.models.Pharmacy.list();
      console.log(pharms.data)
      setPharmacies(pharms.data)
    } catch (err) {
      console.log(err);
    }
  };

  // const filterNearPharmacies = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setFilter(true);
  //   const formData = new FormData(event.currentTarget);
  //   console.log(formData);
  //   const lt = parseFloat(formData.get("lt")?.toString()!);
  //   const lg = parseFloat(formData.get("lg")?.toString()!);
  //   console.log("filtering>>>", lt, lg);
  //   // 4.171662, 9.285218    4.159330, 9.276489    4.161479, 9.292015  result 0.002149  0.015526
  //   if (pharmacies) {
  //     pharmacies.map((p: any) => {
  //       if (p.location?.lat - lt > 0.005 && p.location?.long - lg > 0.04) {
  //         console.log(p.location.lat, p.location?.long);
  //         setNearPharms([...nearPharms, p]);
  //       } else {
  //         console.log("not near", p.location.lat, p.location.long);
  //       }
  //     });
  //   }
  // };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/signin");
  };
  return (
    <>
      <Script id="show-banner">
        {`
                    let clat;
                    let clng;
                    if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition((position)=>{
                            clat = position.coords.latitude;
                            clng = position.coords.longitude;
                            let inputF = document.getElementById("id1");
                            inputF.value = clat;

                            let inputF2 = document.getElementById("id2");
                            inputF2.value = clng;
                        })
                    }
               `}
      </Script>
      <NavBar />
      <div className="-mt-14 pt-4">
        <div className="h-full w-full">
        <input type="text" value="" id="id1" />
          <input type="text" value="" id="id2" />
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
                  Near by Phamacies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  
                  {
                    pharmacies.length>0?pharmacies.map((pharmacy: any)=><Link
                    href="/shop"
                    className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                        src={pharmacy.imageUrl}
                        alt=" image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          {pharmacy.name}
                        </h6>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        {pharmacy.description}
                      </p>
                    </div>
                  </Link>): <div>Ooops no near by pharmacies</div>
                  }

                </div>
              </div>
            </section>
            {/* <section className="pb-14 md:pb-24">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-manrope font-bold text-2xl md:text-4xl text-black  mb-10 md:mb-14 max-lg:text-center">
                  Other Pharmacies
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  <Link
                    href="/shop"
                    className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                        src="https://pagedone.io/asset/uploads/1701157844.png"
                        alt=" image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          Pharmacy name
                        </h6>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi, quas eaque!
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/shop"
                    className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                        src="https://pagedone.io/asset/uploads/1700726174.png"
                        alt=" image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          Pharmacy name
                        </h6>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi, quas eaque!
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/shop"
                    className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                        src="https://pagedone.io/asset/uploads/1700726191.png"
                        alt="image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          Pharmacy name
                        </h6>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi, quas eaque!
                      </p>
                    </div>
                  </Link>

                  <Link
                    href="/shop"
                    className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                        src="https://pagedone.io/asset/uploads/1700726207.png"
                        alt="image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          Pharmacy name
                        </h6>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eligendi, quas eaque!
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </section> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
