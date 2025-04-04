import { useNanoStore } from "~/hooks";
import { atom } from "nanostores";

export const editTableState = atom({
    showColumnSearch: false,
    showColumnFilter: false,
    showColumnSort: false,
});

export const useEditTableState = () => { }