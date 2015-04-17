/**
 * Created by Jeffrey Aben on 9-4-15.
 *
 * Screw spherical geometry for now. Use euclidean geometry for lazyness reasons
 */
function GeoGraph(data) {

    var glob = this;
    this.segments = [];

    for(var i in data.trajectories)
    {
        var traj = data.trajectories[i];
        var p1 = itemToVector(traj[0]);
        for(var j = 1; j < traj.length;j++)
        {
            var p2 = itemToVector(traj[j]);
            this.segments.push(new Segment(p1,p2));
            p1=p2;
        }
    }
    console.log("n = " + this.segments.length);

    function itemToVector(i){
        return new Vector(i["location-long"]/1,i["location-lat"]/1);
    }


    //old code, ignore.
    /*
    console.log("Getting to trees....")
    var initTrees1 = [];
    var initTrees2 = [];
    for(var i = 0; i < this.segments.length;i++)
    {
        var seg = this.segments[i];
        var perps = seg.d.getNormals();
        initTrees1.push(buildSingleTree(seg,perps[0],this.epsilon))
        initTrees2.push(buildSingleTree(seg,perps[1],this.epsilon))
    }

    //algorithm starts here, assuming preprocessing was done to prevent intersecting segments.
    function buildSingleTree(segment, perpendicular, epsilon)
    {
        console.log("Tree called!");
        var ar = [segment];
        var result=[];
        buildSingleTreeP(ar,perpendicular, epsilon,result,0);

        return result;
    }

    function buildSingleTreeP(segmentArray,perpendicular, epsilon, result, level)
    {
        result[level]=segmentArray;
        var nextLevelSegments = [];
        if(level>3)return result;
        console.log(result);
        for(var i = 0; i < segmentArray.length; i++)
        {
            var subsegment = segmentArray[i];
            var halfbox = new Rectangle(subsegment.p1.add(perpendicular.scale(epsilon/1000)),subsegment.p1.add(perpendicular.scale(epsilon)),subsegment.p2.add(perpendicular.scale(epsilon)),subsegment.p2.add(perpendicular.scale(epsilon/1000)));
            for(var j = 0; j< glob.segments.length;j++)
            {
                var seg = glob.segments[j];
                var inside = halfbox.getSubLineInside(seg);
                if(inside.length>0){
                    var t1 = inside[0];
                    var t2 = inside[1];
                    var p1 = seg.getPointAt(t1);
                    var p2 = seg.getPointAt(t2);
                    var subseg = new Segment(p1,p2);
                    nextLevelSegments.push(subseg);
                }
            }
        }
        if(nextLevelSegments.length==0)return result;
        buildSingleTreeP(nextLevelSegments,perpendicular,epsilon,result,level+1);
    }*/
}

GeoGraph.prototype;

