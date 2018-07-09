/* /// <reference path="scripting.ts"/> */
import {
	addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
	getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
	isVariableNotSet, displayDescriptionAction, addUserAction, addUserInteractionTree, initialize,
	getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
	displayActionEffectText, areAdjacent, addUserActionTree, Agent
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
wires2.setCurrentLocation(MONITORING_ROOM);

// setItemVariable(wires1, "currentLocation", STORAGE);
// setItemVariable(wires2, "currentLocation", MONITORING_ROOM);

var wiresCollected = setVariable("wiresCollected", 0);

// // variables
//Caleb
// setAgentVariable(Caleb, "currentLocation", COCKPIT);
Caleb.setCurrentLocation(COCKPIT);

//Quinn
// setAgentVariable(Quinn, "currentLocation", DOCTORS_OFFICE);
Quinn.setCurrentLocation(DOCTORS_OFFICE);

//Mark
// setAgentVariable(Mark, "currentLocation", TRANSPORT_ROOM);
Mark.setCurrentLocation(TRANSPORT_ROOM);

//Eddie
// setAgentVariable(Eddie, "currentLocation", STORAGE);
Eddie.setCurrentLocation(STORAGE);

//Beatrice
// setAgentVariable(Beatrice, "currentLocation", ENGINES);
Beatrice.setCurrentLocation(ENGINES);

// Player
var playerLocation = setVariable("playerLocation", MAIN_AREA);
var wiresCollected = setVariable("wiresCollected", 0);


// Knowledge 
Caleb.setLastSawItemAtLocation(wires1, UNKNOWN);
Quinn.setLastSawItemAtLocation(wires1, UNKNOWN);
Mark.setLastSawItemAtLocation(wires1, UNKNOWN);
Eddie.setLastSawItemAtLocation(wires1, UNKNOWN);
Beatrice.setLastSawItemAtLocation(wires1, UNKNOWN);

// setAgentVariable(Caleb, "lastSeen:wires1", UNKNOWN)
// setAgentVariable(Caleb, "lastSeen:wires2", UNKNOWN)
// setAgentVariable(Caleb, "lastSeen:player", UNKNOWN)

Caleb.setLastSawItemAtLocation(wires2, UNKNOWN);
// Caleb.setLastSawPersonAtLocation(player, UNKNOWN);
Quinn.setLastSawItemAtLocation(wires2, UNKNOWN);
// Quinn.setLastSawPersonAtLocation(player, UNKNOWN);
Mark.setLastSawItemAtLocation(wires2, UNKNOWN);
// Mark.setLastSawPersonAtLocation(player, UNKNOWN);
Eddie.setLastSawItemAtLocation(wires2, UNKNOWN);
// Eddie.setLastSawPersonAtLocation(player, UNKNOWN);
Beatrice.setLastSawItemAtLocation(wires2, UNKNOWN);
// Beatrice.setLastSawPersonAtLocation(player, UNKNOWN);


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


function setNextDestinationForAgent(agent: Agent, destination: string = "UNKNOWN") {

	if(destination == "UNKNOWN"){
		let setRandNumber = action(
			() => true,
			() => agent.randNumber = getRandNumber(1, 11),
			0
		);

		// Sasha Todo: Work on using the Agent/Item types for destinations
		let chooseENGINES = action(() => agent.randNumber == 1, () => agent.destination = ENGINES, 0);
		let chooseSTORAGE = action(() => agent.randNumber == 2, () => agent.destination = STORAGE, 0);
		let chooseDOCTORS_OFFICE = action(() => agent.randNumber == 3, () => agent.destination = DOCTORS_OFFICE, 0);
		let chooseCOCKPIT = action(() => agent.randNumber == 4, () => agent.destination = COCKPIT, 0);
		let chooseESCAPE_POD = action(() => agent.randNumber == 5, () => agent.destination = ESCAPE_POD, 0);
		let chooseTRANSPORT_ROOM = action(() => agent.randNumber == 6, () => agent.destination = TRANSPORT_ROOM, 0);
		let chooseMONITORING_ROOM = action(() => agent.randNumber == 7, () => agent.destination = MONITORING_ROOM, 0);
		let chooseMAIN_AREA = action(() => agent.randNumber == 8, () => agent.destination = MAIN_AREA, 0);
		let chooseFEM_BEDROOM = action(() => agent.randNumber == 9, () => agent.destination = FEM_BEDROOM, 0);
		let chooseMALE_BEDROOM = action(() => agent.randNumber == 10, () => agent.destination = MALE_BEDROOM, 0);
		let chooseBATHROOM = action(() => agent.randNumber == 11, () => agent.destination = BATHROOM, 0);

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
		return setNextDestination;

	}
	else{
		let chooseENGINES = action(() => destination == ENGINES, () => agent.destination = ENGINES, 0);
		let chooseSTORAGE = action(() => destination == STORAGE, () => agent.destination = STORAGE, 0);
		let chooseDOCTORS_OFFICE = action(() => destination == DOCTORS_OFFICE, () => agent.destination = DOCTORS_OFFICE, 0);
		let chooseCOCKPIT = action(() => destination == COCKPIT, () => agent.destination = COCKPIT, 0);
		let chooseESCAPE_POD = action(() => destination == ESCAPE_POD, () => agent.destination = ESCAPE_POD, 0);
		let chooseTRANSPORT_ROOM = action(() => destination == TRANSPORT_ROOM, () => agent.destination = TRANSPORT_ROOM, 0);
		let chooseMONITORING_ROOM = action(() => destination == MONITORING_ROOM, () => agent.destination = MONITORING_ROOM, 0);
		let chooseMAIN_AREA = action(() => destination == MAIN_AREA, () => agent.destination = MAIN_AREA, 0);
		let chooseFEM_BEDROOM = action(() => destination == FEM_BEDROOM, () => agent.destination = FEM_BEDROOM, 0);
		let chooseMALE_BEDROOM = action(() => destination == MALE_BEDROOM, () => agent.destination = MALE_BEDROOM, 0);
		let chooseBATHROOM = action(() => destination == BATHROOM, () => agent.destination = BATHROOM, 0);


		let setNextDestination = selector([
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
		]);

		return setNextDestination;
	}

}


let setDestinationPrecondForAgent = function(agent: Agent){
	let setDestinationPrecond: Precondition = () => isUndefined(agent.destination) || agent.destination == agent.currentLocation;
	return setDestinationPrecond;	
}

// // create behavior trees


let gotoNextLocationForAgent = function(agent: Agent){
	return  action(
		() => true,
		() => {
			agent.currentLocation = getNextLocation(agent.currentLocation, agent.destination);
			console.log(agent, " at: ", agent.currentLocation);
		},
		0
	);
}


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

let searchForAgent = function(agent: Agent){
	let search = sequence([
		selector([
			guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent)),
			action(() => true, () => {
			},0)
		]),
		gotoNextLocationForAgent(agent),
	]);

	return search
}

