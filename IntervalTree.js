function IntervalTree(max) {

    //note that min is always 0
    this.max = max;
    this.intervals = [];

    this.intervals.push(new Interval(0, max));


    //add interval to tree and split the intervals accordingly and change the weights
    IntervalTree.prototype.addInterval = function(interval) {

    }

}
