function Collection() {
    this.type = "FeatureCollection";
    this.features = [];

    this.addSegment = function(segment) {
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
    }
}

