import React from 'react'
import { atom } from 'nanostores'
import { useNanoStore } from '~/hooks'


const masterlistValueStore = atom({
    masterListId: "",
    value: "",
    meaning: "",
    setDefault: false,
    isActive: true,
    createNewActive: false,
})

export const useMasterlistValueStore = () => {
    const [store, setStore] = useNanoStore(masterlistValueStore)

    const setMasterListId = (masterListId: string) => {
        setStore(current => ({ ...current, masterListId }))
    }

    const setValue = (value: string) => {
        setStore(current => ({ ...current, value }))
    }

    const setMeaning = (meaning: string) => {
        setStore(current => ({ ...current, meaning }))
    }

    const setSetDefault = (setDefault: boolean) => {
        setStore(current => ({ ...current, setDefault }))
    }

    const setIsActive = (isActive: boolean) => {
        setStore(current => ({ ...current, isActive }))
    }
    return {
        ...store,
        setMasterListId,
        setValue,
        setMeaning,
        setSetDefault,
        setIsActive
    }
}