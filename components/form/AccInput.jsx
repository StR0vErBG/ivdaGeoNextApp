import React from "react";

import Icons from "../Icons/Icons";

// Get data from the user and fullfil in inputplaceholder
const AccInput = ({ type, placeholder, id, isReq, iconType, data }) => {
  return (
    <div class="w-full max-w-xs">
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm  mb-1 font-semibold"
          for="username"
        >
          {placeholder}
        </label>
        <div>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default AccInput;
