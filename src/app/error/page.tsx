'use client'

import React from "react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export function ErrorSection7() {
  const router = useRouter();
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <FlagIcon className="w-20 h-20 mx-auto" />
        <h1
          color="blue-gray"
          className="font-bold mt-10 !text-3xl !leading-snug md:!text-4xl"
        >
          Error 404 <br /> It looks like something went wrong.
        </h1>
        <h1 className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          Don&apos;t worry, our team is already on it.Please try refreshing
          the page or come back later.</h1>
        <button className="w-30 px-4 py-2 bg-black text-white font-bold rounded-2xl" onClick={() => router.push("/")}>
          back home
        </button>
      </div>
    </div>
  );
}

export default ErrorSection7;