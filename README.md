# ugrpc

gRPC for microservice communications

This package offers a concise method for establishing both gRPC server and client.

## Examples

```protobuf
syntax = "proto3";

package calculator;

service Calculator{
  rpc Sum (SumRequest) returns (SumResponse);
}

message SumRequest {
  int32 first_number = 1;
  int32 second_number = 2;
}

message SumResponse {
  int32 result = 1;
}
```

### Server

```javascript
const { Server } = require('ugrpc');

const server = new Server({
  proto: {
    packageName: 'calculator',
    serviceName: 'Calculator',
    protoPath: path.join(__dirname, '../proto/calculator.proto'),
  },

  // run the server on port 3000
  host: '0.0.0.0:3000',

  // init healthcheck status
  // the following configuration will provide `SERVING` health check status for service `calc`
  name: 'calc',
  healthcheckStatus: {},

  // implementations of the methods
  controllers: {
    sum: async () => { ... }
  },
});

// start the gRPC server
server.startServer();

// stop the server
server.stopServer();
```

#### Configuring `proto-loader` options

This package utilizes `proto-loader` for loading the proto file. You can specify `proto-loader` options as follows:

```javascript
const server = new Server({
  // ...other configs

  // these are the default options
  protoLoaderOptions: {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: false,
    oneofs: true,
    arrays: true,
  }
});
```

#### Additional configurations for health check status examples

Suppose your server's health depends on two other services: mysql server and foo service. Initialize your service health check with:

```javascript
const server = new Server({
  // ...other configs
  name: 'calc',
  healthcheckStatus: {
    mysql: true,
    foo: true
  }
});
```

In the event of a connection error to the MySQL server, update your service's health status to unhealthy:

```javascript
server.updateHealthCheckStatus({mysql: false})
```

#### Bypass the Health Check

By default, if you don't define the property `healthcheckStatus`, the service is always considered healthy.

```javascript
const server = new Server({{
  // ...other configs
  name: 'calc',
});
```

The gRPC health check status will be:

```javascript
{
  '': servingStatus.SERVING,
  'calc': servingStatus.SERVING
}
```

If you leave the service `name` undefined, the health check status will be:

```javascript
{
  '': servingStatus.SERVING,
}
```

### Client

```javascript
const { Client } = require('ugrpc');

const client = Client.createGrpcClient({
  host: 'calculator.svc:3000',
  proto: {
    packageName: 'calculator',
    serviceName: 'Calculator',
    protoPath: path.join(__dirname, '../proto/calculator.proto'),
  },
});

// create call options: deadline in 30s
const options = Client.createCallOptions(30000);

// send grpc request
client.sum({ firstNumber: 1, secondNumber: 2 }, options, (err, data) => {
  if (err) {
    console.error('sum ERROR', err)
  } else {
    console.log('sum RESULT', data.result)
  }
})
```

#### Configuring proto-loader Options

You can also specify proto-loader options as follows:

```javascript
const client = Client.createGrpcClient({
  // ...other configs
  protoLoaderOptions: {
    keepCase: false,
    longs: String,
    enums: String,
    defaults: false,
    oneofs: true,
    arrays: true,
  }
});
```
