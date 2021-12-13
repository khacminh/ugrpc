/**
 * proto-loader configurations
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
 * proto-loader options. Read more at: https://www.npmjs.com/package/@grpc/proto-loader
 */
export type protoLoaderOptions = {
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
    includeDirs?: [string];
};
/**
 * proto-loader configurations
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
 * @property {[String]} [params.protoLoaderOptions.includeDirs=[]] A list of search paths for imported .proto files.
 */
/**
 * Create gRPC Client
 *
 * @param {Object} params
 * @param {!string} params.host gRPC server address. REQUIRED
 * @param {!Boolean} params.isSecureChannel should create the secure channel. Default: false
 * @param {!ProtoConfig} params.proto proto loader configurations
 * @param {!protoLoaderOptions} params.protoLoaderOptions proto loader configurations
 * @returns {grpc.Client} gRPC Client
 */
export function createGrpcClient(params: {
    host: string;
    isSecureChannel: boolean;
    proto: ProtoConfig;
    protoLoaderOptions: protoLoaderOptions;
}): grpc.Client;
export function createCallOptions(timeoutMs?: number): {
    deadline: Date;
};
import grpc = require("@grpc/grpc-js");
