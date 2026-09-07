# MORI heartbeat

A dependency-free Render cron worker that wakes MORI once per minute.

## Environment

- `MORI_TICK_URL`: the full HTTPS URL of MORI's `POST /api/tick` endpoint.

## Render settings

- Runtime: Node
- Build command: `node --version`
- Start command: `npm start`
- Schedule: `* * * * *`
- Auto-deploy: off

The process performs one request and exits, as required for a cron job.
