"use client";

import Navbar from "@/components/common-components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import {  useEffect, useState } from "react";
import { data } from "@/amplify/datads/resource";

export default function Pharmacy({params}: any) {
  const client = generateClient<Schema>();
  const [drugs, setDrugs]: any = useState([]);
  const [pharmacy, setPharmacy]: any = useState({})
  const bucketName = "https://amplify-d2yrv03l6hwvow-ma-amplifyteamdrivebucket28-ts944jk2zo40.s3.amazonaws.com/pictures"


  useEffect(() => {
    getAllDrugs();
  }, []);
  const getAllDrugs = async () => {
    try {
      const drugs1 = await client.models.Drug.list({
        filter:{
          pharmacyId: {
            eq: params.pharmacyId
          }
        }
      })
      setDrugs(drugs1.data)
      
      const pharmRes = await client.models.Pharmacy.get({
        id: params.pharmacyId,
      });
      setPharmacy(pharmRes.data)
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar />
      <script type="text/javascript" src="/script.js"></script>

      <div className="w-full flex justify-center mt-14 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 min-h-52 w-full max-w-screen-xl flex justify-center text-center items-center rounded-md">
          <h2 className="font-manrope text-2xl font-bold text-black px-4 min-[400px]:text-4xl">
             {pharmacy?.name}
          </h2>
        </div>
      </div>
      <div className="">
        <section className="pt-12 pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-manrope mb-8 text-3xl font-bold text-black max-lg:text-center min-[400px]:text-4xl">
              Available Drugs
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3  xl:grid-cols-4">
              {drugs.map((d:any)=><Link href={{
                pathname:"/single-product",
                query: {
                  name: d.name,
                  des: d.description,
                  img: d.imageUrl
              }
               }} className="mx-auto max-w-[384px]">
                <div className="aspect-square w-full max-w-sm">
                  <img
                    src={`${bucketName}/${d.imageUrl}`}
                    alt="cream image"
                    className="h-full w-full rounded-xl"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="">
                    <h6 className="mb-2 text-xl font-medium leading-8 text-black">
                      {d.name}
                    </h6>
                  </div>
                </div>
              </Link>)}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

