import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";

dotenv.config();

const supabaseAdmin = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

const listItems = [
  {
    imageUrl: "/images/dynamics365.png",
    background: "#F2F1FD",
    name: "Dynamics 365 F&O",
    categoryId: "Dynamics 365 F&O",
    description: "Lorem ipsum dolor sit amet set consectetur.",
    clientId: 1002024,
    clientSecret: "askdnkjasndvanrewvkjnedrvaner",
    resourceUrl: "http://loremipsum.dynamics.com",
    trigger: [
      {
        name: "Sales order is created",
        description: "When a sales order is created in my ERP",
        showSecondaryOptions: false,
        isDisabled: false,
        imageUrl: "/images/dynamics365.png",
      },
    ],
  },
  {
    imageUrl: "/images/businessCentral.svg",
    background: "#DEFDFF",
    name: "Business Central",
    categoryId: "Business Central",
    description: "Lorem ipsum dolor sit amet set consectetur.",
    clientId: 1002025,
    clientSecret: "askdnkjasndvanrewvkjnedrvaner",
    resourceUrl: "http://loremipsum.business.com",
    trigger: [
      {
        name: "Get New Customer Info",
        description: "Event (Create)",
        from: "CustomerV2",
      },
    ],
  },
  {
    imageUrl: "/images/businessCentral.svg",
    background: "#DEFD88",
    name: "Core Platform",
    categoryId: "Core Platform",
    description: "Lorem ipsum dolor sit amet set consectetur.",
    clientId: 1002025,
    clientSecret: "askdnkjasndvanrewvkjnedrvaner",
    resourceUrl: "http://loremipsum.business.com",
    trigger: [
      {
        name: "Get New Customer Info",
        description: "Event (Create)",
        from: "CustomerV2",
      },
    ],
  },
  {
    imageUrl: "/images/businessCentral.svg",
    background: "#DEFD88",
    name: "Sequential approval",
    categoryId: "Core Platform",
    description: "Lorem ipsum dolor sit amet set consectetur.",
    clientId: 1002025,
    clientSecret: "askdnkjasndvanrewvkjnedrvaner",
    resourceUrl: "http://loremipsum.business.com",
    trigger: [
      {
        name: "Start approval process",
        description: "Event (Create)",
        from: "CustomerV2",
      },
    ],
  },
  {
    imageUrl: "/images/businessCentral.svg",
    background: "#DEFD88",
    name: "Parallel approval",
    categoryId: "Core Platform",
    description: "Lorem ipsum dolor sit amet set consectetur.",
    clientId: 1002025,
    clientSecret: "askdnkjasndvanrewvkjnedrvaner",
    resourceUrl: "http://loremipsum.business.com",
    trigger: [
      {
        name: "Start approval process",
        description: "Event (Create)",
        from: "CustomerV2",
      },
    ],
  },
];

const optionData = [
  {
    optionsTitle: "Modules",
    events: [
      {
        id: "1",
        icon: "apps/zeak/app/modules/react-flow/ui/Flow/assets/Integration.svg",
        title: "Send email",
        description: "When a sales order is created in my ERP",
        showSecondaryOptions: false,
        isDisabled: false,
        background: "rgba(234, 27, 34, 0.12)",
        notificationType: "email",
        toEmail: [],
      },
      {
        id: "2",
        icon: "apps/zeak/app/modules/react-flow/ui/Flow/assets/Integration.svg",
        title: "Send sequential approval email",
        description: "When a sales order is created in my ERP",
        showSecondaryOptions: false,
        isDisabled: false,
        background: "rgba(234, 27, 34, 0.12)",
        notificationType: "email",
        toEmail: [
          { email: "testuser@example.com" },
          { email: "testuserOne@example.com" },
          { email: "testuserTwo@example.com" },
        ],
      },
      {
        id: "3",
        icon: "apps/zeak/app/modules/react-flow/ui/Flow/assets/Integration.svg",
        title: "Send parallel approval email",
        description: "When a sales order is created in my ERP",
        showSecondaryOptions: false,
        isDisabled: false,
        background: "rgba(234, 27, 34, 0.12)",
        notificationType: "email",
        toEmail: [
          { email: "testuser@example.com" },
          { email: "testuserOne@example.com" },
          { email: "testuserTwo@example.com" },
        ],
      },
      {
        id: "4",
        icon: "apps/zeak/app/modules/react-flow/ui/Flow/assets/Integration.svg",
        title: "Send all approved mail",
        description: "When a sales order is created in my ERP",
        showSecondaryOptions: false,
        isDisabled: false,
        background: "rgba(234, 27, 34, 0.12)",
        notificationType: "email",
        toEmail: [
          { email: "testuser@example.com" },
          { email: "testuserOne@example.com" },
          { email: "testuserTwo@example.com" },
        ],
      },
    ],
  },
];

