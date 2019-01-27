
function RandomTelemetryPlugin() {
    const METHOD = "random_brownian"
    
    function getNextValue(config, previous) {
        let value = config.initialValue || 0
        if (previous) {
            value = previous.value
        }
        value += (2*Math.random() - 1) * (config.brownianStep || 0.1)
        return { value }
    }

    return GenericRealtimeTelemetryPlugin(METHOD, getNextValue)
}
