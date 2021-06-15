const _ = require('lodash');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

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
function createGrpcClient(params) {
  const { host, proto = {}, isSecureChannel } = params;
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
    'grpc.http2.max_pings_without_data': 0,
    'grpc.http2.min_time_between_pings_ms': 10000,
    'grpc.http2.min_ping_interval_without_data_ms': 5000,
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
