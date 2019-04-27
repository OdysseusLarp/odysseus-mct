function findDictionaryMeasurement(key) {
    return window.odysseusDictionary.measurements.find(m => m.key === key)
}


window.odysseusDictionary = {
    "name": "Example Spacecraft",
    "key": "sc",
    "backend": {
        "url" : "https://odysseus.nicou.me",
        "username": "",
        "password": ""
    },
    "measurements": [
        {
            "name": "Jump drive temperature",
            "key": "prop.jumpdrive.temperature",
            "values": [
                {
                    "key": "jump_drive_temp", // must be same as 'source.field' below
                    "name": "Temperature",
                    "units": "K",
                    "formatString": '%d K',
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "backend",
                "type": "ship",
                "id": "jumpstate",
                "field": "jump_drive_temp",
            }
        },
        {
            "name": "Tachyon-baryonic coherence",
            "key": "prop.jumpdrive.coherence",
            "values": [
                {
                    "key": "coherence",
                    "name": "Coherence",
                    "units": "%",
                    "formatString": '%d%%',
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "backend",
                "type": "ship",
                "id": "jumpstate",
                "field": "coherence",
            }
        },
        {
            "name": "Jump drive state",
            "key": "prop.jumpdrive.state",
            "values": [
                {
                    "key": "statusno",
                    "name": "State",
                    "format": "enum",
                    "enumerations": [
                        {
                            "value": 0,
                            "string": "Broken",
                        },
                        {
                            "value": 1,
                            "string": "Cooling down",
                        },
                        {
                            "value": 2,
                            "string": "Ready to prep",
                        },
                        {
                            "value": 3,
                            "string": "Calculating",
                        },
                        {
                            "value": 4,
                            "string": "Preparations",
                        },
                        {
                            "value": 5,
                            "string": "Prep complete",
                        },
                        {
                            "value": 6,
                            "string": "Ready to jump",
                        },
                        {
                            "value": 7,
                            "string": "Jump initialized",
                        },
                        {
                            "value": 8,
                            "string": "Jumping",
                        },
                    ],
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "backend",
                "type": "ship",
                "id": "jumpstate",
                "field": "statusno",
            }
        },
        {
            "name": "Fuel",
            "key": "prop.fuel",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "units": "kilograms",
                    "format": "float",
                    "min": 0,
                    "max": 100,
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.1,
                "initialValue": 0
            }
        },
        {
            "name": "Thrusters",
            "key": "prop.thrusters",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "format": "enum",
                    "enumerations": [
                        {
                            "string": "ON",
                            "value": 1
                        },
                        {
                            "string": "OFF",
                            "value": 0
                        }
                    ],
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.1,
                "initialValue": 0
            }
        },
        {
            "name": "Received",
            "key": "comms.recd",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "units": "bytes",
                    "format": "integer",
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.1,
                "initialValue": 0
            }
        },
        {
            "name": "Sent",
            "key": "comms.sent",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "units": "bytes",
                    "format": "integer",
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.1,
                "initialValue": 0
            }
        },
        {
            "name": "Generator Temperature",
            "key": "pwr.temp",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "units": "℃",
                    "format": "float",
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.1,
                "initialValue": 60
            }
        },
        {
            "name": "Generator Current",
            "key": "pwr.c",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "units": "Amps",
                    "format": "float",
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.01,
                "initialValue": 0.5
            }
        },
        {
            "name": "Generator Voltage",
            "key": "pwr.v",
            "values": [
                {
                    "key": "value",
                    "name": "Value",
                    "units": "Volts",
                    "format": "float",
                    "hints": {
                        "range": 1
                    }
                },
                {
                    "key": "utc",
                    "source": "timestamp",
                    "name": "Timestamp",
                    "format": "utc",
                    "hints": {
                        "domain": 1
                    }
                }
            ],
            "source": {
                "method": "random_brownian",
                "brownianMultiplier": 0.01,
                "initialValue": 12
            }
        }
    ]
}
