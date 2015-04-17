function IntervalTree() {
    this.intervals = [new Interval(0, 1, 1)];
}

//add interval to tree and split the intervals accordingly and change the weights
IntervalTree.prototype.addInterval = function(interval) {
    var indexLeft = -1;
    var indexRight = this.intervals.length;

    for (var i = 0; i < this.intervals.length; i++) {
        var currentInterval = this.intervals[i];
        if (currentInterval.contains(interval.start, false, true)) {
            indexLeft = i;
        }
        if (currentInterval.contains(interval.end, true, false)) {
            indexRight = i;
        }
    }

    console.log(interval.clone());
    console.log(indexLeft);
    console.log(indexRight);


    //increment weights of intervals contained in given interval
    for (var i = indexLeft + 1; i < indexRight; i++) {
        this.intervals[i].weight++;
    }

    var newInterval = null;

    //split left containing interval
    if (indexLeft >= 0) {
        var intervalLeft = this.intervals[indexLeft];
        if (intervalLeft.end != interval.start) {
            newInterval = new Interval(interval.start, intervalLeft.end, intervalLeft.weight + 1);
            intervalLeft.end = interval.start;

            this.intervals.splice(indexLeft, 0, newInterval);
            indexRight++;
        }
    }

    //split right containing interval
    if (indexRight < this.intervals.length) {
        var intervalRight = this.intervals[indexRight];
        if (intervalRight.start != interval.end) {
            newInterval = new Interval(intervalRight.start, interval.end, intervalRight.weight + 1);
            intervalRight.start = interval.end;

            this.intervals.splice(indexRight, 0, newInterval);
        }
    }

    console.log(this.clone());

};

IntervalTree.prototype.clone = function() {
    var intervalsCopy = [];
    for (var interval in this.intervals) {
        intervalsCopy.push(this.intervals[interval].clone());
    }
    return intervalsCopy
};


