const csv = require('csv-parser')
const fs = require('fs')
const arrayCSV = [];

fs.createReadStream('input.csv')
  .pipe(csv())
  //alterar nome das colunas class, que estão duplicadas no arquivo csv
  .on('headers', function (headerList) {
    headerList[2] = 'class 01'
    headerList[3] = 'class 02';
  })
  .on('data', (data) => arrayCSV.push(data)
  ) 

  .on('end', () => {

    let arrayOutPut = [...arrayCSV.reduce((hash, { fullname, eid, classes, addresses, invisible, see_all}) => {
      let arrayTemporaria = hash.get(eid) || { fullname, eid, classes: [], addresses:[], invisible, see_all};
   
      return hash.set(eid, arrayTemporaria);
    }, new Map).values()];

    console.log(arrayOutPut);
  })