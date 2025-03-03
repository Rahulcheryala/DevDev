import { atom } from "nanostores";
import { useNanoStore } from "~/hooks";

const companyStore = atom({
  activeStep: 0,
  companyInfo: null,
  addressInfo: null,
  addressInfoList: [] as any[],
  addressInfoIndex: -1,
  editAddressIndex: -1,
  additionalInfo: null,
});

export const useCompanyStore = () => {
  const [store, setStore] = useNanoStore(companyStore);

  const goToNextStep = () => {
    setStore((current) => ({
      ...current,
      activeStep: current.activeStep + 1,
    }));
  };

  const setActiveStep = (step: number) => {
    setStore((current) => ({
      ...current,
      activeStep: step,
    }));
  };

  const setCompanyInfo = (info: any) => {
    setStore((current) => ({
      ...current,
      companyInfo: info,
    }));
  };

  const setAddressInfo = (info: any) => {
    setStore((current) => ({
      ...current,
      addressInfo: Object.assign({}, current.addressInfo, info),
    }));
  };

  const setAddressInfoIndex = (index: number) => {
    const curAddress = Object.assign({}, store.addressInfo);
    if (store.editAddressIndex !== -1) {
      // update existing address
      setStore((current) => ({
        ...current,
        editAddressIndex: -1,
        addressInfo: null,
        addressInfoList: [
          ...current.addressInfoList.map((item, index) =>
            index === store.editAddressIndex ? curAddress : item
          ),
        ],
      }));
    } else {
      // create new address
      setStore((current) => ({
        ...current,
        addressInfoIndex: index,
        addressInfo: null,
        addressInfoList: [...current.addressInfoList, curAddress],
      }));
    }
  };

  const setEditAddressIndex = (index: number) => {
    setStore((current) => ({
      ...current,
      addressInfo: current.addressInfoList[index],
      editAddressIndex: index,
    }));
  };

  const setAdditionalInfo = (info: any) => {
    setStore((current) => ({
      ...current,
      additionalInfo: info,
    }));
  };

  return {
    ...store,
    goToNextStep,
    setActiveStep,
    setCompanyInfo,
    setAddressInfo,
    setAddressInfoIndex,
    setEditAddressIndex,
    setAdditionalInfo,
  };
};
