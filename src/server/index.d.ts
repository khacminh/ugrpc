export = GrpcServer;
declare class GrpcServer {
    /**
     * proto loader configurations
     * @typedef {Object} ProtoConfig
     * @property {string} params.proto.packageName package name
     * @property {string} params.proto.serviceName service name
     * @property {string} params.proto.protoPath *.proto absolute file path
     */
    /**
     *Creates an instance of GrpcServer.
     * @param {Object} params
     * @param {string} params.name gRPC server name.
     * @param {string} params.host gRPC serving host. default: 0.0.0.0:3000
     * @param {ProtoConfig} params.proto proto loader configurations
     * @param {Object} params.controllers gRPC service implementations
     * @param {Object} params.healthcheckStatus service health check status. Leave it undefined for always SERVING
     * @memberof GrpcServer
     */
    constructor(params: {
        name: string;
        host: string;
        proto: ProtoConfig;
        controllers: any;
        healthcheckStatus: any;
    });
    server: grpc.Server;
    /**
     * Start the gRPC server
     *
     * @returns
     * @memberof GrpcServer
     */
    startServer(): Promise<any>;
    /**
     * Stop the gRPC server
     *
     * @returns
     * @memberof GrpcServer
     */
    stopServer(): Promise<any>;
    /**
     * Update the healthcheck status of the children components.
     * If any status is set to false, the gRPC server will return NOT_SERVING when healthcheck service is called
     *
     * @returns
     * @memberof GrpcServer
     */
    updateHealthcheck(status?: {}): void;
    #private;
}
declare namespace GrpcServer {
    export { ProtoConfig };
}
import grpc = require("@grpc/grpc-js");
/**
 * proto loader configurations
 */
type ProtoConfig = {
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
