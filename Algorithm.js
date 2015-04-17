function runAlgorithm(segments) {

    sortOnLength(segments);

    for (var i = 0; i < segments.length - 1; i++) {
        var addedSegments = [];
        console.log("considering base:" + segments[i]);

        for (var j = i + 1; j < segments.length; j++) {
            var base = segments[i];
            var segment = segments[j];
            console.log("considering segment:" + segments[j]);

            if (!segment.removed && addedSegments.indexOf(segment) == -1) {
                var intervals = base.projectOn(segment);

                if (intervals != null) {
                    //updating base interval tree
                    var baseInterval = intervals.baseInterval;
                    base.intervalTree.addInterval(baseInterval);

                    //removing/redirecting segments
                    segment.removed = true;
                    var segmentInterval = intervals.segmentInterval;
                    var insertedSegment;

                    if (segmentInterval.start != 0) {
                        console.log('left sticking out');
                        insertedSegment = insertSegment(segments, new Segment(
                            segment.p1,
                            base.getPointAt(baseInterval.start)
                        ));
                        addedSegments.push(insertedSegment);
                    }
                    else if (segmentInterval.end != 1) {
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

    for (var k in segments) {

    }

    return segments;
}

function sortOnLength(segments) {
    segments.sort(function(s1, s2) {
        return s2.d.length() - s1.d.length();
    });
}

function insertSegment(segments, segment) {
    segments.splice(linearSearch(segments, segment), 0, segment);
}

function linearSearch(segments, segment) {
    for (var i = 0; i < segments.length; i++) {
        var s = segments[i];
        if (segment.d.length() > s.d.length()) {
            return i;
        }
    }
    return segments.length;
}

function binarySearch(segments, segment) {
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
