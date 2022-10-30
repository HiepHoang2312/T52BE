const mediasController = require("../controllers/mediasController");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  mediasController.addMedias
);
routes.get(
  "/",
  verifyToken.verifyTokenAPI,
  mediasController.getAllMedias
);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  mediasController.findMediasDetail
);
routes.get(
  "/:key",
  verifyToken.verifyTokenAPI,
  mediasController.findMedias
);
routes.put(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  mediasController.updateMedias
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  mediasController.deleteMedias
);
module.exports = routes;
