import React, { useRef, useState } from "react";

// Icons
import { HiX } from "react-icons/hi";
import { IoIosFunnel } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";

// Styles
import styles from "../../../styles/products/listProducts.module.css";

// NextJs
import { useRouter } from "next/router";

// Components
import Checkbox from "./../../../components/base/Checkbox";
import AsideHeader from "./../../../components/products/aside/AsideHeader";
import Product from "./../../../components/products/listProducts/Product";
import Sorting from "./../../../components/products/filters/Sorting";
import RangeSlider from "./../../../components/products/aside/RangeSlider";
// Dictionaries
const sortByDictionary = [
  {
    val: "nameAsc",
    text: "Име (възходящ ред)",
  },
  {
    val: "nameDesc",
    text: "Име (низходящ ред)",
  },
  {
    val: "priceAsc",
    text: "Цена (възходящ ред)",
  },
  {
    val: "priceDesc",
    text: "Цена (низходящ ред)",
  },
];
const pageDictionary = [
  {
    val: "6",
    text: "по 6 на страница",
  },
  {
    val: "12",
    text: "по 12 на страница",
  },
  {
    val: "24",
    text: "по 24 на страница",
  },
  {
    val: "48",
    text: "по 48 на страница",
  },
];
export default function Section() {
  const router = useRouter();
  const { section } = router.query;
  const sortingMenu = useRef(null);
  const [isHidden, setHidden] = useState(true);

  const [filterMenu, setFilterMenu] = useState(false);

  return (
    <main className="mb-auto">
      <div className="lg:grid grid-cols-[20%80%] lg:space-x-10 container">
        <aside
          className={` w-full h-full lg:block bg-[#f5f5f5] ${
            styles.asideContainer
          } lg:relative pt-4 px-5 ${
            filterMenu ? "fixed top-0 z-20 left-0 bg-[#f5f5f5] pt-20" : "hidden"
          }`}
        >
          <div className="">
            <div className="flex items-center justify-between">
              <h3 className="mb-3 text-2xl text-semibold">Филтри</h3>
              <div
                className={`text-lg cursor-pointer text-primary lg:hidden`}
                onClick={() => setFilterMenu(false)}
              >
                <HiX />
              </div>
            </div>
            <AsideHeader text="Цена" />
            <div>
              <RangeSlider
                initialMin={10}
                initialMax={500}
                min={0}
                max={500}
                step={100}
                priceGap={10}
              />
              {/* Pricing line to choose */}
              <div className="flex items-center mt-2 cursor-pointer">
                <span className="text-primary">
                  <HiX />
                </span>
                <span className="pl-1 text-sm text-gray-darker">Изчисти</span>
              </div>
            </div>
            <div>
              <AsideHeader text="Марка" />

              <Checkbox text="BLACK&DECKER" id="blackAndDecker" quantity={2} />
            </div>
            <div>
              <AsideHeader text="Напрежение" />

              <Checkbox text="10.80 V" id="10.80V" quantity={100} />
            </div>
          </div>
        </aside>
        <section className="mt-10">
          {/* Filters for mobile */}
          <div className="relative z-10 grid grid-cols-2 gap-2 mb-5 lg:mb-14 lg:grid-cols-1">
            {/* TODO: add icons */}
            <button
              type="button"
              className="flex items-center w-full h-full py-2 pl-4 text-left text-white bg-primary lg:hidden "
              onClick={() => setFilterMenu(!filterMenu)}
            >
              <span>
                <IoIosFunnel />
              </span>
              <span className="pl-1">Филтри</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-between w-full h-full py-2 pl-4 text-left border border-gray lg:hidden"
              onClick={() => setHidden(!isHidden)}
            >
              <div>Сортирай по:</div>
              <div className="mr-2 text-sm lg:text-3xl">
                <MdKeyboardArrowDown />
              </div>
            </button>

            <div
              className={` w-full absolute lg:flex top-full bg-white z-10 lg:relative h-48 lg:h-auto shadow-2xl lg:shadow-none ${
                isHidden ? "hidden" : ""
              } `}
              ref={sortingMenu}
            >
              <div>
                <Sorting
                  title="Сортирай"
                  name="sortBy"
                  data={sortByDictionary}
                />
              </div>
              <div className="lg:ml-4">
                <Sorting
                  title="Намерени"
                  qty={42}
                  name="pages"
                  data={pageDictionary}
                />
              </div>
            </div>
          </div>
          {/* Large screens buttons */}

          <Product section={section} />
          <Product section={section} />
          <Product section={section} />
          <Product section={section} />

          <Product section={section} />
          <Product section={section} />
          <Product section={section} />
          <Product section={section} />

          <Product section={section} />

          <Product section={section} />
        </section>
      </div>
    </main>
  );
}
