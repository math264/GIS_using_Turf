# GIS_using_Turf
Running scripts client-side via browser and server-side via Node.js npm

## turf.intersect()

**[turf.intersect()](http://turfjs.org/docs/#intersect)** reads two polygon or multipolygon geometries and returns an intersection polygon. If the geometries have no intersecting vertices, the return is *NULL*. Two polygons were used for this example client script and centered over Pittsburgh, PA. Once poygons were defined and added to the map, **turf.intersect()** found the intersection. This intersecting polygon was also defined as a variable and added to the map as a geojson. Styles were added to this geojson to distinguish it from the parent polygons, negating the need for a centroid popup. Although a simple method, this is a routinely performed geoprocessing task ran in AFE (automated feature extraction) for hydrodigitizing. As far as I know, many geospatial services still frequently use SHP for hydro AFE. As we all know, SHP only contain
one geometry type. Making sure differing geometries are not intersecting is a great QA/QC.

## turf.tin()

**[turf.tin()](http://turfjs.org/docs/#tin)** takes any number of given points and triangulates between all points to create a Triangulated Irregular Network. This is a very similar process with LiDAR TIN surfaces. Only difference is the triangulation of LiDAR points enables the associated echo z values to create a 3D TIN surface. This client side script first creates a polygon along with its centroid and coordinated (declared). **turf.randomPoint()** then creates a set 10 random points within a specific bbox. The bbox coordinates are also set within the confines of the polygon coordinates. *count* and *popup* variables were declared and the popup is binded to the tin surface using **turf.tin()**

## turf.cleanCoords()

**[turf.cleanCoords()](http://turfjs.org/docs/#cleanCoords)** acts similar to mapshaper's simplify tool, except turf's cleanCoords() method focuses on shortening the coordinate precision of a given geometry. Written in scripts/cleanCoords.js, this script utilizes node and is npm initialized. Four packages were installed and required within the script:
```js
+ const fs = require('fs')
+ const turf = require('@turf/turf')
+ const chalk = require("chalk");
+ const gjv = require("geojson-validation");
```
Node's File System module (fs) was used to read in the file. A new empty feature collection was created to store manipulated features. Within *streets.features.forEach()* function, **turf.cleanCoords()** had access to the linestring coordinates, trimmed the coordinates' precision, and assigned to a variable which was then pushed to the empty feature collection. **geojson-validation** was used to verify correct geojson format.

## turf.polygonSmooth()

**[turf.polygonSmooth()](http://turfjs.org/docs/#polygonSmooth)** has the opposite effect of mapshaper and turf's simplify tool. **turf.polygonSmooth()** returns a more refined polygon compared to the input. It adds more vertices and rounds edges. Written in scripts/polygonSmooth.js, this script utilizes node and is npm initialized. Three packages were installed and required:
```js
+ const fs = require('fs')
+ const turf = require('@turf/turf')
+ const chalk = require("chalk");
```
Node's File System module (fs) was used to read in the file, a geojson of Antietam National Battlefield. Options were declared for use in the method (iterations). **turf.polygonSmooth()** then transformed the battlefield geojson into a more refined polygon by an iteration of **3**. The refined polygon was then written to file. Geojson.io was then used to validate the file this time instead of using node's *geojson-validation* package. 
