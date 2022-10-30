const managerController = require("../controllers/managerController");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post("/", verifyToken.verifyTokenAPI, managerController.addManager);
routes.post("/login", verifyToken.verifyTokenAPI, managerController.login);
routes.get("/", verifyToken.verifyTokenAPI, managerController.getAllManager);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  managerController.findManagerDetail,
);
routes.get(
  "/search-name/:key",
  verifyToken.verifyTokenAPI,
  managerController.findManagerByName,
);
routes.get(
  "/search-phone/:key",
  verifyToken.verifyTokenAPI,
  managerController.findManagerByPhone,
);
routes.put(
  "/:id",
  verifyToken.verifyTokenAPI,

  managerController.updateManager,
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,

  managerController.deleteManager,
);
module.exports = routes;
