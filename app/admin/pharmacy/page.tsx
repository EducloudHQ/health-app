"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import { uploadData, getUrl } from 'aws-amplify/storage';
import {v4 as uuidv4} from "uuid"
import Link from "next/link";
import { useForm } from 'react-hook-form';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';



export default function CreatePharmacy() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setisOpen] = useState(false)
  const client = generateClient<Schema>();
  const [file, setFile]: any = useState();
  const [url, setUrl] = useState('')  
  const [pharmacies, setPharmacies] = useState<Array<Schema["Pharmacy"]["type"]>>([]);

  useEffect(() => {
    listPharmacies();
  }, []);

  const listPharmacies = async () => {
    try {
      console.log("hello");
      client.models.Pharmacy.observeQuery().subscribe({
        next: (data) => setPharmacies([...data.items]),
      });
    } catch (err) {
      console.log("Error>>>>>>>>", err);
    }
  };

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString()!;
    const lat = parseFloat(formData.get("lat")?.toString()!)
    const lng = parseFloat(formData.get("lng")?.toString()!)
    const description = formData.get("description")?.toString()!;
    try{
      await uploadData({
        path: `pictures/${file.name}`,
        data: file,
      }).result
    }catch(err:any){
      console.log(err)
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(err.message);
    }

    const dUrl = await getUrl({
      path: `pictures/${file.name}`
    });
    setUrl(dUrl.url.href)
    try {
      const result = await client.models.Pharmacy.create({
        name: name,
        description: description,
        location: {
          lat: lat,
          long: lng,
        },
        imageUrl: dUrl.url.href,
        pharmacyId: uuidv4(),
        healthCareProviderId: "7ee5ab31-ba0d-482d-8597-dcee62e0f305"
      });
      console.log(result);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  };

  const { register, handleSubmit, setValue, watch } = useForm();
  const [address, setAddress] = useState("");

  const handleSelect = async (value: any) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setValue("location", value);
    console.log("Selected Location:", latLng);
  };

  const onSubmitlocation = (data: any) => {
    console.log("Form Data:", data);
  };
  return (
    <>
    <div>
    </div>
      <div className="bg-white w-full h-16 md:h-20 flex justify-between mb-4 px-4 md:px-7 font-bold">
        <div className="h-full flex items-center">
          <p>Create Pharmacy</p>
        </div>
        <div className="h-full font-medium flex items-center">
          <p>
            <Link href="/">Home</Link> /{" "}
            <span className="text-blue-400">Create Pharmacy</span>
          </p>
        </div>
      </div>

      <section className="bg-white py-6  md:py-10 px-6 md:px-8">
      <form onSubmit={onSubmit}>
              <div className="flex flex-col mb-2">
                <label 
              className="block mb-2 text-sm font-medium text-gray-900">Pharmacy Name</label>
                <input
                  type="text"
                  disabled={isLoading}
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
             
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label 
              className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <input
                  type="text"
                  disabled={isLoading}
                  name="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
             
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label 
              className="block mb-2 text-sm font-medium text-gray-900">Pharmacy Image</label>
                <input
                  type="file"
                  disabled={isLoading}
                  name="image"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
             
                />
              </div>
              {isLoading ? (
                   <div className="flex justify-between items-center">
                   <div></div>
       
                   <button
                   disabled
                     className="w-full md:w-fit text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center blue"
                   >
                  <p className="my-auto">Loading...</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    className="my-auto"
                  >
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        id="svgSpinnersPulseMultiple0"
                        fill="freeze"
                        attributeName="r"
                        begin="0;svgSpinnersPulseMultiple2.end"
                        calcMode="spline"
                        dur="1.2s"
                        keySplines=".52,.6,.25,.99"
                        values="0;11"
                      />
                      <animate
                        fill="freeze"
                        attributeName="opacity"
                        begin="0;svgSpinnersPulseMultiple2.end"
                        calcMode="spline"
                        dur="1.2s"
                        keySplines=".52,.6,.25,.99"
                        values="1;0"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        id="svgSpinnersPulseMultiple1"
                        fill="freeze"
                        attributeName="r"
                        begin="svgSpinnersPulseMultiple0.begin+0.2s"
                        calcMode="spline"
                        dur="1.2s"
                        keySplines=".52,.6,.25,.99"
                        values="0;11"
                      />
                      <animate
                        fill="freeze"
                        attributeName="opacity"
                        begin="svgSpinnersPulseMultiple0.begin+0.2s"
                        calcMode="spline"
                        dur="1.2s"
                        keySplines=".52,.6,.25,.99"
                        values="1;0"
                      />
                    </circle>
                    <circle cx="12" cy="12" r="0" fill="currentColor">
                      <animate
                        id="svgSpinnersPulseMultiple2"
                        fill="freeze"
                        attributeName="r"
                        begin="svgSpinnersPulseMultiple0.begin+0.4s"
                        calcMode="spline"
                        dur="1.2s"
                        keySplines=".52,.6,.25,.99"
                        values="0;11"
                      />
                      <animate
                        fill="freeze"
                        attributeName="opacity"
                        begin="svgSpinnersPulseMultiple0.begin+0.4s"
                        calcMode="spline"
                        dur="1.2s"
                        keySplines=".52,.6,.25,.99"
                        values="1;0"
                      />
                    </circle>
                  </svg>
                </button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
            <div></div>

            <button
              type="submit"
              className="w-full md:w-fit text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center blue"
            >
              Create
            </button>
          </div>
              )}
            </form>
      </section>

      </>
  );
}
