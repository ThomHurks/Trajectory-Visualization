var DebugMenu = L.Control.extend({
    options: {
        position: 'bottomleft'
    },
    onAdd: function (map) {
        "use strict";
        var container = L.DomUtil.create('div', 'dev-menu-container');

        var devMenu = d3.select(container).append("div")
            .attr("id", "dev-menu")
            .text("test test test")
            // Commence dirty inline HTML.
            .html('<div class="panel panel-default">\
                            <div class="panel-heading">\
                                <h3 class="panel-title">Debug Menu</h3>\
                            </div>\
                            <div class="panel-body">\
                                <div class="input-group">\
                                    <span class="input-group-addon">&epsilon;</span>\
                                    <input type="text" class="form-control" id="epsilon" placeholder="' + EPS + '" aria-describedby="epsilon">\
                                </div>\
                                <div class="input-group">\
                                    <span class="input-group-addon">&epsilon;<sub>s</sub></span>\
                                    <input type="text" class="form-control" id="epsilon_sim" placeholder="' + EPS_S + '" aria-describedby="epsilon_sim">\
                                </div>\
                                <div class="input-group">\
                                    <span class="input-group-addon">&alpha;</span>\
                                    <input type="text" class="form-control" id="alpha" placeholder="' + ALPHA * (180/Math.PI) + '" aria-describedby="alpha">\
                                </div>\
                            </div>\
                           </div>');

        var epsilon = devMenu.select("#epsilon");
        var epsilon_sim = devMenu.select("#epsilon_sim");
        var alpha = devMenu.select("#alpha");

        console.log(epsilon);

        epsilon.on("change", function () {
            EPS = this.value;
            console.log("EPS set to " + EPS.toString());
        });

        epsilon_sim.on("change", function () {
            EPS_S = this.value;
            console.log("EPS_S set to " + EPS_S.toString());
        });

        alpha.on("change", function () {
            ALPHA = this.value;
            console.log("ALPHA set to " + ALPHA.toString());
        });

        return container;
    }
});