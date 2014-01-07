var margin = {top: 20, right: 10, bottom: 20, left: 10},
  width = 200 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var Y = 'yellow';
var O = 'orange';
var G = 'green';

var timelines = [{
  dataset: [Y, O, G, O, O, O]
}, {
  dataset: [Y]
}, {
  dataset: [Y, O, G]
}, {
  dataset: [Y, O]
}, {
  dataset: [Y, O, G, O, O, O, G, O, O, O, O, G, O, O, O, G]
}, {
  dataset: [Y, O]
}, {
  dataset: [Y, O, G, O, O]
}];

var xScale = d3.scale.linear()
  .domain([0, timelines.length])
  .range([0, width]);

var maxSet = d3.max(timelines, function(e) {return e.dataset;});
var yScale = d3.scale.linear()
  .domain([0, maxSet.length])
  .range([0, height]);

var svgAll = d3.select(".graph").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgAll.selectAll('g')
  .data(timelines)
  .enter()
  .append("g")
  .attr("transform", function (d, i) {
    return "translate(" + i * xScale(1) + ")";
  })
  .attr("r", function (d) {
    var svg = d3.select(this);
    var line = d3.svg.line()
      .x(function (d, i) {
        return xScale(0.5);
      })
      .y(function (d, i) {
        return yScale(d);
      });

    svg.append("path").attr("d", line([0, d.dataset.length - 1]));

    svg.selectAll("circle")
      .data(d.dataset)
      .enter()
      .append("circle")
      .attr('fill', function (d, i) {
        return d;
      })
      .attr("cx", function (d, i) {
        return xScale(0.5);
      })
      .attr("cy", function (d, i) {
        return yScale(i);
      })
      .attr("r", function (d) {
        return 6;
      });
  });
