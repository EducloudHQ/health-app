"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";
import Link from "next/link";

export default function SignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const client = generateClient<Schema>();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString()!;
    const username = formData.get("name")?.toString();
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const password = formData.get("password")?.toString()!;
    try {
      const res = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: {
            email: email,
          },
        },
      });
      if (!res.isSignUpComplete) {
        router.replace("/confirm-signup");
      }
      const result = await client.models.User.create({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        cognitoId: "",
        firstName: username,
        lastName: username,
      });
      console.log("Data:", result);
      console.log(res);
    } catch (err: any) {
      console.log(err);
      setIsError(true);
      setIsLoading(false);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="w-screen h-screen">
      {/* <script type="text/javascript" src="/loc.js"></script> */}
      <div className="flex justify-between  w-full h-full">
        <div className="hidden sm:flex sm:text-xl sm:bg-blue-400/10 sm:mx-auto sm:my-auto sm:w-full sm:h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M1.923.25h5.308a3.288 3.288 0 0 1 0 6.577h-.642l2.374 2.226l2.584-2.583a.75.75 0 1 1 1.06 1.06l-2.549 2.55l2.532 2.373a.75.75 0 0 1-1.026 1.094L8.997 11.14l-2.39 2.39a.75.75 0 0 1-1.06-1.06l2.355-2.356l-3.506-3.287H2.673v5.25a.75.75 0 0 1-1.5 0V1a.75.75 0 0 1 .75-.75m5.308 5.077H2.673V1.75h4.558a1.788 1.788 0 1 1 0 3.577"
              clip-rule="evenodd"
            />
          </svg>
          <Image
            src="/m-pres.svg"
            alt="Picture of the author"
            width={50}
            height={50}
            layout="responsive"
            objectFit="fit"
          />
        </div>
        <div className="w-full">
          <div class="flex w-full bg-white p-4 -mb-10">
            <Link
              href={"/"}
              class="rounded-full border border-gray-300 bg-gray-200 p-2 hover:cursor-pointer"
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
          <div className="bg-bl mx-auto my-auto flex w-full h-full">
            <div className="w-[80%] md:w-[60%] sm:w-[70%] mx-auto my-auto">
              <div>
                <h2 className="text-2xl my-4">Create user account</h2>
              </div>

              <div className={isError ? "flex text-red-500 pb-4" : "hidden"}>
                <h4>{errorMessage}</h4>
              </div>

              <form onSubmit={onSubmit}>
                <div className="flex flex-col w-full mb-2">
                  <label>Name</label>
                  <input
                    type="text"
                    disabled={isLoading}
                    name="username"
                    className="h-9 border rounded-lg px-4 w-full"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label>Email</label>
                  <input
                    type="text"
                    disabled={isLoading}
                    name="email"
                    className="h-9 border rounded-lg px-4 w-full"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    disabled={isLoading}
                    name="phoneNumber"
                    className="h-9 border rounded-lg px-4 w-full"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label>Password</label>
                  <input
                    type="text"
                    disabled={isLoading}
                    name="password"
                    className="h-9 w-full border rounded-lg px-4"
                  />
                </div>
                <div className="flex flex-col mb-2">
                  <label>Confirm Password</label>
                  <input
                    type="text"
                    name="confirmPassword"
                    disabled={isLoading}
                    className="h-9 w-full border rounded-lg px-4"
                  />
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
                  <>
                    <button
                      type="submit"
                      className="w-full flex justify-center gap-2 mt-4 bg-blue-500 text-white h-9 rounded-lg"
                    >
                      <p className="my-auto">Register</p>
                    </button>
                    <div className="flex text-center w-full pt-5">
                      <p className="pr-1">Already have an account?</p>
                      <Link className="text-blue-500" href={"/signin"}>
                        Sign In
                      </Link>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
