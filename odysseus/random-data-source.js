
function RandomTelemetryPlugin(options) {
    options = options || {}
    const delay = options.delay || 500
    const brownianStep = options.brownianStep || 0.1

    return function (openmct) {
        const listener = {}
        const values = {}

        setInterval(function () {
            Object.keys(listener).forEach(function (key) {
                values[key] = (values[key] || 0) + (2*Math.random() - 1) * brownianStep
                const point = {
                    timestamp: Date.now(),
                    value: values[key],
                    id: key
                }
                listener[key](point)
             });
        }, delay)

        var provider = {
            supportsSubscribe: function (domainObject) {
                return domainObject.type === 'example.telemetry' // FIXME: IDs as argument
            },
            subscribe: function (domainObject, callback) {
                listener[domainObject.identifier.key] = callback;
                return function unsubscribe() {
                    delete listener[domainObject.identifier.key];
                };
            }
        };

        openmct.telemetry.addProvider(provider);
    }
}
