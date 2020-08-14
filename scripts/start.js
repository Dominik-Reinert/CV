#!/usr/bin/env node
const path = require("path");
const { exec } = require("child_process");

const logCallback = (err, stdout, stderr) => {
  console.error(stderr);
  console.log(stdout);
};

function startBackend() {
  console.info("Starting backend server");
  const backendPath = path.resolve("./backend");
  exec(`cd ${backendPath}; npm run-script start:dev; cd -`, logCallback);
}

function startFrontend() {
  console.info("Starting frontend server");
  const frontendPath = path.resolve("./cv");
  exec(`cd ${frontendPath}; yarn start; cd -`, logCallback);
}

(function start() {
  const [execEnv, scriptPath, serverType] = process.argv;
  console.info(`Given server type to start: ${serverType}`);
  switch (serverType) {
    case "backend":
      startBackend();
      break;
    case "frontend":
      startFrontend();
      break;
    default:
      startBackend();
      startFrontend();
  }
})();
