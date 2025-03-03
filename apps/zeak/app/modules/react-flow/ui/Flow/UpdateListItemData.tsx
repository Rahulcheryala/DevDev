import type { ChangeEvent } from "react";
import { useState } from "react";
import { Button, Input } from "@zeak/react";
import { WebEye, WebEyeClosed, WebTrigerLighting } from "@zeak/icons";
import Spinner from "../Spinner";
import "@xyflow/react/dist/style.css";
import { useFetcher } from "@remix-run/react";
import { path } from "~/utils/path";

export const UpdateListItemData = ({ data, onBackClick, onNextClick }: any) => {
  const [state, setState] = useState({
    ...data,
  });
  const [togglePassword, setTogglePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const fetcher = useFetcher();

  const validButton = () => {
    if (data.category === "Dynamics 365 F&O") {
      const valid = state.clientId && state.clientSecret && state.resourceUrl;
      return valid;
    }
    return true;
  };

  const handleToggle = () => setTogglePassword((prev) => !prev);

  const stateChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setState((prev: typeof data) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextClickHandler = () => {
    setLoading(true);
    const { clientId, clientSecret, resourceUrl, id } = state;
    if (clientId && clientSecret && resourceUrl && id) {
      fetcher.submit(
        {
          data: { clientId, clientSecret, resourceUrl, category: id },
          action: "insertTriggerCreds",
        },
        {
          action: path.to.reactflowHomeTab,
          method: "post",
          encType: "application/json",
        },
      );
    }
    setTimeout(onNextClick, 1000);
  };

  return (
    <>
      <div
        style={{
          boxShadow: "0px 9px 28px 8px #0000000D",
          borderRadius: "10px",
        }}
      >
        <div
          className="rounded-lg overflow-hidden shadow-react-flow-container"
          style={{
            boxShadow: "0px 9px 28px 8px #0000000D",
          }}
        >
          <div className="flex items-center justify-between bg-accent-lightGreen">
            <div className="p-3 bg-[#E1F4EF] flex items-center rounded-t-[10px] w-full">
              <WebTrigerLighting color="#04A777" />
              <span className="text-[#04A777] ml-3 text-xs">TRIGGER</span>
            </div>
          </div>
          {data.category === "Dynamics 365 F&O" ? (
            <>
              <div className="p-4 shadow-react-flow-container relative">
                {loading ? <Spinner /> : null}
                <ul className="-mb-[5px]">
                  <li
                    data-key={data.id}
                    className={`flex items-center my-[5px] pb-4 rounded-[10px] hover:border-accent-p2`}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                      <img src={data.logoImage} alt="" width={28} height={28} />
                    </div>
                    <div className="ml-4 text-left">
                      <h3 className="text-sm">{data.category}</h3>
                      <p className="text-sm text-tertiary">
                        {data.categoryDesc}
                      </p>
                    </div>
                  </li>
                </ul>

                <div
                  className={`form transition-all ${
                    loading ? "blur-[2px]" : ""
                  }`}
                >
                  <div className="relative mb-2">
                    <p className="text-sm text-left my-2 pt-2">Client ID</p>
                    <Input
                      value={state.clientId}
                      onChange={stateChangeHandler}
                      placeholder="Enter your client id"
                      name="clientId"
                      size="md"
                    />
                  </div>

                  <div className="relative mb-2">
                    <p className="text-sm text-left my-2 pt-2">Client Secret</p>
                    <Input
                      value={state.clientSecret}
                      onChange={stateChangeHandler}
                      placeholder="Enter your client secret"
                      type={togglePassword ? "text" : "password"}
                      name="clientSecret"
                      size="md"
                    />
                    <Button
                      onClick={handleToggle}
                      variant="ghost"
                      className="w-6 h-6 p-0 cursor-pointer rounded-full right-4 absolute top-[50%]" //hover:bg-accent-lightGreen
                    >
                      {togglePassword ? <WebEye /> : <WebEyeClosed />}
                    </Button>
                  </div>

                  <div className="relative mb-2">
                    <p className="text-sm text-left my-2 pt-2">Resource URL</p>
                    <Input
                      value={state.resourceUrl}
                      onChange={stateChangeHandler}
                      placeholder="Enter your resource url"
                      name="resourceUrl"
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <ul className="-mb-[5px]">
              <li
                data-key={data.id}
                className={`flex items-center my-[5px] pb-4 rounded-[10px] hover:border-accent-p2`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-[6px] bg-[#F2F1FD]">
                  <img src={data.logoImage} alt="" width={28} height={28} />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-sm">{data.category}</h3>
                  <p className="text-sm text-tertiary">{data.categoryDesc}</p>
                </div>
              </li>
            </ul>
          )}
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
              disabled={!validButton}
              onClick={nextClickHandler}
            >
              {loading ? "Loading..." : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
