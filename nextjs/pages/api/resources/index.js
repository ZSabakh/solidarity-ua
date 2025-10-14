const ResourceController = require("../../../server/controllers/resource.controller");
const {
  createApiHandler,
} = require("../../../server/utility/createApiHandler");

const handler = createApiHandler({
  methods: ["GET"],
  handler: ResourceController.fetchResources,
});

export default handler;
