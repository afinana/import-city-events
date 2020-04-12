//* Import dependencies */
const async = require('async');
const db = require('./utils/db.js');
const Importer = require('./lib/importDB.js');

/* Load the import config */
const importConfig = require('./config/import.json');

/* Attempt to get a database connection */
db(database => {
    /* Create a new importer and set the database */
    const importer = new Importer();
    importer.setDatabase(database);

    /* For each of the enabled import files import them into the database */
    async.each(importConfig.filter(item => item.enabled), (item, callback) => {

        console.log(`\nImported ${item.collection}`);
        importer.importFile(item, callback);
      
    }, () => {
        /* Import has completed, close the database connection */
        console.log('Completed all');
        database.close();
    });

});
