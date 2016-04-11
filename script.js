// must be declared outside
var dataset3;
var datasetcomp;
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
var baber = 'baberuth'
var albertp = 'albertpujols';
var barryb = 'barrybonds';
var honusw = 'honuswagner';
var joed = 'joedimaggio';
var tedw = 'tedwilliams';
var loug = 'lougehrig';
var mickeym = 'mickeymantle';
var tyc = 'tycobb';
var williem = 'williemays';
var obj;

var albertpc = 'albertpujols'

var compdata;


//everything relying on data within baberuth.csv must be contained here
var player = {
ok:this,
resetter:function(member, player) {
    d3.selectAll("svg").remove();
    // newData2 = eval(d3.select(this).property('value'));
    this.start(member, player);
},
comp:function() {
    d3.csv('albertpujols.csv', function(data){
        data.forEach(function(d){ d['Year'] = +d['Year']; });
        data.forEach(function(d){ d['WAR'] = +d['WAR']; });
        data.forEach(function(d){d['Homers'] = +d['Homers']});
        data.forEach(function(d){d['Hits'] = +d['Hits']});
        data.forEach(function(d){d['RBIs'] = +d['RBIs']});
        data.forEach(function(d){d['Runs'] = +d['Runs']});
        compdata = data;
    })
},
start:function(player, lol) {
d3.csv(player+".csv", function(data){
    // importing data from CSV file
    data.forEach(function(d){ d['Year'] = +d['Year']; });
    data.forEach(function(d){ d['WAR'] = +d['WAR']; });
    data.forEach(function(d){d['Homers'] = +d['Homers']});
    data.forEach(function(d){d['Hits'] = +d['Hits']});
    data.forEach(function(d){d['RBIs'] = +d['RBIs']});
    data.forEach(function(d){d['Runs'] = +d['Runs']});
    data.forEach(function(d){d['Season'] = +d['Season']});
    dataset3 = data;
    padding = 65;
    w2 = 1200,
    h2 = 600,
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


    // // // path
    // lineGen2 = d3.svg.line()
    //   .x(function(d) {
    //     return xScale(d.Year);
    //   })
    //   .y(function(d) {
    //     return yScale(d.RBIs);
    //   })
    //   .interpolate("cardinal");

    // lines =vis.append('svg:path')
    //     .attr('class', 'lines')

    //   lines.attr('d', lineGen2(data))
    //   .attr('stroke', '#1051B5')
    //   .attr('stroke-width', 4)
    //   .attr('fill', 'none');


    // points
    circles = vis.append("g")
        .attr("id", "circles")
        .selectAll("circle")
        .data(dataset3)
        .enter()
    
    circles.append("circle")
    .attr({
            cx: function(d) {return xScale(d.Year);},
            cy: function(d) {return yScale(d.WAR);},
            r: 8,
            // fill: '#E8FFFC',
            stroke: '#1051B5',
            fill: '#FFFFE4'
        })
        .attr("stroke-width", "4")

    // circles.append("circle")
    // .attr({
    //         cx: function(d) {return xScale(d.Year);},
    //         cy: function(d) {return yScale(d.RBIs);},
    //         r: 8,
    //         // fill: '#E8FFFC',
    //         stroke: '#1051B5',
    //         fill: '#FFFFE4'
    //     })
    //     .attr("stroke-width", "4")

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
    d3.selectAll(".player_circle")
        .on('click', function() {
            newData = eval(d3.select(this).property('id'));
            lol.resetter(newData, lol);
        });
    d3.select("#select-list3")
        .on('change', function() {
            newData = eval(d3.select(this).property('value'));
            compare();
        });

    function compare() {
        d3.csv('albertpujols.csv', function(data) {
            data.forEach(function(d){ d['Year'] = +d['Year']; });
            data.forEach(function(d){ d['WAR'] = +d['WAR']; });
            data.forEach(function(d){d['Homers'] = +d['Homers']});
            data.forEach(function(d){d['Hits'] = +d['Hits']});
            data.forEach(function(d){d['RBIs'] = +d['RBIs']});
            data.forEach(function(d){d['Runs'] = +d['Runs']});
            data.forEach(function(d){d['Season'] = +d['Season']});

            //adding comparison data
            datasetcomp = data;

            // comparing longest seasons, biggest war 
            var firstmax = d3.max(dataset3, function(d) { return d.Season; });
            var secondmax = d3.max(datasetcomp, function(d) { return d.Season; });

            var warmax1 = d3.max(dataset3, function(d) { return d.WAR; });
            var warmax2 = d3.max(datasetcomp, function(d) { return d.WAR; });

            function findbiggest(firstmax, secondmax) {
                if (firstmax > secondmax) {
                    return firstmax
                } else {
                    return secondmax;
                }
            }

            function findsmolest(firstmax, secondmax) {
                if (firstmax > secondmax) {
                    return secondmax
                } else {
                    return firstmax;
                }
            }

            var longestseason = findbiggest(firstmax, secondmax);
            var biggestWAR = findbiggest(warmax1, warmax2);

        // adding scales
        xScale.domain([0, longestseason])
             .range([padding, w2-padding*2]);
        yScale.domain([0, biggestWAR])
             .range([h2-padding, padding]);

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
  
  lineGen = d3.svg.line()
          .x(function(d) {
            return xScale(d.Season);
          })
          .y(function(d) {
            return yScale(d.WAR);
          })
          .interpolate("cardinal");

        d3.selectAll(".lines")
            .transition()
            .duration(1000)
            .attr('d', lineGen(dataset3));


     lineGen2 = d3.svg.line()
      .x(function(d) {
        return xScale(d.Season);
      })
      .y(function(d) {
        return yScale(d.WAR);
      })
      .interpolate("cardinal");
        // .transition()
        // .duration(1000)
        // .attr('d', lineGen(datasetcomp));

    lines =vis.append('svg:path')
        .attr('class', 'linez')

      lines.attr('d', lineGen2(datasetcomp))
      .attr('stroke', '#1051B5')
      .attr('stroke-width', 0)
      .attr('fill', 'none');


    d3.selectAll(".linez")
        .transition()
        .duration(1000)
        .attr('stroke-width', 4);


    circles = vis.append("g")
        .selectAll("circle")
        .data(datasetcomp)
        .enter()
    
    
    circles.append("circle")
    .attr({
            cx: function(d) {return xScale(d.Season);},
            cy: function(d) {return yScale(d.WAR);},
            r: 8,
            fill: '#E8FFFC',
            stroke: '#1051B5'
        })
        .attr("stroke-width", "0")
        .attr('class', 'circles')

    vis.selectAll('.circles')
        .transition()
        .duration(1000)
        .attr('fill', '#FFFFE4')
        .attr('stroke-width', '4')

    vis.selectAll("circle")
            .data(dataset3)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return xScale(d.Season);
            })
            .attr("cy", function(d) {
                return yScale(d.WAR);
            });
        });
    }

    function updateLegend(newData) {
        //updating scale domains
        xScale.domain([d3.min(dataset3, function(d) { return d.Year; }), d3.max(dataset3, function(d) { return d.Year; })])
             .range([padding, w2-padding*2]);
        yScale.domain([0, d3.max(dataset3, function(d) { return eval('d.'+ newData); })])
             .range([h2-padding, padding]);

        vis.selectAll("circle")
            .data(dataset3)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                return xScale(d.Year);
            })
            .attr("cy", function(d) {
                return yScale(eval('d.' + newData));
            });

        lineGen = d3.svg.line()
          .x(function(d) {
            return xScale(d.Year);
          })
          .y(function(d) {
            return yScale(eval('d.' + newData));
          })
          .interpolate("cardinal");

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
}
}
player.start('baberuth', player);
// player.comp();