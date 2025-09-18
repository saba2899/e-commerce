#!/usr/bin/env node

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Creates _redirects file in the dist directory for SPA routing
 */
function createRedirectsFile() {
  try {
    // Define the content for _redirects file
    const redirectsContent = "/* /index.html 200";

    // Path to dist directory (relative to project root)
    const distPath = join(__dirname, "..", "dist");
    const redirectsFilePath = join(distPath, "_redirects");

    // Check if dist directory exists, create if it doesn't
    if (!existsSync(distPath)) {
      console.log("📁 Creating dist directory...");
      mkdirSync(distPath, { recursive: true });
    }

    // Write the _redirects file
    writeFileSync(redirectsFilePath, redirectsContent, "utf8");

    console.log("✅ Successfully created _redirects file");
    console.log(`📄 Location: ${redirectsFilePath}`);
    console.log(`📝 Content: ${redirectsContent}`);
  } catch (error) {
    console.error("❌ Error creating _redirects file:", error.message);
    process.exit(1);
  }
}

// Run the function
createRedirectsFile();
