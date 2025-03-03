import { BellOutlineIcon1 } from "@zeak/icons";
import { Avatar, Button } from "@zeak/react";

type Props = {
  content: string;
  userName: string;
};

const InAppContent = ({ content, userName }: Props) => {
  return (
    <>
      <div className="space-y-10">
        <div className="rounded-md border border-stroke py-6 pl-[88px] pr-[60px] relative">
          <span className="w-3 absolute right-6 top-6 inline-block h-3 rounded-full bg-accent-primary ring-[6px] ring ring-[hsl(var(--accent-primary),_0.2)]"></span>
          <div className="absolute left-6 top-4">
            <Avatar
              size="ten"
              src="https://www.w3schools.com/howto/img_avatar.png"
            />
            <span className="bottom-0 left-7 absolute flex justify-center items-center  w-4 h-4 bg-accent-dark rounded-full">
              <BellOutlineIcon1 color="#ffffff" size="10" />
            </span>
          </div>
          <div className="mb-5">
            <h4 className="text-textLink">
              <span className="font-semibold">{userName}</span> sent you a
              notification
            </h4>
            <p className="text-sm text-tertiary">Just now</p>
          </div>
          <div className="p-4 border border-stroke bg-accent-gray rounded-md mb-8">
            <p className="text-sm text-tertiary">{content}</p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="primary"
              className="px-[18px] py-2 h-10 rounded-sm"
            >
              View Now
            </Button>
            <Button
              variant="ghost"
              className="py-[18px] py-2 h-10 rounded-sm hover:text-accent-primary text-accent-primary"
            >
              Mark as Read
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InAppContent;
