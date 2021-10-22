import fp from "lodash/fp.js";

const { get } = fp;
export default (server) => (scopes) => async (request, reply) => {
  try {
    await server.authenticate(request, reply);
    server.log.info(
      {
        data: {
          requestId: get("headers.x-request-id", request),
          url: get("req.originalUrl", request),
          user: request.user,
        },
      },
      "authenticate user started"
    );
    if (scopes && scopes.length > 0) {
      await request.jwtAuthz(scopes);
    }
  } catch (err) {
    reply.code(401).send(err);
  }
};
