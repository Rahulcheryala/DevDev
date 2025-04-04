import { optionData } from "./ui/workflow/optionData";
import { List_Items } from "./ui/workflow/triggerCategories";
import { getSupabaseServiceRole } from "~/lib/supabase";

const supabaseAdmin = getSupabaseServiceRole()

// Seed triggerCategories and whensTriggerRows
const seedTriggerTables = async (companyId: string, createdBy: string) => {
  for (const item of List_Items) {
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
          modifiedBy: createdBy,
        },
      ])
      .select();

    if (categoryError) {
      console.log(categoryError);
      throw categoryError;
    }

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
            modifiedBy: createdBy,
          },
        ]);

      if (triggerError) {
        console.log(triggerError);
        throw triggerError;
      }
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
            modifiedBy: createdBy,
          },
        ]);

      if (eventError) {
        console.log(eventError);
        throw eventError;
      }
    }
  }
};

export const triggerSeed = async (userId: any, companyId: any) => {
  // const details = await getUserAndCompanyDetails();
  // if (!details) {
  //   console.warn(
  //     "User or company details unavailable, skipping trigger seeding."
  //   );
  //   process.exit(1);
  // }

  // const { userId, companyId } = details;

  await seedTriggerTables(companyId, userId);
  console.log(`Database seeded with trigger-related tables.`);
};

// seed().catch((e) => {
//   console.error(e);
//   process.exit(1);
// });
