import 'dotenv/config.js';
import fastify from "fastify";
import buildApp from "./app";
import validator from "./lib/validator";
import basicAuthValidator from "./plugins/basicAuth";
import jwtWithScopeAuth from "./plugins/jwtWithScopeAuth";
import validateAndParseEnvironment from "./lib/configValidator";

const server = fastify({ logger: true });

const applicationConfig = validateAndParseEnvironment(process.env);
const jwtWithScopeAuthValidator = jwtWithScopeAuth(server);

const start = async () => {
  try {
    const app = buildApp({
      server,
      applicationConfig,
      validator,
      jwtWithScopeAuthValidator,
      basicAuthValidator,
    });
    await app.listen(applicationConfig.PORT || 3000);
    server.log.info(`server listening on ${app.server.address().port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();
