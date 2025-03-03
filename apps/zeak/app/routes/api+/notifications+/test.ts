
export const loader = async ({ request }: { request: Request }) => {
  // Handle GET requests
  return new Response(JSON.stringify({ message: "Hello from API" }), {
    headers: { "Content-Type": "application/json" },
  });
};