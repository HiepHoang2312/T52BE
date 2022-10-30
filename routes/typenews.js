const typeNewsController = require("../controllers/typeNewsController");
const upload = require("../middleware/uploadPicture");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  typeNewsController.addTypeNews
);
routes.get("/", verifyToken.verifyTokenAPI, typeNewsController.getAllTypeNews);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  typeNewsController.findTypeNewsDetail
);
routes.get(
  "/:key",
  verifyToken.verifyTokenAPI,
  typeNewsController.findTypeNews
);
routes.put(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  typeNewsController.updateTypeNews
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  typeNewsController.deleteTypeNews
);
module.exports = routes;
