"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import { uploadData, getUrl } from "aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "@/components/dashbord-components/sidebar";
import DashboardCard from "@/components/dashbord-components/dashboardCard";
import ModalButton from "@/components/dashbord-components/modalButton";
import Image from "next/image";

export default function CreateHealthUnit() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const client = generateClient<Schema>();
  const [url, setUrl] = useState("");
  const [file, setFile]: any = useState();
  const [healthUnits, setHealthUnits] = useState<
    Array<Schema["HealthCareProvider"]["type"]>
  >([]);

  useEffect(() => {
    listHealthUints();
  }, []);

  const listHealthUints = async () => {
    try {
      console.log("hello");
      client.models.HealthCareProvider.observeQuery().subscribe({
        next: (data) => setHealthUnits([...data.items]),
      });
    } catch (err) {
      console.log("Error>>>>>>>>", err);
    }
  };

  const handleChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const saveImage = async () => {
    console.log(file);
    await uploadData({
      path: `pictures/${file.name}`,
      data: file,
    }).result;

    const dUrl = await getUrl({
      path: `pictures/${file.name}`,
    });
    console.log(dUrl.url.href);
    setUrl(dUrl.url.href);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString()!;
    const description = formData.get("description")?.toString()!;
    const lat = parseInt(formData.get("lat")?.toString()!);
    const lng = parseInt(formData.get("lng")?.toString()!);

    try {
      await uploadData({
        path: `pictures/${file.name}`,
        data: file,
      }).result;
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(err.message);
    }

    const dUrl = await getUrl({
      path: `pictures/${file.name}`,
    });
    setUrl(dUrl.url.href);

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
        type: "PRIVATE",
      });
      console.log(result);
      setIsLoading(false);
      setisOpen(false)
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

      <Sidebar />

      <DashboardCard />

      <div className="flex justify-between p-4 sm:ml-64">
        <div>
          <div className="w-full mb-4" onClick={() => setisOpen(!isOpen)}>
            <ModalButton title="Create Health Unit" />
          </div>

          <div className="flex">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {healthUnits.map((healthUnit: any) => (
                    <tr key={healthUnit.id} className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {healthUnit.name}
                      </th>
                      <td className="px-6 py-2">{healthUnit.description}</td>
                      <td className="px-6 py-2">
                        <Image
                          src={
                            healthUnit.imageUrl ? healthUnit.imageUrl : "/pharm.png"
                          }
                          width={100}
                          height={100}
                          alt={healthUnit.name}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className={
            isOpen
              ? "bg-bl mx-auto my-auto flex w-full h-full absolute top-0 left-0 z-50 bg-black/20"
              : "hidden"
          }
        >
          <div className="w-[80%] md:w-[60%] sm:w-[70%] mx-auto my-auto relative bg-white px-20 py-8 rounded rounded-xl">
            <div
              onClick={() => setisOpen(false)}
              className="hover:cursor-pointer absolute right-20"
            >
              {" "}
              close{" "}
            </div>
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
                  onChange={handleChange}
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
