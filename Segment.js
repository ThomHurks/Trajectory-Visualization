/**
 * Created by Helmond on 16-4-2015.
 */

function Segment(p1,p2)
{
    this.p1;
    this.p2;

    if (p1.x < p2.x) {
        this.p1 = p1;
        this.p2 = p2;
    } else {
        this.p1 = p2;
        this.p2 = p1;
    }

    this.d = p2.subtract(p1);

    this.weight = null;
    this.pre = null;
    this.suc = null;
    this.interval = null;

    return(this);
}

//Returns null if the lines are collinear, or partially overlap.
//Otherwise, returns an array [t,u] such that the intersection point lies at this.getPointAt(t) or l.getPointAt(u)
// http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
Segment.prototype.getIntersection = function(l){//returns the intersection point between line l1 and l2
    var A = this.p1;
    var B = this.p2;
    var C = l.p1;
    var D = l.p2;
    var p = A;
    var r = B.subtract(A);
    var q = C;
    var s = D.subtract(C);
    var qminp = q.subtract(p);
    var rs = Vector.prototype.cross2D(r,s);
    if(rs==0)//lines are colinear or paralel
    {//We do not care if colinear lines overlap
        return null ;
    }

    var t = Vector.prototype.cross2D(qminp,s)/rs;//if(t<0||t>1){return(null);}
    var u = Vector.prototype.cross2D(qminp,r)/rs;//can be optimized by returning null if we already know t<0 || t>1
    if(0 <= t && t<= 1 && 0<= u && u<= 1)
    {
        return([t,u]);
    }
    return null ;
};

//Returns the point on this line that lies at 100*t % from p1 to p2.
Segment.prototype.getPointAt = function(t){
    return this.p1.add(this.d.scale(t));
};

//Returns at what side of the line
//http://stackoverflow.com/questions/2752725/finding-whether-a-point-lies-inside-a-rectangle-or-not
Segment.prototype.sideOf = function(p){
    var A = -(this.p2.y - this.p1.y);
    var B = this.p2.x - this.p1.x;
    var C = -(A * this.p1.x + B * this.p1.y)
    return A * p.x + B * p.y + C
};

Segment.prototype.projectOn = function(segment) {

    var s1 = new Segment(this.p1, this.p2);
    var s2 = new Segment(segment.p1, segment.p2);

    console.log(s1.toString());
    console.log(s2.toString());
    console.log('-------');

    // translate so s1.p1 is on origin
    s1.p2 = s1.p2.subtract(s1.p1);
    s2.p1 = s2.p1.subtract(s1.p1);
    s2.p2 = s2.p2.subtract(s1.p1);
    s1.p1 = s1.p1.subtract(s1.p1);

    console.log(s1.toString());
    console.log(s2.toString());
    console.log('-------');

    var angle = Math.atan(s1.p2.y/s1.p2.x);

    // s1 is now on the positive x-axis
    s1.p2.x = s1.p2.length();
    s1.p2.y = 0;

    // rotates s2
    s2.p1 = s2.p1.rotate(-angle);
    s2.p2 = s2.p2.rotate(-angle);

    console.log(s1.toString());
    console.log(s2.toString());
    console.log('-------');
}

Segment.prototype.toString = function() {
    return '<' + this.p1.toString() + '   ' + this.p2.toString() + '>';
}