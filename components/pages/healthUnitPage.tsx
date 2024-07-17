"use client";

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import NavBar from "@/components/common-components/navbar";
import Link from "next/link";
import FeatureCard from "@/components/featurCard";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import CardTwo from "../cardTwo";
import ImageCard from "../imageCard";
import Script from "next/script";

export default function HealthUnitPage() {
  const client = generateClient<Schema>();
  const router = useRouter();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [pharmacies, setPharmacies] = useState<
    Array<Schema["HealthCareProvider"]["type"]>
  >([]);
  const [nearPharms, setNearPharms]: any = useState([]);

  useEffect(() => {
    getAllPharmacies();
    console.log(pharmacies);
    pharmacies.map((p: any) => {
      if (p.location?.lat - 4 > 2) {
        console.log(p.location.lat);
        // setNearPharms([...nearPharms, p])
      } else {
        console.log("not near", p.location.lat);
      }
    });
  }, []);
  const getAllPharmacies = async () => {
    // console.log("getting all pharmacies")
    try {
      client.models.HealthCareProvider.observeQuery().subscribe({
        next: (data) => setPharmacies([...data.items]),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getNearByPharmacies = async () => {
    // console.log("getting all pharmacies")
    try {
      const res = await client.models.Pharmacy.list({
        filter: {
          and: [
            {
              location: { eq: "1" },
            },
          ],
        },
      });
      //   setPharmacies(res.data)
    } catch (err) {
      console.log(err);
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
      <div className="bg-blue-100/40 pt-4">
        <input className="hidden" type="number" id="id1" name="lat" />
        <input className="hidden" type="number" id="id2" name="lng" />
        <div className="h-full w-full">
          <div className="h-[70%]">
            <div className=" my-auto sm:flex w-full px-4 sm:px-20 justify-between gap-4">
              <div className="mt-16 mx-auto">
                <div>
                  <h2 className="text-5xl font-bold my-6 sm:pl-4">
                    Discover Top Rated Pharmacies Near You
                  </h2>
                  {/* <p className='leading-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequatur, ut saepe, et porro nobis, cupiditate culpa labore minus repellat quod quos deserunt aperiam mollitia eos facilis rerum recusandae veritatis ipsam!</p> */}
                </div>
                <div>
                  <button onClick={() => handleSignOut()}>Sign Out</button>
                </div>
              </div>
              <div className="sm:my-20 sm:px-20">
                <p className="text-justify">
                  Whether you are seeking a specialist or a primary care
                  physician, explore our directory to dicover the perfect match
                  for your healthcare needs.
                </p>
                <div className="mt-20">
                  <Link
                    href=""
                    className="text-white bg-black shadow shadow-lg border rounded-full px-8 py-3"
                  >
                    Explore
                  </Link>
                </div>
              </div>
            </div>
            <div className="h-10 bg-gradient-to-b from-blue-100/10 to-white"></div>

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
            <div className="h-screen w-screen bg-white pt-20">
              <div className="flex pb-12">
                <div className="mx-auto">
                  <h1 className="text-3xl font-bold pb-2">
                    Near By Pharmacies
                  </h1>
                  <div className="flex gap-1">
                    <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-6 h-2 bg-blue-500 rounded-full"></div>
                    <div className="w-full h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              {/* <div>
                <button>get near by</button>
              </div> */}
              <div className=" px-1 sm:px-24 pt-10 flex flex-wrap justify-evenly gap-3">
                {pharmacies.map(
                  (pharm: any) => (
                    // pharm.location?.lat - 4 > 2 ? (
                    <FeatureCard
                      key={pharm.id}
                      cardData={{
                        title: pharm.name,
                        description: pharm.description,
                        url: "",
                        image: pharm.imageUrl ? pharm.imageUrl : "/pharm.png",
                      }}
                    />
                  )
                  // ) : (
                  //   <div></div>
                  // )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
