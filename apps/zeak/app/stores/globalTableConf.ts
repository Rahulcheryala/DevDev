import { atom } from "nanostores";
import { useNanoStore } from "~/hooks";

const $globalTableConfStore = atom<Record<string, string>>({});
export const useGlobalTableConfStore = () =>
  useNanoStore($globalTableConfStore, "tableConf");
