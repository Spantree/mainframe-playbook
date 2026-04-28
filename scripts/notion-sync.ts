#!/usr/bin/env bun
/**
 * notion-sync.ts — Sync Notion pages to Docusaurus content
 *
 * Pulls a Notion page tree and writes each page as an MDX file
 * to a local docs directory. Designed to be backported into Trellis
 * as `trellis notion sync docs`.
 *
 * Usage:
 *   bun run scripts/notion-sync.ts [--config trellis-notion-map.json] [--out docs/content]
 *   bun run scripts/notion-sync.ts --dry-run
 *
 * Config format (trellis-notion-map.json):
 *   {
 *     "rootPageId": "34d2e80c-...",
 *     "outputDir": "docs/content",
 *     "exclude": ["page-id-to-skip"],
 *     "sidebarOrder": ["About This Playbook", "Overview", "Why Now", ...]
 *   }
 */

import { join, dirname } from "node:path";
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execSync, spawnSync } from "node:child_process";

// ── Config ─────────────────────────────────────────────────────────────────

const PROJECT_ROOT = join(dirname(new URL(import.meta.url).pathname), "..");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const configIdx = args.indexOf("--config");
const configPath = configIdx >= 0 ? args[configIdx + 1] : join(PROJECT_ROOT, "trellis-notion-map.json");
const outIdx = args.indexOf("--out");
const outOverride = outIdx >= 0 ? args[outIdx + 1] : null;

interface SyncConfig {
  rootPageId: string;
  outputDir: string;
  exclude?: string[];
  sidebarOrder?: string[];
}

async function loadConfig(): Promise<SyncConfig> {
  if (existsSync(configPath)) {
    const raw = await readFile(configPath, "utf-8");
    return JSON.parse(raw);
  }
  // Fallback: use environment variable or hardcoded default for this project
  return {
    rootPageId: process.env.NOTION_ROOT_PAGE_ID ?? "34d2e80c-997d-815c-9f26-d3e38df57eb4",
    outputDir: outOverride ?? join(PROJECT_ROOT, "docs/content"),
    sidebarOrder: [
      "About This Playbook",
      "Overview",
      "Why Now",
      "Why Agentic AI Changes This",
      "The Approach",
      "The AWS CardDemo Spike",
      "Technical Reference",
      "Industry Context",
      "Competitive Landscape",
      "Open Source Repositories",
    ],
  };
}

// ── Notion fetch via mcporter ───────────────────────────────────────────────

function mcporterCall(pageId: string): string {
  const WORKSPACE = process.env.OPENCLAW_WORKSPACE ?? "/Users/openclaw/.openclaw/workspace";
  const result = spawnSync(
    "mcporter",
    ["call", "notion-user.notion-fetch", `id=${pageId}`],
    { encoding: "utf-8", timeout: 30000, cwd: WORKSPACE }
  );
  if (result.status !== 0) {
    throw new Error(`mcporter failed for ${pageId}: ${result.stderr?.slice(0, 200)}`);
  }
  return result.stdout;
}

function mcporterFetch(pageId: string): string {
  return mcporterCall(pageId);
}

function mcporterListChildren(pageId: string): Array<{ id: string; title: string; url: string }> {
  const raw = mcporterCall(pageId);
  const data = JSON.parse(raw);
  const text: string = data?.text ?? "";

  // Extract child page links — look inside <content> only to avoid ancestor-path matches
  const contentStart = text.indexOf("<content>");
  const contentEnd = text.indexOf("</content>");
  const searchIn = contentStart >= 0 ? text.slice(contentStart, contentEnd) : text;

  const childPages: Array<{ id: string; title: string; url: string }> = [];
  const pageRegex = /<page url="(https:\/\/www\.notion\.so\/([a-f0-9]{32}))">([^<\n]+)<\/page>/g;
  let match;
  while ((match = pageRegex.exec(searchIn)) !== null) {
    childPages.push({
      url: match[1],
      id: match[2],
      title: match[3],
    });
  }
  return childPages;
}

// ── Markdown transformation ─────────────────────────────────────────────────

