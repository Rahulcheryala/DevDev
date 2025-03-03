import dotenv from "dotenv";
// app/routes/api.email.ts
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";
import { Resend } from "resend";

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailRequest {
  to: string | string[];
  subject: string;
  content: {
    html?: string;
    text?: string;
  };
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

export const action: ActionFunction = async ({ request }) => {
  console.log("Before dotenv:", process.env.RESEND_API_KEY);
  require("dotenv").config();
  console.log("After dotenv:", process.env.RESEND_API_KEY);
  // Only allow POST requests
  if (request.method.toUpperCase() !== "POST") {
    return json(
      {
        success: false,
        error: {
          message: "Method not allowed",
          name: "method_error",
        },
      },
      { status: 405 },
    );
  }

  try {
    // Get the request body
    const body = (await request.json()) as EmailRequest;

    // Validate required fields
    if (
      !body.to ||
      !body.subject ||
      (!body.content.html && !body.content.text)
    ) {
      return json(
        {
          success: false,
          error: {
            message: "Missing required fields",
            name: "validation_error",
          },
        },
        { status: 400 },
      );
    }

    // Prepare email data with proper typing
    const emailData = {
      from: body.from || "Acme <onboarding@resend.dev>",
      to: Array.isArray(body.to) ? body.to : [body.to],
      subject: body.subject,
      html: body.content.html,
      text: body.content.text,
      cc: body.cc,
      bcc: body.bcc,
    };

    // Send email using resend with proper type checking
    const { data, error } = await resend.emails.send(emailData);

    if (error) {
      console.error("Resend API error:", error);
      return json(
        {
          success: false,
          error: {
            message: error.message,
            name: "application_error",
          },
        },
        { status: 500 },
      );
    }

    return json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return json(
      {
        success: false,
        error: {
          message:
            error instanceof Error ? error.message : "Unable to send email",
          name: "application_error",
        },
      },
      { status: 500 },
    );
  }
};
