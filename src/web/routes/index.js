import someRoute from "./someRoute.js";
import anotherRoute from "./anotherRoute.js";

export default (config) => async (server) => {
  server.register(someRoute(config), { prefix: "/foo" });
  server.register(anotherRoute(config), { prefix: "/bar" });
};
