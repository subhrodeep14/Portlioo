"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="pb-32 md:pb-44 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-with-grid.png')] bg-cover bg-center bg-no-repeat text-slate-800 text-sm">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 border-b border-white/25 w-full">
        <Link href="https://prebuiltui.com">
          <Image
            src="https://prebuiltui.com/logo.svg"
            alt="PrebuiltUI"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Menu Items */}
        <ul
          className={`max-md:absolute max-md:h-full max-md:z-50 max-md:w-full max-md:top-0 transition-all duration-300 max-md:backdrop-blur max-md:bg-white/70 max-md:text-base flex flex-col md:flex-row items-center justify-center gap-8 font-medium ${
            menuOpen ? "max-md:left-0" : "max-md:-left-full"
          }`}
        >
          <li onClick={() => setMenuOpen(false)} className="hover:text-slate-500">
            <Link href="#">Home</Link>
          </li>
          
          <li onClick={() => setMenuOpen(false)} className="hover:text-slate-500">
            <Link href="#">Pricing</Link>
          </li>
          <li onClick={() => setMenuOpen(false)} className="hover:text-slate-500">
            <Link href="#">Docs</Link>
          </li>

          {/* Close Button Mobile */}
          <button
            onClick={() => setMenuOpen(false)}
            className="md:hidden bg-gray-800 hover:bg-black text-white p-2 rounded-md aspect-square font-medium transition"
          >
            ✕
          </button>
        </ul>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(true)} className="md:hidden">
          <svg
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* CTA Button */}
        <button className="max-md:hidden px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-700 transition rounded-full">
          Contact us
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col-reverse gap-10 md:flex-row px-4 md:px-16 lg:px-24 xl:px-32 mt-12 md:mt-32">
        <div className="max-md:text-center">
          <h5 className="text-4xl md:text-6xl/[76px] font-semibold max-w-xl bg-gradient-to-r from-slate-900 to-[#6D8FE4] text-transparent bg-clip-text">
            Build Skills That Get You Hired
          </h5>

          <p className="text-sm md:text-base max-w-lg mt-6 max-md:px-2 text-slate-600">
            Join a world-class, personalized learning journey built to turn you
            into a high-performing tech professional — and get hired by top
            product companies.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button className="px-8 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 transition-all">
              Get Started
            </button>
            <button className="px-5 py-3 rounded-md bg-white text-indigo-600 border border-indigo-400 flex items-center gap-2 hover:bg-indigo-600/5 active:scale-95 transition-all">
              ⭐ <span>Our courses</span>
            </button>
          </div>

          {/* Avatar Group */}
          <div className="flex items-center mt-9">
            <div className="flex -space-x-3.5 pr-3">
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
                width={40}
                height={40}
                alt="user"
                className="size-10 border-2 border-white rounded-full"
              />
              <Image
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
                width={40}
                height={40}
                alt="user"
                className="size-10 border-2 border-white rounded-full"
              />
              {/* Add more users similarly */}
            </div>
            <div>
              <p className="text-sm text-slate-500">⭐ Used by 1,000+ people</p>
            </div>
          </div>
        </div>

        {/* Right Side Image */}
        <div className="w-full md:max-w-xs lg:max-w-lg">
          <Image
            className="w-full h-auto"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/users-group.png"
            alt="users"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
