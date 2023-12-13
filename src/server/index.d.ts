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
     * proto-loader options. Read more at: https://www.npmjs.com/package/@grpc/proto-loader
     * @typedef {Object} protoLoaderOptions
     * @property {Boolean} [params.protoLoaderOptions.keepCase=false] - `true` or `false`
     * @property {Function} [params.protoLoaderOptions.longs=String] `String` or `Number`
     * @property {Function} [params.protoLoaderOptions.enums=String] `String`
     * @property {Function} [params.protoLoaderOptions.bytes=Buffer] `Array` or `String`
     * @property {Boolean} [params.protoLoaderOptions.defaults=false] `true` or `false`
     * @property {Boolean} [params.protoLoaderOptions.arrays=true] `true` or `false`
     * @property {Boolean} [params.protoLoaderOptions.objects=false] `true` or `false`
     * @property {Boolean} [params.protoLoaderOptions.oneofs=true] `true` or `false`
     * @property {Boolean} [params.protoLoaderOptions.json=false] `true` or `false`
     * @property {String[]} [params.protoLoaderOptions.includeDirs=[]] A list of search paths for imported .proto files.
     */
    /**
     *Creates an instance of GrpcServer.
     * @param {Object} params
     * @param {string} params.name gRPC server name.
     * @param {string} params.host gRPC serving host. default: 0.0.0.0:3000
     * @param {ProtoConfig} params.proto proto loader configurations
     * @param {Object} params.controllers gRPC service implementations
     * @param {Object} params.healthcheckStatus service health check status. Leave it undefined for always SERVING
     * @param {protoLoaderOptions} params.protoLoaderOptions protoLoader Options.
     * Read more at: https://www.npmjs.com/package/@grpc/proto-loader
     * @memberof GrpcServer
     */
    constructor(params: {
        name: string;
        host: string;
        proto: {
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
        controllers: any;
        healthcheckStatus: any;
        protoLoaderOptions: {
            /**
             * - `true` or `false`
             */
            keepCase?: boolean;
            /**
             * `String` or `Number`
             */
            longs?: Function;
            /**
             * `String`
             */
            enums?: Function;
            /**
             * `Array` or `String`
             */
            bytes?: Function;
            /**
             * `true` or `false`
             */
            defaults?: boolean;
            /**
             * `true` or `false`
             */
            arrays?: boolean;
            /**
             * `true` or `false`
             */
            objects?: boolean;
            /**
             * `true` or `false`
             */
            oneofs?: boolean;
            /**
             * `true` or `false`
             */
            json?: boolean;
            /**
             * A list of search paths for imported .proto files.
             */
            includeDirs?: string[];
        };
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
import grpc = require("@grpc/grpc-js");