let CalebBT = sequence([
	lastSeenByAgent(Caleb),
	sequence([
		searchForAgent(Caleb), lastSeenByAgent(Caleb)
	])
]);

let QuinnBT = sequence([
	lastSeenByAgent(Quinn),
	sequence([
		searchForAgent(Quinn), lastSeenByAgent(Quinn)
	])
]);

let MarkBT = sequence([
	lastSeenByAgent(Mark),
	sequence([
		searchForAgent(Mark), lastSeenByAgent(Mark)
	])
]);

let EddieBT = sequence([
	lastSeenByAgent(Eddie),
	sequence([
		searchForAgent(Eddie), lastSeenByAgent(Eddie)
	])
]);

let BeatriceBT = sequence([
	lastSeenByAgent(Beatrice),
	sequence([
		searchForAgent(Beatrice), lastSeenByAgent(Beatrice)
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


setVariable("theStart",0);

var startStateBT = guard(() => getVariable(playerLocation) == MAIN_AREA,
    sequence([
            displayDescriptionAction("You enter the ship's main area."),
            selector([
                guard(() => getVariable("theStart") == 0,
                    sequence([
                        displayDescriptionAction("Help text on."),
                        addUserAction("Next!", () => {
                            setVariable("theStart", 1);
                        })
                    ])),

               	guard(() => getVariable("theStart") == 1,
                    sequence([
                        displayDescriptionAction("Help text off...."),
                        addUserAction("Go forward to enter the engine room.", () => setVariable(playerLocation, ENGINES)),
						addUserAction("Go east to enter the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
						addUserAction("Go west to enter the females' bedroom.", () => setVariable(playerLocation, FEM_BEDROOM)),
						addUserAction("Go west to enter the bathroom.", () => setVariable(playerLocation, BATHROOM)),
						addUserAction("Go west to enter the males' bedroom.", () => setVariable(playerLocation, MALE_BEDROOM)),
						addUserAction("Go south to enter the escape pod.", () => setVariable(playerLocation, ESCAPE_POD)),
						addUserAction("Go into the transport room.", () => setVariable(playerLocation, TRANSPORT_ROOM)),
                    ])),

               	// Optional
                displayDescriptionAction("Otherwise show this...")
            ]),

            // Default Show
            
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

var wires1BT = guard(() => getVariable(playerLocation) == wires1.currentLocation, //  getItemVariable(wires1, "currentLocation")
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

var wires2BT = guard(() => getVariable(playerLocation) == wires2.currentLocation, // getItemVariable(wires2, "currentLocation"),
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
var displayPanel = {x: 250, y: 0};
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
	context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 1000, 500);
	displayPlayer();
	displayCaleb();
	displayQuinn();
	displayMark();
	displayEddie();
	displayBeatrice();
	displayTextAndActions();
}

var mapPositions = {
	"ENGINES": {x: 275, y: 110},
	"COCKPIT": {x: 860, y: 230},
	"STORAGE": {x: 545, y: 110},
	"DOCTORS OFFICE": {x: 725, y: 350},
	"MAIN AREA": {x: 465, y: 240},
	"ESCAPE POD": {x: 224, y: 408},
	"TRANSPORT ROOM": {x: 370, y: 360},
	"MONITORING ROOM": {x: 535, y: 360},
	"BATHROOM": {x: 85, y: 240},
	"MALE BEDROOM": {x: 85, y: 330},
	"FEM BEDROOM": {x: 85, y: 150}
};

function displayPlayer() {
	var currLocation = getVariable(playerLocation);
	if (!isUndefined(mapPositions[currLocation]))
		context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}

function displayCaleb() {
	var currLocation = Caleb.currentLocation;
	context.drawImage(calebImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}

function displayQuinn() {
	var currLocation = Quinn.currentLocation;
	context.drawImage(quinnImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}

function displayMark() {
	var currLocation = Mark.currentLocation;
	context.drawImage(markImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}

function displayEddie() {
	var currLocation = Eddie.currentLocation;
	context.drawImage(eddieImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}

function displayBeatrice() {
	var currLocation = Beatrice.currentLocation;
	context.drawImage(beatriceImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 50, 50);
}

spaceshipImage.src = "../images/ship_maybe.png";
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