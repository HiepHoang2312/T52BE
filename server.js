const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://t52tiennhanh.net",
      "http://103.57.220.195",
    ],
  }),
);

const PORT = process.env.PORT || 8080;
const bannerRoutes = require("./routes/banner.js");
const partnerRoutes = require("./routes/partner");
const storeRoutes = require("./routes/store");
const mediaRoutes = require("./routes/medias");
const newsRoutes = require("./routes/news");
const clientRoutes = require("./routes/client");
const managerRoutes = require("./routes/manager");
const uploadImagesRoutes = require("./routes/uploadImages");
const typenewsRoutes = require("./routes/typenews");
const questionRoutes = require("./routes/question");
const feedbackRoutes = require("./routes/feedback");

app.use(express.static(__dirname + "/"));
app.use("/banner", bannerRoutes);
app.use("/partner", partnerRoutes);
app.use("/store", storeRoutes);
app.use("/media", mediaRoutes);
app.use("/news/", newsRoutes);
app.use("/client/", clientRoutes);
app.use("/manager/", managerRoutes);
app.use("/upload-images/", uploadImagesRoutes);
app.use("/typenews/", typenewsRoutes);
app.use("/question/", questionRoutes);
app.use("/feedback/", feedbackRoutes);
app.get("/", (req, res) => {
  res.status(200).json("welcom to API");
});

app.listen(PORT, (req, res) => {
  console.log("Server i­s running");
});
