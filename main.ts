// The Funniest Honest Appliance Error — one honest error line from a fridge.
// The entrypoint writes the line to entry.txt for the grader to judge.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const applianceError = [
  "Error 404: Milk not found.",
  "It expired three days ago.",
  "I warned you twice.",
].join(" ");

// The bounty caps the line at 200 characters — refuse to emit an overlong one.
const limit = 200;
if ([...applianceError].length > limit) {
  throw new Error(`appliance error exceeds ${limit} characters`);
}

function emit(text) {
  const folder = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true });
  }
  const target = join(folder, "entry.txt");
  writeFileSync(target, text + "\n", { encoding: "utf8" });
  return target;
}

const written = emit(applianceError);
console.log(applianceError);
console.log(`wrote ${written}`);
