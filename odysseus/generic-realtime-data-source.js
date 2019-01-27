
// FIXME:  backend-data-source.js and random-data-source.js are largely the same

/**
 * A generic implementation of real-time data source based on Odysseus dictionary.
 * 
 * This plugin takes a method name (from odysseus dictionary) and a function to return
 * the next data value.  The function is provided with the dictionary configuration object
 * and the previous object that it returned (first time undefined).  The function must
 * return directly or as a Promise an object containing 'value' as the next telemetry data
 * point (or undefined for no data).
 * 
 * @param {*} methodName    The method defined in odysseus dictionary to respond to
 * @param {*} getNextValue  A function to return the next data point
 */
function GenericRealtimeTelemetryPlugin(methodName, getNextValue) {
    
    return function (openmct) {
        const listeners = {}
        const previous = {}

        setInterval(function () {
            Object.keys(listeners).forEach(function (key) {
                if (listeners[key].length === 0) {
                    return
                }
                const m = findDictionaryMeasurement(key)
                if (m && m.source && m.source.method === methodName) {
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
                            listeners[key].forEach(l => l(point))
                        }
                    })
                }
             });
        }, 1000)

        var provider = {
            supportsSubscribe: function (domainObject) {
                const m = findDictionaryMeasurement(domainObject.identifier.key)
                return ((domainObject.type === 'odysseus.telemetry') &&
                    m && m.source && m.source.method === methodName)
            },
            subscribe: function (domainObject, callback) {
                const key = domainObject.identifier.key
                listeners[key] = listeners[key] || []
                listeners[key].push(callback);
                return function unsubscribe() {
                    const index = listeners[key].indexOf(callback);
                    if (index > -1) {
                        listeners[key].splice(index, 1);
                    }
                };
            },
            supportsRequest: function (domainObject) {
                return this.supportsSubscribe(domainObject);
            },
            request: function (domainObject, options) {
                if (options.end > Date.now() - 10000) {
                    // Requesting recent data - mock that a new data point is at current time (fixes various stuff)
                    const key = domainObject.identifier.key
                    const m = findDictionaryMeasurement(key)
                    if (m && m.source && m.source.method === methodName) {
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
