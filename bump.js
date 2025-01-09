#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const chronoversion = require("chronoversion").default;

/**
 * Updates the version in the package.json and package-lock.json files.
 *
 * @description Reads the current package.json and package-lock.json, retrieves the current version,
 * generates a new version using the getVersion function, and writes the updated
 * version back to both files.
 *
 * @throws {Error} If unable to read or parse package.json or package-lock.json
 * @throws {Error} If unable to write updated package.json or package-lock.json
 *
 * @returns {void}
 */
function updatePackageVersion() {
  const packageJsonPath = path.resolve(__dirname, "package.json");
  const packageLockJsonPath = path.resolve(__dirname, "package-lock.json");

  let packageJson;
  let packageLockJson;

  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf8");
    packageJson = JSON.parse(packageJsonContent);
  } catch (error) {
    console.error("Failed to read or parse package.json:", error.message);
    process.exit(1);
  }

  try {
    const packageLockJsonContent = fs.readFileSync(packageLockJsonPath, "utf8");
    packageLockJson = JSON.parse(packageLockJsonContent);
  } catch (error) {
    console.error("Failed to read or parse package-lock.json:", error.message);
    process.exit(1);
  }

  const currentVersion = packageJson.version;
  const newVersion = chronoversion(currentVersion);

  packageJson.version = newVersion;
  packageLockJson.version = newVersion;

  try {
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2),
      "utf8"
    );
    fs.writeFileSync(
      packageLockJsonPath,
      JSON.stringify(packageLockJson, null, 2),
      "utf8"
    );
    console.log(`Updated version to ${newVersion}`);
  } catch (error) {
    console.error(
      "Failed to write updated package.json or package-lock.json:",
      error.message
    );
    process.exit(1);
  }
}

updatePackageVersion();
