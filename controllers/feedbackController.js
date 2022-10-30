const model = require("../model/model");
const Feedback = model.Feedback;
const Sequelize = require("sequelize");
const feedbackController = {
  addFeedback: async (req, res) => {
    try {
      const newFeedback = new Feedback({
        name: req.body.name,
        content: req.body.content,
        job: req.body.job,
      });
      if (req.file) {
        newFeedback.img = process.env.URL + req.file.filename;
      }
      const savedFeedback = await newFeedback.save();
      res.status(200).json(savedFeedback);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.findAll();
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findFeedback: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const feedback = await Feedback.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });

      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findFeedbackDetail: async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      if (req.file) {
        await feedback.update({
          name: req.body.name,
          content: req.body.content,
          job: req.body.job,
          img: process.env.URL + req.file.filename,
        });
        res.status(200).json("Update successfuly");
      } else {
        await feedback.update({
          name: req.body.name,
          content: req.body.content,
          job: req.body.job,
        });
        res.status(200).json("Update successfuly");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteFeedback: async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      await feedback.destroy();
      res.status(200).json("Delete successfuly");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = feedbackController;
