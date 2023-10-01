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

const version = "0.1.0";
console.log(`[VST] 👋 Welcome to ViewScript v${version}.`);

const command = process.argv[2];

if (command === "create") {
  const name = process.argv[3];
  const nameTemplateSlot = "%VIEWSCRIPT_UNTITLED_PROJECT_NAME%";

  if (!name) {
    check(false, "Cannot create project without a name specified");
  }

  const src = path.resolve(__dirname, "examples", "bridge");
  const dest = path.resolve(name);

  fs.mkdirSync(dest);
  fs.cpSync(src, dest, { recursive: true });

  const packageJsonPath = path.resolve(name, "package.json");
  let packageJson = fs.readFileSync(packageJsonPath, "utf8");
  packageJson = packageJson.replace(nameTemplateSlot, name.toLowerCase());
  fs.writeFileSync(packageJsonPath, packageJson, "utf8");

  const readmePath = path.resolve(name, "README.md");
  let readme = fs.readFileSync(readmePath, "utf8");
  readme = readme.replace(nameTemplateSlot, name);
  fs.writeFileSync(readmePath, readme, "utf8");

  console.log(`[VST] ✅ Created a new ViewScript project in ./${name}/`);
} else {
  check(false, `Cannot run unknown command: \`${command}\``);
}
