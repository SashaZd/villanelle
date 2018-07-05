/* /// <reference path="scripting.ts"/> */
import {
	addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
	getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
	isVariableNotSet, displayDescriptionAction, addUserAction, addUserInteractionTree, initialize,
	getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
	displayActionEffectText, areAdjacent, addUserActionTree, Agent, Item
} from "./scripting";
import {isUndefined} from "typescript-collections/dist/lib/util";

// 1. Define State

// Locations
var STORAGE = "STORAGE";
var DOCTORS_OFFICE = "DOCTORS OFFICE";
var ENGINES = "ENGINES";
var COCKPIT = "COCKPIT";
var ESCAPE_POD = "ESCAPE POD";
var TRANSPORT_ROOM = "TRANSPORT ROOM";
var MONITORING_ROOM = "MONITORING ROOM";
var MAIN_AREA = "MAIN AREA";
var FEM_BEDROOM = "FEM BEDROOM";
var MALE_BEDROOM = "MALE BEDROOM";
var BATHROOM = "BATHROOM";
var UNKNOWN = "UNKNOWN";

// Add Locations
addLocation(ENGINES, [STORAGE, MAIN_AREA]);
addLocation(STORAGE, [ENGINES, DOCTORS_OFFICE]);
addLocation(DOCTORS_OFFICE, [STORAGE, MAIN_AREA, COCKPIT, MONITORING_ROOM]);
addLocation(COCKPIT, [DOCTORS_OFFICE]);
addLocation(ESCAPE_POD, [MAIN_AREA]);
addLocation(TRANSPORT_ROOM, [MONITORING_ROOM, MAIN_AREA]);
addLocation(MONITORING_ROOM, [TRANSPORT_ROOM, DOCTORS_OFFICE]);
addLocation(MAIN_AREA, [ENGINES, STORAGE, DOCTORS_OFFICE, TRANSPORT_ROOM, ESCAPE_POD]);
addLocation(FEM_BEDROOM, [MAIN_AREA, BATHROOM]);
addLocation(MALE_BEDROOM, [MAIN_AREA, BATHROOM]);
addLocation(BATHROOM, [MAIN_AREA, FEM_BEDROOM, MALE_BEDROOM]);

// agents
var Caleb = addAgent("Caleb");
var Quinn = addAgent("Quinn");
var Mark = addAgent("Mark");
var Eddie = addAgent("Eddie");
var Beatrice = addAgent("Beatrice");

// items
var wires1 = addItem("wires1");
var wires2 = addItem("wires2");


wires1.setCurrentLocation(STORAGE);
wires1.setCurrentLocation(MONITORING_ROOM);

// setItemVariable(wires1, "currentLocation", STORAGE);
// setItemVariable(wires2, "currentLocation", MONITORING_ROOM);

var wiresCollected = setVariable("wiresCollected", 0);

// // variables
// setAgentVariable(Caleb, "currentLocation", COCKPIT);
Caleb.setCurrentLocation(COCKPIT);

// Maddie: Change all following for any agents
// setAgentVariable(Caleb, "currentLocation", COCKPIT); ======> TO
// Caleb.setCurrentLocation(COCKPIT);


//Quinn
setAgentVariable(Quinn, "currentLocation", DOCTORS_OFFICE);

//Mark
setAgentVariable(Mark, "currentLocation", TRANSPORT_ROOM);

//Eddie
setAgentVariable(Eddie, "currentLocation", STORAGE);

//Beatrice
setAgentVariable(Beatrice, "currentLocation", ENGINES);

// Player
var playerLocation = setVariable("playerLocation", MAIN_AREA);
var wiresCollected = setVariable("wiresCollected", 0);


// Knowledge for Caleb 
// Maddie: Change all following for any agengs
// setAgentVariable(Caleb, "lastSeen:wires1", UNKNOWN) ===> To 
// Caleb.setLastSawItemAtLocation(wires1, UNKNOWN);

Caleb.setLastSawItemAtLocation(wires1, UNKNOWN);

