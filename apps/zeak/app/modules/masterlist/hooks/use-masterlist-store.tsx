import { atom } from "nanostores";
import { useNanoStore } from "~/hooks";



const masterlistStore = atom({
    isCreateMasterlistOpen: false,
    activeStep: 1,
    masterListView: "All",
    sortList: "none",
    isCreateNewValueActive: false,
    isCreateNewMappingActive: false,
    createdMasterlistId: "",
    isEditing: false,
    selectedMasterListStatus: false,
    confirmDeleteMasterlist: false,
    masterlistIdToDelete: "",
    confirmDeactivateMasterlist: false,
    masterlistIdToDeactivate: "",
    confirmDuplicateMasterlist: false,
    masterlistIdToDuplicate: "",
    isCreateNewMappingRow: false,
    searchTerm: "",
    editMasterlist: {

    }



});

export const useMasterlistStore = () => {
    const [store, setStore] = useNanoStore(masterlistStore)

    const setIsCreateMasterlistOpen = (isCreateMasterlistOpen: boolean) => {
        setStore(current => ({ ...current, isCreateMasterlistOpen }))
    }

    const setActiveStep = (activeStep: number) => {
        setStore(current => ({ ...current, activeStep }))
    }

    const setIsCreateNewValueActive = (isCreateNewValueActive: boolean) => {
        setStore(current => ({ ...current, isCreateNewValueActive }))
    }

    const setCreatedMasterlistId = (createdMasterlistId: string) => {
        setStore(current => ({ ...current, createdMasterlistId }))
    }

    const setIsEditing = (isEditing: boolean) => {
        setStore(current => ({ ...current, isEditing }))
    }

    const setConfirmDeleteMasterlist = (confirmDeleteMasterlist: boolean) => {
        setStore(current => ({ ...current, confirmDeleteMasterlist }))
    }

    const setMasterlistIdToDelete = (masterlistIdToDelete: string) => {
        setStore(current => ({ ...current, masterlistIdToDelete }))
    }

    const setEditMasterlist = (editMasterlist: any) => {
        setStore(current => ({ ...current, editMasterlist }))
    }

    const setConfirmDeactivateMasterlist = (confirmDeactivateMasterlist: boolean) => {
        setStore(current => ({ ...current, confirmDeactivateMasterlist }))
    }
    const setConfirmDuplicateMasterlist = (confirmDuplicateMasterlist: boolean) => {
        setStore(current => ({ ...current, confirmDuplicateMasterlist }))
    }
    const setMasterlistIdToDuplicate = (masterlistIdToDuplicate: string) => {
        setStore(current => ({ ...current, masterlistIdToDuplicate }))
    }
    const setMasterlistIdToDeactivate = (masterlistIdToDeactivate: string) => {
        setStore(current => ({ ...current, masterlistIdToDeactivate }))
    }

    const setIsCreateNewMappingActive = (isCreateNewMappingActive: boolean) => {
        setStore(current => ({ ...current, isCreateNewMappingActive }))
    }
    const setIsCreateNewMappingRow = (isCreateNewMappingRow: boolean) => {
        setStore(current => ({ ...current, isCreateNewMappingRow }))
    }
    const setMasterListView = (masterListView: "All" | "System" | "User Defined") => {
        setStore(current => ({ ...current, masterListView }))
    }
    const setSearchTerm = (searchTerm: string) => {
        setStore(current => ({ ...current, searchTerm }))
    }
    const setSortList = (sortList: "asc" | "desc" | "none") => {
        setStore(current => ({ ...current, sortList }))
    }
    const setSelectedMasterListStatus = (selectedMasterListStatus: boolean) => {
        setStore(current => ({ ...current, selectedMasterListStatus }))
    }

    return {
        ...store,
        setIsCreateMasterlistOpen,
        setActiveStep,
        setIsCreateNewValueActive,
        setCreatedMasterlistId,
        setIsEditing,
        setConfirmDeleteMasterlist,
        setMasterlistIdToDelete,
        setEditMasterlist,
        setConfirmDeactivateMasterlist,
        setMasterlistIdToDeactivate,
        setMasterlistIdToDuplicate,
        setConfirmDuplicateMasterlist,
        setIsCreateNewMappingActive,
        setIsCreateNewMappingRow,
        setMasterListView,
        setSearchTerm,
        setSortList,
        setSelectedMasterListStatus
    }
}