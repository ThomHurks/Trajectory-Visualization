/**
 * Created by Helmond on 17-4-2015.
 */
//parses the geodata into trajectory data, applies simplification, returns
function preProcess(geodata,epsilon,alpha)
{
    var trajectories = [];
    var origsegs = 0;
    for (var k in geodata.trajectories) {
        var traj = geodata.trajectories[k];
        var ct = [];
        for (var i = 0; i < traj.length - 1; i++) {
            var a = traj[i];
            var b = traj[i+1];

            ct.push(new Segment(new Vector(a['location-long']/1, a['location-lat']/1), new Vector(b['location-long']/1, b['location-lat']/1)));
        }
        trajectories.push(ct);
        origsegs+= ct.length;
    }
    var simplified = [];
    var newsegs = 0;
    for(var i = 0; i < trajectories.length;i++)
    {
        var simp = simplify(trajectories[i],epsilon,alpha)
        simplified.push(simp);
        newsegs +=simp.length;
    }
    console.log("Simplified from " + origsegs + " to " + newsegs + " segments");
     return simplified;



    //returns a simplified version of the trajectory
    function simplify(trajectory,epsilon,alpha)
    {
        var traj1 = simplify1(trajectory,epsilon)
        var traj2 = simplify2(traj1,alpha);
        //return trajectory;
        return traj2;

        function simplify1(trajectory, minlength)//Driemel algorithm
        {
            var simplified = []
            var p1 = trajectory[0].p1;
            for(var i =0; i < trajectory.length;i++)
            {
                var nextp = trajectory[i].p2;
                var seg = new Segment(p1,nextp);
                if(seg.length>=minlength)
                {
                    simplified.push(seg);
                    p1 = nextp;
                }
            }
            if(p1 != trajectory[trajectory.length-1].p2)
            {
                simplified.push(new Segment(p1,trajectory[trajectory.length-1].p2))
            }

            return simplified;
        }

        function simplify2(trajectory, alpha){//straightens out any slight curves. all bends are more than alpha after this algorithm
            var simplified = [];
            var d1 = trajectory[0].d.normalize();
            var s1 = trajectory[0];
            for(var i = 1; i < trajectory.length;i++)
            {
                var s2 = trajectory[i];
                var d2 = trajectory[i].d.normalize();
                var dot = Vector.prototype.dot(d1,d2);
                var angle = Math.acos(dot);
                if(angle>alpha)
                {
                    var nseg = new Segment(s1.p1,s2.p1);
                    s1 = s2;
                    d1 = d2;
                    simplified.push(nseg);
                }
            }
            var nseg = new Segment(s1.p1,trajectory[trajectory.length-1].p2);
            simplified.push(nseg);
            return simplified;
        }
    }
}

