import { useNanoStore } from "./useNanoStore";
import { atom } from "nanostores";

const datatableStore = atom({
    isCompact: false,
    showColumnSearch: false,
    enableAlternateRowColor: false,
    selectedColumnId: "",
    selectedCondition: "",
    filterValue: "",
    matchValue: "",
    matchType: "",
    matchCondition: "",
    sortUndefined: "first",
    conditionalRenderingColId: "",
    newColumnName: "",
    newColType: "string",
    isAddNewRow: false,
    isAddNewColumn: false
})

export const useDatatableStore = () => {
    const [store, setStore] = useNanoStore(datatableStore)

    const setIsCompact = (isCompact: boolean) => {
        setStore({
            ...store,
            isCompact
        })
    }

    const setShowColumnSearch = (showColumnSearch: boolean) => {
        setStore({
            ...store,
            showColumnSearch
        })
    }

    const setSelectedColumnId = (columnId: string) => {
        setStore({
            ...store,
            selectedColumnId: columnId
        })
    }

    const setSelectedCondition = (condition: string) => {
        setStore({
            ...store,
            selectedCondition: condition
        })
    }

    const setFilterValue = (filterValue: string) => {
        setStore({
            ...store,
            filterValue: filterValue
        })
    }

    const setEnableAlternateRowColor = (enableAlternateRowColor: boolean) => {
        setStore({
            ...store,
            enableAlternateRowColor
        })
    }

    const setSortUndefined = (sortUndefined: "first" | "last") => {
        setStore({
            ...store,
            sortUndefined
        })
    }

    const setMatchValue = (matchValue: string) => {
        setStore({
            ...store,
            matchValue
        })
    }

    const setMatchType = (matchType: string) => {
        setStore({
            ...store,
            matchType
        })
    }

    const setMatchCondition = (matchCondition: string) => {
        setStore({
            ...store,
            matchCondition
        })
    }

    const setConditionalRenderingColId = (conditionalRenderingColId: string) => {
        setStore({
            ...store,
            conditionalRenderingColId
        })
    }

    const setNewColumnName = (newColumnName: string) => {
        setStore({
            ...store,
            newColumnName
        })
    }
    const setIsAddNewRow = (isAddNewRow: boolean) => {
        setStore({
            ...store,
            isAddNewRow
        })
    }
    const setIsAddNewColumn = (isAddNewColumn: boolean) => {
        setStore({
            ...store,
            isAddNewColumn
        })
    }
    const setNewColType = (newColType: string) => {
        setStore({
            ...store,
            newColType
        })
    }
    return {
        ...store,
        setIsCompact,
        setShowColumnSearch,
        setSelectedColumnId,
        setSelectedCondition,
        setFilterValue,
        setEnableAlternateRowColor,
        setMatchValue,
        setMatchType,
        setMatchCondition,
        setSortUndefined,
        setConditionalRenderingColId,
        setNewColumnName,
        setIsAddNewRow,
        setIsAddNewColumn,
        setNewColType
    }
}