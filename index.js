
var activities = [];
var photos = {}
d3.csv("Photos.csv", function(activities_, i){
    var headerToAvoid = 0;

    if (i > headerToAvoid){
        // activities.push(activities_)
    }
    // console.log(activities)
    var nameCategory = activities_['Photo ID'];
    
    if (nameCategory[0] != " "){
        // console.log(activities_)
        for (key in activities_){
            if (key != "" && key != 'Photo ID'){
                if (photos[key] == undefined){
                    photos[key] = {}
                }
                if (photos[key][nameCategory] == undefined && activities_[key] > 0){
                    photos[key][nameCategory + "_" + activities_[key]] = activities_[key]
                }
            }
            // console.log(nameCategory)
            
                
            }
    }


}).then(()=>{

    console.log(photos)
    var data = [];
    var i = 0;
    var counterData = {};
    var categoriesPerData = {};
    // for (var i = 0; i < photos.length; i ++){

    // console.log(photos)
    // for (key in photos){
    //     for (key2 in photos[key]){
    //         if ( photos[key][key2] > 0){
    //         // console.log(key2, photos[key][key2])
    //             if (categoriesPerData[key2] != undefined) {
    //                 categoriesPerData[key2][photos[key][key2]] = 1;
    //             }
    //             else {
    //                 categoriesPerData[key2] = {};
    //             }
    //         }
    //     }
    // }
    // console.log(categoriesPerData)
    for (key in photos){
        for (key2 in photos[key]){
            if ( photos[key][key2] > 0){

                //TO GET THE X VALUE OF WHERE IT IS
                if (counterData[key2] != undefined) {
                    counterData[key2]++;
                }
                else {
                    counterData[key2] = 1;
                }

                 
                
                var idUser_ = key
                // if (key[1] == '-') idUser_ = idUser_.slice(0, 1) + idUser_.slice(2);
                // if (key[1] == '-') idUser_ = idUser_.slice(0, 1) + idUser_.slice(2);

                var dataSplitted = idUser_.split(' ')

                if (dataSplitted[0][1] == "-"){
                    // console.log('GOOO', dataSplitted[0])
                    dataSplitted[0] = dataSplitted[0].slice(0, 1) + dataSplitted[0].slice(2);
                    // dataSplitted[0] = dataSplitted[0].slice( 1, 0, " - ");
                }
                dataSplitted[0] = dataSplitted[0].replace('-', ' - ')
                dataSplitted = dataSplitted.join(' ')
                dataSplitted = dataSplitted.split(' ')
                // 
                if (dataSplitted[1] != "-"){
                    dataSplitted.splice(1, 0, "-");
                }
                if (dataSplitted[2][0] != "-"){
                    dataSplitted[2] = dataSplitted[2].slice( 0 );
                }
                if (dataSplitted[2][0] == "-"){
                    // console.log('GOO')
                    dataSplitted[2] = dataSplitted[2].slice( 1 );
                }

                dataSplitted = dataSplitted.join(' ')
                

                // 
                // console.log(dataSplitted)
                // console.log(idUser_)
                data.push({
                    index: i,
                    id_: counterData[key2],
                    idUser: dataSplitted, 
                    type: key2,
                    value: photos[key][key2]
                })
                i++;
            }
            
        }
    }
    console.log(data)

    launchViz(data);
});












