const csv = require('csv-parser')
const _ = require('lodash')
const fs = require('fs');
var dadosCSV = [];
var listaSemIdDuplicado = [];

fs.createReadStream('input.csv')

  .pipe(csv())

  .on('headers', function (headerList) {
    headerList[2] = 'classes'
    headerList[3] = 'class02';
    headerList[4] = 'emailPai'
  })

  .on('data', (data) => {
    dadosCSV.push(data);

    listaSemIdDuplicado = [...dadosCSV.reduce((hash, { fullname, eid, classes, addresses, invisible, see_all }) => {

      let listaClassConcatenadas = hash.get(eid) || { fullname, eid, classes: [], addresses: [], invisible, see_all };

      classes = _.merge(classes, listaClassConcatenadas.class02 );

      classes && (listaClassConcatenadas.classes = _.trim(_.split
        (listaClassConcatenadas.classes.concat(classes),
          (','),
          listaClassConcatenadas.classes.lenght)));

      listaClassConcatenadas.addresses = [{ "address": "", "type": "", "tags": [] }];

      return hash.set(eid, listaClassConcatenadas);

    }, new Map).values()];
  })

  .on('end', () => {

    const arquivoJSON = JSON.stringify(listaSemIdDuplicado);

    fs.writeFile('output.json', arquivoJSON, (err) => {
      if (err) {
        throw err;
      }
    })
  })