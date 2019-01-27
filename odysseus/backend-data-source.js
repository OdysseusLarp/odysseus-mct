
// FIXME:  backend-data-source.js and random-data-source.js are largely the same

function BackendTelemetryPlugin(options) {
    const METHOD = "backend"
    
    return function (openmct) {
        const listeners = {}
        const previous = {}

        function fetchBackendJson(box) {
            let headers = new Headers()
            if (window.odysseusDictionary.backend.password) {
                headers.append('Authorization', 'Basic ' + btoa(window.odysseusDictionary.backend.username + ':' + window.odysseusDictionary.backend.password))
            }
            return fetch(`${window.odysseusDictionary.backend.url}/engineering/box/${box}`, {headers: headers})
            .then(function(response) {
                return response.json();
            })
        }

        function randomize(value, config) {
            let result
            if (config.randomRelative) {
                result = value * (1 + (2 * Math.random() - 1) * config.randomRelative)
            } else if (config.randomAbsolute) {
                result = value + (2 * Math.random() - 1) * config.randomAbsolute
            } else {
                result = value
            }
            if (typeof result === 'number' && isFinite(result)) {
                // Graphs bork up if they receive NaN value
                return result
            }
        }

        function getNextValue(config, previous) {
            const pollFrequency = config.pollFrequency || 10000
            if (!previous || Date.now() > previous.fetched + pollFrequency) {
                return fetchBackendJson(config.box)
                .then(function(json) {
                    const nextValue = json.value && json.value[config.field]
                    let previousValue = previous && previous.nextValue
                    if (typeof previousValue === 'undefined') {
                        // First time startup
                        previousValue = nextValue
                    }
                    console.log("Fetched " + nextValue + " for box '" + config.box + "'")
                    return {
                        fetched: Date.now(),
                        previousValue,
                        nextValue,
                        value: randomize(previousValue, config)
                    }
                }).catch(error => {
                    console.log("Backend data fetch error", error)
                    return {
                        fetched: Date.now()
                    }
                })
            } else {
                if (typeof previous.previousValue == 'undefined' || typeof previous.nextValue == 'undefined') {
                    return previous
                }
                // Interpolate between data points
                const t1 = previous.fetched
                const t2 = t1 + pollFrequency - 1000
                const t = Math.min(Date.now(), t2)
                const v1 = previous.previousValue
                const v2 = previous.nextValue
                const v = v1 + (t - t1) * (v2 - v1) / (t2 - t1)
                console.log("Interpolated " + v + " for box '" + config.box + "'")
                return {
                    fetched: previous.fetched,
                    previousValue: previous.previousValue,
                    nextValue: previous.nextValue,
                    value: randomize(v, config)
                }
            }
        }

        setInterval(function () {
            Object.keys(listeners).forEach(function (key) {
                if (listeners[key].length === 0) {
                    return
                }
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
                    m && m.source && m.source.method == METHOD)
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
