const { getUserCount } = require("./database");

async function registerRoutes(fastify) {
  fastify.get("/", async (request, reply) => {
    return {
      message: "Fastify User Count API is running!",
      version: "1.0.0",
      endpoints: {
        userCount: "/api/usercount",
        health: "/",
      },
    };
  });

  fastify.get("/api/usercount", async (request, reply) => {
    try {
      const totalUsers = await getUserCount();

      return {
        totalUsers: totalUsers,
      };
    } catch (error) {
      fastify.log.error("Database error:", error);

      reply.code(500).send({
        error: "Internal Server Error",
        message: "Failed to retrieve user count from database",
        details: error.message,
      });
    }
  });
}

module.exports = { registerRoutes };