function launchViz(data){

   
  





    data.sort(function(a, b) {
       return d3.ascending(a.type, b.type)
    })
       // set the dimensions and margins of the graph
       var margin = {top: 100, right: 20, bottom: 30, left: 600},
          width = 12000 - margin.left - margin.right,
          height = 6500 - margin.top - margin.bottom;
 
       // set the ranges
       var x = d3.scaleLinear()
                .range([0, width])
                
       var y = d3.scaleBand()
                .domain(data.map(function(d) { return d.type; }))
                .range([height, 0])
                .padding(0.001)
                
 
 
       // var colorParticipant = d3.scaleOrdinal(d3.schemeSet3);
       var colorParticipant  = d3.scaleLinear();
 
       // append the svg object to the body of the page
       // append a 'group' element to 'svg'
       // moves the 'group' element to the top left margin
       var svg = d3.select("#resultsGraph").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
         }))
       .append("g")
        
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(0.7)");
 
        svg.append("g").attr("transform", "translate(-500,-100)")
            .append("text")
            .style("font-size","50px")
            .style("font-weight","bold")
            .text(function(d,i){
                return "Device Configuration Photo Analysis"
            })
 
       var max = width;  
       var minX = -600
 
    //    addBG(svg, minX, max,0, 300, 'red');   
    //    addBG(svg, minX, max,300, 240, 'green');     
    //    addBG(svg, minX, max,540, 120, 'blue');     
    //    addBG(svg, minX, max,660, 120, 'red'); 
    //    addBG(svg, minX, max,780, 270, 'green'); 
    //    // addBG(svg, max,300, 180, 'red');      
 
       // var path = makeCurlyBrace(100, 100, 100, 400, 1, 1)
       var X = -400
       var offset = 86;

       var playa = [0, 6, 4, 1, 4, 11, 9, 5, 11, 3, 4, 3, 5,3, 5]
       var name = [
           'Place', 
           'Physical Artifacts', 
           'Lighting', 
           'Output', 
           'Input', 
           
           'Fixation', 
           'Distance', 
           'Device',
           'Workspace Size', 
           'Orientation', 
           'Number of Workspaces', 
           'Form_Homogeneous to Heterogeneous'
        ]
        var color = d3.scaleOrdinal(d3.schemeDark2);
       
    var minA = 0;
    var maxA = 0;
    var maxABarackket = 0;
    var coloreuuh = ['red', 'blue']
    for (var i =0; i <playa.length-1; i ++){
        minA += playa[i] * offset;
        maxA = playa[i+1] * offset;
        maxABarackket += playa[i+1] * offset;
        console.log(minA, maxA)
        addBG(svg, minX, max, minA, maxA, color(i));   
        appendBracket(svg, X, minA, X, maxABarackket, name[i], 10, 0.6);
        
    }


    var X = -600
    var playa = [0, 11, 40, 23]
    var name = ['ENVIRONMENT', 'DEVICE & MODALITY', 'CONFIGURATION']
     var color = d3.scaleOrdinal(d3.schemeDark2 );
    
    var minA = 0;
    var maxA = 0;
    for (var i =0; i < playa.length-1; i ++){

        minA += playa[i] * offset;
        maxA += playa[i+1] * offset;  
        appendBracket(svg, X, minA, X, maxA, name[i], 10, 1);
        
    }
    //    appendBracket(svg, X, 0, X, 525, 'Color', 10, 0.6);
    //    appendBracket(svg, X, 150, X, 240, 'Font', 5, 0.6)
    //    appendBracket(svg, X, 240, X, 300, 'Border', 5, 0.6)
    //    appendBracket(svg, X, 300, X, 360, 'Separator', 5, 0.6)
 
    //    appendBracket(svg, X, 360, X, 470, 'Grouping', 5, 0.6)
    //    appendBracket(svg, X, 470, X, 540, 'Connector', 5, 0.6)
 
    //    appendBracket(svg, X, 540, X, 660, 'Layout', 5, 0.6)
    //    appendBracket(svg, X, 660, X, 780, 'Digital/Analog', 5, 0.6)
    //    appendBracket(svg, X, 780, X, 900, 'Text', 5, 0.6)
    //    appendBracket(svg, X, 900, X, 1050, 'Image', 5, 0.6)
 
 
    //    var X = -320
    //    appendBracket(svg, X, 0, X, 300, 'Visual Style', 10, 0.6)
    //    appendBracket(svg, X, 300, X, 540, 'Structure', 10, 0.6)
    //    appendBracket(svg, X, 540, X, 660, 'Layout', 10, 0.6)
    //    appendBracket(svg, X, 660, X, 780, 'Digital/Analog', 10, 0.6)
    //    appendBracket(svg, X, 780, X, 1050, 'Content', 10, 0.6)
    //    // get the data
 
       //   if (error) throw error;
 
       // format the data
 
       // Scale the range of the data in the domains
       
    //    .replace(/ *\([^)]*\) */g, "");
       // var scaleX = d3.scaleLinea();
        // console.log(data)
       // append the rectangles for the bar chart
       var place = svg.selectAll(".bar")
             .data(data)
             .enter().append('g').attr('class', 'bar')
             .style('cursor', 'pointer')
             .attr("transform", function(d) {
                // console.log(y(d.type))
                return "translate(-50, " +  (y(d.type))+")"; 
             })
            //  .on("click", function(d) {	
            //     console.log()
            //     var urlConcat = "http://" + URLlink[d.Sketchnotes-1]
            //     var win = window.open(urlConcat, '_blank');
            //  })
             .on("mouseover", function(d) {	
                
                // console.log(window.scrollX)
                var BB = d3.select(this).node().getBoundingClientRect();
                // console.log(BB)
                div.transition()		
                   .duration(0)		
                   .style("opacity", 1);		
                // div.html(d.Sketchnotes)	
                //    .style("left", (BB.x +10) + "px")		
                //    .style("top", (window.scrollY + BB.y - 35) + "px");
                // console.log('<img src=Viz/image '+d.Sketchnotes+'.jpg>')	
                // div.html('<img src="visualization/Viz/image ('+d.part+').png">')
                div.html('<img class="imageHover" width="200px" src="images/miniatures/'+ d.idUser +'.jpg">')	
                    .style("position", "absolute")		
                    // .style("position", "absolute")		
                   .style("left", (BB.x + 100 + window.scrollX) + "px")		
                   .style("width", "400px")		
                   .style("top", (window.scrollY + BB.y - 35) + "px");	
                })					
                .on("mouseout", function(d) {		
                      div.transition()		
                         .duration(0)		
                         .style("opacity", 0);	
                });
 
 
          // MY BAR ==> GROUP OF BARS
            var g = place.append('g')
             .attr("transform", function(d) {
                // if (d.type == "Personal - Making it personal" && d.Condition == "VR") console.log(d)
 
                var y = 0//y1(d.Condition);
                var x = (Math.ceil (d.id_));
                var y2 = (d.id_ - x) * 80; 
                return "translate("+(x*90)+","+(y2)+")"; 
             
             })
             
        //   g.append("rect")
        //      .attr("class", "bar")
        //      // .attr("x", -1)
        //      .attr("width", 25)
        //      // .attr("y", -2)
        //      .attr("height", 25)
        //      // .attr("fill",function(d,i){ 
        //      //    if (d.part == 13) return 'red'
        //      // })
        //      .attr('stroke-width', '0.01')
        //      .attr('stroke', 'grey')
        //      .attr("fill",function(d,i){ 
        //         // if (d.type == "Personal - Making it personal" && d.id_ == 1) return 'red'
        //         // else  
        //         return 'white';//colorParticipant(d.part) 
        //      });//console.log(dParticipant)})
 
          // g.append('text')
          // .text(function(d){
          //    return '#' + d.part
          // })
          // .attr('dy', 15)
          // .attr('dx', 15)
          // .attr('text-anchor', 'middle')
          g.append("image")
             .attr('x', 0)
             .attr('y', 0)
             .attr('width', 80)
             .attr('height', 80)
             .attr('class', 'imageThumbnail')
             .attr("xlink:href", function(d,i){
                // return  "visualization/images/avatar.png";
                // return  "visualization/Viz/image ("+d.part+")Cropped.jpg";
                return  "images/miniatures/"+ d.idUser +".jpg";
             })
 
          g.append("rect")
             .attr("class", "bar")
             .attr("width", 80)
             .attr("height", 80)
             .attr('stroke', 'black')
             .attr("fill", 'none')
             .attr('stroke-width', '0.1')


             
            // //  .attr('stroke', 'black')
            //  .attr("fill", 'black')
            //  .attr('stroke-width', '0.1')
             g.append("circle")
             .attr("class", "circleBlack")
             .attr("cx", 15)
             .attr("cy", 15).attr('r', function(d,i){
                // return  "visualization/images/avatar.png";
                // console.log(d)
                if (d.type[0] == 'N' && d.type[1] == 'u'){
                    return 10
                } else {
                    return 0;
                }
                // return  "visualization/Viz/image ("+d.part+")Cropped.jpg";
               
             })

             g.append("text").text(function(d,i){
                // return  "visualization/images/avatar.png";
                // console.log(d)
                if (d.type[0] == 'N' && d.type[1] == 'u'){
                    return  d.value
                } else {
                    return null;
                }
                // return  "visualization/Viz/image ("+d.part+")Cropped.jpg";
               
             })
                .attr('stroke', 'white')
                .attr("dy", 20)
                .attr("dx", 11)
            // //  .attr('stroke', 'black')
            //  .attr("fill", 'black')
            //  .attr('stroke-width', '0.1')
             
 
