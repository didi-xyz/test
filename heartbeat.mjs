const endpoint = process.env.MORI_TICK_URL;

if (!endpoint) {
  throw new Error("MORI_TICK_URL is required");
}

// GPT-6 Astra designs and codes a complete live canvas in this request.
// Keep the connection open long enough for the production write to commit.
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 180_000);

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "user-agent": "mori-heartbeat/2.0" },
    signal: controller.signal,
  });
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`MORI tick failed (${response.status}): ${body.slice(0, 300)}`);
  }

  console.log(`MORI awake: ${body.slice(0, 500)}`);
} finally {
  clearTimeout(timeout);
}
