"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { confirmSignUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { useRouter } from "next/navigation";

Amplify.configure(outputs);

export default function ConfirmSignUp() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const confirmationCode = formData.get("confirmationCode")?.toString()!;
    const email = formData.get("email")?.toString()!;

    try {
      const res = await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });
      if (res.isSignUpComplete) {
        router.replace("/signin");
      }
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
      <div className="flex justify-between  w-full h-full">
        <div className="hidden sm:flex sm:text-xl sm:bg-green-400/10 sm:mx-auto sm:my-auto sm:w-full sm:h-full">
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
        <div className="bg-bl mx-auto my-auto flex w-full h-full">
          <div className="w-[80%] md:w-[60%] sm:w-[70%] mx-auto my-auto">
            <div>
              <h2 className="text-2xl my-4">Enter code</h2>
            </div>
            <div className={isError ? "flex text-red-500 pb-4" : "hidden"}>
              <h4>{errorMessage}</h4>
            </div>
            <form onSubmit={onSubmit}>
              <div className="flex flex-col mb-2">
                <label>Email</label>
                <input
                  type="text"
                  disabled={isLoading}
                  name="email"
                  className="h-9 border rounded-lg px-4 w-full"
                />
              </div>
              <div className="flex flex-col w-full mb-2">
                <label>Code</label>
                <input
                  type="number"
                  disabled={isLoading}
                  name="confirmationCode"
                  className="h-9 border rounded-lg px-4 w-full"
                />
              </div>
              {isLoading ? (
                <button
                  disabled
                  className="w-full flex justify-center gap-2 mt-4 bg-green-300 text-white h-9 rounded-lg"
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
                  className="w-full flex justify-center gap-2 mt-4 bg-green-500 text-white h-9 rounded-lg"
                >
                  <p className="my-auto">Register</p>
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
