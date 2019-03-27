import app from "./app";

/**
 * Start Express server.
 */
const port = 1280
const server = app.listen(port, () => {
  console.log(
    "  App is running at http://localhost:%d",
    port
  );
  console.log("  Press CTRL-C to stop\n");
});

export default server;
