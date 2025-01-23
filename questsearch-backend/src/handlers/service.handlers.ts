import { CategoryQuery } from "../questionPackage/CategoryQuery";
import { QueryResponse } from "../questionPackage/QueryResponse";
import { TitleQuery } from "../questionPackage/TitleQuery";
import {
  getByBoth,
  getByCategory,
  getByTitle,
} from "../services/question.service";
import type { QuestionItem } from "../questionPackage/QuestionItem";
import { TitleCategoryQuery } from "../questionPackage/TitleCategoryQuery";

function transformDocument(obj: any): QuestionItem {
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

export async function FetchQuestionsByTitle(call: any, callback: any) {
  try {
    const { title, page, limit } = call.request as TitleQuery;
    if (!title) return callback(new Error("Title required"), null);

    const { questions } = await getByTitle(title, page, limit);
    const response: QueryResponse = {
      items: questions.map(transformDocument),
      totalItems: questions.length,
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

export async function FetchQuestionsByCategory(call: any, callback: any) {
  try {
    const { category, page, limit } = call.request as CategoryQuery;
    if (!category) return callback(new Error("Category required"), null);

    const { questions } = await getByCategory(category, page, limit);
    const response: QueryResponse = {
      items: questions.map(transformDocument),
      totalItems: questions.length,
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}

export async function FetchQuestionsByTitleAndCategory(
  call: any,
  callback: any
) {
  try {
    const { title, category, page, limit } = call.request as TitleCategoryQuery;
    if (!category && !title)
      return callback(new Error("No title or category provided"), null);

    const { questions, totalItems } = await getByBoth(
      title,
      category,
      page,
      limit
    );
    const response: QueryResponse = {
      items: questions.map(transformDocument),
      totalItems: totalItems,
    };
    callback(null, response);
  } catch (error) {
    callback(error, null);
  }
}
