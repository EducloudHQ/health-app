"use client";

import { FormEvent, useState } from "react";
import { generateClient } from "aws-amplify/api";
import { Schema } from "@/amplify/data/resource";
import Footer from "./footer";
import NavBar from "./navbar";

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
    <div className="bg-blue-100/40 pt-4">
      <div className="h-full w-full">
        <div className="h-full w-full bg-blur sticky top-5">
          <div className="mx-auto bg-white/40 w-[85%] border shadow shadow-lg rounded-full">
            <NavBar />
          </div>
        </div>

        <main className="flex min-h-[70%] flex-col items-center justify-center p-24 text-black">
          <div className="flex flex-col">
            {
              answer?<div className="text-black bg-black/20 p-4 rounded rounded-xl mb-4">
                <p className="text-bold text-blue-600 text-sm mb-5">Amazon bedrock</p>
              <pre>{answer}</pre>
            </div>:<></>
            }
            {
              answer?<></>:<h1 className="text-3xl text-blue-500 font-bold text-center mb-4 mx-auto">
              Ask any Question about your situation
            </h1>
            }

            <form
              className="mb-4 flex gap-2 self-center min-w-[500px] sticky bottom-0 w-full mx-auto"
              onSubmit={sendPrompt}
            >
              <textarea
                disabled={isLoading}
                name="prompt"
                className="min-h-12 max-h-12 shadow shadow-xl border my-auto rounded-full py-2 px-4 w-full"
              ></textarea>
              <button type="submit" className="w-[50px] my-auto flex  ">
                {
                // !isLoading ? (
                  <svg
                    className="my-auto text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M3 20V4l19 8zm2-3l11.85-5L5 7v3.5l6 1.5l-6 1.5zm0 0V7z"
                    />
                  </svg>
                // ) : (
                //   <svg
                //     xmlns="http://www.w3.org/2000/svg"
                //     width="32"
                //     height="32"
                //     className="my-auto shadow shadow-lg bg-transparent"
                //     viewBox="0 0 24 24"
                //   >
                //     <path
                //       fill="currentColor"
                //       d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                //       opacity=".25"
                //     />
                //     <path
                //       fill="currentColor"
                //       d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"
                //     >
                //       <animateTransform
                //         attributeName="transform"
                //         dur="0.75s"
                //         repeatCount="indefinite"
                //         type="rotate"
                //         values="0 12 12;360 12 12"
                //       />
                //     </path>
                //   </svg>
                // )
                }
              </button>
            </form>
          </div>
        </main>

        <div className="h-full"></div>
        <Footer />
        <div></div>
      </div>
    </div>
  );
}
