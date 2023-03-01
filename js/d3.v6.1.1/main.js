// constants for the visualizations
const FRAME_WIDTH = 400;
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

// create svg in vis2 div
const FRAME2 = d3.select("#vis2")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");     

// create svg in vis3 div
const FRAME3 = d3.select("#vis3")
.append("svg")
.attr("height", FRAME_HEIGHT)
.attr("width", FRAME_WIDTH)
.attr("class", "frame");  

// read data from iris.csv
d3.csv("data/iris.csv").then((DATA) => {

    // add the color based on the species and specify the hex of each color
	const SPECIES_COLOR = d3.scaleOrdinal()
    .domain(["setosa", "versicolor", "virginica"])
    .range(["#d290ee", "#fc9add", "#90eeec"]);

    // find max x for the first scatter plot
	const MAX_X_SCATTER_1 = d3.max(DATA, (d) => {
		return parseInt(d.Sepal_Length);
	});

    // find max y for the first scatter plot
    const MAX_Y_SCATTER_1 = d3.max(DATA, (d) => {
		return parseInt(d.Petal_Length);
	}); 

    // scaling constants for the x axis first scatter plot
	const X_SCALE_SCATTER_1 = d3.scaleLinear()
                    .domain([0, (MAX_X_SCATTER_1 + 1)])
                    .range([0, VIS_WIDTH]);

    // scaling constants for the y axis first scatter plot
	const Y_SCALE_SCATTER_1 = d3.scaleLinear()
					.domain([0, (MAX_Y_SCATTER_1 + 1)])
					.range([VIS_HEIGHT, 0]);
    
    // find max x for the second scatter plot
    const MAX_X_SCATTER_2 = d3.max(DATA, (d) => {
		return parseInt(d.Sepal_Width);
	});

    // find max y for the second scatter plot
    const MAX_Y_SCATTER_2 = d3.max(DATA, (d) => {
		return parseInt(d.Petal_Width);
	}); 

    // scaling constants for the x axis first scatter plot
	const X_SCALE_SCATTER_2 = d3.scaleLinear()
                    .domain([0, (MAX_X_SCATTER_2 + 1)])
                    .range([0, VIS_WIDTH]);

    // scaling constants for the y axis first scatter plot
	const Y_SCALE_SCATTER_2 = d3.scaleLinear()
					.domain([0, (MAX_Y_SCATTER_2 + 1)])
					.range([VIS_HEIGHT, 0]);
    
    // 50 total species, stays constant
	const MAX_Y_BAR = 50;

    // scaling constants for the x axis for the bar plot
    const X_SCALE_BAR = d3.scaleBand()
    .domain(DATA.map((d) => { return d.Species; }))
    .range([0, VIS_WIDTH])
    .padding(0.2);
    
    // scaling constants for the y axis for the bar plot
    const Y_SCALE_BAR = d3.scaleLinear()
    .domain([0, (MAX_Y_BAR)])
    .range([VIS_HEIGHT, 0]);

    // add both axis' to vis1
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE_SCATTER_1).ticks(10))
        .attr("font-size", "15px");
	FRAME1.append("g")
		.attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE_SCATTER_1).ticks(10))
        .attr("font-size", "15px");

	// add points to scatter plot 1
	let GRAPH1 = FRAME1.selectAll("dot")
        .data(DATA)
        .enter()
        .append("circle")
        .attr("cx", (d) => { return X_SCALE_SCATTER_1(d.Sepal_Length) + MARGINS.left; })
		.attr("cy", (d) => { return Y_SCALE_SCATTER_1(d.Petal_Length) + MARGINS.top; })
        .attr("fill", (d) => { return SPECIES_COLOR(d.Species); })
        .style("opacity", 0.5)
        .attr("r", 5)
        .attr("class", "point");

    // add both axis' to vis2
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE_SCATTER_2).ticks(10))
        .attr("font-size", "15px");
	FRAME2.append("g")
		.attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE_SCATTER_2).ticks(10))
        .attr("font-size", "15px");   

    // add points to scatter plot 2
	let GRAPH2 = FRAME2.selectAll("dot")
    .data(DATA)
    .enter()
    .append("circle")
    .attr("cx", (d) => { return X_SCALE_SCATTER_2(d.Sepal_Width) + MARGINS.left; })
    .attr("cy", (d) => { return Y_SCALE_SCATTER_2(d.Petal_Width) + MARGINS.top; })
    .attr("fill", (d) => { return SPECIES_COLOR(d.Species); })
    .style("opacity", 0.5)
    .attr("r", 5)
    .attr("class", "point");

    // add the brushing capability to the second graph
    FRAME2.call(d3.brush()                 
    .extent([[0,0], [FRAME_WIDTH, FRAME_HEIGHT]]) 
    .on("start brush", showBrush)); 

    // add both axis' to vis3
	FRAME3.append("g")
    .attr("transform", "translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.top) + ")")
    .call(d3.axisBottom(X_SCALE_BAR).ticks(10))
    .attr("font-size", "15px");
    FRAME3.append("g")
    .attr("transform", "translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
    .call(d3.axisLeft(Y_SCALE_BAR).ticks(10))
    .attr("font-size", "15px");

    // add data to the bar chart
    let GRAPH3 = FRAME3.selectAll("bars")
    .data(DATA)
    .enter()
    .append("rect")
        .attr("x", (d) => { return X_SCALE_BAR(d.Species) + MARGINS.left; })
        .attr("y", (d) => { return Y_SCALE_BAR(MAX_Y_BAR) + MARGINS.top; })
        .attr("width", X_SCALE_BAR.bandwidth())
        .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE_BAR(MAX_Y_BAR); })
        .attr("fill", (d) => { return SPECIES_COLOR(d.Species); })
        .style("opacity", 0.5)
        .attr("class", "bar");

    // create a function to update the charts to have the selected points be highlighted orange
    function showBrush(event) {
        selection = event.selection;
        GRAPH1.classed("selected", function(d){ return isPointBrushed(selection, X_SCALE_SCATTER_2(d.Sepal_Width) + MARGINS.left, Y_SCALE_SCATTER_2(d.Petal_Width) + MARGINS.top); })
        GRAPH2.classed("selected", function(d){ return isPointBrushed(selection, X_SCALE_SCATTER_2(d.Sepal_Width) + MARGINS.left, Y_SCALE_SCATTER_2(d.Petal_Width) + MARGINS.top); })
        GRAPH3.classed("selected", function(d){ return isPointBrushed(selection, X_SCALE_SCATTER_2(d.Sepal_Width) + MARGINS.left, Y_SCALE_SCATTER_2(d.Petal_Width) + MARGINS.top); })
      };
    
      // create a function to check if the points have been brushed
      function isPointBrushed(BRUSH_COORDS, CX, CY) {
        let X0 = BRUSH_COORDS[0][0],
            X1 = BRUSH_COORDS[1][0],
            Y0 = BRUSH_COORDS[0][1],
            y1 = BRUSH_COORDS[1][1];
        return X0 <= CX && CX <= X1 && Y0 <= CY && CY <= y1;
      };

});
