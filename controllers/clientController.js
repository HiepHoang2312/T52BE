const model = require("../model/model");
const Client = model.Client;
const Store = model.Store;
const Sequelize = require("sequelize");
const clientController = {
  addClient: async (req, res) => {
    try {
      const newClient = new Client(req.body);
      const savedClient = await newClient.save();
      res.status(200).json(savedClient);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllClient: async (req, res) => {
    try {
      const client = await Client.findAll({
        include: [
          {
            model: Store,
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
          },
        ],
      });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findClientByName: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const client = await Client.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findClientByPhone: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const client = await Client.findAndCountAll({
        where: {
          phone: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findClientDetail: async (req, res) => {
    try {
      const client = await Client.findByPk(req.params.id);
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateClient: async (req, res) => {
    try {
      const client = await Client.findByPk(req.params.id);
      await client.update(req.body);
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteClient: async (req, res) => {
    try {
      const client = await Client.findByPk(req.params.id);
      await client.destroy();
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = clientController;
