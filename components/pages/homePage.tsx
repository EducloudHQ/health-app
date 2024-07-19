// "use client";

// import { useRouter } from "next/navigation";
// import NavBar from "@/components/common-components/navbar";
// import Link from "next/link";
// import FeatureCard from "@/components/featurCard";
// import Footer from "@/components/footer";
// import { useEffect } from "react";
// import { generateClient } from "aws-amplify/data";
// import { type Schema } from "@/amplify/data/resource";
// import Card from "../card";

// export default function HomePage() {
//   const client = generateClient<Schema>();
//   const router = useRouter();

//   // const userInput = "Book hotel";

//   // Provide a bot name and user input
//   // const response = async()=>{
//   //    const res =  await Interactions.send({
//   //         botName: "HotelBooking",
//   //         message: userInput
//   //     });

//   //     console.log(res.message)
//   // }

//   // Log chatbot response
//   // console.log(response.message);
//   useEffect(() => {
//     list();
//     // response()
//     // if(!localStorage.getItem('user')){
//     //     router.replace('/signin')
//     // }
//   });
//   const list = async () => {
//     try {
//       const res = await client.models.Pharmacy.list();
//       console.log(res);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="bg-blue-100/40 pt-4">
//       <div className="h-full w-full">
//         <div className="h-full w-full bg-blur sticky top-5 z-50">
//           <div className="mx-auto bg-white/40 w-[85%] border shadow shadow-lg rounded-full">
//             <NavBar />
//           </div>
//         </div>
//         <div className="h-full">
//           <div className=" my-auto flex w-full h-screedsn">
//             <div className="my-36 mx-auto w-[60%] text-center">
//               <div>
//                 <h2 className="text-5xl font-bold my-6">
//                   Your Health is Our Greatest Priority
//                 </h2>
//                 <p className="leading-6">
//                   Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                   Consequatur, ut saepe, et porro nobis, cupiditate culpa labore
//                   minus repellat quod quos deserunt aperiam mollitia eos facilis
//                   rerum recusandae veritatis ipsam!
//                 </p>
//               </div>

//               <div className="mt-20">
//                 <Link
//                   href=""
//                   className="text-white bg-black shadow shadow-lg border rounded-full px-8 py-3"
//                 >
//                   Explore
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="h-10 bg-gradient-to-b from-blue-100/10 to-white"></div>
//           <div className="h-screen w-screen bg-white pt-6">
//             <div className="flex">
//               <div className="mx-auto">
//                 <h1 className="text-3xl font-bold">Our Features</h1>
//                 <div className="flex gap-1">
//                   <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
//                   <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
//                   <div className="w-full h-2 bg-blue-500 rounded-full"></div>
//                 </div>
//               </div>
//             </div>
//             <div className=" px-24 pt-10 flex flex-wrap justify-evenly gap-3">
//               <FeatureCard
//                 cardData={{
//                   title: "Pharmacies",
//                   description:
//                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
//                   url: "",
//                   image: "/pharm.png",
//                 }}
//               />

//               <FeatureCard
//                 cardData={{
//                   title: "Basic First Aide",
//                   description:
//                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
//                   url: "",
//                   image: "/first-aide.png",
//                 }}
//               />
//               <FeatureCard
//                 cardData={{
//                   title: "Basic First Aide",
//                   description:
//                     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,",
//                   url: "",
//                   image: "/first-aide.png",
//                 }}
//               />

//               {/* <Card cardData={{title:"Health Care Providers", description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta harum tempore qui mollitia doloremque repudiandae asperiores eligendi tempora eum,", url:"", image:"/pharm.png"}}/> */}
//               {/* <FeatureCard/>
//                                 <FeatureCard/> */}
//             </div>
//           </div>
//           <Footer />
//           <div></div>
//         </div>

//         {/* Chats button */}
//         {/* <div className='fixed bottom-10 right-10 bg-blue-500 text-white rounded-full p-3 hover:cursor-pointer'>
//                             <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 18.72C6.339 20.134 4.82 21 2 21c1-1 2.27-2.35 2.801-4.447C3.067 15.114 2 13.157 2 11c0-4.418 4.477-8 10-8c5.1 0 9.308 3.054 9.923 7"/><path d="M16 19.889c-3.314 0-6-1.99-6-4.445C10 12.99 12.686 11 16 11s6 1.99 6 4.444c0 1.199-.64 2.286-1.68 3.085c.317 1.165 1.08 1.915 1.68 2.471c-1.8 0-2.716-.544-3.792-1.422c-.684.2-1.428.31-2.208.31z"/></g></svg>
//                             </div> */}

//         {/* ******************** */}
//       </div>
//     </div>
//   );
// }

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
  // const [lng, setLng] = useState(0);
  // const [pharmacies, setPharmacies] = useState<
  //   Array<Schema["Pharmacy"]["type"]>
  // >([]);
  // const [nearPharms, setNearPharms]: any = useState([]);

  useEffect(() => {
    console.log("Hello")
    getAllPharmacies();
  }, []);

  const getAllPharmacies = async () => {
    console.log("getting all pharmacies")
    try {
      const data = await client.models.Pharmacy.list()
      setPharmacies(data.data)
      console.log(data)
      // .subscribe({
      //   next: (data) => setPharmacies([...data.items]),
      // });
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
      {/* <Script id="show-banner">
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
      </Script> */}
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
                  
                {
                  pharmacies.map((phamacy: any)=><Link
                    href="/shop"
                    className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500"
                  >
                    <div className="">
                      <img
                        src={phamacy.imageUrl}
                        alt=" image"
                        className="w-full aspect-square"
                      />
                    </div>
                    <div className="mt-5">
                      <div className="flex items-center justify-between">
                        <h6 className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                          {phamacy.name}
                        </h6>
                      </div>
                      <p className="mt-2 font-normal text-sm leading-6 text-gray-500">
                        {phamacy.description}
                      </p>
                    </div>
                  </Link>)
                }
                

                  {/* <Link
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
                  </Link> */}
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
