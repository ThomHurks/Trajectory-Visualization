﻿/**
 * Created by s113958 on 9-4-15.
 */
function GeoData(path, done) {
    var values = ['event-id', 'timestamp', 'location-lat', 'location-long', 'tag-local-identifier'];

    var map = this;
    map.path = path;
    map.line_separator = '\n';
    map.word_separator = ',';
    map.id_field = 'event-id';
    map.value_names = [];
    map.items = {};
    map.trajectories = {};

    function stringToMillis(string) {
        var date = new Date(0);

        var split = string.split(' ');
        var dates = split[0].split('-');
        var time = split[1].split(':');

        date.setYear(dates[0]);
        date.setMonth(dates[1]-1);
        date.setDate(dates[2]);

        date.setHours(time[0]);
        date.setMinutes(time[1]);
        date.setSeconds(time[2]);

        return date.getTime();
    }

    function keep(valueNames) {
        var keepMap = {};
        var remove = [];

        for (var k in valueNames) {
            keepMap[valueNames[k]] = true;
        }

        for (var k in map.value_names) {
            if (keepMap[map.value_names[k]] !== true) {
                remove.push(map.value_names[k]);
            }
        }

        map.value_names = valueNames;

        for (var k in map.items) {
            var item = map.items[k];

            for (var l in remove) {
                delete item[remove[l]];
            }
        }
    }

    $.get(map.path, function(csv) {
        var lines = csv.split(map.line_separator);

        map.value_names = lines[0].split(map.word_separator);
        for (var i = 1; i < lines.length; i++) {
            var item = {};
            var words = lines[i].split(map.word_separator);

            for (var k in words) {
                item[map.value_names[k]] = words[k];
            }

            var pass = true;
            for (var k in values) {
                if (item[values[k]] == undefined || item[values[k]] == "") {
                    pass = false;
                    break;
                }
            }

            if (!pass) {
                continue;
            }

            map.items[item[map.id_field]] = item;

            if (map.trajectories[item['tag-local-identifier']] == undefined) {
                map.trajectories[item['tag-local-identifier']] = [];
            }

            map.trajectories[item['tag-local-identifier']].push(item);

            try {
                item.timestamp = stringToMillis(item.timestamp);
            } catch(err) {
                console.log(item);
            }
        }

        keep(values);
    }).done(function() {
        done();
    });
}

GeoData.prototype.print = function() {
    var map = this;

    var lines = [];
    lines.push(map.value_names.join(map.word_separator));

    for (var k in map.items) {
        var item = map.items[k];

        var values = [];

        for (var l in map.value_names) {
            values.push(item[map.value_names[l]]);
        }

        lines.push(values.join(map.word_separator));

    }

    var a = lines.join('\n');
    console.log(a);
}