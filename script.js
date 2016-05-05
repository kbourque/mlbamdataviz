// must be declared outside
var started = 0;
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
var v6 = 'Wins';
var v7 = 'Losses';
var v8 = 'Strikeouts';
var v9 = 'ERA';
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

var bobg = 'bobgibson'
var christym = 'christymathewson';
var cyy = 'cyyoung';
var dond = 'dondrysdale';
var eddiep = 'eddieplank';
var leftyg = 'leftygrove';
var rogerc = 'rogerclemens';
var toms = 'tomseaver';
var walterj = 'walterjohnson';
var petea = 'petealexander';


var compdata;
var cancompare = 0;

var compplayer;
var currplayer = 'baberuth';

var currplayerval;
var compplayerval;

var newData = 'WAR';

//everything relying on data within baberuth.csv must be contained here
var player = {
    ok:this,
    resetter:function(member, player, pitch) {
        d3.selectAll("svg").remove();
        d3.selectAll(".start_container").remove();
        d3.selectAll(".start_sign").remove();
        // newData2 = eval(d3.select(this).property('value'));
        this.start(member, player, pitch);
    },
    start:function(player, lol, pitcher) {
        d3.csv('data/'+player+'.csv', function(data){
            if (started == 0) {
                console.log("hi")
                d3.selectAll('.player_circle')
                    .on('click', function() {
                        console.log(d3.select(this));
                        d3.select('.start_container')
                            .remove();
                        d3.select('.start_sign')
                            .remove();
                        currplayer = eval(d3.select(this).property('id'));
                        currplayerval = d3.select(this).property('id');
                        cancompare = 1;
                        started = 1;
                        if (d3.select(this)
                            .classed("pitcher")) {
                            lol.start(currplayer, lol, 1);
                        }
                        else {
                            lol.start(currplayer, lol, 0);
                        }
                    });
            } else {
                 // importing data from CSV file
    if ( pitcher == 0 ) {
        data.forEach(function(d){ d['Year'] = +d['Year']; });
        data.forEach(function(d){ d['WAR'] = +d['WAR']; });
        data.forEach(function(d){d['Homers'] = +d['Homers']});
        data.forEach(function(d){d['Hits'] = +d['Hits']});
        data.forEach(function(d){d['RBIs'] = +d['RBIs']});
        data.forEach(function(d){d['Runs'] = +d['Runs']});
        data.forEach(function(d){d['Season'] = +d['Season']});
    } else {
        data.forEach(function(d){ d['Year'] = +d['Year']; });
        data.forEach(function(d){ d['WAR'] = +d['WAR']; });
        data.forEach(function(d){d['Wins'] = +d['Wins']});
        data.forEach(function(d){d['Losses'] = +d['Losses']});
        data.forEach(function(d){d['Strikeouts'] = +d['Strikeouts']});
        data.forEach(function(d){d['ERA'] = +d['ERA']});
        data.forEach(function(d){d['EarnedRuns'] = +d['EarnedRuns']});
        data.forEach(function(d){d['WHIP'] = +d['WHIP']});
        data.forEach(function(d){d['Season'] = +d['Season']});
    }
    dataset3 = data;
    padding = 65;
    w2 = 1350,
    h2 = 800,
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
            .attr('id', 'graphsvg')
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', "0 0 " + w2 + " " + h2)
            .attr('preserveAspectRatio', "xMidYMid meet");


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
      .interpolate("linear");

    vis.append('svg:path')
        .attr('class', 'lines')
      .attr('d', lineGen(data))
      .attr('stroke', '#FFA700')
      .attr('stroke-width', 4)
      .attr('fill', 'none');



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
            stroke: '#FFA700',
            fill: '#FFFFE4'
        })
        .attr("stroke-width", "4")
        .append("svg:title")
        .text(function(d) { return d.x; });

    // var tip = d3.tip()
    //   .attr('class', 'd3-tip')
    //   .offset([-10, 0])
    //   .html(function(d) {
    //     return d;
    //   });

    /* Initialize tooltip */
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return d.WAR; });

/* Invoke the tip in the context of your visualization */
    vis.call(tip);

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

    d3.selectAll(".reset")
      .on('click', function() {
             d3.selectAll("svg").remove();
             d3.selectAll(".start_container").remove();
             d3.selectAll(".start_sign").remove();
             d3.selectAll('.poster_section')
                .append('div')
                .attr('class', 'start_container')
                .attr('position', 'relative')
                .attr('top', '-1000')
                .append('img')
                .attr('class', 'start_sign')
                .attr('src', 'media/start.png');
            cancompare = 0;

        });


    //triggered when option is changed on drop down menu
    d3.selectAll(".option_container")
        .on('click', function() {
            var check = d3.select(this).property('id');
         newData = eval(d3.select(this).property('id'));
            if (check != 'reset') {
                 updateLegend(newData);
            if (cancompare > 0) {
                console.log(compplayer);
                if (d3.select("#" + compplayerval).classed("pitcher")) {
                    compare(compplayer, newData, 1);
                } else {
                    compare(compplayer, newData, 0);
                }
                d3.selectAll('.linez')
                    .remove();
                d3.selectAll('.circles')
                    .remove();
            }
            }
        });


    // vis.selectAll("circle")
    //     .on('mouseover', function() {
    //         console.log("hello");
    //     });

vis.selectAll("#circles")
      .data(dataset3)
        .enter().append('svg:circle')
        .attr({
            id: 'tips',
            cx: function(d) {return xScale(d.Year);},
            cy: function(d) {return yScale(d.WAR);},
            r: 15,
            opacity: 0
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)



    // d3.selectAll(".player_circle")
    //     .on('click', function() {
    //         currplayer = eval(d3.select(this).property('id'));
    //         lol.resetter(currplayer, lol);
    //     });
    d3.selectAll(".player_circle")
        .on('click', function() {
            var pitch = d3.select(this).classed("pitcher");
            if (cancompare == 0) {
                // temp = eval(d3.select(this).property('id'));
                // if (currplayer == temp) {
                //     console.log('got in here');
                //     d3.selectAll("svg").remove();
                //     cancompare = 0;
                //     return;
                // } else {
                //     console.log('goit in second');
                //     currplayer = temp;
                // }
                currplayer = eval(d3.select(this).property('id'));
                currplayerval = d3.select(this).property('id');
                cancompare = 1;
                if (pitch) {
                    lol.resetter(currplayer, lol, 1);
                } else {
                    lol.resetter(currplayer, lol, 0);
                }
            } else {
                compplayer = eval(d3.select(this).property('id'));
                console.log(compplayer);
                // if (currplayer == temp) {
                //     console.log('got in here');
                //     d3.selectAll("svg").remove();
                //     cancompare = 0;
                //     return;
                // } else {
                //     console.log('goit in second');
                //     compplayer = temp;
                // }
                compplayerval = d3.select(this).property('id');
                console.log(compplayerval);
                if (cancompare == 1) {
                    cancompare = 2;
                } else {
                    d3.selectAll('.linez')
                        .remove();
                    d3.selectAll('.circles')
                        .remove();
                }
                if (pitch) {
                    d3.selectAll('#tips').remove();
                    compare(compplayer, newData, 1);
                }
                else {
                    d3.selectAll('#tips').remove();
                    compare(compplayer, newData, 0);
                }
        }
    });

    function compare(player, stat, pitch) {
        d3.csv('data/'+player+'.csv', function(data) {
            if (pitch == 0) {
                data.forEach(function(d){ d['Year'] = +d['Year']; });
                data.forEach(function(d){ d['WAR'] = +d['WAR']; });
                data.forEach(function(d){d['Homers'] = +d['Homers']});
                data.forEach(function(d){d['Hits'] = +d['Hits']});
                data.forEach(function(d){d['RBIs'] = +d['RBIs']});
                data.forEach(function(d){d['Runs'] = +d['Runs']});
                data.forEach(function(d){d['Season'] = +d['Season']});
            } else {
                data.forEach(function(d){ d['Year'] = +d['Year']; });
                data.forEach(function(d){ d['WAR'] = +d['WAR']; });
                data.forEach(function(d){d['Wins'] = +d['Wins']});
                data.forEach(function(d){d['Losses'] = +d['Losses']});
                data.forEach(function(d){d['Strikeouts'] = +d['Strikeouts']});
                data.forEach(function(d){d['ERA'] = +d['ERA']});
                data.forEach(function(d){d['EarnedRuns'] = +d['EarnedRuns']});
                data.forEach(function(d){d['WHIP'] = +d['WHIP']});
                data.forEach(function(d){d['Season'] = +d['Season']});
            }

            //adding comparison data
            datasetcomp = data;

            // comparing longest seasons, biggest war
            var firstmax = d3.max(dataset3, function(d) { return d.Season; });
            var secondmax = d3.max(datasetcomp, function(d) { return d.Season; });

            var statmax1 = d3.max(dataset3, function(d) { return eval('d.' + stat); });
            var statmax2 = d3.max(datasetcomp, function(d) { return eval('d.' + stat); });

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
            var biggeststat = findbiggest(statmax1, statmax2);

        // adding scales
        xScale.domain([0, longestseason])
             .range([padding, w2-padding*2]);
        yScale.domain([0, biggeststat])
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
            return yScale(eval('d.' + stat));
          })
          .interpolate("linear");

        d3.selectAll(".lines")
            .transition()
            .duration(1000)
            .attr('d', lineGen(dataset3));


     lineGen2 = d3.svg.line()
      .x(function(d) {
        return xScale(d.Season);
      })
      .y(function(d) {
        return yScale(eval('d.' + stat));
      })
      .interpolate("linear");
        // .transition()
        // .duration(1000)
        // .attr('d', lineGen(datasetcomp));

    lines =vis.append('svg:path')
        .attr('class', 'linez')

      lines.attr('d', lineGen2(datasetcomp))
      .attr('stroke', '#FF354F')
      .attr('stroke-width', 0)
      .attr('fill', 'none');


    d3.selectAll(".linez")
        .transition()
        .duration(1000)
        .attr('stroke-width', 4);


    circles = vis.append("g")
        .attr("id", "circles2")
        .selectAll("circle")
        .data(datasetcomp)
        .enter();


    circles.append("circle")
    .attr({
            cx: function(d) {return xScale(d.Season);},
            cy: function(d) {return yScale(eval('d.' + stat));},
            r: 8,
            fill: '#E8FFFC',
            stroke: '#FF354F'
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
                return yScale(eval('d.' + stat));
            });

       /* Initialize tooltip */
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return eval('d.'+stat); });

/* Invoke the tip in the context of your visualization */
    vis.call(tip);

    vis.selectAll("#circles")
      .data(dataset3)
        .enter().append('svg:circle')
        .attr({
            id: 'tips',
            cx: function(d) {return xScale(d.Season);},
            cy: function(d) {return yScale(eval('d.'+stat));},
            r: 15,
            opacity: 0
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);

    vis.selectAll("#circles")
      .data(datasetcomp)
        .enter().append('svg:circle')
        .attr({
            id: 'tips',
            cx: function(d) {return xScale(d.Season);},
            cy: function(d) {return yScale(eval('d.'+stat));},
            r: 15,
            opacity: 0
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);


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
          .interpolate("linear");

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

    /* Initialize tooltip */
    tip = d3.tip().attr('class', 'd3-tip').html(function(d) { return eval('d.'+newData); });

    /* Invoke the tip in the context of your visualization */
    vis.call(tip);

    vis.selectAll("#circles")
      .data(dataset3)
        .enter().append('svg:circle')
        .attr({
            id: 'tips',
            cx: function(d) {return xScale(d.Year);},
            cy: function(d) {return yScale(eval('d.'+newData));},
            r: 15,
            opacity: 0
        })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
    }
}

            });
        }
    }

