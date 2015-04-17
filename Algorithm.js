function runAlgorithm(segments) {
    "use strict";

    sortOnLength(segments);
    var i, j,
        addedSegments,
        base,
        segment,
        intervals,
        baseInterval,
        segmentInterval,
        insertedSegment;

    for (i = 0; i < segments.length - 1; i++) {

        addedSegments = [];
        base = segments[i];
        if (!base.removed) {

            console.log("considering base:" + segments[i]);
            for (j = i + 1; j < segments.length; j++) {

                segment = segments[j];
                if (!segment.removed && addedSegments.indexOf(segment) === -1) {

                    intervals = base.projectOn(segment);
                    console.log("considering segment:" + segments[j]);

                    if (intervals !== null) {
                        //updating base interval tree
                        baseInterval = intervals.baseInterval;
                        base.intervalTree.addInterval(baseInterval);

                        //removing/redirecting segments
                        segment.removed = true;
                        segmentInterval = intervals.segmentInterval;

                        //possibly inserting new segments. note that these segments are always inserted in a later part of @code{segments}.
                        if (segmentInterval.start !== 0) {
                            console.log('left sticking out');
                            insertedSegment = insertSegment(segments, new Segment(
                                segment.p1,
                                base.getPointAt(baseInterval.start)
                            ));
                            addedSegments.push(insertedSegment);
                        } else if (segmentInterval.end !== 1) {
                            console.log('right sticking out');
                            insertedSegment = insertSegment(segments, new Segment(
                                base.getPointAt(baseInterval.end),
                                segment.p2
                            ));
                            addedSegments.push(insertedSegment);
                        }
                    }
                }
            }
        }
    }

    var result = [];

    for (var k in segments) {
        var segment = segments[k];

        if (!segment.removed) {
            result = result.concat(segment.getSubSegments());
        }
    }

    return result;
}

function sortOnLength(segments) {
    "use strict";
    segments.sort(function (s1, s2) {
        console.log(s2.d);
        return s2.d.length() - s1.d.length();
    });
}

function insertSegment(segments, segment) {
    "use strict";
    segments.splice(linearSearch(segments, segment), 0, segment);
}

function linearSearch(segments, segment) {
    "use strict";
    var i, s;
    for (i = 0; i < segments.length; i++) {
        s = segments[i];
        if (segment.d.length() > s.d.length()) {
            return i;
        }
    }
    return segments.length;
}

function binarySearch(segments, segment) {
    "use strict";
    var minIndex = 0,
        maxIndex = segments.length - 1,
        currentIndex,
        currentSegment;

    while (minIndex <= maxIndex) {
        currentIndex = (minIndex + maxIndex) / 2 | 0;
        currentSegment = segments[currentIndex];

        console.log(currentSegment.d.length() + " " + segment.d.length());
        console.log(minIndex + " " + maxIndex + " " + currentIndex);

        if (currentSegment.d.length() > segment.d.length()) {
            minIndex = currentIndex + 1;
        } else if (currentSegment.d.length() < segment.d.length()) {
            maxIndex = currentIndex - 1;
        } else {
            return currentIndex;
        }
    }
    return segments.length;
}
