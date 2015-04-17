function GeoJSON() {
    this.type = "FeatureCollection";
    this.features = [];
}


GeoJSON.prototype.addSegments = function(segments) {
    for (var segment in segments) {
        this.addSegment(segments[segment]);
    }
};

GeoJSON.prototype.addSegment = function(segment) {
    var feature = {
        "type": "Feature",
        "geometry":{
            "type": "LineString",
            "coordinates": [
                [segment.p1.x, segment.p1.y],
                [segment.p2.x, segment.p2.y]
            ]},
        "properties": {"edgeweight": 5}
    };

    this.features.push(feature);
};

