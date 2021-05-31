export = Healthcheck;
/**
 * gRPC Healthcheck service declarations and implementations
 *
 * @class Healthcheck
 */
declare class Healthcheck {
    /**
     *Creates an instance of gRPC Healthcheck
     * @param {string} name service name
     * @param {*} [initStatus={}] a map of children components that make the service healthy
     * @memberof Healthcheck
     */
    constructor(name: string, initStatus?: any);
    service: any;
    controllers: any;
    /**
     * update healthcheck status. If any status is set to false,
     * the gRPC server will return NOT_SERVING when healthcheck service is called
     *
     * @param {*} [statusToUpdate={}]
     * @memberof Healthcheck
     */
    updateHealthCheckStatus(statusToUpdate?: any): void;
    #private;
}
