const model = require("../model/model");
const News = model.News;
const Sequelize = require("sequelize");
const { Op } = require("sequelize");

function convertViToEn(str, toUpperCase = false) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  str = str.replace(/ /g, "-");

  return toUpperCase ? str.toUpperCase() : str;
}

const NewsController = {
  addNews: async (req, res) => {
    let slugConverByName = convertViToEn(req.body.name);
    const news = await News.findAndCountAll({
      where: {
        slug: {
          [Op.like]: `${slugConverByName}%`,
        },
      },
    });
    if (news.count > 0) {
      slugConverByName += "-" + news.count;
    }
    try {
      const news = new News({
        name: req.body.name,
        descript: req.body.descript,
        content: req.body.content,
        type: req.body.type,
        slug: slugConverByName,
        isHot: req.body.isHot,
      });
      if (req.file) {
        news.img = process.env.URL + req.file.filename;
      }

      const savedNews = await news.save();

      res.status(200).json(savedNews);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllNews: async (req, res) => {
    try {
      const resultIsHotTrue = await News.findAndCountAll({
        where: {
          isHot: true,
        },
        order: [["createdAt", "DESC"]],
      });
      const resultIsHostFalse = await News.findAndCountAll({
        where: {
          isHot: false,
        },
        order: [["createdAt", "DESC"]],
      });
      if (resultIsHotTrue.count > 0) {
        const string = resultIsHotTrue.rows.concat(resultIsHostFalse.rows);
        res.status(200).json(string);
      } else {
        const news = await News.findAndCountAll({
          order: [["createdAt", "DESC"]],
        });
        res.status(200).json(news);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllNewsLimit: async (req, res) => {
    try {
      const resultIsHotTrue = await News.findAndCountAll({
        where: {
          isHot: true,
        },
        order: [["createdAt", "DESC"]],
      });
      const resultIsHostFalse = await News.findAndCountAll({
        where: {
          isHot: false,
        },
        order: [["createdAt", "DESC"]],
      });
      if (resultIsHotTrue.count > 0) {
        const string = resultIsHotTrue.rows.concat(resultIsHostFalse.rows);
        let a = string.filter((item, index) => {
          if (index < req.query.limit) return item;
        });
        res.status(200).json(a);
      } else {
        const news = await News.findAndCountAll({
          order: [["createdAt", "DESC"]],
          limit: req.query.limit,
        });
        res.status(200).json(news.rows[0]);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllNewsByPagination: async (req, res) => {
    try {
      const pageAsNumber = Number.parseInt(req.query.page);
      const sizeAsNumber = Number.parseInt(req.query.size);
      let page = 0;
      if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
        page = pageAsNumber;
      }
      let size = 4;
      if (
        !Number.isNaN(sizeAsNumber) &&
        sizeAsNumber > 0 &&
        sizeAsNumber > size
      ) {
        size = sizeAsNumber;
      }
      const news = await News.findAndCountAll({
        // order: [["createdAt", "DESC"]],
        limit: size,
        offset: page * size,
      });
      res.send({
        content: news.rows,

        pageAt: page,
        totalItem: news.count,
        totalPages: Math.ceil(news.count / size),
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findNewsByName: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const news = await News.findAndCountAll({
        where: {
          name: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findNewsBySlug: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      console.log(req.params);
      const news = await News.findAndCountAll({
        where: {
          slug: resultSearch,
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(news.rows[0]);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findNewsByType: async (req, res) => {
    try {
      let resultSearch = req.params.key;
      const news = await News.findAndCountAll({
        where: {
          type: { [Sequelize.Op.like]: "%" + resultSearch + "%" },
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findNewsByDate: async (req, res) => {
    try {
      let fromSearch = req.params.from;
      let toSearch = req.params.to;

      const news = await News.findAndCountAll({
        where: {
          createdAt: {
            [Sequelize.Op.between]: [
              `${fromSearch}:00:00.000Z`,
              `${toSearch}:23:59.007Z`,
            ],
          },
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(news);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  findNewsDetail: async (req, res) => {
    try {
      const newsDetail = await News.findByPk(req.params.id);
      res.status(200).json(newsDetail);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateNews: async (req, res) => {
    try {
      const news = await News.findByPk(req.params.id);
      const slugConverByName = convertViToEn(req.body.name);
      if (req.file) {
        await news.update({
          name: req.body.name,
          descript: req.body.descript,
          content: req.body.content,
          type: req.body.type,
          slug: slugConverByName,
          img: process.env.URL + req.file.filename,
        });
        res.status(200).json("Update successfully");
      } else {
        await news.update({
          name: req.body.name,
          descript: req.body.descript,
          content: req.body.content,
          type: req.body.type,
          slug: slugConverByName,
        });
        res.status(200).json("Update successfuly");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteNews: async (req, res) => {
    try {
      const news = await News.findByPk(req.params.id);
      await news.destroy();
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = NewsController;
