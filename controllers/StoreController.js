const model = require("../model/model");
const Store = model.Store;
const Client = model.Client;
const Sequelize = require("sequelize");
const storeController = {
  addStore: async (req, res) => {
    try {
      const newStore = new Store(req.body);
      const savedStore = await newStore.save();
      res.status(200).json(savedStore);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllStore: async (req, res) => {
    try {
      const store = await Store.findAll({
        attributes: [
          "id",
          "name",
          "email",
          "phone",
          "idMap",
          "street",
          "district",
          "province",
        ],
        include: [
          {
            model: Client,
            as: "Clients",
          },
        ],
        //   include: { model: model.Address,
        //     attributes:["id","Street","district","province"]
        //  },
      });
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findStore: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const store = await Store.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(store);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findStoreDetail: async (req, res) => {
    try {
      const storeDetail = await Store.findByPk(req.params.id);
      res.status(200).json(storeDetail);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateStore: async (req, res) => {
    try {
      const store = await Store.findByPk(req.params.id);
      await store.update(req.body);
      res.status(200).json("Update successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteStore: async (req, res) => {
    try {
      const store = await Store.findByPk(req.params.id);
      await store.destroy();
      res.status(200).json("Delete successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = storeController;
