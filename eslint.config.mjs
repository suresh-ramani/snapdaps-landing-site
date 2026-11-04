import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next 16 removed `next lint`; this is the flat config `npm run lint` runs directly.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // .claude/ holds third-party skills (stageshow examples) — not site code.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", ".claude/**"]),
]);
