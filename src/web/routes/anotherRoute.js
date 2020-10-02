export default () => async (server) => {
  server.get("/", async () => ({ hello: "another world" }));
};
