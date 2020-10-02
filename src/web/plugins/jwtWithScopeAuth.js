export default (server) => (scopes) => async (request, reply) => {
  try {
    await server.authenticate(request, reply);
    if (scopes && scopes.length > 0) {
      await request.jwtAuthz(scopes);
    }
  } catch (err) {
    reply.code(401).send(err);
  }
};
