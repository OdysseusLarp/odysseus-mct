function getDictionary() {
    return Promise.resolve(window.odysseusDictionary)
}

var objectProvider = {
    get: function (identifier) {
        return getDictionary().then(function (dictionary) {
            if (identifier.key === 'spacecraft') {
                return {
                    identifier: identifier,
                    name: dictionary.name,
                    type: 'folder',
                    location: 'ROOT'
                };
            } else {
                var measurement = dictionary.measurements.filter(function (m) {
                    return m.key === identifier.key;
                })[0];
                return {
                    identifier: identifier,
                    name: measurement.name,
                    type: 'odysseus.telemetry',
                    telemetry: {
                        values: measurement.values
                    },
                    location: 'odysseus.taxonomy:spacecraft'
                };
            }
        });
    }
};

var compositionProvider = {
    appliesTo: function (domainObject) {
        return domainObject.identifier.namespace === 'odysseus.taxonomy' &&
               domainObject.type === 'folder';
    },
    load: function (domainObject) {
        return getDictionary()
            .then(function (dictionary) {
                return dictionary.measurements.map(function (m) {
                    return {
                        namespace: 'odysseus.taxonomy',
                        key: m.key
                    };
                });
            });
    }
};

var DictionaryPlugin = function (openmct) {
    return function install(openmct) {
        openmct.objects.addRoot({
            namespace: 'odysseus.taxonomy',
            key: 'spacecraft'
        });

        openmct.objects.addProvider('odysseus.taxonomy', objectProvider);

        openmct.composition.addProvider(compositionProvider);

        // FIXME:  Remove/change this one later on
        openmct.types.addType('odysseus.telemetry', {
            name: 'Odysseus Telemetry Point',  // FIXME: Naming
            description: 'Example telemetry point from our happy tutorial.',
            cssClass: 'icon-telemetry'
        });
    };
};
