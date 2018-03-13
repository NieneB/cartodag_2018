var mapboxgl = require('mapbox-gl');
var d3 = require('d3');
var bootstrap = require('bootstrap');
var $ = require('jquery');
var ScrollMagic = require('scrollmagic');

// MAP OPTIONS
var options = {
    container: "map",
    hash: false,
    style: './styles/style.json',
    zoom: 18,
    pitch: 0,
    bearing: 0,
    center:[92.1549082, 21.2030048],
    attributionControl: false
  }


// INITIALIZE MAP
var map = new mapboxgl.Map(options);

// Loader to check if style is loaded or not:
var loader = d3.selectAll('.loader')
function isloaded(){
   var id = setInterval(frame, 50);
    function frame() {
       if (map.isStyleLoaded()){
        loader.style("display","none");
        document.getElementById("down-button").style.display = "block";
      }else{
        loader.style("display", "block");
        document.getElementById("down-button").style.display = "none";
      }
    }
};
isloaded();

// Callback ScrollMagic
var current_step_id = "step";
function handleStepEnter(callback){
  // loader.style("display", "block");
  current_step_id = callback;
  if (current_step_id != "row"){
    var current_step = locations.filter(function(a){
      return a.id == current_step_id
    });
    if(current_step.length > 0){
      map.flyTo(current_step[0].camera);
      map.setFilter("one_shelter", current_step[0].filter1);
      document.getElementById(current_step_id + '_table').addEventListener('mouseover', setstijl);
      document.getElementById(current_step_id + '_table').addEventListener('mouseleave', resetstijl);
    }
  }
};
// Set Stijl filters
function setstijl(current_step){
  d3.selectAll('.red').style('background-color',  "rgba(255,0,0,1)");
    var current_steps = locations.filter(function(a){
      return a.id == current_step_id
    });
   map.setFilter("special_shelters", current_steps[0].filter2);
   map.setFilter("special_shelters_blur", current_steps[0].filter2);

};
// RESET stijl filters
function resetstijl(current_step){
  d3.selectAll('.red').style('background-color',  "rgba(255,0,0,0)");
  map.setFilter("special_shelters", ["==","",""]);
  map.setFilter("special_shelters_blur", ["==","",""]);
};

function InitialMap(){
  console.log("reset");
  map.flyTo({
      center: [92.1549082, 21.2030048],
      zoom: 18,
      pitch: 0,
      bearing: 0,
      speed: 0.3,
      curve: 1
    })
};

// Making a slide show
var locations = [
   {
    "id":'row0',
    "title":"toothbrush",
    "camera": {
      center: [92.15227552, 21.20650911],
      zoom: 20,
      pitch: 60,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "555317976"],
    "filter2": ["==",  "toothbrush", "No"]
  },
   {
    "id":'row1',
    "title":"bed",
    "camera": {
      center: [92.15973847, 21.19958164],
      zoom: 19,
      pitch: 60,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "556763135"],
    "filter2": ["==",  "bed", "No"]
  },
  {
    "id":'row2',
    "title":"toilet",
    "camera": {
      center: [92.1541534, 21.2006622],
      zoom: 18,
      pitch: 50,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "542251998"],
    "filter2": ["in",  "latrine","About half of people", "Some people", "No-one or almost no-one"]
  },
  {
    "id":'row3',
    "title":"water",
    "camera": {
      center: [92.1597177, 21.1996155],
      zoom: 17,
      pitch: 40,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "556763135"],
    "filter2": ["in", "water_access", "About half of people", "Some people", "No-one or almost no-one"]
  },
  {
    "id":'row4',
    "title":"water taste",
    "camera": {
      center: [92.1514176, 21.1908583],
      zoom: 16,
      pitch: 30,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "558087852"],
    "filter2": ["==",  "taste", "No"]
  },
  {
    "id":'row5',
    "title":"settlement material",
    "camera": {
      center: [92.16339871, 21.21227861],
      zoom: 15.5,
      pitch: 20,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "561617603"],
   "filter2": ["!=",  "shelter_type", "Kutcha - temporary: walls  made of mud/ brick or woven bamboo, roof made of sun-grass/tarps/wood"]
  },
   {
    "id":'row6',
    "title":"safety",
    "description": "",
    "camera": {
      center: [92.1549082, 21.2030048],
      zoom: 15,
      pitch: 10,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==", "id", ""],
    "filter2": ["in", "safety","Fear of Break-in", "Location of the shelter exposed to landslide, wild animals, flood","No adequate lighting","No locks","Sharing space with strangers","Unstable structure"]
  },
  {
    "id":'row7',
    "title":"Facebook",
    "camera": {
      center: [92.1549082, 21.2030048],
      zoom: 14,
      pitch: 0,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", ""],
    "filter2": ["==",  "facebook", "No"]
  },
  {
    "id":'row8',
    "title":"official",
    "camera": {
      center: [92.1549, 21.2030],
      zoom: 13,
      pitch: 0,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", ""],
    "filter2": ["==",  "registered", "No"]
  }
];


// SCROLLMAGIC for horizontal/vertical scrolling
function initScrollMagic(){
  var controller = new ScrollMagic.Controller();
  
  new ScrollMagic.Scene({
        triggerElement: "#top",
        triggerHook: 0,
        offset: 20
      })
      .on("leave", function(){
        InitialMap()} )
      .addTo(controller);

  new ScrollMagic.Scene({
        triggerElement: "#row0",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

  new ScrollMagic.Scene({
        triggerElement: "#row1",
        triggerHook: "onCenter",
      })
    .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

  new ScrollMagic.Scene({
        triggerElement: "#row2",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

  new ScrollMagic.Scene({
        triggerElement: "#row3",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#row4",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#row5",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#row6",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#row7",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);

    new ScrollMagic.Scene({
        triggerElement: "#row8",
        triggerHook: "onCenter",
      })
      .on("start", function(){
        handleStepEnter(this.triggerElement().id)
      })
      .addTo(controller);
};

document.addEventListener("DOMContentLoaded", function(event) { 
  initScrollMagic();
});
