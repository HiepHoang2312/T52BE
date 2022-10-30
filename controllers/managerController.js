const model = require("../model/model");
const Manager = model.Manager;

const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const managerController = {
  addManager: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      const checkDuplicateAccount = await Manager.findAndCountAll({
        where: {
          account: req.body.account,
        },
      });
      const checkDuplicateEmail = await Manager.findAndCountAll({
        where: {
          email: req.body.email,
        },
      });
      if (checkDuplicateAccount.count != 0) {
        res.status(401).json("Tài khoản " + req.body.account + " Đã tồn tại");
        return;
      }
      if (checkDuplicateEmail.count != 0) {
        res.status(401).json("Email " + req.body.account + " Đã tồn tại");
        return;
      }
      const newManager = new Manager({
        account: req.body.account,
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
      });
      const savedManager = await newManager.save();
      res.status(200).json(savedManager);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllManager: async (req, res) => {
    try {
      const manager = await Manager.findAll();
      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findManagerByName: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const manager = await Manager.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findManagerByPhone: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const manager = await Manager.findAndCountAll({
        where: {
          phone: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findManagerDetail: async (req, res) => {
    try {
      const manager = await Manager.findByPk(req.params.id);

      res.status(200).json(manager);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateManager: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      const manager = await Manager.findByPk(req.params.id);
      await manager.update({
        account: req.body.account,
        name: req.body.name,
        email: req.body.email,
        password: hashed,
        phone: req.body.phone,
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
      });
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteManager: async (req, res) => {
    try {
      const manager = await Manager.findByPk(req.params.id);
      await manager.destroy();
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  login: async (req, res) => {
    try {
      const manager = await Manager.findOne({
        where: { account: req.body.account },
      });
      if (manager === null) {
        return res.status(404).json("Wrong account");
      } else {
        console.log("found");
      }
      if (manager.count == 0) {
        return;
      }
      const validPassword = await bcrypt.compare(
        req.body.password,
        manager.password,
      );
      console.log(manager._doc);
      if (!validPassword) {
        return res.status(404).json("Wrong password");
      }
      if (manager && validPassword) {
        const accessToken = jwt.sign(
          {
            id: manager._id,
            isAdmin: manager.isAdmin,
          },
          process.env.JWT_ACCESS_KEY,
          { expiresIn: "30d" },
        );

        const { _id, password, ...others } = manager.dataValues;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = managerController;
