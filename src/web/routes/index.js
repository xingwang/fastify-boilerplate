import someRoute from "./someRoute";
import anotherRoute from "./anotherRoute";

export default (config) => async (server) => {
  server.register(someRoute(config), { prefix: "/foo" });
  server.register(anotherRoute(config), { prefix: "/bar" });
};
