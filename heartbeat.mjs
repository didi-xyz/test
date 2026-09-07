const endpoint = process.env.MORI_TICK_URL;

if (!endpoint) {
  throw new Error("MORI_TICK_URL is required");
}

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 20_000);

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "user-agent": "mori-heartbeat/1.0" },
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
