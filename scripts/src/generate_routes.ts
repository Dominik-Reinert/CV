#!/usr/bin/env node

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "fs";
import {
  backendHandlerOutputDir,
  backendRouterOutputDir,
  backendValidatorOutputDir,
  frontendEndpointOutputDir,
  routerGeneratorInputPath,
} from "./common_path";
import { rebuildAndRestartIfNeeded } from "./needs_rebuild";
import { Route, RouteEndpoint } from "./route";
import { backendHandlerTemplate } from "./templates/backend_handler.template";
import { backendRouterTemplate } from "./templates/backend_router.template";
import { backendValidatorTemplate } from "./templates/backend_validator.template";
import { frontendFetchTemplate } from "./templates/frontend_fetch.template";

function createGeneratedDirectories(): void {
  [
    backendHandlerOutputDir,
    backendRouterOutputDir,
    backendValidatorOutputDir,
    frontendEndpointOutputDir,
  ].forEach((path) => {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  });
}

function toUpperCase(name: string) {
  return name[0].toUpperCase().concat(name.slice(1));
}

function camelCaseToSnakeCase(name: string) {
  return name.replace(/([a-z])([A-Z])/g, "$1_$2").toLocaleLowerCase();
}

function addInterfaceNamesToEndpoints(parsedRoute: Route): Route {
  return {
    ...parsedRoute,
    endpoints: parsedRoute.endpoints.map((endpoint) => {
      return {
        ...endpoint,
        interfaceName: `${toUpperCase(parsedRoute.name)}${toUpperCase(
          endpoint.eName
        )}`,
      };
    }),
  };
}

function addImportPathsToEndpoints(parsedRoute: Route): Route {
  return {
    ...parsedRoute,
    path: `${camelCaseToSnakeCase(parsedRoute.name)}_router`,
    endpoints: parsedRoute.endpoints.map((endpoint) => {
      const endpointNameSnakeCase: string = camelCaseToSnakeCase(
        endpoint.eName
      );
      return {
        ...endpoint,
        handler: {
          ...endpoint.handler,
          path: endpointNameSnakeCase,
          validation: {
            ...endpoint.handler.validation,
            path: `${endpointNameSnakeCase}_validation`,
          },
          request: {
            ...endpoint.handler.request,
            path: `${endpointNameSnakeCase}_handler`,
          },
        },
      };
    }),
  };
}

function generateBackendRouter(parsedRoute: Route) {
  const backendRouter = backendRouterTemplate(parsedRoute);
  console.log(`Overwriting current endpoint`);
  writeFileSync(
    `${backendRouterOutputDir}/${camelCaseToSnakeCase(
      parsedRoute.name
    )}_router.ts`,
    backendRouter,
    {
      encoding: "utf-8",
    }
  );
}

function generateBackendHandler(parsedRoute: Route, force: boolean) {
  parsedRoute.endpoints.forEach((endpoint: RouteEndpoint) => {
    const filePath = `${backendHandlerOutputDir}/${camelCaseToSnakeCase(
      endpoint.eName
    )}_handler.ts`;
    if (!existsSync(filePath) || force) {
      const endpointCode = backendHandlerTemplate(
        endpoint,
        `../router/${parsedRoute.path}`
      );
      console.log(`Overwriting current '${endpoint.eName}' endpoint`);
      writeFileSync(filePath, endpointCode, {
        encoding: "utf-8",
      });
    } else {
      console.log(`handler for ${endpoint.eName} already exists`);
    }
  });
}

function generateBackendValidator(parsedRoute: Route, force: boolean) {
  const endpointCode = backendValidatorTemplate(
    `../router/${parsedRoute.path}`,
    parsedRoute
  );

  const filePath = `${backendValidatorOutputDir}/${camelCaseToSnakeCase(
    parsedRoute.name
  )}_validation.ts`;

  if (!existsSync(filePath) || force) {
    console.log(`Overwriting current '${parsedRoute.name}' validation`);
    writeFileSync(filePath, endpointCode, {
      encoding: "utf-8",
    });
  } else {
    console.log(`validator for ${parsedRoute.name} already exists`);
  }
}

function generateFrontendfetch(parsedRoute: Route) {
  parsedRoute.endpoints.forEach((endpoint: RouteEndpoint) => {
    const endpointCode = frontendFetchTemplate(endpoint, parsedRoute.name);
    console.log(`Overwriting current '${endpoint.eName}' fetch`);
    writeFileSync(
      `${frontendEndpointOutputDir}/${camelCaseToSnakeCase(
        endpoint.eName
      )}_fetch.ts`,
      endpointCode,
      {
        encoding: "utf-8",
      }
    );
  });
}

(function start() {
  const [execEnv, scriptPath, stringArgs] = process.argv;
  const arrayArgs = stringArgs ? stringArgs.split(" ") : [];
  const force: boolean = arrayArgs.includes("-f");
  rebuildAndRestartIfNeeded(force);

  const files = readdirSync(`${routerGeneratorInputPath}/routes`);
  files.forEach((file) => {
    const route = readFileSync(
      `${routerGeneratorInputPath}/routes/${file}`,
      "utf-8"
    );
    let parsedRoute: Route = JSON.parse(route);
    createGeneratedDirectories();
    parsedRoute = addInterfaceNamesToEndpoints(parsedRoute);
    parsedRoute = addImportPathsToEndpoints(parsedRoute);
    generateBackendRouter(parsedRoute);
    generateBackendHandler(parsedRoute, force);
    generateBackendValidator(parsedRoute, force);
    generateFrontendfetch(parsedRoute);
  });
})();
