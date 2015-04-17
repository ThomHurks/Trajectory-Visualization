/**
 * Created by Helmond on 17-4-2015.
 */
//parses the geodata into trajectory data, applies simplification, returns
function preProcess(geodata,epsilon)
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
    console.log(trajectories);
    var simplified = [];
    for(var i = 0; i < trajectories.length;i++)
    {
        simplified.push(simplify(trajectories[i],epsilon));
    }
    console.log(simplified);
    return simplified;

    //returns a simplified version of the trajectory
    function simplify(trajectory,epsilon)
    {
        var traj1 = simplify1(trajectory,epsilon/2)
        //return trajectory;
        return traj1;

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
    }
}

