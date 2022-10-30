const model = require("../model/model");
const Banners = model.Banner;
const Sequelize = require("sequelize");
const bannersController = {
  addBanners: async (req, res) => {
    try {
      const newBanners = new Banners({
        name: req.body.name,
      });
      if (req.file) {
        newBanners.img = process.env.URL + req.file.filename;
      }
      const savedBanners = await newBanners.save();
      res.json(savedBanners);
    } catch (error) {
      res.json(error);
    }
  },
  getAllBanners: async (req, res) => {
    try {
      const banners = await Banners.findAll();
      res.json(banners);
    } catch (error) {
      res.json(error);
    }
  },
  findBanners: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const banners = await Banners.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });

      res.status(200).json(banners);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findBannersDetail: async (req, res) => {
    try {
      const banners = await Banners.findByPk(req.params.id);
      res.status(200).json(banners);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateBanners: async (req, res) => {
    try {
      const banners = await Banners.findByPk(req.params.id);
      if (req.file) {
        await banners.update({
          name: req.body.name,
          img: process.env.URL + req.file.filename,
        });
        res.status(200).json("Update successfuly");
      } else {
        await banners.update({
          name: req.body.name,
        });
        res.status(200).json("Update successfuly");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteBanners: async (req, res) => {
    try {
      const banner = await Banners.findByPk(req.params.id);
      await banner.destroy();
      res.status(200).json("Delete successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = bannersController;
