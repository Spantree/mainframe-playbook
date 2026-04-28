#!/usr/bin/env bun
/**
 * Generate a PBKDF2 passcode hash and set it as a Cloudflare Pages secret.
 *
 * Usage:
 *   PASSCODE=my-password bun run set-pw.ts   # from env var
 *   bun run set-pw.ts                        # interactive prompt
 */
import { randomBytes, pbkdf2Sync } from "node:crypto";
import { createInterface } from "node:readline";
import { Writable } from "node:stream";

const ITERATIONS = 100_000;
const KEY_LENGTH = 32;
const DIGEST = "sha256";
const PROJECT_NAME = "mainframe-playbook";

async function promptPasscode(): Promise<string> {
  const muted = new Writable({ write(_chunk, _encoding, cb) { cb(); } });
  process.stderr.write("Passcode: ");
  const rl = createInterface({ input: process.stdin, output: muted, terminal: true });
  return new Promise((resolve) => {
    rl.question("", (answer) => {
      rl.close();
      process.stderr.write("\n");
      resolve(answer);
    });
  });
}

const password = process.env.PASSCODE ?? (await promptPasscode());
if (!password) {
  console.error("Error: empty passcode");
  process.exit(1);
}

const salt = randomBytes(16).toString("hex");
const key = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST);
const hash = `pbkdf2:${ITERATIONS}:${salt}:${key.toString("hex")}`;

const proc = Bun.spawn(
  ["bunx", "wrangler", "pages", "secret", "put", "PASSCODE_HASH", "--project-name", PROJECT_NAME],
  { stdin: new Blob([hash + "\n"]), stdout: "inherit", stderr: "inherit" },
);
const exitCode = await proc.exited;
process.exit(exitCode);
