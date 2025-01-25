const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const dotenv = require("dotenv");
const { DBConnection } = require("./db/database");
const {
  FetchQuestionsByCategory,
  FetchQuestionsByTitle,
  FetchQuestionsByTitleAndCategory,
} = require("./handlers/service.handlers");

dotenv.config();

const PROTO_FILE = "./questions.proto";

const packageDef = protoLoader.loadSync(path.resolve(PROTO_FILE), {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const grpcObj = grpc.loadPackageDefinition(packageDef);
const questionPackage = grpcObj.questionPackage;

async function main() {
  try {
    await DBConnection();
    console.log("Database connection established");

    const server = new grpc.Server();
    server.addService(questionPackage.QueryService.service, {
      FetchQuestionsByTitle,
      FetchQuestionsByCategory,
      FetchQuestionsByTitleAndCategory,
    });

    server.bindAsync(
      "0.0.0.0:50051",
      grpc.ServerCredentials.createInsecure(),
      (error, port) => {
        if (error) {
          console.error("Error starting server:", error);
          return;
        }
        console.log(`Server running at http://0.0.0.0:${port}`);
        server.start();
      }
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
