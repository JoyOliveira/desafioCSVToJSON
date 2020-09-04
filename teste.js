const csvjson = require('csvtojson');
const fs = require('fs');
const _ = require('lodash');

csvjson().fromFile('input.csv').then(entrada => {



    console.log(entrada);
})
