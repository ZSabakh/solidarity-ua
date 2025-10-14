const PostController = require("../../../server/controllers/post.controller");
const {
  createApiHandler,
} = require("../../../server/utility/createApiHandler");

const handler = createApiHandler({
  methods: ["GET"],
  handler: PostController.fetchOptions,
});

export default handler;
