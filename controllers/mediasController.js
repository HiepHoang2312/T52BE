const model = require("../model/model");
const Medias = model.Media;
const Sequelize = require("sequelize");
const mediasController = {
  addMedias: async (req, res) => {
    try {
      const newMedias = new Medias(req.body);
      const savedMedias = await newMedias.save();

      res.status(200).json(savedMedias);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllMedias: async (req, res) => {
    try {
      const medias = await Medias.findAll();
      res.status(200).json(medias);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findMedias: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const medias = await Medias.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(medias);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findMediasDetail: async (req, res) => {
    try {
      const medias = await Medias.findByPk(req.params.id);
      res.status(200).json(medias);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findMediasByDate: async (req, res) => {
    try {
      const medias = await Medias.find({
        createdAt: { $gte: req.params.from, $lte: req.params.to },
      })
        .sort({ createdAt: -1 })
        .populate("personPost");
      res.status(200).json(medias);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateMedias: async (req, res) => {
    try {
      const medias = await Medias.findByPk(req.params.id);
      await medias.update(req.body);
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteMedias: async (req, res) => {
    try {
      const medias = await Medias.findByPk(req.params.id);
      await medias.destroy();
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = mediasController;
