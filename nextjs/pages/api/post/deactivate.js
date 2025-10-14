const PostController = require("../../../server/controllers/post.controller");
const {
  validateToken,
} = require("../../../server/middlewares/validate.jwt.middleware");
const {
  createApiHandler,
} = require("../../../server/utility/createApiHandler");

const handler = createApiHandler({
  methods: ["POST"],
  middlewares: [validateToken],
  handler: PostController.deactivate,
});

export default handler;
