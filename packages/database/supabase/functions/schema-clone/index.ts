import { serve } from "https://deno.land/std@0.175.0/http/server.ts";
import { DB, getConnectionPool, getDatabaseClient } from "../lib/database.ts";
import { corsHeaders } from "../lib/headers.ts";
import { getSupabaseServiceRole } from "../lib/supabase.ts";
// import { Database } from "../lib/types.ts";
// import { createClient } from '@supabase/supabase-js';

const pool = getConnectionPool(10);
const db = getDatabaseClient<DB>(pool);

export const handler = async (req: Request) => {
  try {
    const body = await req.json();
    const { newSchemaName } = body;

    if (!newSchemaName) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Payload is missing newSchemaName"
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Initialize Supabase client
    const supabase = getSupabaseServiceRole(req.headers.get("Authorization"))

    // Execute the function
    const { data, error } = await supabase
      .rpc('clone_schema_tables', { new_schema_name: newSchemaName });

    if (error) throw error;

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully cloned golden schema to ${newSchemaName}`,
        data: newSchemaName
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );

  } catch (err) {
    console.error('Schema clone error:', err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server error',
        details: err.toString()
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(async (req: Request) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  return handler(req);
});