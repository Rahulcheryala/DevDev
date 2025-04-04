// // app/routes/api.track-schema.ts

// import {
//   json,
//   type ActionFunctionArgs,
//   type LoaderFunctionArgs,
// } from "@remix-run/node";
// import { getSupabaseServiceRole } from "~/lib/supabase";

// app/routes/api/create-table.ts
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_API_URL!,
  process.env.SUPABASE_ANON_PUBLIC!
);

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { error: tableError } = await supabase.rpc('create_table_with_columns', {
      table_name: 'supabaseTestTable',
      column_definitions: [
        {
          name: 'createdAt',
          type: 'timestamp with time zone',
          default_value: 'now()'
        },
        {
          name: 'createdBy',
          type: 'text',
          default_value: null
        }
      ]
    });

    if (tableError) {
      console.error('Error creating table:', tableError);
      return json({ error: 'Failed to create table' }, { status: 500 });
    }

    // Track schema changes
    await supabase.functions.invoke('track-schema-changes');

    return json({
      message: 'Table created successfully',
      table: 'supabaseTestTable'
    }, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    return json({ error: 'Internal server error' }, { status: 500 });
  }
};