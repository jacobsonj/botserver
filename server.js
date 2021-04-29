var bodyParser = require('body-parser');
const { request } = require('express');
const express = require('express');
const app = new express();
let robotsPositions = {};
let robotsStates = {}
let mapStates = []
let selectedState = {}
let scene = {}
let logRequestPosition = (req, res) => {
   // console.log(JSON.stringify(req.body));
   robotsPositions[req.body.name] = req.body;
   res.send('GOOD');
};

//this refers to player states
let logRequestState = (req, res) => {
   // console.log(JSON.stringify(req.body));
   robotsStates[req.body.name] = req.body;
   res.send('GOOD');
};

//this refers to item states
let saveMapStates = (req, res) => {
   // console.log(JSON.stringify(req.body));
   let found = false;
   for(let i in mapStates){
      if(mapStates[i].name == req.body.name){
         mapStates[i] = req.body;
         found = true;
      }
   }
   if(!found){
      mapStates.push(req.body);
   }
   res.send('GOOD');
};

//this refers to selected in the hero select screen
let logRequestSelected = (req, res) => {
   // console.log(JSON.stringify(req.body));
   selectedState[req.body.name] = req.body;
   res.send('GOOD');
};

//this refers to changing the scene
let logRequestScene = (req, res) => {
   console.log(JSON.stringify(req.body));
   scene[req.body.name] = req.body;
   res.send('GOOD');
};
// let logRequest = (req, res) => {
//    console.log(JSON.stringify(req.body));
//    robots["name"] = req.body.name 
//    robots["position"]= req.body.position;
//    res.send('GOOD');
// };
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use( logRequest);
app.post("/position/save", logRequestPosition);
app.post("/positions", (req, res) => {
   console.log(robotsPositions);
   res.send(robotsPositions);
});

app.post("/state/save", logRequestState);
app.post("/states", (req, res) => {
   console.log(robotsStates);
   res.send(robotsStates);
});

app.post("/mapstate/save", saveMapStates);
app.post("/mapstates", (req, res) => {
   console.log(mapStates);
   res.send({mapStates});
});

app.post("/selectedstate/save", logRequestSelected);
app.post("/selectedstates", (req, res) => {
   console.log(selectedState);
   res.send(selectedState);
});

app.post("/scene/save", logRequestScene);
app.post("/scene", (req, res) => {
   console.log(scene);
   res.send(scene);
});
app.post("/positions/gears", (req, res) => {
   res.send(robots["Gears"]);
});
app.post("/positions/node", (req, res) => {
   console.log(robotsPositions["Node"]);
   res.send(robotsPositions["Node"]);
});
// app.post('*', logRequest);
app.listen(7000);