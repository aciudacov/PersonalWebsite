import { copyFile, rm } from "fs/promises";
import path from "path";
import { build as viteBuild } from "vite";

async function buildPages() {
  process.env.STATIC_BUILD_OUT_DIR = "dist-pages";

  await rm("dist-pages", { recursive: true, force: true });
  await viteBuild();

  const outDir = path.resolve(import.meta.dirname, "..", "dist-pages");
  await copyFile(
    path.resolve(outDir, "index.html"),
    path.resolve(outDir, "404.html"),
  );
}

buildPages().catch((error) => {
  console.error(error);
  process.exit(1);
});
