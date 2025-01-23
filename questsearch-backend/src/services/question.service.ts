import { Questions } from "../models/question.model";

export const getByTitle = async (title: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const questions = await Questions.find({ $text: { $search: title } })
    .skip(offset)
    .limit(limit);
  return { questions };
};

export const getByCategory = async (category: string, page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  const questions = await Questions.find({ category })
    .skip(offset)
    .limit(limit);
  return { questions };
};

export const getByBoth = async (
  title?: string,
  category?: string,
  page = 1,
  limit = 10
) => {
  const offset = (page - 1) * limit;
  const query: any = {};

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
