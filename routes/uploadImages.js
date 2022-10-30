const uploadImagesController = require("../controllers/uploadImagesController");
const upload = require("../middleware/uploadPicture");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  upload.single("img"),
  verifyToken.verifyTokenManager,
  uploadImagesController.adduploadImages
);
routes.get(
  "/",
  verifyToken.verifyTokenAPI,
  uploadImagesController.getAlluploadImages
);
// routes.get(
//   "/detail/:id",
//   verifyToken.verifyTokenAPI,
//   uploadImagesController.finduploadImagesDetail
// );
// routes.get(
//   "/:key",
//   verifyToken.verifyTokenAPI,
//   uploadImagesController.finduploadImages
// );
// routes.put(
//   "/:id",
//   upload.single("img"),
//   verifyToken.verifyTokenAPI,
//   uploadImagesController.updateuploadImages
// );
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  uploadImagesController.deleteuploadImages
);
module.exports = routes;
