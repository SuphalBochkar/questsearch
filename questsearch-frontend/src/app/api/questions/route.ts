import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const PROTO_PATH = path.resolve("./src/app/api/questions/questions.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(packageDef) as unknown;

const maxMessageSize = 100 * 1024 * 1024;
const clientOptions = {
  "grpc.max_receive_message_length": maxMessageSize,
  "grpc.max_send_message_length": maxMessageSize,
};

const client = new grpcObj.questionPackage.QueryService(
  "localhost:8080",
  grpc.credentials.createInsecure(),
  clientOptions
);

// export function serverSearchQuestionsByTitle(
//   title: string,
//   page = 1,
//   pageSize = 10
// ) {
//   return new Promise((resolve, reject) => {
//     client.FetchQuestionsByTitle(
//       { title, page, limit: pageSize },
//       (error: Error | null, response) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(response);
//         }
//       }
//     );
//   });
// }

// export function serverSearchQuestionsByCategory(
//   category: string,
//   page = 1,
//   pageSize = 10
// ) {
//   return new Promise((resolve, reject) => {
//     client.FetchQuestionsByCategory(
//       { category, page, limit: pageSize },
//       (error: Error | null, response) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(response);
//         }
//       }
//     );
//   });
// }

export async function serverDataFetch(
  title: string,
  category: string,
  page: number,
  limit: number
) {
  return new Promise((resolve, reject) => {
    client.FetchQuestionsByTitleAndCategory(
      { title, category, page, limit },
      (error: Error | null, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title = "", category = "", page = 1, limit = 10 } = body;

    if (!title && !category) {
      return NextResponse.json(
        { error: "Either 'title' or 'category' must be provided." },
        { status: 400 }
      );
    }

    const responseData = await serverDataFetch(title, category, page, limit);
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching questions:", error);
    return NextResponse.json(
      {
        error: "An error occurred while fetching questions.",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
