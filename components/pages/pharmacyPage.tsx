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
    setNearPharms([
      {
        name: "Cancer drugs",
        description:
          "nadadsd ausdasdb dasbd hdbuad hs hs dsbuab h ahad h dbah dshdusad hs a dha",
      },
      {
        name: "Cancer drugs",
        description:
          "nadadsd ausdasdb dasbd hdbuad hs hs dsbuab h ahad h dbah dshdusad hs a dha",
      },
      {
        name: "Cancer drugs",
        description:
          "nadadsd ausdasdb dasbd hdbuad hs hs dsbuab h ahad h dbah dshdusad hs a dha",
      },
    ]);
    setPharmacies([
      {
        name: "Cancer drugs",
        description:
          "nadadsd ausdasdb dasbd hdbuad hs hs dsbuab h ahad h dbah dshdusad hs a dha",
      },
      {
        name: "Cancer drugs",
        description:
          "nadadsd ausdasdb dasbd hdbuad hs hs dsbuab h ahad h dbah dshdusad hs a dha",
      },
      {
        name: "Cancer drugs",
        description:
          "nadadsd ausdasdb dasbd hdbuad hs hs dsbuab h ahad h dbah dshdusad hs a dha",
      },
    ]);
    getAllPharmacies();
  }, []);

  // useEffect(() => {
  //   console.log(pharmacies)
  //   filterNearPharmacies()
  // }, [pharmacies, lat, lng]);
  const getAllPharmacies = async () => {
    // console.log("getting all pharmacies")
    try {
      client.models.Pharmacy.observeQuery().subscribe({
        next: (data) => setPharmacies([...data.items]),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const filterNearPharmacies = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter(true);
    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const lt = parseFloat(formData.get("lt")?.toString()!);
    const lg = parseFloat(formData.get("lg")?.toString()!);
    console.log("filtering>>>", lt, lg);
    // 4.171662, 9.285218    4.159330, 9.276489    4.161479, 9.292015  result 0.002149  0.015526
    if (pharmacies) {
      pharmacies.map((p: any) => {
        if (p.location?.lat - lt > 0.005 && p.location?.long - lg > 0.04) {
          console.log(p.location.lat, p.location?.long);
          setNearPharms([...nearPharms, p]);
        } else {
          console.log("not near", p.location.lat, p.location.long);
        }
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace("/signin");
  };
  return (
    <>
      <Script id="show-banner">
        {`
                    let lat;
                    let lng;
                    if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition((position)=>{
                            lat = position.coords.latitude;
                            lng = position.coords.longitude;
                            let inputF = document.getElementById("id1");
                            inputF.value = lat;

                            let inputF2 = document.getElementById("id2");
                            inputF2.value = lng;
                        })
                    }
               `}
      </Script>
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
                  Near by Phamacies
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
            </section>
            <section className="pb-14 md:pb-24">
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
            </section>

            {/* <div className="bg-white px-4 sm:px-24 sm:flex gap-3 justify-between">
              <ImageCard
                cardData={{
                  title: "Health Care Providers",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
                  url: "",
                  image: "/pharm.png",
                }}
              />

              <CardTwo
                cardData={{
                  title: "Health Care Providers",
                  description:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
                  url: "",
                  image: "/pharm.png",
                }}
              />
            </div> */}

            {/* <div className="h-screen w-screen bg-white pt-20">
              <div className="flex pb-12 flex-col">
                <div className="absolute bg-blue-400 h-[250px] w-[150px] pl-3 left-2 rounded-lg ">
                  <div className="flex flex-col gap-2">
                    <p className="font-bold text-white text-lg mx-auto pb-4">
                      {" "}
                      Filters
                    </p>

                    <div className="">
                      <button onClick={() => setFilter(false)} className="">
                        All pharmacies
                      </button>
                    </div>
                    <form
                      onSubmit={filterNearPharmacies}
                      className=" h-[20px] relative"
                    >
                      <input
                        className="invisible"
                        step="0.00000001"
                        type="number"
                        id="id1"
                        name="lt"
                      />
                      <input
                        className="invisible"
                        step="0.00000001"
                        type="number"
                        id="id2"
                        name="lg"
                      />
                      <div className=" absolute top-0 w-full">
                        <button className="w-full text-left" type="submit">
                          Near by Pharms
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="flex">
                  <div className="mx-auto">
                    <h1 className="text-2xl md:text-4xl font-bold mb-2.5 md:mb-3">
                      Pharmacies
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
              </div>
              {filter ? (
                <div className="px-4 pb-20 md:px-24  h-fit pt-14 flex flex-wrap justify-center gap-8">
                  {nearPharms.map((pharm: any) => (
                    <FeatureCard
                      key={pharm.name}
                      cardData={{
                        title: pharm.name,
                        description: pharm.description,
                        url: "",
                        image: pharm.imageUrl ? pharm.imageUrl : "/pharm.png",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-4 pb-20 md:px-24  h-fit pt-14 flex flex-wrap justify-center gap-8">
                  {pharmacies.map((pharm: any) => (
                    <FeatureCard
                      key={pharm.id}
                      cardData={{
                        title: pharm.name,
                        description: pharm.description,
                        url: "",
                        image: pharm.imageUrl ? pharm.imageUrl : "/pharm.png",
                      }}
                    />
                  ))}
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
