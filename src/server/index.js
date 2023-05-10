const _ = require('lodash');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const Healthcheck = require('./healthcheck');

/**
 * channel options
 * Supported Channel Options: https://github.com/grpc/grpc-node/blob/master/packages/grpc-js/README.md#supported-channel-options
 */
const serverOptions = {
  'grpc.keepalive_time_ms': 10000,
  'grpc.keepalive_timeout_ms': 5000,
  'grpc.keepalive_permit_without_calls': 1,

  // Not supported - For the supported options, check: https://github.com/grpc/grpc-node/blob/master/packages/grpc-js/README.md#supported-channel-options
  // 'grpc.http2.max_pings_without_data': 0,
  // 'grpc.http2.min_time_between_pings_ms': 10000,
  // 'grpc.http2.min_ping_interval_without_data_ms': 5000,
};
class GrpcServer {
  #name

  #host

  #healthcheck

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
   * @property {[String]} [params.protoLoaderOptions.includeDirs=[]] A list of search paths for imported .proto files.
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
  constructor(params) {
    const { name, host, proto, controllers, healthcheckStatus } = params;
    const { packageName, serviceName, protoPath } = proto;
    const { protoLoaderOptions = {} } = params;
    this.#name = name || '';
    this.#host = host || '0.0.0.0:3000';
    const packageDefinition = protoLoader.loadSync(
      protoPath,
      {
        keepCase: false,
        longs: String,
        enums: String,
        defaults: false,
        oneofs: true,
        arrays: true,
        ...protoLoaderOptions,
      },
    );

    const GrpcService = _.chain(grpc.loadPackageDefinition(packageDefinition))
      .get(packageName)
      .get(serviceName)
      .value();

    const server = new grpc.Server(serverOptions);
    const healthcheck = new Healthcheck(this.#name);

    healthcheck.updateHealthCheckStatus(healthcheckStatus);
    server.addService(GrpcService.service, controllers);
    server.addService(healthcheck.service, healthcheck.controllers);

    this.server = server;
    this.#healthcheck = healthcheck;
  }

  /**
   * Start the gRPC server
   *
   * @returns
   * @memberof GrpcServer
   */
  startServer() {
    return new Promise((resolve, reject) => {
      this.server.bindAsync(this.#host, grpc.ServerCredentials.createInsecure(), (error, port) => {
        if (error) {
          console.error(`${this.#name} cannot bind: ${this.#host}`); // eslint-disable-line no-console
          reject(error);
        }
        this.server.start();
        resolve(`${this.#name} running on port ${port}`);
      });
    });
  }

  /**
   * Stop the gRPC server
   *
   * @returns
   * @memberof GrpcServer
   */
  stopServer() {
    return new Promise(resolve => {
      this.server.tryShutdown(() => {
        resolve();
      });
    });
  }

  /**
   * Update the healthcheck status of the children components.
   * If any status is set to false, the gRPC server will return NOT_SERVING when healthcheck service is called
   *
   * @returns
   * @memberof GrpcServer
   */
  updateHealthcheck(status = {}) {
    if (!_.isEmpty(status)) {
      this.#healthcheck.updateHealthCheckStatus(status);
    }
  }
}

module.exports = GrpcServer;
