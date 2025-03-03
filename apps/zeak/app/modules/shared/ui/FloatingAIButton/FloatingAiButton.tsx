import { useNavigate } from "@remix-run/react";
import { Button, Textarea } from "@zeak/react";
import { ValidatedForm } from "@zeak/remix-validated-form";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { z } from "zod";
import { path } from "~/utils/path";

const FloatingAiButton = () => {
  const navigate = useNavigate();
  const [isAskOpen, setIsAskOpen] = useState(false);

  const onSearch = () => {
    console.log("sd");

    navigate(path.to.vendorOnboarding);
    setIsAskOpen(false);
  };
  return (
    <div className="fixed bottom-2 right-2">
      <div className="grid gap-2 items-end">
        <div
          className={`${isAskOpen ? "translate-none opacity-1" : "translate-y-[20px] opacity-0"} ease-in-out duration-300  `}
        >
          {isAskOpen && (
            <ValidatedForm
              validator={z.object({
                prompt: z.string().min(1, "Prompt is required"),
              })}
              className="h-[400px] p-4 bg-background rounded-lg w-[300px]"
            >
              <h3 className="text-lg font-semibold">
                Hello, How can I help you?
              </h3>
              <div className="space-y-2 flex justify-end flex-col">
                <Textarea placeholder="Enter your prompt here..." rows={4} />
                <Button
                  variant="primary"
                  size="lg"
                  className="w-10 h-10 p-0 ml-auto"
                  onClick={onSearch}
                >
                  <BiSearchAlt />
                </Button>
              </div>
            </ValidatedForm>
          )}
        </div>
        <Button
          variant="primary"
          size="lg"
          className="w-[fit-content] ml-auto min-w-[120px]"
          onClick={() => setIsAskOpen(!isAskOpen)}
        >
          {isAskOpen ? "Close" : "Ask Me"}
        </Button>
      </div>
    </div>
  );
};

export default FloatingAiButton;
