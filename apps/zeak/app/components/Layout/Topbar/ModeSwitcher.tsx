import { IconButton } from "@zeak/react";
import { useFetcher } from "@remix-run/react";
import { BiLaptop, BiMoon, BiSun } from "react-icons/bi";
import { useMode } from "~/hooks/useMode";
import type { action } from "~/root";
import { path } from "~/utils/path";

const ModeSwitcher = () => {
  const mode = useMode();
  const nextMode = mode === "dark" ? "light" : "dark";
  const modeLabel = {
    light: <BiSun size={18} />,
    dark: <BiMoon size={18} />,
    system: <BiLaptop size={18} />,
  };

  const fetcher = useFetcher<typeof action>();

  return (
    <fetcher.Form
      action={path.to.root}
      method="post"
      onSubmit={() => {
        document.body.removeAttribute("style");
      }}
      className="hidden sm:block"
    >
      <input type="hidden" name="mode" value={nextMode} />

      <IconButton
        icon={modeLabel[nextMode]}
        aria-label="Light Mode"
        variant="ghost"
        type="submit"
        className="w-[40px] h-[40px] text-secondary p-0"
      />
    </fetcher.Form>
  );
};

export default ModeSwitcher;
