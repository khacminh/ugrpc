import Server = require("./server");
import Client = require("./client");
import grpc = require("@grpc/grpc-js");
export declare const grpcStatus: typeof grpc.status;
export { Server, Client };
