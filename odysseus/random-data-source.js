
// FIXME:  backend-data-source.js and random-data-source.js are largely the same

function RandomTelemetryPlugin(options) {
    const METHOD = "random_brownian"
    
    return function (openmct) {
        const listener = {}
        const previous = {}

        function getNextValue(config, previous) {
            let value = config.initialValue || 0
            if (previous) {
                value = previous.value
            }
            value += (2*Math.random() - 1) * (config.brownianStep || 0.1)
            return { value }
        }

        setInterval(function () {
            Object.keys(listener).forEach(function (key) {
                const m = findDictionaryMeasurement(key)
                if (m && m.source && m.source.method === METHOD) {
                    const possiblePromise = getNextValue(m.source, previous[key])
                    // Accept both direct value and promises
                    Promise.resolve(possiblePromise).then(obj => {
                        previous[key] = obj
                        if (obj && typeof obj.value !== 'undefined') {
                            const point = {
                                timestamp: Date.now(),
                                value: obj.value,
                                id: key
                            }
                            listener[key](point)
                        }
                    })
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
                console.log("HISTORY DATA:", domainObject, options)
                console.log("Now: " + Date.now())

                if (options.end > Date.now() - 10000) {
                    // Requesting recent data - mock that a new data point is at current time (fixes various stuff)
                    const key = domainObject.identifier.key
                    const m = findDictionaryMeasurement(key)
                    if (m && m.source && m.source.method === METHOD) {
                        const possiblePromise = getNextValue(m.source, previous[key])
                        // Accept both direct value and promises
                        return Promise.resolve(possiblePromise).then(obj => {
                            previous[key] = obj
                            return [{
                                timestamp: Date.now(),
                                value: obj.value,
                                id: key
                            }]
                        })
                    }
    
                }
                // No historical data supported
                return Promise.resolve([])
            }
        };

        openmct.telemetry.addProvider(provider);
    }
}
