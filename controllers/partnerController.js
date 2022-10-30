const model = require("../model/model");
const Partners = model.Partner;
const Sequelize = require("sequelize");
const partnerController = {
  addPartners: async (req, res) => {
    try {
      const newPartners = new Partners({
        name: req.body.name,
      });
      if (req.file) {
        newPartners.img = process.env.URL + req.file.filename;
      }
      const savedPartners = await newPartners.save();
      res.json(savedPartners);
    } catch (error) {
      res.json(error);
    }
  },
  getAllPartners: async (req, res) => {
    console.log(req, "66");
    try {
      const allPartners = await Partners.findAll();
      res.json(allPartners);
    } catch (error) {
      res.json(error);
    }
  },
  findPartners: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const PartnersByName = await Partners.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });

      res.status(200).json(PartnersByName);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findPartnersDetail: async (req, res) => {
    try {
      const PartnersDetail = await Partners.findByPk(req.params.id);
      res.status(200).json(PartnersDetail);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updatePartners: async (req, res) => {
    try {
      const editPartners = await Partners.findByPk(req.params.id);
      if (req.file) {
        await editPartners.update({
          name: req.body.name,
          img: process.env.URL + req.file.filename,
        });
        res.status(200).json("Update successfuly");
      } else {
        await editPartners.update({
          name: req.body.name,
        });
        res.status(200).json("Update successfuly");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deletePartners: async (req, res) => {
    try {
      const banner = await Partners.findByPk(req.params.id);
      await banner.destroy();
      res.status(200).json("Delete successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = partnerController;