// setAgentVariable(Caleb, "lastSeen:wires1", UNKNOWN)
setAgentVariable(Caleb, "lastSeen:wires2", UNKNOWN)
setAgentVariable(Caleb, "lastSeen:player", UNKNOWN)

// Maddie: Change all the following for any items: 
// getItemVariable(wires1, "currentLocation") ===> To
// someItem.currentLocation


// Maddie: Change all the following for any agents: 
// getAgentVariable(Caleb, "currentLocation") ===> To
// Caleb.currentLocation




// // 2. Define BTs
// // create ground actions

// Todo from here
// function function_name(argument) {
// 	// body...
// }

let setRandNumber = action(
	() => true,
	() => setVariable("randNumber", 
			getRandNumber(1, 11)),
			0
);

// function chooseDestinationForAgent(agent, destinationNumber=getVariable("randNumber")) {
// 	// body...
// }



// Sasha Todo: Work on using the Agent/Item types for destinations
let chooseENGINES = action(() => getVariable("randNumber") == 1, () => setVariable("destination", ENGINES), 0);
let chooseSTORAGE = action(() => getVariable("randNumber") == 2, () => setVariable("destination", STORAGE), 0);
let chooseDOCTORS_OFFICE = action(() => getVariable("randNumber") == 3, () => setVariable("destination", DOCTORS_OFFICE), 0);
let chooseCOCKPIT = action(() => getVariable("randNumber") == 4, () => setVariable("destination", COCKPIT), 0);
let chooseESCAPE_POD = action(() => getVariable("randNumber") == 5, () => setVariable("destination", ESCAPE_POD), 0);
let chooseTRANSPORT_ROOM = action(() => getVariable("randNumber") == 6, () => setVariable("destination", TRANSPORT_ROOM), 0);
let chooseMONITORING_ROOM = action(() => getVariable("randNumber") == 7, () => setVariable("destination", MONITORING_ROOM), 0);
let chooseMAIN_AREA = action(() => getVariable("randNumber") == 8, () => setVariable("destination", MAIN_AREA), 0);
let chooseFEM_BEDROOM = action(() => getVariable("randNumber") == 9, () => setVariable("destination", FEM_BEDROOM), 0);
let chooseMALE_BEDROOM = action(() => getVariable("randNumber") == 10, () => setVariable("destination", MALE_BEDROOM), 0);
let chooseBATHROOM = action(() => getVariable("randNumber") == 11, () => setVariable("destination", BATHROOM), 0);



let atDestinationAgent = function(agentName){
	return () => getAgentVariable(agentName, "destination") == getAgentVariable(agentName, "currentLocation");
}


let atDestinationCaleb: Precondition = atDestinationAgent(Caleb)
let setDestinationCalebPrecond: Precondition = () => isVariableNotSet("destination") || atDestinationCaleb();

// // create behavior trees
let setNextDestination = sequence([
	setRandNumber,
	selector([
		chooseENGINES,
		chooseCOCKPIT,
		chooseSTORAGE,
		chooseDOCTORS_OFFICE,
		chooseBATHROOM,
		chooseMALE_BEDROOM,
		chooseFEM_BEDROOM,
		chooseMAIN_AREA,
		chooseMONITORING_ROOM,
		chooseTRANSPORT_ROOM,
		chooseESCAPE_POD
			   
	])
]);

let gotoNextLocationAgent = function(agentName){
	return  action(
		() => true,
		() => {
			setAgentVariable(agentName, "currentLocation", getNextLocation(getAgentVariable(agentName, "currentLocation"), getVariable("destination")));
			console.log(agentName + " is at: " + getAgentVariable(agentName, "currentLocation"));
			// console.log("Hello: " + getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"));
		},
		0
	);
}


let gotoNextLocationCaleb = gotoNextLocationAgent(Caleb);
let gotoNextLocationQuinn = gotoNextLocationAgent(Quinn);
let gotoNextLocationMark = gotoNextLocationAgent(Mark);
let gotoNextLocationEddie = gotoNextLocationAgent(Eddie);
let gotoNextLocationBeatrice = gotoNextLocationAgent(Beatrice);


