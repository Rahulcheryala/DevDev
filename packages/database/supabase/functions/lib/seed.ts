import { Database } from "./types.ts";

export const integrations = [
  {
    id: "resend",
    title: "Resend Emails",
    description: "Sends Transactional Emails with Resend API",
    logoPath: "/integrations/resend.png",
    jsonschema: {
      type: "object",
      properties: {
        apiKey: {
          type: "string",
        },
      },
      required: ["apiKey"],
    },
  },
  // {
  //   id: 'google-places-v2',
  //   title: 'Google Places',
  //   description: 'Autocomplete addresses with Google Places API',
  //   logoPath: '/integrations/google-places.png',
  //   jsonschema: {
  //     type: 'object',
  //     properties: {
  //       apiKey: {
  //         type: 'string',
  //       },
  //     },
  //     required: ['apiKey'],
  //   },
  // },
];
