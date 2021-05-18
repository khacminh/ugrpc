const _ = require('lodash');
const { servingStatus, Implementation, service } = require('grpc-js-health-check');

/**
 * gRPC Healthcheck service declarations and implementations
 *
 * @class Healthcheck
 */
class Healthcheck {
  #status

  #statusMap

  #serviceName

  /**
   *Creates an instance of gRPC Healthcheck
   * @param {string} name service name
   * @param {*} [initStatus={}] a map of children components that make the service healthy
   * @memberof Healthcheck
   */
  constructor(name, initStatus = {}) {
    this.service = service;
    this.#status = initStatus;
    this.#statusMap = {
      [name]: _.every(this.#status) ? servingStatus.SERVING : servingStatus.NOT_SERVING,
    };
    this.#serviceName = name;
    this.controllers = new Implementation(this.#statusMap);
  }

  /**
   * update healthcheck status. If any status is set to false,
   * the gRPC server will return NOT_SERVING when healthcheck service is called
   *
   * @param {*} [statusToUpdate={}]
   * @memberof Healthcheck
   */
  updateHealthCheckStatus(statusToUpdate = {}) {
    Object.assign(this.#status, _.omitBy(statusToUpdate, _.isNil));
    const isHealthy = _.every(this.#status);
    if (!isHealthy) {
      this.controllers.setStatus(this.#serviceName, servingStatus.NOT_SERVING);
    }
  }
}

module.exports = Healthcheck;
