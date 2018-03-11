// var mapboxgl = require('mapbox-gl');
var scrollama = require('scrollama');
var d3 = require('d3');


// MAP OPTIONS
var options = {
    container: "map",
    hash: true,
    style: './styles/style.json',
    zoom: 18,
    pitch: 0,
    bearing: 0,
    center:[92.1549082, 21.2030048],
    attributionControl: false
  }


// INITIALIZE MAP
var map = new mapboxgl.Map(options);
// map.addControl(new mapboxgl.AttributionControl(), "bottom-left");

// MOBILE 
document.addEventListener('touchmove', function(event) {
     event.preventDefault();
}, false);

// NO CONTROLS WHEN PHONE!
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.getElementById('search_bar').style.left = '10px';
  // MAP TOUCH EVENT
  map.touchZoomRotate.enable();
  map.touchZoomRotate.enable({ around: 'center' });
  map.touchZoomRotate.enableRotation();
} else { 
  map.addControl(new mapboxgl.NavigationControl(), 'top-left'); 
  // MAP MOUSE EVENT
  map.scrollZoom.enable();
  map.scrollZoom.enable({ around: 'center' })
  map.dragPan.enable();
  map.dragRotate.enable();
  map.doubleClickZoom.enable();
};


// Debugging mode:
// map.showTileBoundaries = true;
// map.showCollisionBoxes = true;
// map.repaint = false;

// Loader to check if style is loaded or not:
function isloaded(){
   var id = setInterval(frame, 40);
    function frame() {
       if (map.isStyleLoaded()){
        document.getElementById("loader").style.display = "none";
        document.getElementById("down-button").style.display = "block";
        // document.body.style.overflow = 'scroll';
      }else{
        document.getElementById("loader").style.display = "block";
        document.getElementById("down-button").style.display = "none";
        // document.body.style.overflow = 'hidden';
      }
    }
};
isloaded();

// 

var current_step_id = "step";
console.log('first: '+ current_step_id)

function handleStepEnter(callback){
  current_step_id = callback.element.id;
  console.log(current_step_id);
  if (current_step_id != "step"){
    var current_step = locations.filter(function(a){
      return a.id == current_step_id
    });
    console.log(current_step);  
    if(current_step.length > 0){
      map.flyTo(current_step[0].camera);
      map.setFilter("one_shelter", current_step[0].filter1);
      document.getElementById(current_step_id + '_table').addEventListener('mouseover', setstijl);
      document.getElementById(current_step_id + '_table').addEventListener('mouseleave', resetstijl);
    }
  }
};

function setstijl(current_step){
  console.log("mouseover");
  d3.selectAll('.red').style('background-color',  "rgba(255,0,0,1)");
    var current_steps = locations.filter(function(a){
      return a.id == current_step_id
    });
   map.setFilter("special_shelters", current_steps[0].filter2);
   map.setFilter("special_shelters_blur", current_steps[0].filter2);

};

function resetstijl(current_step){
  console.log("mouse leave")
  d3.selectAll('.red').style('background-color',  "rgba(255,0,0,0)");
  map.setFilter("special_shelters", ["==","",""]);
  map.setFilter("special_shelters_blur", ["==","",""]);
};


function handleStepExit(){
  console.log("exit")
};


// // instantiate the scrollama
var scroller = scrollama();

// setup the instance, pass callback functions
scroller
  .setup({
    step: '.step' // required - class name of trigger steps
  })
  .onStepEnter(handleStepEnter);


// Making a slide show
var locations = [
   {
    "id":'step0',
    "title":"toothbrush",
    "camera": {
      center: [92.15227552, 21.20650911],
      zoom: 20,
      pitch: 60,
      bearing: 0,
      speed: 0.25,
      curve: 1
    },
    "filter1": ["==",  "id", "555317976"],
    "filter2": ["==",  "toothbrush", "No"]
  },
   {
    "id":'step1',
    "title":"bed",
    "camera": {
      center: [92.15973847, 21.19958164],
      zoom: 19,
      pitch: 60,
      bearing: 0,
      speed: 0.25,
      curve: 1
    },
    "filter1": ["==",  "id", "556763135"],
    "filter2": ["==",  "bed", "No"]
  },
  {
    "id":'step2',
    "title":"toilet",
    "camera": {
      center: [92.1541534, 21.2006622],
      zoom: 18,
      pitch: 50,
      bearing: 0,
      speed: 0.25,
      curve: 1
    },
    "filter1": ["==",  "id", "542251998"],
    "filter2": ["in",  "latrine","About half of people", "Some people", "No-one or almost no-one"]
  },
  {
    "id":'step3',
    "title":"water",
    "camera": {
      center: [92.1597177, 21.1996155],
      zoom: 17,
      pitch: 40,
      bearing: 0,
      speed: 0.25,
      curve: 1
    },
    "filter1": ["==",  "id", "556763135"],
    "filter2": ["in", "water_access", "About half of people", "Some people", "No-one or almost no-one"]
  },
  {
    "id":'step4',
    "title":"water taste",
    "camera": {
      center: [92.1514176, 21.1908583],
      zoom: 16,
      pitch: 30,
      bearing: 0,
      speed: 0.25,
      curve: 1
    },
    "filter1": ["==",  "id", "558087852"],
    "filter2": ["==",  "taste", "No"]
  },
  {
    "id":'step5',
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
    "id":'step6',
    "title":"safety",
    "description": "",
    "camera": {
      center: [92.15, 21.19],
      zoom: 15,
      pitch: 10,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==", "id", "555015664"],
    "filter2": ["in", "safety","Fear of Break-in", "Location of the shelter exposed to landslide, wild animals, flood","No adequate lighting","No locks","Sharing space with strangers","Unstable structure"]
  },
  {
    "id":'step7',
    "title":"Facebook",
    "camera": {
      center: [92.1549082, 21.2030048],
      zoom: 14,
      pitch: 0,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "555015664"],
    "filter2": ["==",  "facebook", "No"]
  },
  {
    "id":'step8',
    "title":"official",
    "camera": {
      center: [92.154, 21.203],
      zoom: 13,
      pitch: 0,
      bearing: 0,
      speed: 0.3,
      curve: 1
    },
    "filter1": ["==",  "id", "555015664"],
    "filter2": ["==",  "registered", "No"]
  }
];