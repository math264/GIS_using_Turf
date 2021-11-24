const fs = require('fs')
const turf = require('@turf/turf')
const chalk = require("chalk");

//read the Antietam National Battlefield file
fs.readFile('./project-files/nps.geojson', 'utf8', (err, data) => {

  if (err) throw err;
  console.log(chalk.green('Antietam Battlefield READ'));

  //parse the string to geojson
  const antietam = JSON.parse(data)
  console.log(chalk.green('Antietam Battlefield PARSED'));

  // set smooth options
  const options = {iterations: 3};

  // polygonSmooth
  const smooth = turf.polygonSmooth(antietam, options);
  const outFileName = './data/smooth-antietam.json';

  //save polygon to new file
  fs.writeFile(outFileName, JSON.stringify(smooth), 'utf8', (err) => {
    if (err) throw err
    console.log(chalk.yellowBright(outFileName + ' written to file!'));
  });

});