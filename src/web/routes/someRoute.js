import {
  someRouteSchemaOptions,
  someRouteBodySchema,
  someRouteHandler,
} from "../handlers/someRoute";

export default ({ validator }) => async (server) => {
  server.route({
    method: "POST",
    url: "/",
    schema: {
      body: someRouteBodySchema,
    },
    validatorCompiler: validator(someRouteSchemaOptions),
    onRequest: server.auth([
      server.basicAuth,
      server.validateJWTandScope(["search:profile"]),
    ]),
    handler: someRouteHandler(),
  });
};
