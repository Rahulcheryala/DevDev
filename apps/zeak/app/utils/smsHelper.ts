// app/utils/sendSms.ts
export async function sendSms(to: string, body: string) {
  const response = await fetch("/api/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, body }),
  });

  if (!response.ok) {
    throw new Error("Failed to send SMS");
  }

  return response.json();
}
