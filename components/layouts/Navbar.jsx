import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
// Test
// Nav Components
import Hamburger from "./navComponents/Hamburger";
import style from "../../styles/navigation/Nav.module.css";
// Icons and images
import { AiOutlineUser, AiOutlineHeart, AiOutlineSearch } from "react-icons/ai";
import { BsCart3 } from "react-icons/bs";

const Navbar = () => {
  const headerRef = useRef(null);
  const [show, setShow] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      setShow(true);
    } else {
      setShow(false);
    }
    setLastScrollY(window.scrollY);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
    }

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`z-50 animate sticky top-0  ${show ? "animateUp" : ""}`}
      ref={headerRef}
    >
      <nav className={`flex bg-color ${style.cShadow}`}>
        <div className="container relative flex items-center justify-between ">
          <div className="flex items-center justify-center logo">
            <Hamburger headRef={headerRef} />
            <Link href="/">
              <div className="items-center justify-between hidden lg:flex">
                <Image
                  src="/images/logo.png"
                  width={250}
                  height={50}
                  className="cursor-pointer"
                />
              </div>
            </Link>
            <li className="flex items-center justify-center px-2 lg:hidden hover:text-white hover:bg-gray h-14 ">
              <button>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                </svg>
              </button>
            </li>
          </div>
          <div className="lg:hidden">
            <Link href="/">
              <div className="flex items-center justify-between lg:block">
                <Image
                  src="/images/logo.png"
                  width={210}
                  height={45}
                  className="cursor-pointer"
                />
              </div>
            </Link>
          </div>

          <ul className={`${style.list} flex items-center justify-center `}>
            {/* Search icon */}
            <li className="items-center justify-center hidden px-4 lg:flex h-14 lg:h-20 hover:bg-gray ">
              <div className="text-3xl">
                <AiOutlineSearch className="icon" />
              </div>
              <div className="pl-1 font-sans text-sm font-extralight">
                Търси
              </div>
            </li>
            {/* Favourite items */}
            <Link href="/account#my-favourites">
              <li className="flex-col items-center justify-center hidden px-4 lg:flex h-14 lg:h-20 hover:text-white hover:bg-gray">
                <div className="text-3xl">
                  <AiOutlineHeart className="icon" />
                </div>
              </li>
            </Link>
            {/* Account */}
            <Link href="/account/login">
              <li className="flex flex-col items-center justify-center px-4 h-14 lg:h-20 hover:text-white hover:bg-gray">
                <div className="text-3xl">
                  <AiOutlineUser className="icon" />
                </div>
              </li>
            </Link>
            {/* Cart */}
            <Link href="/cart">
              <li className="flex flex-col items-center justify-center px-4 h-14 lg:h-20 hover:text-white hover:bg-gray">
                <div className="text-3xl">
                  <BsCart3 className="icon" />
                </div>
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