let lastSeenByAgent = function(agent){
	return sequence([
		selector([
			action(
					//precondition
					() => agent.currentLocation == wires1.currentLocation,
					// () => getAgentVariable(agent, 'currentLocation') == getItemVariable(wires1, "currentLocation"),
					//effect
					() => {
						console.log(agent + " sees - Item: wires1 | Location: "+ agent.currentLocation);
						// console.log(agentName + " sees - Item: wires1 | Location: "+ getAgentVariable(agentName, 'currentLocation'));
						// setAgentVariable(agentName, "lastSeen:wires1",  getAgentVariable(agentName, 'currentLocation'))
						agent.setLastSawItemAtLocation(wires1, agent.currentLocation);
					},
					//time taken
					0
				),
			action(() => true, () => {},0)
		]),
		selector([
			action(
					//precondition
					() => agent.currentLocation == wires2.currentLocation,
					// () => getAgentVariable(agentName, 'currentLocation') == getItemVariable(wires2, "currentLocation"),
					//effect
					() => {
						console.log(agent + " sees - Item: wires2 | Location: "+ agent.currentLocation);
						// console.log(agentName + "sees - Item: wires2 | Location: "+getAgentVariable(agentName, 'currentLocation'));
						agent.setLastSawItemAtLocation(wires2, agent.currentLocation);
						// setAgentVariable(agentName, "lastSeen:wires2",  getAgentVariable(agentName, 'currentLocation'))
					},
					//time taken
					0
				),
			action(() => true, () => {},0)
		]),
		selector([
			action(
					//precondition
					() => agent.currentLocation  == getVariable("playerLocation"),
					// () => getAgentVariable(agentName, 'currentLocation') == getVariable("playerLocation"),
					//effect
					() => {
						console.log(agent + " sees - Person: Player | Location: "+ agent.currentLocation);
						// console.log(agentName + "sees - Person: Player | Location: "+getAgentVariable(agentName, 'currentLocation'));
						// agent.setLastSawItemAtLocation(wires1, agent.currentLocation);
						agent.setLastSawPersonAtLocation('player', agent.currentLocation);
						// setAgentVariable(agentName, "lastSeen:player",  getAgentVariable(agentName, 'currentLocation'))
					},
					//time taken
					0
				),
			action(() => true, () => {},0)
		])
	]);
};



let lastSeenByCaleb = lastSeenByAgent(Caleb)
let lastSeenByQuinn = lastSeenByAgent(Quinn)
let lastSeenByMark = lastSeenByAgent(Mark)
let lastSeenByEddie = lastSeenByAgent(Eddie)
let lastSeenByBeatrice = lastSeenByAgent(Beatrice)


// let findItem = action(
//     () => getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"),
//     () => {
//         console.log("Caleb found - Item: wires1")


//         // console.log("hello");
//         // console.log(getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"));
//         // displayDescriptionAction("Caleb found the wires1.")
//     }, 
//     0
// );

// let eatPlayer = action(() => getAgentVariable(Caleb, "currentLocation") == getVariable(playerLocation),
//     () => {
//         setVariable("endGame", "lose");
//         setVariable(playerLocation, "NA");
//     }, 0
// );

//this mess
// let conversation = action(() => getAgentVariable(Caleb, "currentLocation") == getVariable(playerLocation),
//     () => {
//             displayDescriptionAction("You happen to run into Caleb."),
//             displayDescriptionAction("Caleb: Have you not found the wires yet? Did you not check storage?"),
//     },
// );

// let search = selector([
//     findItem,
//     sequence([
//         selector([
//             guard(setDestinationPrecond, {}, setNextDestination),
//             action(() => true, () => {
//             }, {}, 0)
//         ]),
//         gotoNextLocation,
//         findItem
//     ])
// ]);

