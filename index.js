const csv = require('csv-parser');
const csvjson = require('csvtojson');
const fs = require('fs');
const _ = require('lodash');
const { group } = require('console');
const { reduce, uniqueId, first, result, iteratee } = require('lodash');


const results = [];
 
fs.createReadStream('input.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results);

  });



csvjson().fromFile('input.csv')
    .then(entrada => {
        
        let arrayOutPut = [...entrada.reduce((hash, { fullname, eid, classes}) => {
            let arrayTemporaria = hash.get(eid) || { fullname, eid, classes: []};
            
            classes && (arrayTemporaria.classes = arrayTemporaria.classes.concat(classes));
            //addresses &&(arrayTemporaria.addresses = ))
            
            return hash.set(eid, arrayTemporaria);
          }, new Map).values()];
        
          //console.log(arrayOutPut);

          fs.writeFile('output.json', arrayOutPut, (err) => {
                      if (err) {
                          throw err;
                      }
                      console.log("JSON salvo!")
                })
          
          }).catch(err => {
              console.log(err);
          });
        


  //      fs.writeFile('output.json', arrayOutPut, (err) => {
  //          if (err) {
  //              throw err;
  //          }
  //          console.log("JSON salvo!")
//            console.log(arrayOutPut);
  //      })

//}).catch(err => {
  //  console.log(err);
//});

    




