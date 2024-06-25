
function BackendTelemetryPlugin() {
    const METHOD = "backend"
    const httpCache = new Map();
    const websocketCache = new Map();
    const subscriberCount = new Map();

    function fetchBackendField(type, id, field) {
        const cacheKey = `${type}-${id}`;
        const now = Date.now();

        let headers = new Headers()
        if (window.odysseusDictionary.backend.password) {
            headers.append('Authorization', 'Basic ' + btoa(window.odysseusDictionary.backend.username + ':' + window.odysseusDictionary.backend.password))
        }

        // Check if the data is in the cache and not stale
        if (httpCache.has(cacheKey)) {
            const cachedData = httpCache.get(cacheKey);
            if (now - cachedData.timestamp < 1000) { // 1 second
                return cachedData.promise.then(json => _.get(json, field));
            } else {
                httpCache.delete(cacheKey); // Remove stale data
            }
        }

        const fetchPromise = fetch(`${window.odysseusDictionary.backend.url}/data/${type}/${id}`, { headers: headers })
            .then(response => response.json());

        // Store the promise in the cache immediately
        httpCache.set(cacheKey, { timestamp: now, promise: fetchPromise });

        return fetchPromise.then(json => _.get(json, field));
    }

    function getKey(m) {
        return m.values[0].key
    }

    function scale(value, multiplier) {
        if (multiplier && typeof value == 'number') {
            return value * multiplier;
        } else {
            return value;
        }
    }

    return function (openmct) {
        var provider = {
            supportsSubscribe: function (domainObject) {
                const m = findDictionaryMeasurement(domainObject.identifier.key)
                return ((domainObject.type === 'odysseus.telemetry') &&
                    m && m.source && m.source.method === METHOD)
            },
            subscribe: function (domainObject, callback) {
                const key = domainObject.identifier.key
                const m = findDictionaryMeasurement(key)
                const type = m.source.type;
                const id = m.source.id;
                const cacheKey = `${type}-${id}`;

                let socket;
                if (websocketCache.has(cacheKey)) {
                    socket = websocketCache.get(cacheKey);
                } else {
                    socket = io(`${window.odysseusDictionary.backend.url}/data?data=/data/${type}/${id}`);
                    socket.on('disconnect', () => {
                        websocketCache.delete(cacheKey);
                        subscriberCount.delete(cacheKey);
                    });
                    websocketCache.set(cacheKey, socket);
                }

                function onDataUpdate(type, id, data) {
                    const point = {
                        timestamp: Date.now(),
                        [getKey(m)]: scale(_.get(data, m.source.field), m.source.multiplier),
                        id: key
                    };
                    callback(point);
                }
                socket.on('dataUpdate', onDataUpdate);

                // Increment the subscriber count
                subscriberCount.set(cacheKey, (subscriberCount.get(cacheKey) || 0) + 1);

                // Cleanup function
                return () => {
                    // Decrement the subscriber count
                    subscriberCount.set(cacheKey, subscriberCount.get(cacheKey) - 1);

                    // Detach the event listener
                    socket.off('dataUpdate', onDataUpdate);

                    // Close the WebSocket connection if no subscribers are left
                    if (subscriberCount.get(cacheKey) <= 0) {
                        const socket = websocketCache.get(cacheKey);
                        socket.close();
                        websocketCache.delete(cacheKey);
                        subscriberCount.delete(cacheKey);
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
                        return fetchBackendField(m.source.type, m.source.id, m.source.field)
                        .then(value => {
                            return [{
                                timestamp: Date.now(),
                                [getKey(m)]: scale(value, m.source.multiplier),
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
