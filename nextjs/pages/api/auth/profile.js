const AuthController = require("../../../server/controllers/user.controller");
const RateLimit = require("../../../server/middlewares/rate.limit.middleware");
const { validateToken } = require("../../../server/middlewares/validate.jwt.middleware");
const { createApiHandler } = require("../../../server/utility/createApiHandler");

const handler = createApiHandler({
  methods: ["GET"],
  middlewares: [RateLimit, validateToken],
  handler: AuthController.GetProfileData,
});

export default handler;
