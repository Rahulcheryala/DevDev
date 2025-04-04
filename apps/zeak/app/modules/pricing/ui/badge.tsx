export const BlueYellowBadge = (props: any) => {
  return (
    <span
      className={`bg-gradient-to-r from-[#A8EBC8] to-[#FFDE6D] text-sm font-light ml-4 rounded-full py-1 px-3 ${props.className}`}
    >
      {props.label}
    </span>
  );
};

export const LightGradientBadge = (props: any) => {
  return (
    <span
      className={`bg-gradient-to-r from-[#D8F6DF] to-[#B2F1FA] text-sm font-light ml-4 rounded-full py-1 px-3 ${props.className}`}
    >
      {props.label}
    </span>
  );
};