let search = sequence([
		selector([
			guard(setDestinationCalebPrecond, setNextDestination),
			action(() => true, () => {
			},0)
		]),
		gotoNextLocationCaleb,
	]);


// let search = sequence([
//         selector([
//             guard(setDestinationPrecond, setNextDestination),
//             action(() => true, () => {
//             },0)
//         ]),
//         gotoNextLocation,
//     ]);

let CalebBT = sequence([
	lastSeenByCaleb,
	sequence([
		search, lastSeenByCaleb
	])
]);

let QuinnBT = sequence([
	lastSeenByQuinn,
	sequence([
		search, lastSeenByQuinn
	])
]);

let MarkBT = sequence([
	lastSeenByMark,
	sequence([
		search, lastSeenByMark
	])
]);

let EddieBT = sequence([
	lastSeenByEddie,
	sequence([
		search, lastSeenByEddie
	])
]);

let BeatriceBT = sequence([
	lastSeenByBeatrice,
	sequence([
		search, lastSeenByBeatrice
	])
]);

// //attach behaviour trees to agents
attachTreeToAgent(Caleb, CalebBT);
attachTreeToAgent(Quinn, QuinnBT);
attachTreeToAgent(Mark, MarkBT);
attachTreeToAgent(Eddie, EddieBT);
attachTreeToAgent(Beatrice, BeatriceBT);

// // 3. Construct story
// // create user actions

