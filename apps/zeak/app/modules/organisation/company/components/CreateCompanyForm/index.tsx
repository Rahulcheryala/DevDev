import { useNavigate, useSubmit } from "@remix-run/react";
import { useState } from "react";
import { path } from "~/utils/path";
import { useCompanyCreateStore } from "~/shared/companyCreateStore";
import AdditionalInfo from "./AdditionalInfo";
import AddressInfoForm from "./AddressInfo";
import { BottomBar } from "./BottomBar";
import CompanyInfo from "./CompanyInfo";
import Summary from "./Summary";
import { StepHeader } from "./StepHeader";
import { stepsList } from "../constants";

export default function CreateCompanyForm({ company }: { company: any }) {
  const navigate = useNavigate();

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
  } = useCompanyCreateStore();
  const submit = useSubmit();

  const onFinish = (saveAndCreateAnother?: boolean) => {
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

    navigate(saveAndCreateAnother ? path.to.companyNew : path.to.companySettings);
  };

  const [disabled, setDisabled] = useState(false);

  const renderStepContainer = (children: React.ReactNode) => {
    return (
      <div className="px-12 py-6">
        <StepHeader title={getActiveStepTitle()} />
        <div className="mt-6">{children}</div>
      </div>
    );
  };

  const getActiveStepTitle = () => {
    return stepsList[activeStep].title;
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <CompanyInfo
            companyInfo={companyInfo}
            companyName={company?.data?.name ?? ''}
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
            setActiveStep={setActiveStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className="flex flex-col flex-1 shrink-0 basis-[63%] bg-white rounded-[12px] rounded-b-none">
      {renderStepContainer(renderStep())}
      <div className="mt-3">
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
