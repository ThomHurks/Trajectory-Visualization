function runAlgorithm(segments) {

    segments = sortOnLength(segments);


    for (var i = 0; i < segments.length - 1; i++) {
        for (var j = i + 1; j < segments.length; j++) {
            var base = segments[i];
            var segment = segments[j];

            if (!segment.removed) {
                var interval = segment.projectOn(base);

                if (interval != null) {
                    base.intervalTree.addInterval(interval);

                    if (interval.start == 0) {
                        //connect segment left to start of base
                    }
                    else if (interval.end == base.intervalTree.max) {

                    }
                }
            }
        }
    }

    return segments;
}

function sortOnLength(segments) {

    return segments;
}
