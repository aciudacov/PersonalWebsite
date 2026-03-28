import express from "express";
import fs from "fs";
import path from "path";

function normalizeBasePath(value: string) {
  let basePath = value.trim();

  if (!basePath.startsWith("/")) {
    basePath = `/${basePath}`;
  }

  if (!basePath.endsWith("/")) {
    basePath = `${basePath}/`;
  }

  return basePath;
}

const repoRoot = path.resolve(import.meta.dirname, "..");
const distPath = path.resolve(repoRoot, "dist-pages");
const defaultBasePath = `/${path.basename(repoRoot)}/`;
const basePath = normalizeBasePath(
  process.env.PAGES_BASE_PATH ?? defaultBasePath,
);
const port = parseInt(process.env.PORT ?? "4173", 10);

if (!fs.existsSync(distPath)) {
  throw new Error(
    `Could not find ${distPath}. Run "npm run build:pages" first.`,
  );
}

const app = express();

app.disable("x-powered-by");

if (basePath !== "/") {
  app.get("/", (_req, res) => {
    res.redirect(basePath);
  });
}

app.use(basePath, express.static(distPath));

const fallbackPath = basePath === "/" ? "/{*path}" : `${basePath}{*path}`;
app.use(fallbackPath, (_req, res) => {
  res.sendFile(path.resolve(distPath, "index.html"));
});

const server = app.listen(port, "0.0.0.0", () => {
  console.log(
    `Previewing GitHub Pages build at http://localhost:${port}${basePath}`,
  );
});

server.once("error", (error: NodeJS.ErrnoException) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${port} is already in use. Stop that process or run with PORT set to a different value.`,
    );
    process.exit(1);
  }

  throw error;
});
