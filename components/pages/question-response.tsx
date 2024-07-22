
"use client";

import { FormEvent, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import Footer from "../footer";
import NavBar from "../common-components/navbar";
import Link from "next/link";
import Image from "next/image";

const client = generateClient<Schema>();

export default function QuestionResponse() {
  const data = [];
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const prompt = formData.get("prompt")?.toString()!;
    const { data, errors } = await client.queries.generateHaiku({
      prompt,
    });
    if (!errors) {
      setAnswer(data);
      setIsLoading(false);
    } else {
      console.log(errors);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center gap-3 bg-blue-50 p-3">
      <div className="w-[400px] bg-blue-50 max-md:hidden">
        <div className="rounded-xl bg-blue-200 p-2.5 pb-20">
          <div className="flex items-center gap-3 pt-3">
            <div className="flex aspect-square h-12 items-center justify-center rounded-[3px] bg-white p-1">
              <Image
                src="amplify.svg"
                alt="logo"
                width={30}
                height={10}
                className=""
              />
            </div>
            <div>
              <p className="font-extrabold text-black">Health Care</p>
            </div>
          </div>

          <form className="mx-auto max-w-md pt-5">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                className="block w-full rounded-lg border border-gray-300 bg-blue-50 px-4 py-3 ps-10 text-sm text-gray-900 focus:border-blue-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-300 dark:focus:ring-blue-500"
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
          </form>
        </div>
      </div>
      <div className="relative w-full overflow-y-auto overflow-x-hidden rounded-xl bg-white text-gray-400">
        <div className="flex w-full bg-white p-4">
          <Link
            href={"/"}
            className="rounded-full border border-gray-300 bg-gray-200 p-2 hover:cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M13 19L2 12l11-7v6h9v2h-9z" />
            </svg>
          </Link>
          <div></div>
        </div>
        <div className="w-full px-6 md:px-32">
          <div className="my-10 flex items-start gap-2.5">
            <img
              className="h-8 w-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            />
            <div className="leading-1.5 flex w-full max-w-md flex-col rounded-e-xl rounded-es-xl border-gray-200 bg-gray-100 px-4 dark:bg-gray-700">
              <div className="flex items-center space-x-2 rtl:space-x-reverse"></div>
              <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                That's awesome. I think our users will really appreciate the
                improvements.
              </p>
            </div>
          </div>
          <div className="my-10 flex items-start justify-end gap-2.5">
            <div className="leading-1.5 flex w-full max-w-md flex-col rounded-s-xl rounded-ee-xl rounded-es-xl border-gray-200 bg-gray-100 px-4 dark:bg-gray-700">
              <p className="py-2.5 text-sm font-normal text-gray-900 dark:text-white">
                That's awesome. I think our users will really appreciate the
                improvements.
              </p>
            </div>
            <img
              className="h-8 w-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="Jese image"
            />
          </div>

          <div className="absolute bottom-10 flex w-full justify-center overflow-x-hidden md:pr-52">
            <div className="inline-flex w-full max-w-xl items-center justify-between gap-2 overflow-x-hidden rounded-3xl border border-gray-200 py-1 pl-3 pr-1">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <g id="User Circle">
                    <path
                      id="icon"
                      d="M6.05 17.6C6.05 15.3218 8.26619 13.475 11 13.475C13.7338 13.475 15.95 15.3218 15.95 17.6M13.475 8.525C13.475 9.89191 12.3669 11 11 11C9.6331 11 8.525 9.89191 8.525 8.525C8.525 7.1581 9.6331 6.05 11 6.05C12.3669 6.05 13.475 7.1581 13.475 8.525ZM19.25 11C19.25 15.5563 15.5563 19.25 11 19.25C6.44365 19.25 2.75 15.5563 2.75 11C2.75 6.44365 6.44365 2.75 11 2.75C15.5563 2.75 19.25 6.44365 19.25 11Z"
                      stroke="#4F46E5"
                      stroke-width="1.6"
                    />
                  </g>
                </svg>
                <input
                  className="shrink grow basis-0 text-xs font-medium leading-4 text-black focus:outline-none"
                  placeholder="Type here..."
                />
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center rounded-full bg-indigo-600 px-3 py-2 shadow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <g id="Send 01">
                      <path
                        id="icon"
                        d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                        stroke="white"
                        stroke-width="1.6"
                        stroke-linecap="round"
                      />
                    </g>
                  </svg>
                  <h3 className="px-2 text-xs font-semibold leading-4 text-white">
                    Send
                  </h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
