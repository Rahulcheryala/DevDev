import { useState } from "react";
import { Button, IconButton, Input } from "@zeak/react";
import { MdClose } from "react-icons/md";
import { CiClock1, CiCalendar } from "react-icons/ci";
import { GoSun } from "react-icons/go";
import "@xyflow/react/dist/style.css";

export const ScheduleTab = ({ onBackClick, onNextClick }: any) => {
  const [name, setName] = useState("");

  return (
    <>
      <div className="mt-[-20px]">
        <div className="relative mb-5">
          <h3 className="text-sm text-left pb-3 font-normal">Name</h3>
          <Input
            value={name}
            onChange={(evt) => setName(evt.target.value)}
            placeholder="Sample name..."
            name="name"
            size="md"
          />
        </div>

        <div className="pl-6 border-l-4 border-[#0E77D3]">
          <h3 className="text-sm flex items-center justify-between mb-3 font-normal">
            <span>Event happens on</span>

            <IconButton
              icon={<MdClose size={20} />}
              variant="ghost"
              aria-label="Clear"
              size="md"
            />
          </h3>

          <div>
            <div className="mb-3 flex items-center justify-between rounded-[10px] p-3 border border-input">
              <div className="!text-base">
                <span>Repeat ... Month</span>
              </div>

              <IconButton
                icon={<CiClock1 size={20} />}
                variant="ghost"
                aria-label="Clear"
                size="md"
              />
            </div>
            <div className="mb-3 flex items-center justify-between rounded-[10px] p-3 border border-input">
              <div className="!text-base">
                <span>3 day</span>
              </div>

              <IconButton
                icon={<CiCalendar size={20} />}
                variant="ghost"
                aria-label="Clear"
                size="md"
              />
            </div>
            <div className="mb-3 flex items-center justify-between rounded-[10px] p-3 border border-input">
              <div className="!text-base">
                <span>02:00 AM</span>
              </div>

              <IconButton
                icon={<GoSun size={20} />}
                variant="ghost"
                aria-label="Clear"
                size="md"
              />
            </div>
          </div>

          <div className="my-3">
            <Button
              onClick={console.log}
              variant="link"
              className="text-[#0E77D3] flex items-center gap-2 !no-underline"
            >
              <span className="text-lg">+</span>
              Add another
            </Button>
          </div>

          <hr />
          <div className="flex justify-between items-center pt-[20px] pb-4 px-4">
            <Button
              variant="ghost"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onBackClick}
            >
              Back
            </Button>
            <Button
              variant="primary"
              className="px-7 rounded-[100px]"
              size="lg"
              onClick={onNextClick}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
