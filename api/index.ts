import path from "node:path";
import { fileURLToPath } from "node:url";
import { createVercelHandler } from "@tanstack/start/vercel-handler";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default createVercelHandler({
  entry: path.resolve(__dirname, "../src/server"),
});
