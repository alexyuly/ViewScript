#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

class ViewScriptError extends Error {}

function check(condition, message) {
  if (!condition) {
    console.error(`[VST] ⛔️ ${message}`);
    throw new ViewScriptError(message);
  }
}

const version = "0.0.0";
console.log(`[VST] 👋 Welcome to ViewScript v${version}.`);

const command = process.argv[2];

if (command === "create") {
  const name = process.argv[3];

  if (!name) {
    check(false, "Cannot create project without a name specified");
  }

  const src = path.resolve(__dirname, "examples", "bridge");
  const dest = path.resolve(name);

  fs.mkdirSync(dest);
  fs.cpSync(src, dest, { recursive: true });

  console.log(`[VST] ✅ Created a new ViewScript project in ./${name}/`);
} else {
  check(false, `Cannot run unknown command: \`${command}\``);
}

// viewscript_untitled_project
