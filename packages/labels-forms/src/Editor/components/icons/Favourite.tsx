import React from "react";
import { favouriteIconFill } from "../../consts/toolbar";

const Favourite = ({ favourite }: { favourite: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={`${favourite ? favouriteIconFill.RED : favouriteIconFill.NONE}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={`M17.4896 7.08538C17.3425 4.84874 15.5873 3.04262 13.4466 2.92266C12.0743 2.84561 10.8339 3.44424 10 4.42844C9.16606 3.44424 7.92575 2.84561 6.55343 2.92266C4.41275 3.04291 2.6575 4.84874 2.51042 7.08538C2.41832 8.48697 2.9433 9.76158 3.82832 10.6454L10 17.0827L16.172 10.6454C17.0567 9.76158 17.5817 8.48697 17.4896 7.08538`}
        stroke="#19110B"
      />
    </svg>
  );
};

export default Favourite;
