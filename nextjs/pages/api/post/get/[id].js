const PostController = require("../../../../server/controllers/post.controller");
const {
  checkAuthorization,
} = require("../../../../server/middlewares/validate.jwt.middleware");
const {
  createApiHandler,
} = require("../../../../server/utility/createApiHandler");

const handler = createApiHandler({
  methods: ["GET"],
  middlewares: [checkAuthorization],
  prepareRequest: (req) => {
    req.params = { id: req.query.id };
  },
  handler: PostController.getPost,
});

export default handler;
