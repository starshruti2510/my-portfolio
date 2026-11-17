import "dotenv/config";
import { MossClient } from "@moss-js/moss";

const client = new MossClient(
  process.env.MOSS_PROJECT_ID!,
  process.env.MOSS_PROJECT_KEY!
);

async function main() {
  // Load once, then recall context on every step.
  await client.loadIndex("my-portfolio-live-blond-vercel-app");
  const results = await client.query(
    "my-portfolio-live-blond-vercel-app",
    "how do I add a teammate",
    { topK: 3 }
  );
  console.log(results.docs);
}

main();