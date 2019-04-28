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
            "name": "Ready countdown",
            "key": "prop.jumpdrive.readyT",
            "values": [
                {
                    "key": "readyT",
                    "name": "Regulation jump in",
                    "format": "string",
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
                "field": "readyT",
            }
        },
        {
            "name": "Ready seconds",
            "key": "prop.jumpdrive.readyRemaining",
            "values": [
                {
                    "key": "readyRemaining",
                    "name": "Ready remaining",
                    "format": "float",
                    "units": "s",
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
                "field": "readyRemaining",
            }
        },
        {
            "name": "Cooldown countdown",
            "key": "prop.jumpdrive.cooldownT",
            "values": [
                {
                    "key": "cooldownT",
                    "name": "Cooldown",
                    "format": "string",
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
                "field": "cooldownT",
            }
        },
        {
            "name": "Cooldown seconds",
            "key": "prop.jumpdrive.cooldownRemaining",
            "values": [
                {
                    "key": "cooldownRemaining",
                    "name": "Cooldown remaining",
                    "format": "float",
                    "units": "s",
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
                "field": "cooldownRemaining",
            }
        },
        {
            "name": "Jump countdown",
            "key": "prop.jumpdrive.jumpT",
            "values": [
                {
                    "key": "jumpT",
                    "name": "Jump in",
                    "format": "string",
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
                "field": "jumpT",
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
    ]
}
