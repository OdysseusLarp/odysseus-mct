function findDictionaryMeasurement(key) {
    return window.odysseusDictionary.measurements.find(m => m.key === key)
}

function eeType(type, name) {
    return [
        {
            "name": name + " health",
            "key": "prop.health." + type,
            "values": [
                {
                    "key": type + "Health",
                    "name": name + " health",
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
                "id": "ee",
                "field": "systems.health." + type + "Health",
                "multiplier": 100,
            }
        },
        {
            "name": name + " criticality",
            "key": "prop.heat." + type,
            "values": [
                {
                    "key": type + "Criticality",
                    "name": name + " criticality",
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
                "id": "ee",
                "field": "systems.heat." + type + "Heat",
                "multiplier": 100,
            }
        },
        {
            "name": name + " temperature",
            "key": "prop.temp." + type,
            "values": [
                {
                    "key": type + "Temp",
                    "name": name + " temperature",
                    "units": "°C",
                    "formatString": '%d°C',
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
                "id": "ee_temp",
                "field": type + "Temp",
            }
        },
        {
            "name": name + " temperature status",
            "key": "prop.temp." + type + ".status",
            "values": [
                {
                    "key": type + "Status",
                    "name": name + " temperature status",
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
                "id": "ee_temp",
                "field": type + "Status",
            }
        },
    ]
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
            "name": "Jump drive temperature",       // Name shown in 'Ship telemetry'
            "key": "prop.jumpdrive.temperature",    // Internal key for type
            "values": [
                {
                    "key": "jump_drive_temp",       // Internal key for value, used as {{placeholder}}
                    "name": "Temperature",          // Label shown in UI
                    "units": "K",                   // Units shown in UI
                    "formatString": '%d K',         // Format string used when displaying
                    "hints": {
                        "range": 1                  // Hint that this is shown on Y-axis of graphs
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
                "method": "backend",                // Use Odysseus backend data blob as source
                "type": "ship",                     // Data blob type
                "id": "jumpstate",                  // Data blob ID
                "field": "jump_drive_temp",         // Field in data blob, may contain 'a.b.c'
                "multiplier": 1,                    // Optional multiplier for value
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

        // EE entries
        ...eeType("reactor", "Reactor"),
        ...eeType("impulse", "Impulse drive"),
        ...eeType("maneuver", "Maneuvering"),
        ...eeType("frontshield", "Front shield"),
        ...eeType("rearshield", "Rear shield"),
        ...eeType("missilesystem", "Missile system"),
        ...eeType("beamweapons", "Beam weapons"),
        
        // Hull
        {
            "name": "Ship hull health",
            "key": "prop.health.hull",
            "values": [
                {
                    "key": "hullHealth",
                    "name": "Ship hull health",
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
                "id": "ee",
                "field": "general.shipHullPercent",
                "multiplier": 100,
            }
        },

        // Life support
        {
            "name": "Life support health",
            "key": "prop.health.lifesupport",
            "values": [
                {
                    "key": "lifesupportHealth",
                    "name": "Life support health",
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
                "id": "lifesupport",
                "field": "health",
                "multiplier": 100,
            }
        },


        // Plasma pressure (easter egg)
        {
            "name": "Plasma pressure",
            "key": "prop.plasma.pressure",
            "values": [
                {
                    "key": "plasmaPressure",
                    "name": "Plasma pressure",
                    "units": "MPa",
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
                "type": "box",
                "id": "drifting_value",
                "field": "displayValue",
            }
        },
        
    ]
}
