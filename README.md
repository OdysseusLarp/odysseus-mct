# Odysseus engineering UI

Odysseus engineering UI is based on [Open MCT](https://github.com/nasa/openmct).

This repository is based on the [Open MCT tutorial](https://github.com/nasa/openmct-tutorial).

## Documentations

* [Odysseus software system description](https://github.com/OdysseusLarp/odysseus-backend/blob/master/docs/system-description.md)

## Local setup

If this doesn't work, don't be supprised. Ask for help in discord or try [Local setup in Docker](#local-setup-in-docker) or [Local setup in VSCode Dev Container](#local-setup-in-vscode-dev-container) instead.

Launch:

```bash 
npm install
npm start
```

The content assumes that:

* odysseus-mct (this repo) is running at http://localhost:8080/ (launched first)
* odysseus-admin is running at http://localhost:8081/ (launched second, not needed except to reserve the port)
* odysseus-misc-ui is running at http://localhost:8082/ (launched third, used in iframes)

The base URL `http://localhost:8082/` is replaced by the relative odysseus-misc-ui path by deployment build scripts.

### Local setup in Docker

You can also run the `odysseus-mct` in Docker 

#### Requirements
* [Docker](https://www.docker.com/)
* [Odysseus Backend](https://github.com/OdysseusLarp/odysseus-backend) runs in [localhost:8888](http://localhost:8888)
* [Odysseus Misc UI](https://github.com/OdysseusLarp/odysseus-misc-ui) runs in [localhost:8082](http://localhost:8082)
* [Odysseus Admin UI](https://github.com/OdysseusLarp/odysseus-admin) runs in [localhost:8090](http://localhost:8090) is *not needed* but with it you can easily manage the content of `odysseus-mct`


#### `dictionary.js`

Update your `dictionary.js` (row 136) from

```js
        "url" : "https://apps.odysseuslarp.dev",
``` 
to

```js
        "url" : "http://localhost:8888",
```

#### Run

* To build docker image run `docker-compose build`
* To start the docker container run `docker-compose up`
* In case you need to restart the docker container run `docker restart odysseus-mct`

`Odysseus MCT` should now be available at [http://localhost:8060](http://localhost:8060) (odysseus-mct was changed to port 8060 due to HANSCA taking the port 8080)

**NOTE!** With `Windows` changing the code will not automatically update in browser --> Refresh the page and the page  should be updated.

### Local setup in VSCode Dev Container

You can also run the backend using [VSCode dev containers](https://code.visualstudio.com/docs/devcontainers/containers). Create/update your .env file like in the local setup instructions.

#### Requirements

* [Docker](https://www.docker.com/)
* [VSCode](https://code.visualstudio.com/) with [Dev Containers](https://code.visualstudio.com/docs/devcontainers/tutorial#_install-the-extension) extension
* [Odysseus Backend](https://github.com/OdysseusLarp/odysseus-backend) runs in [localhost:8888](http://localhost:8888)
* [Odysseus Misc UI](https://github.com/OdysseusLarp/odysseus-misc-ui) runs in [localhost:8082](http://localhost:8082)
* [Odysseus Admin UI](https://github.com/OdysseusLarp/odysseus-admin) runs in [localhost:8090](http://localhost:8090) is *not needed* but with it you can easily manage the content of `odysseus-mct`

Install Dev Containers extension for vscode.

* Open new window in VSCode
* File --> Open Folder... --> `odysseus-mct`
* Update `dictionary.json` as instructed in [dictionary.js](#dictionaryjs)
* VSCode will ask do you want to `Reopen in Container` --> Click it
    * If you are too slow --> Click the button in left bottom corner (looks like two L:s or disjointed ><) and choose `Reopen in Container` from the menu.
* VSCode will then start up the `odysseus-mct` service

`Odysseus MCT` should now be available at [http://localhost:8060](http://localhost:8060) (odysseus-mct was changed to port 8060 due to HANSCA taking the port 8080)

**NOTE!** With `Windows` changing the code will not automatically update in browser --> Refresh the page and the page  should be updated.

#### Problems?

* Try to rebuild the container: Click the button in left bottom corner (looks like two L:s or disjointed >< with the container name) and choose `Rebuild Container` from the menu.
* You might run into [this issue](https://github.com/microsoft/vscode-remote-release/issues/7305) on ARM processors, see the issue for potential workarounds.


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


## Breaking Odysseus Manually (for testing purposes)

* Go to [Admin UI emptyepsilon tab](http://localhost:8090/#/emptyepsilon)
* `Disable connection` and `Disable state synchronization` (otherwise it will sync back to full health since Empty Epsilon is not running)
* Break things by `Update values` example
    - Target type: systems
    - Target: impulse
    - Value type: health
    - Value: 0.7
    - `Set value`

When you go back to see `Ship status` the impulse engine health should be down to 70% and `Ship faults` should now have `Malcunctions` listed

## Fixing Odysseus Malfunctions (for testing purposes)

* Either use [HANSCA](https://github.com/OdysseusLarp/odysseus-HANSCA)
* Or from [Admin UI datastores tab](http://localhost:8090/#/data)
    - Choose `game` or `box` from dropdown
    - Scroll to see which `Status` is `broken`
    - Click the one which is `broken`
    - Change `"status": "broken",` to `"status": "fixed",`
    - OK

When you go back to `Ship faults` there should be some `Calibrations` going on.
