/**
 * Created by Helmond on 16-4-2015.
 */
function Rectangle(p1,p2,p3,p4){//the 4 points defining the rectangle. No check for right angles is done
    //this.ps = [p1,p2,p3,p4];
    this.ls = [new Segment(p1,p2),new Segment(p2,p3),new Segment(p3,p4),new Segment(p4,p1)];

    this.top;
    this.bottom;
    this.left;
    this.right;

    for (var k in this.ls) {
        var side = this.ls[k];

        // vertical
        if (side.p1.x == side.p2.x) {
            if (this.left == null || side.p1.x < this.left.p1.x)
                this.left = side;

            if (this.right == null || side.p1.x > this.right.p1.x)
                this.right = side;
        } else { // horizontal
            if (this.bottom == null || side.p1.y < this.bottom.p1.y)
                this.bottom = side;

            if (this.top == null || side.p1.y > this.top.p1.y)
                this.top = side;
        }
    }

    return this;
}

//Returns true if the point p is inside this rectangle.
Rectangle.prototype.isInside = function(p){
    return (p.x >= this.left.p1.x && p.x <= this.right.p1.x && p.y >= this.bottom.p1.y && p.y <= this.top.p1.y);
};

//Returns an array [t,u] such that the line defined by l.getPointAt(t) and l.getPoint(u) lies inside the rectangle.
// Returns an empty array if the line does not overlap with the rectangle.
Rectangle.prototype.getSubLineInside = function(l){

    var lp1 = l.p1;
    var lp2 = l.p2;
    var in1 = this.isInside(lp1);
    var in2 = this.isInside(lp2);

    if(in1 && in2) return [0,1];
    var ts = [];
    for(var i = 0; i<4;i++)
    {
        var inter = l.getIntersection(this.ls[i])
        if(inter!=null) ts.push(inter);
    }

    if(ts.length==0)return [];
    if(ts.length==1 || (ts.length == 2 && ts[0][0] == ts[1][0]))//1 point inside
    {
        var t = ts[0][0];
        if(in1)
        {
            return [0,t];
        }else
        {
            return [t,1];
        }
    }else//ic==2; -> !in1 && !in2;
    {

        if(ts[0][0]<ts[1][0])return([ts[0][0],ts[1][0]]);
        return([ts[1][0],ts[0][0]]);
    }
};