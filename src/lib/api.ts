export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

interface JoinWaitlistResponse {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export async function joinWaitlist({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<JoinWaitlistResponse> {
  const res = await fetch(`${API_URL}/waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || "Something went wrong. Please try again.");
  }

  return res.json();
}