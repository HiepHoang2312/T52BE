const model = require("../model/model");
const Question = model.Question;
const Sequelize = require("sequelize");
const QuestionController = {
  addQuestion: async (req, res) => {
    try {
      const newQuestion = new Question(req.body);
      const savedQuestion = await newQuestion.save();

      res.status(200).json(savedQuestion);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllQuestion: async (req, res) => {
    try {
      const question = await Question.findAll();
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findQuestion: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const question = await Question.findAndCountAll({
        where: {
          title: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
      });
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findQuestionDetail: async (req, res) => {
    try {
      const question = await Question.findByPk(req.params.id);
      res.status(200).json(question);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateQuestion: async (req, res) => {
    try {
      const question = await Question.findByPk(req.params.id);
      await question.update(req.body);
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteQuestion: async (req, res) => {
    try {
      const question = await Question.findByPk(req.params.id);
      await question.destroy();
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = QuestionController;
