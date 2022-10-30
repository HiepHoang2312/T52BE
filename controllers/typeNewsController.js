const model = require("../model/model");
const TypeNews = model.TypeNews;
const Sequelize = require("sequelize");
const typeNewsController = {
  addTypeNews: async (req, res) => {
    try {
      const newTypeNews = new TypeNews({
        name: req.body.name,
      });

      const savedTypeNews = await newTypeNews.save();
      res.json(savedTypeNews);
    } catch (error) {
      res.json(error);
    }
  },
  getAllTypeNews: async (req, res) => {
    try {
      const allTypeNews = await TypeNews.findAll();
      res.json(allTypeNews);
    } catch (error) {
      res.json(error);
    }
  },
  findTypeNews: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const TypeNewsByName = await TypeNews.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });

      res.status(200).json(TypeNewsByName);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findTypeNewsDetail: async (req, res) => {
    try {
      const TypeNewsDetail = await TypeNews.findByPk(req.params.id);
      res.status(200).json(TypeNewsDetail);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateTypeNews: async (req, res) => {
    try {
      const editTypeNews = await TypeNews.findByPk(req.params.id);

      await editTypeNews.update({
        name: req.body.name,
      });
      res.status(200).json("Update successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteTypeNews: async (req, res) => {
    try {
      const typeNews = await TypeNews.findByPk(req.params.id);
      await typeNews.destroy();
      res.status(200).json("Delete successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = typeNewsController;
