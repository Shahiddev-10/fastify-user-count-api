const fastify = require("fastify")({
  logger: true,
});

const { registerRoutes } = require("./routes");

fastify.register(require("@fastify/cors"), {
  origin: true,
});

fastify.register(registerRoutes);

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.code(500).send({
    error: "Internal Server Error",
    message: "Something went wrong!",
  });
});

const start = async () => {
  try {
    const port = process.env.PORT || 6776;
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ port, host });
    fastify.log.info(`Server is running on http://localhost:${port}`);
    fastify.log.info(
      `API endpoint available at: http://localhost:${port}/api/usercount`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
