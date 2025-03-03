import React from "react";
import { getInitials } from "../../../../utils/shared/Comments";

export const ProfileIcon: React.FC<{ isIcon: boolean; user: any }> = ({
  isIcon,
  user,
}) => {
  return (
    <React.Fragment>
      {isIcon ? (
        <div
          className="profile-icon bg-white border w-9 h-9 p-[5px] rounded-t-[50%]
                 rounded-r-[50%] rounded-br-[50%] text-[10px] shadow-lg"
        >
          <span
            className="bg-red-800 w-6 h-6 flex justify-center 
                    items-center text-white rounded-full"
          >
            {getInitials(user?.fullName || "X")}
          </span>
        </div>
      ) : (
        <div className="w-8 h-8 bg-red-800 rounded-full flex text-[10px] justify-center items-center text-white">
          {getInitials(user?.fullName || "X")}
        </div>
      )}
    </React.Fragment>
  );
};
