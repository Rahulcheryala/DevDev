// app/utils/emailService.ts
interface EmailContent {
  html?: string;
  text?: string;
}

interface EmailOptions {
  to: string | string[];
  subject: string;
  content: EmailContent;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

interface EmailSuccess {
  success: true;
  data: {
    id: string;
    from: string;
    to: string[];
    subject: string;
  };
}

interface EmailError {
  success: false;
  error: {
    message: string;
    name: string;
  };
}

type EmailResponse = EmailSuccess | EmailError;

/**
 * Global function to send emails using the API endpoint
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
  const BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";
  try {
    // Input validation
    if (
      !options.to ||
      !options.subject ||
      (!options.content.html && !options.content.text)
    ) {
      return {
        success: false,
        error: {
          message:
            "Missing required fields: 'to', 'subject', and either 'html' or 'text' content",
          name: "validation_error",
        },
      };
    }

    // Make API request
    const response = await fetch(`${BASE_URL}/api/email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    // Parse response
    const result = await response.json();

    // Check if the response is not ok
    if (!response.ok) {
      return {
        success: false,
        error: {
          message: result.error?.message || "Failed to send email",
          name: result.error?.name || "application_error",
        },
      };
    }

    return result;
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      success: false,
      error: {
        message:
          error instanceof Error ? error.message : "Unable to send email",
        name: "application_error",
      },
    };
  }
}

/**
 * Helper function to create HTML email content
 */
export function createHtmlEmail(htmlContent: string): EmailContent {
  return {
    html: htmlContent,
    text: htmlContent.replace(/<[^>]*>/g, ""), // Strip HTML tags for text version
  };
}

/**
 * Helper function to create text-only email content
 */
export function createTextEmail(textContent: string): EmailContent {
  return {
    text: textContent,
  };
}

// =======Example with createHtmlEmail
// async function sendTeamUpdate(message: string) {
//   const result = await sendEmail({
//     to: ['delivered@resend.dev'],
//     cc: 'supervisor@company.com',
//     subject: 'Team Update',
//     content: createHtmlEmail(`
//       <h2>Team Hello</h2>
//       <p>${message}</p>
//     `)
//   });
//   if (!result.success) {
//     console.log('Failed to send team update', result)
//     throw new Error(`Failed to send team update: ${result.error.message}`);
//   }
//   return result.data.id;
// }

// sendTeamUpdate("this is email message")

// ======Example with createTextEmail

// async function sendTeamUpdate(message: string) {
//   const result = await sendEmail({
//     to: ['delivered@resend.dev'],
//     cc: 'supervisor@company.com',
//     subject: 'Team Update',
//     content: createHtmlEmail(message)
//   });
//   if (!result.success) {
//     console.log('Failed to send team update', result)
//     throw new Error(`Failed to send team update: ${result.error.message}`);
//   }
//   return result.data.id;
// }

// sendTeamUpdate("this is email message")
