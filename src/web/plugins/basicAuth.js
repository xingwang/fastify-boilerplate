import fp from "lodash/fp.js";

const { get } = fp;

export default (server) => ({
  validate: async (username, password, request) => {
    server.log.info(
      {
        data: {
          requestId: get("headers.x-request-id", request),
          url: get("req.originalUrl", request),
        },
      },
      "basic validation"
    );
  },
});
