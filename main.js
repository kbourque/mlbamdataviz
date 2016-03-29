    // must be declared outside
    var dataset3;
    var margin;
    var w2;
    var h2;
    var padding;

    var xScale;
    var yScale;
    var xAxis;
    var yAxis;

    var lineGen;

    var svg2;
    var vis;

    var newData;

    var v1 = 'WAR';
    var v2 = 'Homers';
    var v3 = 'Hits';
    var v4 = 'RBIs';
    var v5 = 'Runs';


    //everything relying on data within baberuth.csv must be contained here
    d3.csv("baberuth.csv", function(data){
        // importing data from CSV file
        data.forEach(function(d){ d['Year'] = +d['Year']; });
        data.forEach(function(d){ d['WAR'] = +d['WAR']; });
        data.forEach(function(d){d['Homers'] = +d['Homers']});
        data.forEach(function(d){d['Hits'] = +d['Hits']});
        data.forEach(function(d){d['RBIs'] = +d['RBIs']});
        data.forEach(function(d){d['Runs'] = +d['Runs']});
        console.log(data);
        dataset3 = data;
        padding = 65;
        w2 = 1000,
        h2 = 500,
        margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        };

        // adding scales
        xScale = d3.scale.linear()
                 .domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
                 .range([padding, w2-padding*2]);
        yScale = d3.scale.linear()
                 .domain([0, d3.max(dataset3, function(d) { return d.WAR; })])
                 .range([h2-padding, padding]);

        // x-axis and y-axis connected to respective scales
        xAxis = d3.svg.axis()
                .scale(xScale)
                .orient("bottom")
                .tickFormat(d3.format("d"))
                .ticks(dataset3.length);

        yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");

        vis = d3.select('.graph')
                .append("svg")
                .attr('width', w2)
                .attr('height', h2);
        // attaching axes to DOM, x and y axis respectively
        vis.append("g")
        .attr("class", "axis")
        .attr("id", "xaxis")
        .attr("transform", "translate(0," + (h2 - padding) + ")")
        .call(xAxis);

        vis.append("g")
        .attr("class", "axis")
        .attr("id", "yaxis")
        .attr("transform", "translate(" + padding + ",0)")
        .call(yAxis);

        // path
        lineGen = d3.svg.line()
          .x(function(d) {
            return xScale(d.Year);
          })
          .y(function(d) {
            return yScale(d.WAR);
          })
          .interpolate("cardinal");

        vis.append('svg:path')
            .attr('class', 'lines')
          .attr('d', lineGen(data))
          .attr('stroke', '#1051B5')
          .attr('stroke-width', 4)
          .attr('fill', 'none');

        // points
        vis.append("g")
            .attr("id", "circles")
            .selectAll("circle")
            .data(dataset3)
            .enter()
            .append("circle")
            .attr({
                cx: function(d) {return xScale(d.Year);},
                cy: function(d) {return yScale(d.WAR);},
                r: 8,
                // fill: '#E8FFFC',
                stroke: '#1051B5',
                fill: '#FFFFE4'
            })
            .attr("stroke-width", "4");

        // now add titles to the axes
        vis.append("text")
            .attr("class", "yLabel")
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (padding/3+10) +","+(h2/2)+")rotate(-90)")
            .text("WAR");
        vis.append("text")
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (w2/2) +","+(h2)+")")
            .text("Year");

        //triggered when option is changed on drop down menu
        d3.select("#select-list")
            .on('change', function() {
                newData = eval(d3.select(this).property('value'));
                updateLegend(newData);
            });

        /* there is a lot of repeated code here bc I currently don't know how to properly extract
        the data after i click on the drop down menu. will table for later. */
        function updateLegend(newData) {
            //updating scale domains
            if (newData == 'Homers') {
                xScale.domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
                 .range([padding, w2-padding*2]);
            yScale.domain([0, d3.max(dataset3, function(d) { return d.Homers; })])
                 .range([h2-padding, padding]);

            vis.selectAll("circle")
                .data(dataset3)
                .transition()
                .duration(1000)
                .attr("cx", function(d) {
                    return xScale(d.Year);
                })
                .attr("cy", function(d) {
                    return yScale(d.Homers);
                });

            lineGen = d3.svg.line()
              .x(function(d) {
                return xScale(d.Year);
              })
              .y(function(d) {
                return yScale(d.Homers);
              })
              .interpolate("cardinal");
            }

            if (newData == 'WAR') {
                xScale.domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
                 .range([padding, w2-padding*2]);
            yScale.domain([0, d3.max(dataset3, function(d) { return d.WAR; })])
                 .range([h2-padding, padding]);

            vis.selectAll("circle")
                .data(dataset3)
                .transition()
                .duration(1000)
                .attr("cx", function(d) {
                    return xScale(d.Year);
                })
                .attr("cy", function(d) {
                    return yScale(d.WAR);
                });

            lineGen = d3.svg.line()
              .x(function(d) {
                return xScale(d.Year);
              })
              .y(function(d) {
                return yScale(d.WAR);
              })
              .interpolate("cardinal");
            }
            if (newData == 'Hits') {
                xScale.domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
                 .range([padding, w2-padding*2]);
            yScale.domain([0, d3.max(dataset3, function(d) { return d.Hits; })])
                 .range([h2-padding, padding]);

            vis.selectAll("circle")
                .data(dataset3)
                .transition()
                .duration(1000)
                .attr("cx", function(d) {
                    return xScale(d.Year);
                })
                .attr("cy", function(d) {
                    return yScale(d.Hits);
                });

            lineGen = d3.svg.line()
              .x(function(d) {
                return xScale(d.Year);
              })
              .y(function(d) {
                return yScale(d.Hits);
              })
              .interpolate("cardinal");
            }
            if (newData == 'Runs') {
                xScale.domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
                 .range([padding, w2-padding*2]);
            yScale.domain([0, d3.max(dataset3, function(d) { return d.Runs; })])
                 .range([h2-padding, padding]);

            vis.selectAll("circle")
                .data(dataset3)
                .transition()
                .duration(1000)
                .attr("cx", function(d) {
                    return xScale(d.Year);
                })
                .attr("cy", function(d) {
                    return yScale(d.Runs);
                });

            lineGen = d3.svg.line()
              .x(function(d) {
                return xScale(d.Year);
              })
              .y(function(d) {
                return yScale(d.Runs);
              })
              .interpolate("cardinal");
            }
            if (newData == 'RBIs') {
                xScale.domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
                 .range([padding, w2-padding*2]);
            yScale.domain([0, d3.max(dataset3, function(d) { return d.RBIs; })])
                 .range([h2-padding, padding]);

            vis.selectAll("circle")
                .data(dataset3)
                .transition()
                .duration(1000)
                .attr("cx", function(d) {
                    return xScale(d.Year);
                })
                .attr("cy", function(d) {
                    return yScale(d.RBIs);
                });

            lineGen = d3.svg.line()
              .x(function(d) {
                return xScale(d.Year);
              })
              .y(function(d) {
                return yScale(d.RBIs);
              })
              .interpolate("cardinal");
            }

            d3.selectAll(".lines")
                .transition()
                .duration(1000)
                .attr('d', lineGen(data));

            //Update X axis
            vis.select("#xaxis")
                .transition()
                .duration(1000)
                .call(xAxis);

            //Update Y axis
            vis.select("#yaxis")
                .transition()
                .duration(1000)
                .call(yAxis);


            vis.selectAll(".yLabel")
                .remove();

            vis.append("text")
            .attr("class", "yLabel")
            .attr("text-anchor", "middle")
            .attr("transform", "translate("+ (padding/3+10) +","+(h2/2)+")rotate(-90)")
            .text(newData);
        }
            });
