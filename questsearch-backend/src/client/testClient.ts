import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../../proto/questions";
import type { QueryServiceClient } from "../../proto/questionPackage/QueryService";
import type { QueryResponse__Output } from "../../proto/questionPackage/QueryResponse";
import type { UnaryCallback } from "@grpc/grpc-js/build/src/client";

const PROTO_FILE = "../../proto/questions.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const client = new grpcObj.questionPackage.QueryService(
  "localhost:8080",
  grpc.credentials.createInsecure()
) as QueryServiceClient;

// Test FetchQuestionsByTitle
client.FetchQuestionsByTitle({ title: "Rearrange", page: 1, limit: 10 }, ((
  err,
  response
) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Questions by Title:", response?.items);
  console.log("Total Items:", response?.totalItems);
}) as UnaryCallback<QueryResponse__Output>);

// Test FetchQuestionsByCategory
client.FetchQuestionsByCategory({ category: "ANAGRAM", page: 1, limit: 10 }, ((
  err,
  response
) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Questions by Category:", response?.items);
  console.log("Total Items:", response?.totalItems);
}) as UnaryCallback<QueryResponse__Output>);
