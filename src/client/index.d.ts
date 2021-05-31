/**
 * proto loader configurations
 */
export type ProtoConfig = {
    /**
     * package name
     */
    packageName: string;
    /**
     * service name
     */
    serviceName: string;
    /**
     * *.proto absolute file path
     */
    protoPath: string;
};
/**
 * proto loader configurations
 * @typedef {Object} ProtoConfig
 * @property {string} params.proto.packageName package name
 * @property {string} params.proto.serviceName service name
 * @property {string} params.proto.protoPath *.proto absolute file path
 */
/**
 * Create gRPC Client
 *
 * @param {Object} params
 * @param {!string} params.host gRPC server address. REQUIRED
 * @param {!Boolean} params.isSecureChannel should create the secure channel. Default: false
 * @param {!ProtoConfig} params.proto proto loader configurations
 * @returns {grpc.Client} gRPC Client
 */
export function createGrpcClient(params: {
    host: string;
    isSecureChannel: boolean;
    proto: ProtoConfig;
}): grpc.Client;
export function createCallOptions(timeoutMs?: number): {
    deadline: Date;
};
import grpc = require("@grpc/grpc-js");
