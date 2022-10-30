const questionController = require("../controllers/QuestionController");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  questionController.addQuestion
);
routes.get("/", verifyToken.verifyTokenAPI, questionController.getAllQuestion);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  questionController.findQuestionDetail
);
routes.get(
  "/:key",
  verifyToken.verifyTokenAPI,
  questionController.findQuestion
);
routes.put(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  questionController.updateQuestion
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  questionController.deleteQuestion
);
module.exports = routes;
