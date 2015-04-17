var DebugMenu = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        "use strict";
        var container = L.DomUtil.create('div', 'dev-menu');

        d3.select(container).append("div")
            .attr("id", "dev-menu")
            .text("test test test")
            .html('<div class="panel panel-default">\
                            <div class="panel-heading">\
                                <h3 class="panel-title">Debug Menu</h3>\
                            </div>\
                            <div class="panel-body">\
                                <div class="input-group">\
                                    <span class="input-group-addon" id="epsilon">&epsilon;</span>\
                                    <input type="text" class="form-control" placeholder="' + EPS + '" aria-describedby="epsilon">\
                                </div>\
                                <div class="input-group">\
                                    <span class="input-group-addon" id="epsilon_sim">&epsilon;<sub>s</sub></span>\
                                    <input type="text" class="form-control" placeholder="' + EPS_S + '" aria-describedby="epsilon_sim">\
                                </div>\
                                <div class="input-group">\
                                    <span class="input-group-addon" id="alpha">&alpha;</span>\
                                    <input type="text" class="form-control" placeholder="' + ALPHA * (180/Math.PI) + '" aria-describedby="alpha">\
                                </div>\
                            </div>\
                           </div>');

        return container;
    }
});