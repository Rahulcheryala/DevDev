import { atom } from "nanostores";
import { useNanoStore } from "~/hooks";

const $viewTableConfStore = atom<{
  colWidthInTableConf: Record<string, any> | null;
}>({
  colWidthInTableConf: null,
});
export const useViewTableConfStore = () =>
  useNanoStore($viewTableConfStore, "viewTableConf");
