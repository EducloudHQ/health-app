"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import { uploadData, getUrl } from 'aws-amplify/storage';
import {v4 as uuidv4} from "uuid"

export default function CreateDrug() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setisOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState("");
  const client = generateClient<Schema>(); 
  const [url, setUrl] = useState('')

  const [file, setFile]: any = useState();

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const saveImage = async () => {
    console.log(file)
    await uploadData({
      path: `pictures/${file.name}`,
      data: file,
  }).result

  const dUrl = await getUrl({
    path: `pictures/${file.name}`
  })
  console.log(dUrl.url.href)
  setUrl(dUrl.url.href)
  }


  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString()!;
    const description = formData.get("description")?.toString()!;
    const lat = parseInt(formData.get("lat")?.toString()!)
    const lng = parseInt(formData.get("lng")?.toString()!)

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
      const result = await client.models.HealthCareProvider.create({
        name: name,
        description: description,
        location: {
          lat: lat,
          long: lng,
        },
        imageUrl: dUrl.url.href,
        healthCareProviderId: uuidv4(),
        type: "PRIVATE"
      });
      console.log(result);
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="w-screen h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 flex left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="px-3 py-4 my-auto mx-auto shadow shadow-xl overflow-y-auto rounded-r-xl">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="w-5 h-5  text-white transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3"></span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 border border-blue-500 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 border border-blue-500 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Drugs</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center border border-blue-500 p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Pharmacies</span>
              </a>
            </li>
            <li>
              <a
              onClick={()=>setisOpen(true)}
                href="#"
                className="flex items-center p-2 border border-blue-500 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Health care providers</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 border border-blue-500 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign In</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 border border-blue-500 text-gray-900 rounded-lg  hover:bg-gray-100  group"
              >
                <svg
                  className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Up</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>


      <div className="flex justify-evenly flex-wrap gap-4 p-4 sm:ml-64">
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
          <div className="flex justify-center">
            <p className="my-auto text-white font-bold"> 250 +</p>
          </div>
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Total Drugs
          </div>
        </div>
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Total Users
          </div>
        </div>
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Total Pharmacies
          </div>
        </div>
        <div className="h-[100px] w-[180px] bg-blue-700 rounded-xl relative overflow-hidden">
          <div className="bg-black/40 w-full absolute bottom-0 flex justify-center py-1 text-white">
            Health Cares
          </div>
        </div>
      </div>


      <div className="flex justify-between p-4 sm:ml-64">
        <div className={isOpen?"bg-bl mx-auto my-auto flex w-full h-full absolute top-0 left-0 z-50 bg-black/20": "hidden"}>
          <div className="w-[80%] md:w-[60%] sm:w-[70%] mx-auto my-auto relative bg-white px-20 py-8 rounded rounded-xl">
            <div onClick={()=>setisOpen(false)} className="hover:cursor-pointer absolute right-20"> close </div>
            <div>
              <h2 className="text-2xl my-4">Create health care unit</h2>
            </div>
            <div className={isError ? "flex text-red-500 pb-4" : "hidden"}>
              <h4>{errorMessage}</h4>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col mb-2">
                <label>Pharmacy Name</label>
                <input
                  type="text"
                  disabled={isLoading}
                  name="name"
                  className="h-9 border rounded-lg px-4 w-full"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label>Description</label>
                <input
                  type="text"
                  disabled={isLoading}
                  name="description"
                  className="h-9 border rounded-lg px-4 w-full"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label>Pharmacy Image</label>
                <input
                  type="file"
                  disabled={isLoading}
                  name="image"
                  className="h-9 border rounded-lg px-4 w-full"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label>Location</label>
                <div className="flex w-full">
                  <input
                    type="number"
                    disabled={isLoading}
                    name="lat"
                    placeholder="enter latitude"
                    className="h-9 border rounded-lg px-4 w-full"
                  />
                  <input
                    type="number"
                    disabled={isLoading}
                    name="lng"
                    placeholder="enter longitude"
                    className="h-9 border rounded-lg px-4 w-full"
                  />
                </div>
              </div>
              {isLoading ? (
                <button
                  disabled
                  className="w-full flex justify-center gap-2 mt-4 bg-blue-300 text-white h-9 rounded-lg"
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
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center gap-2 mt-4 bg-blue-500 text-white h-9 rounded-lg"
                >
                  <p className="my-auto">Submit</p>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
