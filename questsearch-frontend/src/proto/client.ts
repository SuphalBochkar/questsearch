import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./questions";

const PROTO_PATH = path.resolve("./src/proto/questions.proto");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const maxMessageSize = 100 * 1024 * 1024;
const clientOptions = {
  "grpc.max_receive_message_length": maxMessageSize,
  "grpc.max_send_message_length": maxMessageSize,
};

const client = new grpcObj.questionPackage.QueryService(
  process.env.GRPC_SERVER_URL || "localhost:8080",
  grpc.credentials.createInsecure(),
  clientOptions
);

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
