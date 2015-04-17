/**
 * Created by Helmond on 17-4-2015.
 */
//parses the geodata into trajectory data, applies simplification, returns
function preProcess(geodata)
{
    var trajectories = [];
    for (var k in geodata.trajectories) {
        var traj = geodata.trajectories[k];
        var ct = [];
        for (var i = 0; i < traj.length - 1; i++) {
            var a = traj[i];
            var b = traj[i+1];

            ct.push(new Segment(new Vector(a['location-long']/1, a['location-lat']/1), new Vector(b['location-long']/1, b['location-lat']/1)));
        }
        trajectories.push(ct);
    }
    console.log(trajectories);
    var simplified = [];
    for(var i = 0; i < trajectories.length;i++)
    {
        simplified.push(simplify(trajectories[i]));
    }
    if(false)trajectories=simplified;
    //convert to segments for rest of the algorithm:
    var segs = [];
    for(var i = 0; i < trajectories.length;i++)
    {
        var t = trajectories[i];
        for(var j =0; j < trajectories.length;j++)
        {
            segs.push(t[j]);
        }
    }
    console.log(segs);
    return segs;

    //returns a simplified version of the trajectory
    function simplify(trajectory)
    {
        return trajectory;
    }
}

