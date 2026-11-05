const { spawnSync } = require("node:child_process");

const result = spawnSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "build"],
  {
    env: { ...process.env, FIREBASE_BUILD: "true" },
    stdio: "inherit",
  },
);

if (result.error) throw result.error;
process.exit(result.status ?? 1);
