import "dotenv/config.js";
import throng from "throng";
import fastify from "fastify";
import buildApp from "./app";
import validator from "./lib/validator";
import basicAuthValidator from "./plugins/basicAuth";
import jwtWithScopeAuth from "./plugins/jwtWithScopeAuth";
import validateAndParseEnvironment from "./lib/configValidator";

const server = fastify({ logger: true });

const applicationConfig = validateAndParseEnvironment(process.env);
const jwtWithScopeAuthValidator = jwtWithScopeAuth(server);

const { WEB_CONCURRENCY, NODE_ENV } = process.env;

const start = async (workerId) => {
  try {
    const app = buildApp({
      server,
      applicationConfig,
      validator,
      jwtWithScopeAuthValidator,
      basicAuthValidator,
    });
    await app.listen(applicationConfig.PORT || 3000, "0.0.0.0");
    server.log.info(
      { data: { port: app.server.address().port, workerId } },
      "Worker: Server running"
    );
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

if (NODE_ENV === "production") {
  throng({
    workers: WEB_CONCURRENCY,
    lifetime: Infinity,
    start,
  });
} else {
  start();
}
