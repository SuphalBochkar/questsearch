const {
  getByBoth,
  getByCategory,
  getByTitle,
} = require("../services/question.service");

function transformDocument(obj) {
  return {
    id: obj._id.toString(),
    type: obj.type,
    title: obj.title || "",
    solution: obj.solution || "",
    anagramType: obj.anagramType || "",
    blocks: obj.blocks || [],
    options: obj.options || [],
    siblingId: obj.siblingId?.toString() || "",
  };
}

async function FetchQuestionsByTitle(call, callback) {
  try {
    const { title, page, limit } = call.request;
    if (!title) return callback(new Error("Title required"), null);

    const { questions } = await getByTitle(title, page, limit);
    const response = {
      items: questions.map(transformDocument),
      totalItems: questions.length,
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

async function FetchQuestionsByCategory(call, callback) {
  try {
    const { category, page, limit } = call.request;
    if (!category) return callback(new Error("Category required"), null);

    const { questions } = await getByCategory(category, page, limit);
    const response = {
      items: questions.map(transformDocument),
      totalItems: questions.length,
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

async function FetchQuestionsByTitleAndCategory(call, callback) {
  try {
    const { title, category, page, limit } = call.request;
    if (!category && !title)
      return callback(new Error("No title or category provided"), null);

    const { questions, totalItems } = await getByBoth(
      title,
      category,
      page,
      limit
    );
    const response = {
      items: questions.map(transformDocument),
      totalItems: totalItems,
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

module.exports = {
  FetchQuestionsByTitle,
  FetchQuestionsByCategory,
  FetchQuestionsByTitleAndCategory,
};
