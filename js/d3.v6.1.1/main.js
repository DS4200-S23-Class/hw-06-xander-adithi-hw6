// Constants for the visualizations
const FRAME_WIDTH = 300;
const FRAME_HEIGHT = 500;
const MARGINS = {left:50, right:50, top:50, bottom:50};
const VIS_HEIGHT = FRAME_HEIGHT - (MARGINS.top + MARGINS.bottom);
const VIS_WIDTH = FRAME_WIDTH - (MARGINS.left + MARGINS.right);

// create svg in vis1 div
const FRAME1 = d3.select("#vis1")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");

// read scatter plot data
d3.csv("data/iris.csv").then((DATA) => {

    // // Scaling constants
    // const X_SCALE = d3.scaleLinear()
    //     .domain([0, 10])
    //     .range([0, VIS_WIDTH]);
    // const Y_SCALE = d3.scaleLinear()
    //     .domain([10, 0])
    //     .range([0, VIS_HEIGHT]);

	// // Plots each of the data points
	// FRAME1.selectAll("points")
    //     .data(DATA)
    //     .enter()
    //     .append("circle")
    //     .attr("cx", (d) => { return (X_SCALE(d.x) + MARGINS.left); })
    //     .attr("cy", (d) => { return (Y_SCALE(d.y) + MARGINS.top) ; })
    //     .attr("r", 10)
    //     .attr("class", "point");

	// // Add both axis' to vis1
	// FRAME1.append("g")
	// 	.attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
	// 	.call(d3.axisBottom(X_SCALE).ticks(10))
    //     .attr("font-size", "15px");
	// FRAME1.append("g")
	// 	.attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
	// 	.call(d3.axisLeft(Y_SCALE).ticks(10))
    //     .attr("font-size", "15px");
});


// create svg in vis2 div
const FRAME2 = d3.select("#vis2")
    .append("svg")
    .attr("height", FRAME_HEIGHT)
    .attr("width", FRAME_WIDTH)
    .attr("class", "frame");     

    
// create svg in vis2 div
const FRAME3 = d3.select("#vis3")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");  