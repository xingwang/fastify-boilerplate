import { someRouteSchemaOptions, someRouteBodySchema, someRouteHandler } from '../handlers/someRoute';

export default ({ validator }) => async (server, options, done) => {
  server.route({
    method: 'POST',
    url: '/',
    schema: {
      body: someRouteBodySchema,
    },
    schemaCompiler: validator(someRouteSchemaOptions),
    onRequest: server.auth([
      server.basicAuth,
      server.validateJWTandScope(['search:profile']),
    ]),
    handler: someRouteHandler,
  });
  done();
};
