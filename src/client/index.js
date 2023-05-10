const _ = require('lodash');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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
function createGrpcClient(params) {
  const { host, proto = {}, isSecureChannel } = params;
  const { protoLoaderOptions = {} } = params;
  const { packageName, serviceName, protoPath } = proto;

  if (!host) {
    return null;
  }
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

  const options = {
    'grpc.keepalive_time_ms': 10000,
    'grpc.keepalive_timeout_ms': 5000,
    'grpc.keepalive_permit_without_calls': 1,
    'grpc.dns_min_time_between_resolutions_ms': 10000,
    // channelOverride: '',
    // 'grpc.http2.max_pings_without_data': 0,
    // 'grpc.http2.min_time_between_pings_ms': 10000,
    // 'grpc.http2.min_ping_interval_without_data_ms': 5000,
  };
  const channelCredential = isSecureChannel ? grpc.credentials.createSsl() : grpc.credentials.createInsecure();
  return new GrpcService(host, channelCredential, options);
}

function createCallOptions(timeoutMs = 60000) {
  const deadline = createDeadline(timeoutMs);
  return {
    deadline,
  };
}

function createDeadline(timeoutMs = 60000) {
  const deadline = new Date(Date.now() + timeoutMs);
  return deadline;
}

module.exports = {
  createGrpcClient,
  createCallOptions,
};
