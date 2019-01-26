
function RandomTelemetryPlugin(options) {
    const METHOD = "random_brownian"
    
    return function (openmct) {
        const listener = {}
        const values = {}

        setInterval(function () {
            Object.keys(listener).forEach(function (key) {
                const m = findDictionaryMeasurement(key)
                if (m && m.source && m.source.method === METHOD) {
                    if (!(key in values)) {
                        values[key] = m.source.initialValue || 0
                    }
                    values[key] = values[key] + (2*Math.random() - 1) * (m.source.brownianStep || 0.1)
                    const point = {
                        timestamp: Date.now(),
                        value: values[key],
                        id: key
                    }
                    listener[key](point)
                }
             });
        }, 1000)

        var provider = {
            supportsSubscribe: function (domainObject) {
                const m = findDictionaryMeasurement(domainObject.identifier.key)
                return ((domainObject.type === 'odysseus.telemetry') &&
                    m && m.source && m.source.method == METHOD)
            },
            subscribe: function (domainObject, callback) {
                listener[domainObject.identifier.key] = callback;
                return function unsubscribe() {
                    delete listener[domainObject.identifier.key];
                };
            },
            supportsRequest: function (domainObject) {
                return this.supportsSubscribe(domainObject);
            },
            request: function (domainObject, options) {
                // No historical data supported
                return Promise.resolve([])
            }
        };

        openmct.telemetry.addProvider(provider);
    }
}