// var svg2 = d3.select("#resultsGraph").append("svg").attr("width",360)
//         .attr("height", height + margin.top + margin.bottom).style("position" , 'fixed')
//         .style("background" , 'white')
//         .style('top', '200px')
//         .append("g")
//         .attr("transform", 
//             "translate(" + margin.left + "," + margin.top + ")")
      


svg.append("g")
    .attr("class", "axis")
    .style("font-size","16px") 
    .style("font-family","Roboto")
    .call(d3.axisLeft(y).tickFormat(function(d){  
        // return d
        return d.replace(/ *\([^)]*\) */g, "").split('_')[2] + " #" + d.replace(/ *\([^)]*\) */g, "").split('_')[3];
    }));
 
    // .replace(/ *\([^)]*\) */g, "");
       var div = d3.select("body").append("div")	
             .attr("class", "tooltip")				
             .style("opacity", 0);
 
 
 
         
 
 };
 function appendBracket(svg, x1, y1, x2, y2, txt, p1, p2){
    bracket = svg.append("path").attr("class","curlyBrace");
    bracket.attr("d", function(d) { return makeCurlyBrace(x1, y1+5, x2, y2-5, p1, p2); });
    bracket.attr('fill', 'none')
    bracket.attr('stroke-width', '2px')
    bracket.attr('stroke', 'black')
 
    svg.append("text")
    .style("font-family","Roboto")
    .style("font-size","20px")
    .attr('dx', (x1+x2)/2 - 20)
    .attr('dy', (y1+y2)/2 + 5)
    .attr('text-anchor', 'end')
    .text(txt)
 }
 function addBG(svg, minX, max, where, height, color){
    var redBox = svg.append("rect")
    .attr("x", minX)
    .attr("y", where)
    .attr("width", max)
    .attr("height", height)
    .attr("fill", color)
    .attr("opacity", 0.2);
 }
 
 function makeCurlyBrace(x1,y1,x2,y2,w,q){
             //Calculate unit vector
             var dx = x1-x2;
             var dy = y1-y2;
             var len = Math.sqrt(dx*dx + dy*dy);
             dx = dx / len;
             dy = dy / len;
 
             //Calculate Control Points of path,
             var qx1 = x1 + q*w*dy;
             var qy1 = y1 - q*w*dx;
             var qx2 = (x1 - .25*len*dx) + (1-q)*w*dy;
             var qy2 = (y1 - .25*len*dy) - (1-q)*w*dx;
             var tx1 = (x1 -  .5*len*dx) + w*dy;
             var ty1 = (y1 -  .5*len*dy) - w*dx;
             var qx3 = x2 + q*w*dy;
             var qy3 = y2 - q*w*dx;
             var qx4 = (x1 - .75*len*dx) + (1-q)*w*dy;
             var qy4 = (y1 - .75*len*dy) - (1-q)*w*dx;
 
         return ( "M " +  x1 + " " +  y1 +
                  " Q " + qx1 + " " + qy1 + " " + qx2 + " " + qy2 + 
                   " T " + tx1 + " " + ty1 +
                   " M " +  x2 + " " +  y2 +
                   " Q " + qx3 + " " + qy3 + " " + qx4 + " " + qy4 + 
                   " T " + tx1 + " " + ty1 );
         }