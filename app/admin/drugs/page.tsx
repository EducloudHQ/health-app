

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../../amplify/data/resource";
import { uploadData, getUrl } from "aws-amplify/storage";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';



const API_KEY = "";
export default function CreateDrug() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setisOpen] = useState(false);
  const client = generateClient<Schema>();
  const [url, setUrl] = useState("");

  const [file, setFile]: any = useState();

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
    saveImage();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString()!;
    const description = formData.get("description")?.toString()!;

    try {
      const result = await client.models.Drug.create({
        name: name,
        description: description,
        imageUrl: url,
        drugId: uuidv4(),
      });
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
    {/* <form onSubmit={handleSubmit(onSubmitlocation)}>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" {...register("name", { required: true })} />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }: any) => (
            <div>
              <input
                {...getInputProps({
                  name: "location",
                  id: "location",
                  placeholder: "Search Places ..."
                })}
              />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion: any) => {
                  const style = suggestion.active
                    ? { backgroundColor: "#a8dadc", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { style })}
                      key={suggestion.placeId}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </div>
      <button type="submit">Submit</button>
    </form> */}
    </div>
      <div className="bg-white w-full h-16 md:h-20 flex justify-between mb-4 px-4 md:px-7 font-bold">
        <div className="h-full flex items-center">
          <p>Create drug</p>
        </div>
        <div className="h-full font-medium flex items-center">
          <p>
            <Link href="/">Home</Link> /{" "}
            <span className="text-blue-400">Create drug</span>
          </p>
        </div>
      </div>

      <section className="bg-white py-6  md:py-10 px-6 md:px-8">
      <form onSubmit={onSubmit}>
              <div className="flex flex-col mb-2">
                <label 
              className="block mb-2 text-sm font-medium text-gray-900">Drug Name</label>
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
              className="block mb-2 text-sm font-medium text-gray-900">Drug Image</label>
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
