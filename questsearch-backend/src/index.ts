import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import dotenv from "dotenv";
import { ProtoGrpcType } from "./questions";
import { DBConnection } from "./db/database";
import {
  FetchQuestionsByCategory,
  FetchQuestionsByTitle,
  FetchQuestionsByTitleAndCategory,
} from "./handlers/service.handlers";
// import { VercelRequest, VercelResponse } from "@vercel/node";

dotenv.config();
const PORT = process.env.PORT || 8080;
const PROTO_FILE = "./questions.proto";

const packageDef = protoLoader.loadSync(path.resolve(PROTO_FILE), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const questionPackage = grpcObj.questionPackage;

function main() {
  DBConnection();
  const server = new grpc.Server();
  server.addService(questionPackage.QueryService.service, {
    FetchQuestionsByTitle,
    FetchQuestionsByCategory,
    FetchQuestionsByTitleAndCategory,
  });

  server.bindAsync(
    `0.0.0.0:${process.env.PORT || PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (_err, port) => {
      console.log(`Server is running on port ${port}`);
    }
  );
}

main();

// export default (req: VercelRequest, res: VercelResponse) => {
//   res.status(200).send("server running");
// };
