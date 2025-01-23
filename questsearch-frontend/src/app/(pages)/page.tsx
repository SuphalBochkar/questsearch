"use client";

import { Navbar } from "@/components/Navbar";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4 font-playfair">
              Quest<span className="text-indigo-600">Search</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore our extensive database of questions and expand your
              knowledge
            </p>
            <div className="w-24 h-1 bg-indigo-600 mx-auto rounded-full mt-8"></div>
          </div>
        </div>
      </main>
    </>
  );
}