function notionMarkdownToMdx(raw: string, title: string): string {
  const data = JSON.parse(raw);
  const text: string = data?.text ?? "";

  // Extract content between <content> tags
  const contentStart = text.indexOf("<content>");
  const contentEnd = text.indexOf("</content>");
  if (contentStart === -1) return `# ${title}\n\n*No content found.*\n`;

  let content = text.slice(contentStart + 9, contentEnd);

  // Remove child page links (they become sidebar navigation instead)
  content = content.replace(/<page url="[^"]*">[^<]*<\/page>\n?/g, "");

  // Clean up ancestor-path and other Notion metadata blocks
  content = content.replace(/<[a-z-]+ [^>]*>.*?<\/[a-z-]+>\n?/gs, "");

  // Fix Notion bold+link pattern: **Word **[**link**](url) → **Word [link](url)**
  content = content.replace(
    /\*\*([^*\n]+) \*\*\[\*\*([^\]]+)\*\*\](\([^)]+\))/g,
    '**$1 [$2]$3**'
  );

  // Convert Notion blockquote callouts to MDX admonitions
  // > 📖 **Term.** Definition → :::note\n**Term.** Definition\n:::
  content = content.replace(
    /^> 📖 (.*?)$/gm,
    (_, body) => `:::note\n${body}\n:::`
  );

  // Unescape any HTML entities
  content = content
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  // Trim
  content = content.trim();

  return content;
}

// ── Slug generation ─────────────────────────────────────────────────────────

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Main sync ───────────────────────────────────────────────────────────────

interface PageNode {
  id: string;
  title: string;
  slug: string;
  position: number;
  children: PageNode[];
}

async function fetchPageTree(
  pageId: string,
  title: string,
  depth: number,
  config: SyncConfig,
  position: number
): Promise<PageNode> {
  const children = mcporterListChildren(pageId);
  const childNodes: PageNode[] = [];

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (config.exclude?.includes(child.id)) continue;
    const childNode = await fetchPageTree(child.id, child.title, depth + 1, config, i + 1);
    childNodes.push(childNode);
  }

  return { id: pageId, title, slug: toSlug(title), position, children: childNodes };
}

async function writePage(
  node: PageNode,
  outputDir: string,
  config: SyncConfig,
  parentSlug?: string
): Promise<void> {
  const dirPath = parentSlug ? join(outputDir, parentSlug) : outputDir;

  // Determine sidebar position
  const sidebarOrder = config.sidebarOrder ?? [];
  const sidebarPos = sidebarOrder.indexOf(node.title);
  const finalPos = sidebarPos >= 0 ? sidebarPos + 1 : node.position;

  // If this page has children, write it as index.md inside its own subdirectory
  // so Docusaurus treats it as a category parent rather than a sibling entry
  let filePath: string;
  if (node.children.length > 0) {
    const nodeDir = join(dirPath, node.slug);
    await mkdir(nodeDir, { recursive: true });
    filePath = join(nodeDir, "index.md");
  } else {
    await mkdir(dirPath, { recursive: true });
    filePath = join(dirPath, `${node.slug}.md`);
  }

  if (!dryRun) {
    // Fetch page content
    const raw = mcporterFetch(node.id);
    const mdx = notionMarkdownToMdx(raw, node.title);

    const frontmatter = [
      "---",
      `id: ${node.slug}`,
      `title: "${node.title.replace(/"/g, '\\"')}"`,
      `sidebar_position: ${finalPos}`,
      `notion_id: ${node.id}`,
      "---",
      "",
    ].join("\n");

    await writeFile(filePath, frontmatter + mdx + "\n");
    console.log(`✓ ${filePath.replace(outputDir + "/", "")}`);
  } else {
    console.log(`[dry-run] would write: ${filePath.replace(outputDir + "/", "")}`);
  }

  // Recursively write children — pass the node's slug as the parent directory
  for (const child of node.children) {
    const childParentSlug = parentSlug ? `${parentSlug}/${node.slug}` : node.slug;
    await writePage(child, outputDir, config, childParentSlug);
  }
}

// ── Entry point ─────────────────────────────────────────────────────────────

async function main() {
  const config = await loadConfig();
  const outputDir = outOverride ?? config.outputDir;

  console.log(`Syncing Notion page tree from ${config.rootPageId}`);
  console.log(`Output: ${outputDir}`);
  if (dryRun) console.log("[dry-run mode — no files written]");
  console.log("");

  // Fetch the child pages of the root (we don't write the root itself)
  const rootChildren = mcporterListChildren(config.rootPageId);
  console.log(`Found ${rootChildren.length} top-level pages`);
  console.log("");

  for (let i = 0; i < rootChildren.length; i++) {
    const child = rootChildren[i];
    if (config.exclude?.includes(child.id)) {
      console.log(`  skip: ${child.title}`);
      continue;
    }

    const node = await fetchPageTree(child.id, child.title, 0, config, i + 1);
    await writePage(node, outputDir, config);
  }

  console.log("\n✅ Sync complete");
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