player.start('baberuth', player);


/** Manage all jQuery here */
$(document).ready(function () {

    var cancompare = 0;
    $('.pitcher_list1').toggleClass('goAway');
    $('.pitcher_list2').toggleClass('goAway');
    $('.b_button').toggleClass('button_selected');
    $('.p_option_list').toggleClass('goAway');
    $('.name_box').toggleClass('default_color');
    $('.name_box').text('Select players here');



    $('.b_button').click( function() {
      $('.b_button').toggleClass('button_selected');
      $('.p_button').removeClass('button_selected');

      $('.p_option_list').toggleClass('goAway');
      $('.b_option_list').removeClass('goAway');

      $('.pitcher_list1').toggleClass('goAway');
      $('.pitcher_list2').toggleClass('goAway');

      $('.batter_list1').removeClass('goAway');
      $('.batter_list2').removeClass('goAway');
    });


    $('.p_button').click( function() {
      $('.p_button').toggleClass('button_selected');
      $('.b_button').removeClass('button_selected');

      $('.b_option_list').toggleClass('goAway');
      $('.p_option_list').removeClass('goAway');

      $('.batter_list1').toggleClass('goAway');
      $('.batter_list2').toggleClass('goAway');

      $('.pitcher_list1').removeClass('goAway');
      $('.pitcher_list2').removeClass('goAway');
    });

    $('.player_circle').mouseenter( function() {
      $('.name_box').removeClass('default_color');
      $('.name_box').text(this.alt);
    });
    $('.player_circle').mouseleave( function() {
      $('.name_box').toggleClass('default_color');
      $('.name_box').text('Select players here');
    });

    $('.player_circle').click( function(event) {
        // temp = eval(event.target.id);
        // console.log(currplayer);
        // if (temp == currplayer) {
        //     $(this).toggleClass('lol');
        //     return;
        // }
        if (cancompare === 0) {
            $(this).toggleClass('lol');
            $('.blue_box').text('');
            $('.blue_box').text(this.alt);
            cancompare = 1;
        } else if (cancompare === 1) {
            $('.player_circle').removeClass('lol2');
            $('.red_box').text('');
            $('.red_box').text(this.alt);
            $(this).toggleClass('lol2');
        }
    });

    $('.reset').click( function() {
        $('.player_circle').removeClass('lol');
        $('.player_circle').removeClass('lol2');
        cancompare = 0;
        $('.blue_box').text('');
        $('.red_box').text('');

         /*if (d3.select("#" + currplayerval).classed("pitcher")) {
              lol.resetter(currplayer, lol, 1);
          } else {
              lol.resetter(currplayer, lol, 0);
          }*/
          d3.selectAll("svg").remove();
          d3.selectAll(".start_container").remove();
          d3.selectAll(".start_sign").remove();
          d3.selectAll('.poster_section')
             .append('div')
             .attr('class', 'start_container')
             .attr('position', 'relative')
             .attr('top', '-1000')
             .append('img')
             .attr('class', 'start_sign')
             .attr('src', 'media/start.png');
    })
});
