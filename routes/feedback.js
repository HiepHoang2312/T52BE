const feedbackController = require("../controllers/feedbackController");
const upload = require("../middleware/uploadPicture");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  upload.single("img"),
  feedbackController.addFeedback
);
routes.get("/", verifyToken.verifyTokenAPI, feedbackController.getAllFeedback);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  feedbackController.findFeedbackDetail
);
routes.get(
  "/:key",
  verifyToken.verifyTokenAPI,
  feedbackController.findFeedback
);
routes.put(
  "/:id",
  upload.single("img"),
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  feedbackController.updateFeedback
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  feedbackController.deleteFeedback
);
module.exports = routes;
