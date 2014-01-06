var margin = {top: 20, right: 50, bottom: 30, left: 50},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;



var timelines = [{
  dataset: ['red', 'green', 'blue']
}, {
  dataset: ['red', 'green', 'blue']
}, {
  dataset: ['red', 'green', 'blue']
}];

var xScale = d3.scale.linear()
  .domain([0, 10])
  .range([0, width]);
var yScale = d3.scale.linear()
  .domain([0, 10])
  .range([0, height]);

var svgAll = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svgAll.selectAll('g')
  .data(timelines)
  .enter()
  .append("g")
  .attr("transform", function (d, i) {
    return "translate(" + i * 30 + ")";
  })
  .attr("r", function (d) {
    var svg = d3.select(this);
    var line = d3.svg.line()
      .x(function (d, i) {
        return 10;
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
        return 10;
      })
      .attr("cy", function (d, i) {
        return yScale(i);
      })
      .attr("r", function (d) {
        return 10;
      });
  });