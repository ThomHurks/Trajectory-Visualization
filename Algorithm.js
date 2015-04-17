function runAlgorithm(segments) {
    "use strict";

    sortOnLength(segments);

    for (var i = 0; i < segments.length - 1; i++) {

        var addedSegments = [];
        var base = segments[i];
        if (!base.removed) {

            //console.log("considering base:" + segments[i]);
            for (var j = i + 1; j < segments.length; j++) {

                //console.log(j);
                var segment = segments[j];
                if (!segment.removed && addedSegments.indexOf(segment) == -1) {

                    var intervals = base.projectOn(segment);
                    //console.log("considering segment:" + segments[j]);

                    if (intervals.baseInterval != null && intervals.segmentInterval != null) {
                        //updating base interval tree
                        var baseInterval = intervals.baseInterval;
                        base.intervalTree.addInterval(baseInterval);

                        //removing/redirecting segments
                        segment.removed = true;
                        var segmentInterval = intervals.segmentInterval;
                        var newSegment;

                        //possibly inserting new segments. note that these segments are always inserted in a later part of @code{segments}.
                        if (segmentInterval.start != 0) {
                            //console.log('left sticking out');
                            newSegment = new Segment(segment.p1, base.getPointAt(baseInterval.start));
                            insertSegment(segments, newSegment);
                            addedSegments.push(newSegment);
                            //console.log("added segment:" + newSegment);
                        }
                        else if (segmentInterval.end != 1) {
                            //console.log('right sticking out');
                            newSegment = new Segment(base.getPointAt(baseInterval.end), segment.p2);
                            insertSegment(segments, newSegment);
                            addedSegments.push(newSegment);
                            //console.log("added segment:" + newSegment);
                        }
                    }
                }
            }
        }
    }

    var result = [];


    //console.log(segments);
    for (var k in segments) {
        var s = segments[k];

        if (!s.removed) {
            result = result.concat(s.getSubSegments());
        }
    }

    //console.log(result);
    return result;
}

function sortOnLength(segments) {
    "use strict";

    segments.sort(function(s1, s2) {
        return s2.d.length() - s1.d.length();
    });
}

function insertSegment(segments, segment) {
    "use strict";

    segments.splice(linearSearch(segments, segment), 0, segment);
}

function linearSearch(segments, segment) {
    "use strict";

    for (var i = 0; i < segments.length; i++) {
        var s = segments[i];
        if (segment.d.length() > s.d.length()) {
            return i;
        }
    }
    return segments.length;
}

function binarySearch(segments, segment) {
    "use strict";

    var minIndex = 0;
    var maxIndex = segments.length - 1;
    var currentIndex;
    var currentSegment;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentSegment = segments[currentIndex];

        console.log(currentSegment.d.length() + " " + segment.d.length());
        console.log(minIndex + " " + maxIndex + " " + currentIndex);

        if (currentSegment.d.length() > segment.d.length()) {
            minIndex = currentIndex + 1;
        }
        else if (currentSegment.d.length() < segment.d.length()) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    }
    return segments.length;
}
