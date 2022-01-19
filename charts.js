function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data)
    // 3. Create a variable that holds the samples array. 
    const samplesArray = data.samples;
    const metadataArray = data.metadata;

    // 4. Create a variable that filters the samples for the object with the desired sample number.

    let filteredSamples = samplesArray.filter(participantIdNumber)[0];
    function participantIdNumber(p_num) {
      return p_num.id == sample;
    };

    var filteredMetadata = metadataArray.filter(participantIdNumber)[0];
    function participantIdNumber(p_num) {
      return p_num.id == sample;
    };
    //  5. Create a variable that holds the first sample in the array.
    //let firstSample = filteredSamples[0];
    //var metadata = filteredMetadata[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    let otu_ids = filteredSamples.otu_ids
    let otu_labels = filteredSamples.otu_labels
    let sample_values = filteredSamples.sample_values
    let wash_frequency = parseFloat(filteredMetadata.wfreq)
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);
    console.log(wash_frequency);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last.

    // CHECK THIS - PROBABLY WRONG

    //var yticks = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse()

    var yticks = otu_ids.slice(0, 10).map(otu_id).reverse()

    function otu_id(otu_array_item) {
      return `OTU ${otu_array_item}`
    };

    console.log(otu_ids.slice(0, 10));

    /*
    This is where the bar chart code begins.
    */

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        x: sample_values.slice(0, 10).reverse(),
        y: yticks,
        text: otu_labels.slice(0, 10).reverse(),
        type: 'bar',
        orientation: 'h',
        width: 0.6
      }];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      showlegend: false,
      xaxis: { tickangle: 0, zeroline: true },
      yaxis: { gridwidth: 1, zeroline: true },
      height: 425,
      width: 900,

    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot('bar', barData, barLayout);

    /*
    This is where the bubble chart code begins.
    */

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: { size: sample_values, color: otu_ids },
      type: 'scatter'
    }];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures per Sample",
      xaxis: { title: "OTU ID" },
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    /*
    This is where the guage chart code begins.
    */


    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        domain: { x: [0,1], y: [0,1]},
        value: wash_frequency,
        title: {text: "Belly Button Washing Frequency"},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: {range:[null,10]},
          bar: {color: 'black'},
          steps: [
            {range: [0,2], color: 'red' },
            {range: [2,4], color: 'orange' },
            {range: [4,6], color: 'yellow' },
            {range: [6,8], color: 'yellowgreen' },
            {range: [8,10], color: 'green' },
          ]

        }
      }

    ];

    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      width: 500,
      height: 425

    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}