# Odysseus engineering UI

Odysseus engineering UI is based on [Open MCT](https://github.com/nasa/openmct).

This repository is based on the [Open MCT tutorial](https://github.com/nasa/openmct-tutorial).

## Running

Launch:

    npm install
    npm start

The content assumes that:

* odysseus-mct (this repo) is running at http://localhost:8080/ (launched first)
* odysseus-admin is running at http://localhost:8081/ (launched second, not needed except to reserve the port)
* odysseus-misc-ui is running at http://localhost:8082/ (launched third, used in iframes)

The base URL `http://localhost:8082/` is replaced by the relative odysseus-misc-ui path by deployment build scripts.


## Editing *ESS Odysseus* views

To edit the default views within *ESS Odysseus* folder:

1. Right-click top-level *ESS Odysseus* and choose Duplicate
2. Duplicate in *My Items*
3. Edit copy in *My Items*
4. Right-click *ESS Odysseus* in *My Items* and choose Export as JSON
5. Save as `tmp.json`
6. Pretty-print the JSON in place of `odysseus.json`:  
   `python3 -m json.tool tmp.json odysseus.json`

Make sure that all iframes in odysseus-misc-ui have base URL `http://localhost:8082/`.
