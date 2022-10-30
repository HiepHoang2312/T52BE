const partnerController = require("../controllers/partnerController");
const upload = require("../middleware/uploadPicture");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  upload.single("img"),
  partnerController.addPartners
);
routes.get(
  "/",
  verifyToken.verifyTokenAPI,
  partnerController.getAllPartners
);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  partnerController.findPartnersDetail
);
routes.get(
  "/:key",
  verifyToken.verifyTokenAPI,
  partnerController.findPartners
);
routes.put(
  "/:id",
  upload.single("img"),
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  partnerController.updatePartners
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  partnerController.deletePartners
);
module.exports = routes;
