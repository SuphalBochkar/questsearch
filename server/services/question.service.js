const { Questions } = require("../models/question.model");

const getByTitle = async (title, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const questions = await Questions.find({ $text: { $search: title } })
    .skip(offset)
    .limit(limit);
  return { questions };
};

const getByCategory = async (category, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const questions = await Questions.find({ category })
    .skip(offset)
    .limit(limit);
  return { questions };
};

const getByBoth = async (title, category, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const query = {};

  if (category && category !== "ALL") query.type = category;
  if (title && title.trim() !== "")
    query.title = { $regex: title, $options: "i" };

  const totalItems = await Questions.countDocuments(query);
  const questions = await Questions.find(query).skip(offset).limit(limit);

  return {
    questions,
    totalItems,
  };
};

module.exports = {
  getByTitle,
  getByCategory,
  getByBoth,
};
