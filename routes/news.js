const newsController = require("../controllers/newsController");
const upload = require("../middleware/uploadPicture");
const verifyToken = require("../middleware/verifyToken");
const routes = require("express").Router();
routes.post(
  "/",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  upload.single("img"),
  newsController.addNews,
);
routes.get("/", verifyToken.verifyTokenAPI, newsController.getAllNews);
routes.get(
  "/limit",
  // verifyToken.verifyTokenAPI,
  newsController.getAllNewsLimit,
);
routes.get(
  "/pagination",
  verifyToken.verifyTokenAPI,
  newsController.getAllNewsByPagination,
);
routes.get(
  "/detail/:id",
  verifyToken.verifyTokenAPI,
  newsController.findNewsDetail,
);
routes.get(
  "/search-name/:key",
  verifyToken.verifyTokenAPI,
  newsController.findNewsByName,
);
routes.get(
  "/search-slug/:key",
  // verifyToken.verifyTokenAPI,
  newsController.findNewsBySlug,
);

routes.get(
  "/search-type/:key",
  verifyToken.verifyTokenAPI,
  newsController.findNewsByType,
);
routes.get(
  "/search-date/:from/:to",
  verifyToken.verifyTokenAPI,
  newsController.findNewsByDate,
);
routes.put(
  "/:id",
  upload.single("img"),
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  newsController.updateNews,
);
routes.delete(
  "/:id",
  verifyToken.verifyTokenAPI,
  verifyToken.verifyTokenManager,
  newsController.deleteNews,
);
module.exports = routes;
