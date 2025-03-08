# Create Token Edge Function

This Edge Function creates a JWT token for authenticated users in the Supabase ecosystem.

## Overview

The function accepts a user ID and generates a signed JWT token containing user information and claims. This token can be used for authentication purposes across your application.

## Prerequisites

- Supabase CLI
- Deno runtime environment
- Required environment variables:
  - `JWT_SECRET`: Secret key for signing JWT tokens
  - `SUPABASE_URL`: Your Supabase project URL
  - `SUPABASE_SERVICE_ROLE_KEY`: Service role key for Supabase admin operations

## Dependencies

The function uses the following dependencies:
- `@supabase/functions-js`: Supabase Edge Runtime types
- `std/http/server`: Deno's HTTP server module
- `jose`: JavaScript Object Signing and Encryption library
- `@supabase/supabase-js`: Supabase JavaScript client

## API Endpoint

```
POST /functions/v1/create-token
```

### Request Body

```json
{
  "user_id": "string"  // Required: The ID of the user to create a token for
}
```

### Response

Success (200):
```json
{
  "token": "string"  // JWT token
}
```

Error (400):
```json
{
  "error": "string",    // Error message
  "stack": "string",    // Error stack trace
  "env": {             // Debug information
    "hasJwtSecret": boolean,
    "hasSupabaseUrl": boolean,
    "hasServiceRole": boolean,
    "supabaseUrl": "string"
  }
}
```

## Token Claims

The generated JWT token includes the following claims:
- `role`: "authenticated"
- `aud`: "authenticated"
- `sub`: user_id
- `email`: user's email
- `app_metadata`: Provider information
- `user_metadata`: Empty object (customizable)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (24 hours from issuance)

## Local Development

1. Start your Supabase project:
```bash
supabase start
```

2. Test the function using cURL:
```bash
curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/create-token' \
  --header 'Authorization: Bearer your-anon-key' \
  --header 'Content-Type: application/json' \
  --data '{"user_id": "your-user-id"}'
```

## CORS Support

The function includes CORS headers to allow cross-origin requests:
- Allowed Methods: POST
- Allowed Headers: Content-Type, Authorization
- Allow-Origin: *

## Security Considerations

- The function verifies the existence of the user before creating a token
- User ID matching is strictly enforced
- Email presence is verified before token creation
- JWT tokens are signed using HS256 algorithm
- Tokens expire after 24 hours

## Error Handling

The function includes comprehensive error handling for:
- Invalid HTTP methods
- Missing user ID
- User not found
- Invalid user ID
- Missing user email
- Environment configuration issues 