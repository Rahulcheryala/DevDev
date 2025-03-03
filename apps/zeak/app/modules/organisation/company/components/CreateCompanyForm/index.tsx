import { useSubmit } from "@remix-run/react";
import { useState } from "react";
import { path } from "~/utils/path";
import { useCompanyStore } from "../../utils/useCompanyStore";
import AdditionalInfo from "./AdditionalInfo";
import AddressInfoForm from "./AddressInfo";
import { BottomBar } from "./BottomBar";
import CompanyInfo from "./CompanyInfo";
import Summary from "./Summary";

export default function CreateCompanyForm({ company }: { company: any }) {
  const {
    activeStep,
    setActiveStep,
    companyInfo,
    setCompanyInfo,
    addressInfo,
    setAddressInfo,
    addressInfoList,
    addressInfoIndex,
    setAddressInfoIndex,
    additionalInfo,
    setAdditionalInfo,
    setEditAddressIndex,
  } = useCompanyStore();
  const submit = useSubmit();

  const onFinish = () => {
    const formData = new FormData();
    formData.append("tenantId", company.data.tenantId);
    if (companyInfo) {
      Object.keys(companyInfo).forEach((key) =>
        formData.append(key, companyInfo[key])
      );
    }
    if (addressInfoList) {
      formData.append("addressInfoList", JSON.stringify(addressInfoList));
    }

    submit(formData, {
      method: "post",
      action: path.to.companyCreate,
      replace: true,
    });

    // navigate(path.to.companySettings);
  };

  const [disabled, setDisabled] = useState(false);

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <CompanyInfo
            companyInfo={companyInfo}
            setCompanyInfo={setCompanyInfo}
          />
        );
      case 1:
        return (
          <AddressInfoForm
            addressInfo={addressInfo}
            addressInfoList={addressInfoList}
            setAddressInfo={setAddressInfo}
            addressInfoIndex={addressInfoIndex}
            setAddressInfoIndex={setAddressInfoIndex}
            setDisabled={setDisabled}
            onEditAddress={setEditAddressIndex}
          />
        );
      case 2:
        return (
          <AdditionalInfo
            additionalInfo={additionalInfo}
            setAdditionalInfo={setAdditionalInfo}
          />
        );
      case 3:
        return (
          <Summary
            companyInfo={companyInfo}
            addressInfoList={addressInfoList}
            additionalInfo={additionalInfo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className="flex relative flex-col gap-4 bg-white rounded-zeak  w-full pb-10 mb-24">
      {renderStep()}
      <div className="mt-10">
        <BottomBar
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          onFinish={onFinish}
          disabled={disabled}
        />
      </div>
    </form>
  );
}
