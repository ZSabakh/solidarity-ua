const MongooseConnection = require("./mongoose.connection");

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    try {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          reject(result);
        } else {
          resolve(result);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

function createApiHandler({ methods = [], middlewares = [], handler, prepareRequest }) {
  if (typeof handler !== "function") {
    throw new Error("Handler must be a function");
  }

  return async function apiHandler(req, res) {
    try {
      if (methods.length && !methods.includes(req.method)) {
        res.setHeader("Allow", methods);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
      }

      await MongooseConnection();

      if (typeof prepareRequest === "function") {
        await prepareRequest(req, res);
        if (res.writableEnded) {
          return;
        }
      }

      for (const middleware of middlewares) {
        await runMiddleware(req, res, middleware);
        if (res.writableEnded) {
          return;
        }
      }

      await handler(req, res);
    } catch (error) {
      console.error(error);
      if (!res.writableEnded) {
        res.status(500).json({ error: true, message: "Internal server error" });
      }
    }
  };
}

module.exports = { createApiHandler, runMiddleware };