// Function to get user and company details
const getUserAndCompanyDetails = async (): Promise<{
  userId: string;
  companyId: string;
  companyName: string;
} | null> => {
  const { data: userToCompanyData, error: userToCompanyError } =
    await supabaseAdmin
      .from("userToCompany")
      .select("userId, companyId")
      .single();

  if (userToCompanyError || !userToCompanyData) {
    console.warn("No user_to_company records found.");
    return null;
  }

  const { companyId, userId } = userToCompanyData;

  const { data: companyData, error: companyError } = await supabaseAdmin
    .from("company")
    .select("name")
    .eq("id", companyId)
    .single();

  if (companyError || !companyData) {
    throw new Error("Error fetching company details");
  }

  return { userId, companyId, companyName: companyData.name };
};

// Seed triggerCategories and whensTriggerRows
const seedTriggerTables = async (companyId: string, createdBy: string) => {
  for (const item of listItems) {
    // Insert into triggerCategories
    const { error: categoryError, data: categoryData } = await supabaseAdmin
      .from("triggerCategories")
      .insert([
        {
          category: item.name,
          categoryDesc: item.description,
          logoImage: item.imageUrl,
          background: item.background,
          clientId: item.clientId?.toString(), // Convert to string if needed
          clientSecret: item.clientSecret,
          resourceUrl: item.resourceUrl,
          companyId: companyId,
          createdBy: createdBy,
        },
      ])
      .select();

    if (categoryError) throw categoryError;

    const categoryId = categoryData![0].id;

    // Insert triggers related to the category into whensTriggerRows
    for (const trigger of item.trigger) {
      const { error: triggerError } = await supabaseAdmin
        .from("whensTriggerRows")
        .insert([
          {
            name: trigger.name,
            description: trigger.description,
            imageUrl: trigger?.imageUrl || null,
            showSecondaryOptions: trigger.showSecondaryOptions,
            isDisabled: trigger.isDisabled,
            metadata: trigger.metadata ?? {},
            categoryId: categoryId,
            companyId: companyId,
            createdBy: createdBy,
          },
        ]);

      if (triggerError) throw triggerError;
    }
  }
  // Seed triggerEvents
  for (const option of optionData) {
    for (const event of option.events) {
      const { error: eventError } = await supabaseAdmin
        .from("triggerEvents")
        .insert([
          {
            eventName: event.title,
            eventDesc: event.description,
            eventLogo: null, // No event_logo provided
            icon: null, // No icon provided; adjust if you have icon data
            showSearchBar: false, // Assuming false; adjust as needed
            placeholder: null, // No placeholder provided
            titleBg: event.background,
            titleColor: null, // No title_color provided; adjust as needed
            companyId: companyId,
            createdBy: createdBy,
          },
        ]);

      if (eventError) throw eventError;
    }
  }
};

async function seed() {
  const details = await getUserAndCompanyDetails();
  if (!details) {
    console.warn(
      "User or company details unavailable, skipping trigger seeding.",
    );
    process.exit(1);
  }

  const { userId, companyId } = details;

  await seedTriggerTables(companyId, userId);
  console.log(`Database seeded with trigger-related tables.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
