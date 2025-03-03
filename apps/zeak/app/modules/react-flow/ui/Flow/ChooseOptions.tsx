export const ChooseOptions = ({ data, onNextClick, nodeId }: any) => {
  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-2 w-max">
        {data.map(
          (
            option: {
              isDisabled: boolean | undefined;
              icon: any;
              name: string;
            },
            index: number | null | undefined,
          ) => (
            <button
              onClick={() => {
                onNextClick(option, nodeId);
              }}
              disabled={option.isDisabled}
              className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 `}
              key={option.name}
            >
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-md mr-3 bg-gray-200`}
              >
                <img src={option?.icon} alt="icon" />
              </div>
              <span className="text-sm font-medium leading-[20px]">
                {option.name}
              </span>
            </button>
          ),
        )}
      </div>
    </>
  );
};
