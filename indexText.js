$(document).ready(function(){
    $('.modal').modal();
  });

var activities = [];
var photos = {}

var dataDomain = []
d3.csv("TextAnalysis.csv", function(activities_, i){
    var headerToAvoid = 0;


    // console.log(activities_)
    // if (i > headerToAvoid){
    //     // activities.push(activities_)
    // }
    // // console.log(activities)
    var nameCategory = activities_['Pattern Code'].replace(/['"]+/g, '')


    nameCategory = nameCategory.replace(/ *\([^)]*\) */g, "")
    nameCategory = nameCategory.replace('Partitition', 'Partition')
    nameCategory = nameCategory.replace('Parition', 'Partition')
    nameCategory = nameCategory.replace('Singel', 'Single')
    
    if (nameCategory[nameCategory.length -1] == " "){
        nameCategory = nameCategory.substring(0, nameCategory.length - 1);
    }

    if (nameCategory != ""){
        // console.log(activities_[4])
        if (photos[nameCategory] == undefined){
            photos[nameCategory] = [];

            
            
            photos[nameCategory].push({...activities_, 
                // id_:photos[nameCategory].length, 
                type: nameCategory
            })
        }
        else{
            photos[nameCategory].push({...activities_, 
                // id_:photos[nameCategory].length, 
                type: nameCategory
            })
        }



        if (dataDomain.indexOf(activities_['Tasks']) < 0){
            dataDomain.push(activities_['Tasks'])
        }
        
    }

    // console.log(photos)
    
}).then(()=>{

    // console.log(photos)
    // console.log(dataDomain)
    var data = [];


    for (var key in photos){
        var type = key;
        var arrayTask = photos[key];
       
        // console.log(arrayTask)

        arrayTask = arrayTask.sort(function(a, b) {
            return d3.ascending(a.Tasks, b.Tasks)
         })

        //  console.log(arrayTask)
        for (var indexArray in arrayTask){
            data.push({
                ...arrayTask[indexArray],
                id_: arrayTask.indexOf(arrayTask[indexArray])
            })
        }
    }

    // console.log(data)
    launchViz(data)
});











function launchViz(data){

   
  





    data.sort(function(a, b) {
       return d3.descending(a.type, b.type)
    })
       // set the dimensions and margins of the graph
       var margin = {top: 200, right: 20, bottom: 30, left: 100},
          width = 1000 - margin.left - margin.right,
          height = 2000 - margin.top - margin.bottom;
 
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
          .attr("width", window.innerWidth)//width + margin.left + margin.right)
          .attr("height", window.innerHeight)//height + margin.top + margin.bottom)
          .call(d3.zoom().on("zoom", function () {
            svg.attr("transform", d3.event.transform)
         }))
       .append("g")
        
       .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
        svg.append("g").attr("transform", "translate(-100,-100)")
            .append("text")
            .style("font-size","50px")
            .style("font-weight","bold")
            .text(function(d,i){
                return "Device Configuration Photo Analysis"
            })
 
    
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
                return "translate(10, " +  (y(d.type))+")"; 
             })
            //  .on("click", function(d) {	
            //     console.log()
            //     var urlConcat = "http://" + URLlink[d.Sketchnotes-1]
            //     var win = window.open(urlConcat, '_blank');
            //  })
             .on("mouseover", function(d) {	
                
                console.log(d)
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
                div.html(function(){return d.Description})	
                // div.html(function(){return d.Tasks})	
                    .style("position", "absolute")		
                    // .style("position", "absolute")		
                   .style("left", (BB.x + 10 + window.scrollX) + "px")		
                   .style("width", "300px")		
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


            //  
             var colorArray = [
    "#00ffff",
    "#f0ffff",
    "#f5f5dc",
    "#000000",
    "#0000ff",
    "#a52a2a",
    "#00ffff",
    "#00008b",
    "#008b8b",
    "#a9a9a9",
    "#006400",
    "#bdb76b",
    "#8b008b",
    "#556b2f",
    "#ff8c00",
    "#9932cc",
    "#8b0000",
    "#e9967a",
    "#9400d3",
    "#ff00ff",
    "#ffd700",
    "#008000",
    "#4b0082",
    "#f0e68c",
    "#add8e6",
    "#e0ffff",
    "#90ee90",
    "#d3d3d3",
    "#ffb6c1",
    "#ffffe0",
    "#00ff00",
    "#ff00ff",
    "#800000",
    "#000080",
    "#808000",
    "#ffa500",
    "#ffc0cb",
    "#800080",
    "#800080",
    "#ff0000",
    "#c0c0c0",
    "#ffffff",
    "#ffff00"]
            var color = d3.scaleOrdinal()
                .domain(dataDomain)
                .range(colorArray);

            // var color = d3.scaleOrdinal( d3.schemeCategory10 )
        g.append("rect")
             //  .attr("class", "bar")
              .attr("width", 80)
              .attr("height", 80)
              .attr('stroke', 'black')
              .attr("fill", 'white')//function(d) {return color(d.Tasks)})
              .attr('stroke-width', '0.1')
              
        g.append("text").text(function(d,i){
                 // return  "visualization/images/avatar.png";
                 // console.log(d)
                return d.Id
                
              })
              .style('font-size', '36px')
                 .attr('stroke', 'black')
                 .attr("dy", 55)
                 .attr("dx", 40)
                 .attr('text-anchor', 'middle')
             
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
        //   g.append("image")
        //      .attr('x', 0)
        //      .attr('y', 0)
        //      .attr('width', 80)
        //      .attr('height', 80)
        //      .attr('class', 'imageThumbnail')
        //      .attr("xlink:href", function(d,i){
        //         // return  "visualization/images/avatar.png";
        //         // return  "visualization/Viz/image ("+d.part+")Cropped.jpg";
        //         return  "images/miniatures/"+ d.idUser +".jpg";
        //      })
 
         
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
        return d
        // return d.replace(/ *\([^)]*\) */g, "").split('_')[2] + " #" + d.replace(/ *\([^)]*\) */g, "").split('_')[3];
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