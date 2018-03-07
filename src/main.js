var mapboxgl = require('mapbox-gl');
var scrollama = require('scrollama');

// MAP OPTIONS
var options = {
    container: "map",
    hash: true,
    style: './styles/style.json',
    zoom: 13,
    pitch: 0,
    bearing: 0,
    center: [92.1606, 21.2049],
    attributionControl: false
}

// INITIALIZE MAP
var map = new mapboxgl.Map(options);
map.addControl(new mapboxgl.AttributionControl(), "bottom-left");

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
  // map.addControl(new mapboxgl.NavigationControl(), 'top-left'); 
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

// map.setFilter("shelters", ["==", ["get", "OBJECTID"], 3220]);
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


// // // When the user moves their mouse over the states-fill layer, we'll update the filter in
// // the state-fills-hover layer to only show the matching state, thus making a hover effect.
// map.on("mousemove", "state-fills", function(e) {
//       map.setFilter("state-fills-hover", ["==", "name", e.features[0].properties.name]);
//   });

// // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
// map.on("mouseleave", "state-fills", function() {
//       map.setFilter("state-fills-hover", ["==", "name", ""]);
//   });



function handleStepEnter(callback){
  var current_step = callback.element.id;
  if (current_step != "step0"){
    var cam = locations.filter(function(a){
      return a.id == current_step
    });
    map.flyTo(cam[0].camera);
    map.setFilter("special_shelters", cam[0].filter);
  }
};

function handleStepExit(){
  console.log("exit")
  // var cam = locations.filter(function(a){
  //   return a.id == current_step
  // });
  // map.flyTo(cam[0].camera);
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
    "title":"step1",
    "description": "",
    "camera": {
      center: [92.1606, 21.2049],
      zoom: 13,
      pitch: 0,
      bearing: 0,
      speed: 0,
      curve: 0
    },
    "filter": ["==",  "Hub distance_sa-r8-dataset_all-attribute-2018-02-08_2_Don’t like taste", ""]
  },
  {
    "id":'step1',
    "title":"step1",
    "description": "I have a roof",
    "camera": {
      center: [92.1606, 21.2049],
      zoom: 16,
      pitch: 57,
      bearing: 0,
      speed: 0.4,
      curve: 3
    },
   "filter": ["==",  "Hub distance_sa-r8-dataset_all-attribute-2018-02-08_2_Don’t like taste", "Yes"]
  },
  {
    "id":'step2',
    "title":"step2",
    "description": "",
    "camera": {
      center: [92.1606, 21.2049],
      zoom: 16,
      pitch: 57,
      bearing: 0,
      speed: 0.4,
      curve: 3
    },
    "filter": ["==",  "Hub distance_sa-r8-dataset_all-attribute-2018-02-08_2_Don’t like taste", "No"]
  },
  {
    "id":'step3',
    "title":"step2",
    "description": "",
    "camera": {
      center: [92.1606, 21.2049],
      zoom: 16,
      pitch: 57,
      bearing: 0,
      speed: 0.4,
      curve: 3
    },
    "filter": ["==",  "Hub distance_sa-r8-dataset_all-attribute-2018-02-08_2_Don’t like taste", "No"]
  },
  {
    "id":'step4',
    "title":"step2",
    "description": "",
    "camera": {
      center: [92.1606, 21.2049],
      zoom: 20,
      pitch: 57,
      bearing: 0,
      speed: 0.4,
      curve: 3
    },
    "filter": ["==",  "Hub distance_sa-r8-dataset_all-attribute-2018-02-08_2_Don’t like taste", "No"]
  },
  {
    "id":'step5',
    "title":"step2",
    "description": "",
    "camera": {
      center: [92.1606, 21.2049],
      zoom: 10,
      pitch: 57,
      bearing: 0,
      speed: 0.4,
      curve: 3
    },
    "filter": ["==",  "Hub distance_sa-r8-dataset_all-attribute-2018-02-08_2_Don’t like taste", "No"]
  }
];