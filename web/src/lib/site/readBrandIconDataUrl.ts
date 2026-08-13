import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function readBrandIconDataUrl(): Promise<string> {
  const iconPath = join(process.cwd(), "public", "brand", "icon.png");
  const icon = await readFile(iconPath);

  return `data:image/png;base64,${icon.toString("base64")}`;
}
