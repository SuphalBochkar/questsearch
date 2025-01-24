// import {
//   serverSearchQuestionsByTitle,
//   serverSearchQuestionsByCategory,
// } from "@/app/api/questions/route";

// export async function getDataFromAPI(
//   title: string,
//   category: string,
//   page = 1,
//   pageSize = 10
// ) {
//   if (category === "ALL") {
//     const response = await serverSearchQuestionsByTitle(title, page, pageSize);
//     return response;
//   } else {
//     const response = await serverSearchQuestionsByCategory(
//       category,
//       page,
//       pageSize
//     );
//     return response;
//   }
// }
