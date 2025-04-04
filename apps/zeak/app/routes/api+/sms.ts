// app/routes/api/send-sms.ts
import { json } from "@remix-run/node";
import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  const { to, body } = await request.json();

  if (!to || !body) {
    return json(
      { error: "Both 'to' and 'body' are required" },
      { status: 400 },
    );
  }

  try {
    const response = await sendSms(to, body);
    return json(response);
  } catch (error) {
    return json({ error: "Failed to send SMS" }, { status: 500 });
  }
};

// Separate function to call Textgrid API with environment variables
async function sendSms(to: string, body: string) {
  const accountSid = process.env.TEXTGRID_ACCOUNT_SID;
  const authToken = process.env.TEXTGRID_AUTH_TOKEN;
  const fromNumber = process.env.TEXTGRID_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error("Missing required environment variables");
  }

  const baseUrl = `https://api.textgrid.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body,
      from: fromNumber,
      to,
    }),
  });

  if (!response.ok) {
    throw new Error(`Textgrid API error: ${response.statusText}`);
  }

  return response.json();
}
