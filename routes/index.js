import someRoute from './someRoute';
import anotherRoute from './anotherRoute';

export default (config) => async (server, options, done) => {
  server.register(someRoute(config), { prefix: '/foo' });
  server.register(anotherRoute(config), { prefix: '/bar' });
  done();
};
