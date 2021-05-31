const grpc = require('@grpc/grpc-js');
const Server = require('./server');
const Client = require('./client');

module.exports = {
  Server,
  Client,
  grpcStatus: grpc.status,
};
