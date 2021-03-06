import checkAuth from "fastify-auth";
import auth0Auth from "fastify-auth0-verify";
import scopeCheck from "fastify-jwt-authz";
import basicAuth from "fastify-basic-auth";
import routes from "./routes";

export default ({
  server,
  applicationConfig,
  validator,
  basicAuthValidator,
  jwtWithScopeAuthValidator,
}) => {
  const auth0Options = {
    audience: applicationConfig.AUTH0_USER_AUDIENCE,
    domain: applicationConfig.AUTH0_DOMAIN,
    secretsTtl: 60000,
  };

  server.register(checkAuth);
  server.register(basicAuth, basicAuthValidator);
  server.register(auth0Auth, auth0Options);
  server.register(scopeCheck);
  server.decorate("validateJWTandScope", jwtWithScopeAuthValidator);

  server.after(() => {
    server.register(routes({ validator }));
  });

  return server;
};
