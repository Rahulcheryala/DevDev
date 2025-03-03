import React from "react";
import avatar from "../assets/icons/shared/avatar.svg";

import { useStoreStateValue } from "@scena/react-store";
import { $editor } from "../stores/stores";

const Footer = () => {
  const editorRef = useStoreStateValue($editor);

  const lastUpdatedAt = editorRef.current?.lastUpdated || "";
  const userName = editorRef.current?.username || "";
  const avatarUrl = editorRef.current?.avatarUrl || "";
  const lastNameInitial = userName.split(" ").pop()?.charAt(0).toUpperCase();
  const firstNameInitial = userName.charAt(0).toUpperCase();

  const initals = firstNameInitial + lastNameInitial;

  return (
    <div
      className={`w-full bg-white h-[56px] flex flex-grow items-center border-t-[1px] border-gray-200`}
    >
      <div className="flex flex-row justify-between w-full h-full px-4 items-center">
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col border-r-[1px] border-gray-200 pr-2">
            <div className="text-[10px] text-gray-500">Last modified by</div>
            <div className="text-blue-400 text-[12px]">{userName}</div>
          </div>
          <div className="flex flex-col ">
            <div className="text-[10px] text-gray-500">Edited</div>
            <div className="text-[12px]">{lastUpdatedAt}</div>
          </div>
        </div>

        <div className="flex flex-row space-x-2 h-full items-center">
          {avatarUrl && (
            <div className="rounded-full contain">
              <img src={avatarUrl || avatar} width={"32px"} height={"32px"} />
            </div>
          )}
          <div className="h-full border-t-2 border-red-400 items-center flex">
            <div
              className="w-[32px] h-[32px] rounded-full bg-red-400 
                    text-white grid place-content-center text-md"
            >
              {initals}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
