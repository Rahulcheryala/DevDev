// apps/zeak/src/routes/api/camel.ts
import { json } from "@remix-run/node";

export const loader = async () => {
  const response = await fetch("http://localhost:8080/hello");
  const data = await response.text();
  console.log('camel data', data)
  return json({ message: data });
};
