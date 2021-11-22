# GIS_using_Turf
Running scripts client-side via browser and server-side via Node.js npm

## Turf.intersect()

**[turf.intersect()](http://turfjs.org/docs/#intersect)** reads two polygon or multipolygon geometries and returns an intersection polygon. If the geometries have no intersecting vertices, the return is *NULL*. Two polygons were used for this example client script and centered over Pittsburgh, PA. Once poygons were defined and added to the map, **turf.intersect()** found the intersection. This intersecting polygon was also defined as a variable and added to the map as a geojson. Styles were added to this geojson to distinguish it from the parent polygons, negating the need for a centroid popup. Although a simple method, this is a routinely performed geoprocessing task ran in AFE (automated feature extraction) for hydrodigitizing. As far as I know, many geospatial services still frequently use SHP for hydro AFE. As we all know, SHP only contain
one geometry type. Making sure differing geometries are not intersecting is a great QA/QC.

## Turf.tin()

**[turf.tin()](http://turfjs.org/docs/#tin)** takes any number of given points and triangulates between all points to create a Triangulated Irregular Network. This is a very similar process with LiDAR TIN surfaces. Only difference is the triangulation of LiDAR points enables the associated echo z values to create a 3D TIN surface. This client side script first creates a polygon along with its centroid and coordinated (declared). **turf.randomPoint()** then creates a set 10 random points within a specific bbox. The bbox coordinates are also set within the confines of the polygon coordinates. *count* and *popup* variables were declared and the popup is binded to the tin surface using **turf.tin()**