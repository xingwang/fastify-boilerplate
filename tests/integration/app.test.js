import "dotenv/config.js";
import { expect } from "chai";
import fastify from "fastify";
import buildApp from "../../src/web/app.js";
import validator from "../../src/web/lib/validator.js";
import basicAuthValidator from "../../src/web/plugins/basicAuth.js";

const jwtWithScopeAuthValidatorReturnsValid = () => async () =>
  Promise.resolve();
const jwtWithScopeAuthValidatorReturnsInvalid = () => async (req, reply) => {
  reply.code(401);
};

describe("somePath", () => {
  const applicationConfig = {
    AUTH0_USER_AUDIENCE: "http://loves.goldenChick.com",
    AUTH0_DOMAIN: "goldenChick.com",
  };
  describe("With an invalid payload", () => {
    const server = fastify({ logger: true });
    const app = buildApp({
      server,
      applicationConfig,
      validator,
      basicAuthValidator,
      jwtWithScopeAuthValidator: jwtWithScopeAuthValidatorReturnsValid,
    });
    after(() => {
      app.close();
    });
    const payload = { name: "one bad payload" };

    it("Should return an error", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/foo",
        payload,
        headers: { authorization: "Basic Og==" },
      });
      expect(res.statusCode).to.equal(400);
      expect(res.json().message).to.not.be.empty;
    });
  });

  describe("With a valid request using bearer token", () => {
    const server = fastify({ logger: true });
    const payload = { name: "3" };
    const app = buildApp({
      server,
      applicationConfig,
      validator,
      basicAuthValidator,
      jwtWithScopeAuthValidator: jwtWithScopeAuthValidatorReturnsValid,
    });
    after(() => {
      app.close();
    });

    it("Should return a successful response", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/foo",
        payload,
        headers: {
          authorization: "Bearer goodToken",
        },
      });
      expect(res.statusCode).to.equal(200);
      expect(res.json()).to.deep.equal({ hello: "some world" });
    });
  });

  describe("With a valid request using basic auth", () => {
    const server = fastify({ logger: true });
    const payload = { name: "3" };
    const app = buildApp({
      server,
      applicationConfig,
      validator,
      jwtWithScopeAuthValidator: jwtWithScopeAuthValidatorReturnsInvalid,
      basicAuthValidator,
    });
    after(() => {
      app.close();
    });

    it("Should return a successful response", async () => {
      const res = await app.inject({
        method: "POST",
        url: "/foo",
        payload,
        headers: { authorization: "Basic Og==" },
      });
      expect(res.statusCode).to.equal(200);
      expect(res.json()).to.deep.equal({ hello: "some world" });
    });
  });
});
