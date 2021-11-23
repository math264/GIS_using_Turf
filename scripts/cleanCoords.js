const fs = require('fs')
const turf = require('@turf/turf')
const chalk = require("chalk");
const gjv = require("geojson-validation");

// read the chesapeake,va streets geojson
fs.readFile('./project-files/Streets.geojson', 'utf8', (err, data) => {

  if (err) throw err;

  console.log(chalk.green('Streets.geojson read'));

  // parse the string to geojson
  const streets = JSON.parse(data)
  console.log(chalk.green('data parsed'));

  // shortcut ref to geometry coordinates

  // clean coordinates of Streets.geojson
  const cleaned = turf.cleanCoords(streets).geometry.coordinates;
  const outFileName = './data/streets-cleaned.json';

  //save polygon to new file
  fs.writeFile(outFileName, JSON.stringify(cleaned), 'utf8', (err) => {
    if (err) throw err
    console.log(outFileName + ' written to file!')
  });
  validateGeoJson(cleaned);
});

function validateGeoJson(geojson) {
  // check to see if the GeoJSON is valid
  if (gjv.valid(geojson)) {
    console.log(chalk.green("this is valid GeoJSON!"));
  } else {
    console.log(chalk.red("Sorry, not valid GeoJSON."));
  }
}