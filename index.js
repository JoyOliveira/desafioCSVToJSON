const csv = require('csv-parser')
const _ = require('lodash')
const fs = require('fs');
var arrayCSV = [];
var arrayOutPut = [];


fs.createReadStream('input.csv'
  .trim(), {
  columns: true,
  columns_duplicates_to_array: true,
  delimiter: [",", "/"]
}
)
  .pipe(csv())

  .on('headers', function (headerList) {
    headerList[2] = 'classes'
    headerList[3] = 'class02';
  })

  .on('data', (data) => {
    arrayCSV.push(data);

    arrayOutPut = [...arrayCSV.reduce((hash, { fullname, eid, classes, addresses, invisible, see_all }) => {

      let arrayTemporaria = hash.get(eid) || { fullname, eid, classes: [], addresses: [], invisible, see_all };

      classes && (arrayTemporaria.classes = arrayTemporaria.classes.concat(classes));

      classes && (arrayTemporaria.classes = arrayTemporaria.classes.concat(arrayCSV.class02));

      return hash.set(eid, arrayTemporaria);

    }, new Map).values()];

  })

  .on('end', () => {

    const arquivoJSON = JSON.stringify(arrayOutPut);

    fs.writeFile('output.json', arquivoJSON, (err) => {
      if (err) {
        throw err;
      }
    })
  })




