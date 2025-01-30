const Hapi = require("@hapi/hapi");
const bookRoute = require("./books/routes.js");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });

  server.route(bookRoute);

  await server.start();
  console.log("Server berjalan pada", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
