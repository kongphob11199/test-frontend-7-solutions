import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/user";
import axios from "axios";
import { UsersResponse } from "./proto/proto/UsersResponse";
import { Users } from "./proto/proto/Users";

const PORT = 50051;
const PROTO_FILE = "./proto/user.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;
const useProto = grpcObj.proto;

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server as started on port : ${port}`);
      server.start();
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(useProto.UserService.service, {
    getUsers: getUsers,
  });

  return server;
}

const getUsers = async (
  call: grpc.ServerUnaryCall<any, UsersResponse>,
  callback: grpc.sendUnaryData<UsersResponse>
): Promise<void> => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    const userData = response.data.users as Users[];
    callback(null, {  users:userData, });
  } catch (error) {
    callback(
      {
        code: grpc.status.INTERNAL,
        message: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      null
    );
  }
};

main();
