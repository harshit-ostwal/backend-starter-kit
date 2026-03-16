#!/usr/bin/env node
import { execSync } from "child_process";
import { existsSync, mkdirSync, cpSync, renameSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import ora from "ora";
import chalk from "chalk";
import prompts from "prompts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function runCommand(command, options = {}) {
  try {
    return execSync(command, {
      stdio: "pipe",
      encoding: "utf-8",
      ...options,
    }).trim();
  } catch {
    return null;
  }
}

async function main() {
  let projectName = process.argv[2];
  if (!projectName) {
    const response = await prompts({
      type: "text",
      name: "projectName",
      message: "What is your project named?",
      initial: "my-app",
    });
    projectName = response.projectName;
  }

  const projectPath = path.resolve(process.cwd(), projectName);
  if (projectName !== "." && existsSync(projectPath)) {
    console.error(chalk.red(`❌ Folder "${projectName}" already exists.`));
    process.exit(1);
  }

  const { packageManager } = await prompts({
    type: "select",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: [
      { title: "pnpm (recommended)", value: "pnpm" },
      { title: "npm", value: "npm" },
      { title: "yarn", value: "yarn" },
      { title: "bun", value: "bun" },
    ],
    initial: 0,
  });

  console.log(`\nCreating a new Backend app in ${chalk.cyan(projectPath)}.\n`);
  console.log(`Using ${chalk.cyan(packageManager)}.\n`);
  console.log(`Initializing project with template: backend\n`);

  if (projectName !== ".") mkdirSync(projectPath);
  const templateDir = path.join(__dirname, "../template");
  cpSync(templateDir, projectPath, { recursive: true });

  const gitignoreSrc = path.join(projectPath, "gitignore");
  const gitignoreDest = path.join(projectPath, ".gitignore");
  if (existsSync(gitignoreSrc)) renameSync(gitignoreSrc, gitignoreDest);

  const spinner = ora("Initializing git repository...").start();
  runCommand("git init", { cwd: projectPath });
  spinner.stop();
  console.log(chalk.green("Initialized a git repository.\n"));

  console.log(chalk.cyan(`Installing dependencies...\n`));
  try {
    if (packageManager === "npm")
      runCommand("npm install", { cwd: projectPath });
    else if (packageManager === "pnpm")
      runCommand("pnpm install", { cwd: projectPath });
    else if (packageManager === "yarn")
      runCommand("yarn install", { cwd: projectPath });
    else if (packageManager === "bun")
      runCommand("bun install", { cwd: projectPath });
  } catch {
    console.log(
      chalk.yellow("\n⚠ Warning: Some build scripts were ignored.\n"),
    );
  }
  console.log(
    chalk.green(
      `Done in ${chalk.cyan("~10s")} using ${chalk.cyan(packageManager)}.`,
    ),
  );
  console.log(
    chalk.green(
      `\n✅ Success! Created ${projectName} at ${chalk.cyan(projectPath)}`,
    ),
  );
  console.log(chalk.cyan(`\nNext steps:`));
  console.log(chalk.cyan(`  1. cd ${projectName}`));
  console.log(chalk.cyan(`  2. Update .env with your database credentials`));
  console.log(
    chalk.cyan(
      `  3. Run ${packageManager} run dev to start the backend server`,
    ),
  );
  console.log(chalk.cyan(`  4. Access API docs at /api/v1/docs`));
}

main();
