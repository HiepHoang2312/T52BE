const bannerController = require("../controllers/bannersController");
const upload = require("../middleware/uploadPicture");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  upload.single("img"),
  bannerController.addBanners
);
routes.get(
  "/",
  verifyToken.verifyTokenAPI,
  bannerController.getAllBanners
);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  bannerController.findBannersDetail
);
routes.get(
  "/:key",
  verifyToken.verifyTokenAPI,
  bannerController.findBanners
);
routes.put(
  "/:id",
  upload.single("img"),
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  bannerController.updateBanners
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  bannerController.deleteBanners
);
module.exports = routes;
