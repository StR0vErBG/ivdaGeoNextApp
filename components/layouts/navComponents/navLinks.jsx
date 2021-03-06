// React and nextJs things
import React from "react";

// Components
import NavLinkMenu from "./NavLinkMenu";

import dictionary from "./dictionary";

const NavLinks = ({ isHome }) => {
  return (
    <>
      <ul
        className={` text-bg-color text-lg inline-flex flex-col w-full h-full ${
          isHome ? "hidden lg:inline pt-2" : ""
        }`}
        data-columns="2"
      >
        {dictionary.map((article) => {
          return (
            <NavLinkMenu
              title={article.title}
              articles={article.articles}
              key={article.title}
              isHome={isHome}
            />
          );
        })}
      </ul>
    </>
  );
};

export default NavLinks;
