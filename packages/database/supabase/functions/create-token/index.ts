// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

// Import dependencies
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import * as jose from 'https://deno.land/x/jose@v4.14.4/index.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

console.log("Hello from Functions!")

//@Yash, we need to get the JWT_SECRET from the environment variables, its hardcoded right now.

const JWT_SECRET = Deno.env.get('JWT_SECRET') || 'super-secret-jwt-token-with-at-least-32-characters-long'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''

interface RequestBody {
  user_id: string
}

serve(async (req: Request) => {
  // CORS handling for preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    // Ensure POST method
    if (req.method !== 'POST') {
      throw new Error('Method not allowed')
    }

    // Get user_id from request body
    const { user_id } = await req.json()
    if (!user_id) {
      throw new Error('User ID is required')
    }

    // Try direct REST API call
    const response = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?id=${user_id}`, {
      headers: {
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
    })

    console.log('REST API response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    })

    const userData = await response.json()
    console.log('User data:', userData)

    if (!userData || !userData.users || userData.users.length === 0) {
      throw new Error('User not found')
    }

    // Verify the returned user ID matches exactly
    const user = userData.users[0]
    if (user.id !== user_id) {
      throw new Error('Invalid user ID')
    }

    // Verify we have the email before using it
    if (!user.email) {
      throw new Error('User email not found')
    }

    // Create JWT with claims
    const token = await new jose.SignJWT({
      role: 'authenticated',
      aud: 'authenticated',
      sub: user_id,
      email: user.email,
      app_metadata: {
        provider: 'email'
      },
      user_metadata: {},
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .sign(new TextEncoder().encode(JWT_SECRET))

    // Return the token
    return new Response(
      JSON.stringify({ token }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  } catch (error) {
    console.error('Function error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error.stack,
        // Add more debug info
        env: {
          hasJwtSecret: !!JWT_SECRET,
          hasSupabaseUrl: !!SUPABASE_URL,
          hasServiceRole: !!SUPABASE_SERVICE_ROLE_KEY,
          supabaseUrl: SUPABASE_URL
        }
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-token' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
