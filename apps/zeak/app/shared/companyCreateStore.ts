import { create } from "zustand";
import { combine } from "zustand/middleware";

interface CompanyCreateState {
    activeStep: number;
    companyInfo: any;
    addressInfo: any;
    addressInfoList: any[];
    addressInfoIndex: number;
    editAddressIndex: number;
    additionalInfo: any;
    goToNextStep: () => void;
    setActiveStep: (step: number) => void;
    setCompanyInfo: (info: any) => void;
    setAddressInfo: (info: any) => void;
    setAddressInfoIndex: (index: number) => void;
    setEditAddressIndex: (index: number) => void;
    setAdditionalInfo: (info: any) => void;
}

export const useCompanyCreateStore = create<CompanyCreateState>()(
    combine(
        {
            activeStep: 0,
            companyInfo: null,
            addressInfo: null,
            addressInfoList: [] as any[],
            addressInfoIndex: -1,
            editAddressIndex: -1,
            additionalInfo: null,
        },
        (set) => ({
            goToNextStep: () => set((state) => ({ activeStep: state.activeStep + 1 })),
            setActiveStep: (step: number) => set({ activeStep: step }),
            setCompanyInfo: (info: any) => set({ companyInfo: info }),
            setAddressInfo: (info: any) => set({ addressInfo: info }),
            setAddressInfoIndex: (index: number) => set((state) => {
                if (state.editAddressIndex !== -1) {
                    return {
                        editAddressIndex: -1,
                        addressInfo: null,
                        addressInfoList: state.addressInfoList.map((item, i) => i === state.editAddressIndex ? state.addressInfo : item),
                    }
                }
                return {
                    addressInfoIndex: index,
                    addressInfo: null,
                    addressInfoList: [...state.addressInfoList, state.addressInfo],
                }
            }),
            setEditAddressIndex: (index: number) => set((state) => ({
                editAddressIndex: index,
                addressInfo: state.addressInfoList[index],
            })),
            setAdditionalInfo: (info: any) => set({ additionalInfo: info }),
        })
    )
)