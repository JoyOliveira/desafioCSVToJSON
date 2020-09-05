const csvjson = require('csvtojson');
const csv = require('csv-parser');
const fs = require('fs');
const _ = require('lodash');
const { group } = require('console');
const { reduce, uniqueId, first, result, iteratee } = require('lodash');

csvjson().fromFile('input.csv')
    .then(entrada => {
      
      //console.log(entrada[2]);
      
        let arrayOutPut = [...entrada.reduce((hash, { fullname, eid, classes}) => {
            let arrayTemporaria = hash.get(eid) || { fullname, eid, classes: []};
            
            classes && (arrayTemporaria.classes = arrayTemporaria.classes.concat(classes));
            //addresses &&(arrayTemporaria.addresses = ))
            
            return hash.set(eid, arrayTemporaria);
          }, new Map).values()];
        
          console.log(arrayOutPut);

          fs.writeFile('output.json', arrayOutPut, (err) => {
                      if (err) {
                          throw err;
                      }
             //         console.log("JSON salvo!")
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

    




