const endpoint = process.env.MORI_TICK_URL;
const secret = process.env.MORI_HEARTBEAT_SECRET;

if (!endpoint || !secret) {
  throw new Error("MORI_TICK_URL and MORI_HEARTBEAT_SECRET are required");
}

// Keep the connection open while MORI researches, debates, creates high-quality art, signs, and confirms.
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 540_000);

try {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "user-agent": "mori-heartbeat/4.1",
      "authorization": `Bearer ${secret}`,
    },
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
