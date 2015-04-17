function Interval(start, end, weight) {
    this.start = start;
    this.end = end;
    this.weight = weight;
}

Interval.prototype.contains = function(x, leftInclusive, rightInclusive) {
    var rightOfStart = false;
    var leftOfEnd = false;

    if (leftInclusive) {
        rightOfStart = x >= this.start
    }
    else {
        rightOfStart = x > this.start
    }

    if (rightInclusive) {
        leftOfEnd = x <= this.end
    }
    else {
        leftOfEnd = x < this.end
    }

    return rightOfStart && leftOfEnd;
};