var startStateBT = guard(() => getVariable(playerLocation) == MAIN_AREA,
	sequence([
			displayDescriptionAction("You enter the ship's main area."),
			addUserAction("Go forward to enter the engine room.", () => setVariable(playerLocation, ENGINES)),
			addUserAction("Go east to enter the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
			addUserAction("Go west to enter the females' bedroom.", () => setVariable(playerLocation, FEM_BEDROOM)),
			addUserAction("Go west to enter the bathroom.", () => setVariable(playerLocation, BATHROOM)),
			addUserAction("Go west to enter the males' bedroom.", () => setVariable(playerLocation, MALE_BEDROOM)),
			addUserAction("Go south to enter the escape pod.", () => setVariable(playerLocation, ESCAPE_POD)),
			addUserAction("Go into the transport room.", () => setVariable(playerLocation, TRANSPORT_ROOM)),
		]
	));
addUserInteractionTree(startStateBT);
var bcStateBT = guard(() => getVariable(playerLocation) == ENGINES,
	sequence([
			displayDescriptionAction("You enter the engine room."),
			addUserAction("Head east into the storage room.", () => setVariable(playerLocation, STORAGE)),
			addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
		]
	));
addUserInteractionTree(bcStateBT);
var brStateBT = guard(() => getVariable(playerLocation) == STORAGE,
	sequence([
			displayDescriptionAction("You moved into the storage room."),
			addUserAction("Enter the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
			addUserAction("Move back into the engine room.", () => setVariable(playerLocation, ENGINES)),
		]
	));
addUserInteractionTree(brStateBT);
var quarters1BT = guard(() => getVariable(playerLocation) == DOCTORS_OFFICE,
	sequence([
			displayDescriptionAction("You enter the doctor's office."),
			addUserAction("Return to the storage room.", () => setVariable(playerLocation, STORAGE)),
			addUserAction("Move into the cockpit.", () => setVariable(playerLocation, COCKPIT)),
			addUserAction("Go to the monitoring room.", () => setVariable(playerLocation, MONITORING_ROOM)),
			addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
		]
	));
addUserInteractionTree(quarters1BT);
var mrStateBT = guard(() => getVariable(playerLocation) == COCKPIT,
	sequence([
			displayDescriptionAction("You move forward into the cockpit."),
			addUserAction("Return to the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
		]
	));
addUserInteractionTree(mrStateBT);
var quarters2BT = guard(() => getVariable(playerLocation) == MONITORING_ROOM,
	sequence([
			displayDescriptionAction("You enter the monitoring room."),
			addUserAction("Return to the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
			addUserAction("Go to the transport room.", () => setVariable(playerLocation, TRANSPORT_ROOM)),
		]
	));
addUserInteractionTree(quarters2BT);
var medicalBT = guard(() => getVariable(playerLocation) == TRANSPORT_ROOM,
	sequence([
			displayDescriptionAction("You enter the transport room where the teleporter is located."),
			addUserAction("Exit to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
			addUserAction("Return to the monitoring room.", () => setVariable(playerLocation, MONITORING_ROOM)),
		]
	));
addUserInteractionTree(medicalBT);
var labBT = guard(() => getVariable(playerLocation) == ESCAPE_POD,
	sequence([
			displayDescriptionAction("You enter the escape pod."),
			addUserAction("Exit into the main area.", () => setVariable(playerLocation, MAIN_AREA)),
		]
	));
addUserInteractionTree(labBT);
var trStateBT = guard(() => getVariable(playerLocation) == FEM_BEDROOM,
	sequence([
			displayDescriptionAction("You move into the females' bedroom."),
			addUserAction("Move south to the bathroom.", () => setVariable(playerLocation, BATHROOM)),
			addUserAction("Exit into the main room.", () => setVariable(playerLocation, MAIN_AREA)),
		]
	));
addUserInteractionTree(trStateBT);
var tcStateBT = guard(() => getVariable(playerLocation) == BATHROOM,
	sequence([
			displayDescriptionAction("You move into the bathroom."),
			addUserAction("Move south into the males' bedroom.", () => setVariable(playerLocation, MALE_BEDROOM)),
			addUserAction("Enter the main area.", () => setVariable(playerLocation, MAIN_AREA)),
			addUserAction("Move north into the females' bedroom.", () => setVariable(playerLocation, FEM_BEDROOM)),
		]
	));
addUserInteractionTree(tcStateBT);

var tlStateBT = guard(() => getVariable(playerLocation) == MALE_BEDROOM,
	sequence([
			displayDescriptionAction("You move into the males' bedroom."),
			addUserAction("Enter the bathroom.", () => setVariable(playerLocation, BATHROOM)),
			addUserAction("Enter the main area.", () => setVariable(playerLocation, MAIN_AREA)),
		]
	));
addUserInteractionTree(tlStateBT);

var wires1BT = guard(() => getVariable(playerLocation) == getItemVariable(wires1, "currentLocation"),
	sequence([
			displayDescriptionAction("You notice wires on the ground."),
			addUserActionTree("Pick up the wires.",
				sequence([
					action(()=>true, () => {
					displayActionEffectText("You pick up the wires.");
					setItemVariable(wires1, "currentLocation", "player");
					setVariable(wiresCollected, getVariable(wiresCollected) + 1);
				}, 0),
					// action(()=>true, () => {
					//     displayActionEffectText("Wow you know how to pick up things.")}, 0)
				])
			)
		]
	));
addUserInteractionTree(wires1BT);

var wires2BT = guard(() => getVariable(playerLocation) == getItemVariable(wires2, "currentLocation"),
	sequence([
			displayDescriptionAction("You notice wires on the ground."),
			addUserAction("Pick up the wires.", () => {
				displayActionEffectText("You pick up the wires.");
				setItemVariable(wires2, "currentLocation", "player");
				setVariable(wiresCollected, getVariable(wiresCollected) + 1);
			})
		]
	));
addUserInteractionTree(wires2BT);


// //4. Run the world
initialize();
var userInteractionObject = getUserInteractionObject();

// //RENDERING-----
var displayPanel = {x: 500, y: 0};
var textPanel = {x: 500, y: 501};
var actionsPanel = {x: 520, y: 550};

var canvas = <HTMLCanvasElement> document.getElementById('display');
var context = canvas.getContext('2d');

var spaceshipImage = new Image();
spaceshipImage.onload = render;
var playerImage = new Image();
var calebImage = new Image();
var quinnImage = new Image();
var markImage = new Image();
var eddieImage = new Image();
var beatriceImage = new Image();

function render() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 500);
	displayPlayer();
	displayCaleb();
	displayQuinn();
	displayMark();
	displayEddie();
	displayBeatrice();
	displayTextAndActions();
}

var mapPositions = {
	"ENGINES": {x: 115, y: 133},
	"COCKPIT": {x: 393, y: 238},
	"STORAGE": {x: 260, y: 147},
	"DOCTORS OFFICE": {x: 302, y: 250},
	"MAIN AREA": {x: 165, y: 250},
	"ESCAPE POD": {x: 102, y: 357},
	"TRANSPORT ROOM": {x: 228, y: 343},
	"MONITORING ROOM": {x: 308, y: 320},
	"BATHROOM": {x: 24, y: 245},
	"MALE BEDROOM": {x: 24, y: 325},
	"FEM BEDROOM": {x: 24, y: 170}
};

function displayPlayer() {
	var currLocation = getVariable(playerLocation);
	if (!isUndefined(mapPositions[currLocation]))
		context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 30, 30);
}

function displayCaleb() {
	var currLocation = getAgentVariable(Caleb, "currentLocation");
	context.drawImage(calebImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 30, 30);
}

function displayQuinn() {
	var currLocation = getAgentVariable(Quinn, "currentLocation");
	context.drawImage(quinnImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 25, 25);
}

function displayMark() {
	var currLocation = getAgentVariable(Mark, "currentLocation");
	context.drawImage(markImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 30, 30);
}

function displayEddie() {
	var currLocation = getAgentVariable(Eddie, "currentLocation");
	context.drawImage(eddieImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 30, 30);
}

function displayBeatrice() {
	var currLocation = getAgentVariable(Beatrice, "currentLocation");
	context.drawImage(beatriceImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 30, 30);
}

spaceshipImage.src = "../images/finalized_ship_map_digi.png";
playerImage.src = "../images/Taylor.png";
calebImage.src = "../images/Caleb.png";
quinnImage.src = "../images/Quinn.png";
markImage.src = "../images/Mark.png";
eddieImage.src = "../images/Eddie.png";
beatriceImage.src = "../images/Beatrice.png";

var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 25;

function displayTextAndActions() {
	context.clearRect(textPanel.x, textPanel.y, 500, 1000);
	yOffset = actionsPanel.y + 25;

	context.font = "15pt Calibri";
	context.fillStyle = 'pink';
	console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
	var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? userInteractionObject.actionEffectsText : userInteractionObject.text;
	context.fillText(textToDisplay, textPanel.x, textPanel.y + 20);

	context.font = "15pt Calibri";
	context.fillStyle = 'white';
	for (var i = 0; i < userInteractionObject.userActionsText.length; i++) {
		var userActionText = userInteractionObject.userActionsText[i];
		context.fillText(userActionText, actionsPanel.x + 20, yOffset);
		if (i == 0) {
			currentSelection = i;
		}
		yOffset += yOffsetIncrement;
	}

	displayArrow();
	console.log("wires: " + getVariable(wiresCollected));
}

function displayArrow() {
	if(userInteractionObject.userActionsText.length != 0){
		context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
		context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
	}
}

//User input
function keyPress(e) {
	if (e.keyCode == 13) {
		var selectedAction = userInteractionObject.userActionsText[currentSelection];
		if(!isUndefined(selectedAction)){
			executeUserAction(selectedAction);
			worldTick();
			render();
		}
	}
}

function keyDown(e) {
	if (e.keyCode == 40) {//down
		if (userInteractionObject.userActionsText.length != 0) {
			currentSelection++;
			currentSelection = currentSelection % userInteractionObject.userActionsText.length;
			displayArrow();
		}
	} else if (e.keyCode == 38) {//up
		if (userInteractionObject.userActionsText.length != 0) {
			currentSelection--;
			if (currentSelection < 0)
				currentSelection = userInteractionObject.userActionsText.length - 1;
			displayArrow();
		}
	}
}

document.addEventListener("keypress", keyPress, false);
document.addEventListener("keydown", keyDown, false);