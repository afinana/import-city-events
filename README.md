# README
```
import-city-events
```

Example of a node app server that can run on a computer to allow download Opendata JSON files and feed a mongo database .

import-city-events is a node.js application download and process Opendata JSON files and insert documents in a mongo collection.

to start, download the source files into a new directory on your local computer, and run npm install && node from command line with the main.js file as argument
```js
    > node main.js
```
this starts the import process and add documents to mongo collection.

## Configuration file:
A configuration file was included . You can include a list of opendata files and mongo collection names:
```
    config/import.json
```

## Prerequisites:
A mongo database must be installed and listening in the application port: 27017. Database url could be setting changing url constant of the following file:

```
    utils/db.js
```
# Source of opendata information:
Origen de los datos: Ayuntamiento de Madrid 
