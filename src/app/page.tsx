"use client";
import React from "react";
export default function Home() {
  const title = "Hello World!";
  const description =
    "This is a simple example of a Next.js application with Tailwind CSS and Strapi integration.";

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex min-h-screen w-auto">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
