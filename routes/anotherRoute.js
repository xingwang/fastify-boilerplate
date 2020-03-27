export default () => async (server, options, done) => {
  server.get('/', async () => ({ hello: 'another world' }));
  done();
};
