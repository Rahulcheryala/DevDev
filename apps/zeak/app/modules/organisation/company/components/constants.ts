export const stepsList = [
  {
    id: 1,
    title: "General",
    subTitle:
      "Provide the basic details of the company, including its name, unique code, Zeak URL (auto generated), website, and effective start date.",
    isActive: true,
    isCompleted: false,
    label: "1",
    isRequired: true,
  },
  {
    id: 2,
    title: "Address",
    subTitle:
      "Add one or more addresses for the company, specifying the address type (e.g., billing, shipping) and linking it to a related contact.",
    isActive: false,
    isCompleted: false,
    label: "2",
    isRequired: true,
  },
  {
    id: 3,
    title: "Additional Info",
    subTitle:
      "Enter supplementary information like the company's BBB number, DNB details, and fiscal period settings for compliance and financial reporting.",
    isActive: false,
    isCompleted: false,
    label: "3",
    isRequired: false,
  },
  {
    id: 4,
    title: "Summary",
    subTitle:
      "Review all entered information for accuracy before submitting the company's profile to Zeak.",
    isActive: false,
    isCompleted: false,
    label: "4",
    isRequired: true,
  },
];
