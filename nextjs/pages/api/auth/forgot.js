const AuthController = require("../../../server/controllers/user.controller");
const { verifyCaptcha } = require("../../../server/middlewares/captcha.verify.middleware");
const RateLimit = require("../../../server/middlewares/rate.limit.middleware");
const { createApiHandler } = require("../../../server/utility/createApiHandler");

const handler = createApiHandler({
  methods: ["POST"],
  middlewares: [RateLimit, verifyCaptcha],
  handler: AuthController.ForgotPassword,
});

export default handler;
