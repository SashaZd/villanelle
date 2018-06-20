"use strict";
exports.__esModule = true;
/* /// <reference path="scripting.ts"/> */
var scripting_1 = require("./scripting");
var util_1 = require("typescript-collections/dist/lib/util");
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
scripting_1.addLocation(ENGINES, [STORAGE, MAIN_AREA]);
scripting_1.addLocation(STORAGE, [ENGINES, DOCTORS_OFFICE]);
scripting_1.addLocation(DOCTORS_OFFICE, [STORAGE, MAIN_AREA, COCKPIT, MONITORING_ROOM]);
scripting_1.addLocation(COCKPIT, [DOCTORS_OFFICE]);
scripting_1.addLocation(ESCAPE_POD, [MAIN_AREA]);
scripting_1.addLocation(TRANSPORT_ROOM, [MONITORING_ROOM, MAIN_AREA]);
scripting_1.addLocation(MONITORING_ROOM, [TRANSPORT_ROOM, DOCTORS_OFFICE]);
scripting_1.addLocation(MAIN_AREA, [ENGINES, STORAGE, DOCTORS_OFFICE, TRANSPORT_ROOM, ESCAPE_POD]);
scripting_1.addLocation(FEM_BEDROOM, [MAIN_AREA, BATHROOM]);
scripting_1.addLocation(MALE_BEDROOM, [MAIN_AREA, BATHROOM]);
scripting_1.addLocation(BATHROOM, [MAIN_AREA, FEM_BEDROOM, MALE_BEDROOM]);
// agents
var Caleb = scripting_1.addAgent("Caleb");
var Quinn = scripting_1.addAgent("Quinn");
// items
var wires1 = scripting_1.addItem("wires1");
var wires2 = scripting_1.addItem("wires2");
scripting_1.setItemVariable(wires1, "currentLocation", STORAGE);
scripting_1.setItemVariable(wires2, "currentLocation", MONITORING_ROOM);
// // variables
scripting_1.setAgentVariable(Caleb, "currentLocation", COCKPIT);
var wiresCollected = scripting_1.setVariable("wiresCollected", 0);
//Quinn
scripting_1.setAgentVariable(Quinn, "currentLocation", DOCTORS_OFFICE);
// Player
var playerLocation = scripting_1.setVariable("playerLocation", MAIN_AREA);
var wiresCollected = scripting_1.setVariable("wiresCollected", 0);
// Knowledge for Caleb 
scripting_1.setAgentVariable(Caleb, "lastSeen:wires1", UNKNOWN);
scripting_1.setAgentVariable(Caleb, "lastSeen:wires2", UNKNOWN);
scripting_1.setAgentVariable(Caleb, "lastSeen:player", UNKNOWN);
// // 2. Define BTs
// // create ground actions
var setRandNumber = scripting_1.action(function () { return true; }, function () { return scripting_1.setVariable("randNumber", scripting_1.getRandNumber(1, 11)); }, 0);
var chooseENGINES = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 1; }, function () { return scripting_1.setVariable("destination", ENGINES); }, 0);
var chooseSTORAGE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 2; }, function () { return scripting_1.setVariable("destination", STORAGE); }, 0);
var chooseDOCTORS_OFFICE = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 3; }, function () { return scripting_1.setVariable("destination", DOCTORS_OFFICE); }, 0);
var chooseCOCKPIT = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 4; }, function () { return scripting_1.setVariable("destination", COCKPIT); }, 0);
var chooseESCAPE_POD = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 5; }, function () { return scripting_1.setVariable("destination", ESCAPE_POD); }, 0);
var chooseTRANSPORT_ROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 6; }, function () { return scripting_1.setVariable("destination", TRANSPORT_ROOM); }, 0);
var chooseMONITORING_ROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 7; }, function () { return scripting_1.setVariable("destination", MONITORING_ROOM); }, 0);
var chooseMAIN_AREA = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 8; }, function () { return scripting_1.setVariable("destination", MAIN_AREA); }, 0);
var chooseFEM_BEDROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 9; }, function () { return scripting_1.setVariable("destination", FEM_BEDROOM); }, 0);
var chooseMALE_BEDROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 10; }, function () { return scripting_1.setVariable("destination", MALE_BEDROOM); }, 0);
var chooseBATHROOM = scripting_1.action(function () { return scripting_1.getVariable("randNumber") == 11; }, function () { return scripting_1.setVariable("destination", BATHROOM); }, 0);
var atDestinationAgent = function (agentName) {
    return function () { return scripting_1.getVariable("destination") == scripting_1.getAgentVariable(agentName, "currentLocation"); };
};
var atDestinationCaleb = atDestinationAgent(Caleb);
var setDestinationCalebPrecond = function () { return scripting_1.isVariableNotSet("destination") || atDestinationCaleb(); };
// // create behavior trees
var setNextDestination = scripting_1.sequence([
    setRandNumber,
    scripting_1.selector([
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
var gotoNextLocationAgent = function (agentName) {
    return scripting_1.action(function () { return true; }, function () {
        scripting_1.setAgentVariable(agentName, "currentLocation", scripting_1.getNextLocation(scripting_1.getAgentVariable(agentName, "currentLocation"), scripting_1.getVariable("destination")));
        console.log(agentName + " is at: " + scripting_1.getAgentVariable(agentName, "currentLocation"));
        // console.log("Hello: " + getAgentVariable(Caleb, 'currentLocation') == getItemVariable(wires1, "currentLocation"));
    }, 0);
};
var gotoNextLocationCaleb = gotoNextLocationAgent(Caleb);
var gotoNextLocationQuinn = gotoNextLocationAgent(Quinn);
var lastSeenByAgent = function (agentName) {
    return scripting_1.sequence([
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return scripting_1.getAgentVariable(agentName, 'currentLocation') == scripting_1.getItemVariable(wires1, "currentLocation"); }, 
            //effect
            function () {
                console.log(agentName + " sees - Item: wires1 | Location: " + scripting_1.getAgentVariable(agentName, 'currentLocation'));
                scripting_1.setAgentVariable(agentName, "lastSeen:wires1", scripting_1.getAgentVariable(agentName, 'currentLocation'));
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return scripting_1.getAgentVariable(agentName, 'currentLocation') == scripting_1.getItemVariable(wires2, "currentLocation"); }, 
            //effect
            function () {
                console.log(agentName + "sees - Item: wires2 | Location: " + scripting_1.getAgentVariable(agentName, 'currentLocation'));
                scripting_1.setAgentVariable(agentName, "lastSeen:wires2", scripting_1.getAgentVariable(agentName, 'currentLocation'));
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return scripting_1.getAgentVariable(agentName, 'currentLocation') == scripting_1.getVariable("playerLocation"); }, 
            //effect
            function () {
                console.log(agentName + "sees - Person: Player | Location: " + scripting_1.getAgentVariable(agentName, 'currentLocation'));
                scripting_1.setAgentVariable(agentName, "lastSeen:player", scripting_1.getAgentVariable(agentName, 'currentLocation'));
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ])
    ]);
};
var lastSeenByCaleb = lastSeenByAgent(Caleb);
var lastSeenByQuinn = lastSeenByAgent(Quinn);
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
var search = scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(setDestinationCalebPrecond, setNextDestination),
        scripting_1.action(function () { return true; }, function () {
        }, 0)
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
var CalebBT = scripting_1.sequence([
    lastSeenByCaleb,
    scripting_1.sequence([
        search, lastSeenByCaleb
    ])
]);
var QuinnBT = scripting_1.sequence([
    lastSeenByQuinn,
    scripting_1.sequence([
        search, lastSeenByQuinn
    ])
]);
// //attach behaviour trees to agents
scripting_1.attachTreeToAgent(Caleb, CalebBT);
scripting_1.attachTreeToAgent(Quinn, QuinnBT);
// // 3. Construct story
// // create user actions
var startStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MAIN_AREA; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the ship's main area."),
    scripting_1.addUserAction("Go forward to enter the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
    scripting_1.addUserAction("Go east to enter the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
    scripting_1.addUserAction("Go west to enter the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
    scripting_1.addUserAction("Go west to enter the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
    scripting_1.addUserAction("Go west to enter the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Go south to enter the escape pod.", function () { return scripting_1.setVariable(playerLocation, ESCAPE_POD); }),
    scripting_1.addUserAction("Go into the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
]));
scripting_1.addUserInteractionTree(startStateBT);
var bcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ENGINES; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the engine room."),
    scripting_1.addUserAction("Head east into the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
    scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(bcStateBT);
var brStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == STORAGE; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You moved into the storage room."),
    scripting_1.addUserAction("Enter the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
    scripting_1.addUserAction("Move back into the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
]));
scripting_1.addUserInteractionTree(brStateBT);
var quarters1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == DOCTORS_OFFICE; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the doctor's office."),
    scripting_1.addUserAction("Return to the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
    scripting_1.addUserAction("Move into the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
    scripting_1.addUserAction("Go to the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
    scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(quarters1BT);
var mrStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COCKPIT; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move forward into the cockpit."),
    scripting_1.addUserAction("Return to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
]));
scripting_1.addUserInteractionTree(mrStateBT);
var quarters2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MONITORING_ROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the monitoring room."),
    scripting_1.addUserAction("Return to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
    scripting_1.addUserAction("Go to the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
]));
scripting_1.addUserInteractionTree(quarters2BT);
var medicalBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TRANSPORT_ROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the transport room where the teleporter is located."),
    scripting_1.addUserAction("Exit to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
    scripting_1.addUserAction("Return to the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
]));
scripting_1.addUserInteractionTree(medicalBT);
var labBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ESCAPE_POD; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You enter the escape pod."),
    scripting_1.addUserAction("Exit into the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(labBT);
var trStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == FEM_BEDROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the females' bedroom."),
    scripting_1.addUserAction("Move south to the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
    scripting_1.addUserAction("Exit into the main room.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(trStateBT);
var tcStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BATHROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the bathroom."),
    scripting_1.addUserAction("Move south into the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
    scripting_1.addUserAction("Move north into the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
]));
scripting_1.addUserInteractionTree(tcStateBT);
var tlStateBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MALE_BEDROOM; }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You move into the males' bedroom."),
    scripting_1.addUserAction("Enter the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(tlStateBT);
var wires1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(wires1, "currentLocation"); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice wires on the ground."),
    scripting_1.addUserActionTree("Pick up the wires.", scripting_1.sequence([
        scripting_1.action(function () { return true; }, function () {
            scripting_1.displayActionEffectText("You pick up the wires.");
            scripting_1.setItemVariable(wires1, "currentLocation", "player");
            scripting_1.setVariable(wiresCollected, scripting_1.getVariable(wiresCollected) + 1);
        }, 0),
    ]))
]));
scripting_1.addUserInteractionTree(wires1BT);
var wires2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == scripting_1.getItemVariable(wires2, "currentLocation"); }, scripting_1.sequence([
    scripting_1.displayDescriptionAction("You notice wires on the ground."),
    scripting_1.addUserAction("Pick up the wires.", function () {
        scripting_1.displayActionEffectText("You pick up the wires.");
        scripting_1.setItemVariable(wires2, "currentLocation", "player");
        scripting_1.setVariable(wiresCollected, scripting_1.getVariable(wiresCollected) + 1);
    })
]));
scripting_1.addUserInteractionTree(wires2BT);
// //4. Run the world
scripting_1.initialize();
var userInteractionObject = scripting_1.getUserInteractionObject();
// //RENDERING-----
var displayPanel = { x: 500, y: 0 };
var textPanel = { x: 500, y: 501 };
var actionsPanel = { x: 520, y: 550 };
var canvas = document.getElementById('display');
var context = canvas.getContext('2d');
var spaceshipImage = new Image();
spaceshipImage.onload = render;
var playerImage = new Image();
var calebImage = new Image();
var quinnImage = new Image();
function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 500);
    displayPlayer();
    displayCaleb();
    displayQuinn();
    displayTextAndActions();
}
var mapPositions = {
    "ENGINES": { x: 115, y: 135 },
    "COCKPIT": { x: 393, y: 243 },
    "STORAGE": { x: 260, y: 150 },
    "DOCTORS OFFICE": { x: 302, y: 250 },
    "MAIN AREA": { x: 165, y: 250 },
    "ESCAPE POD": { x: 105, y: 360 },
    "TRANSPORT ROOM": { x: 228, y: 347 },
    "MONITORING ROOM": { x: 308, y: 320 },
    "BATHROOM": { x: 24, y: 245 },
    "MALE BEDROOM": { x: 24, y: 325 },
    "FEM BEDROOM": { x: 24, y: 170 }
};
function displayPlayer() {
    var currLocation = scripting_1.getVariable(playerLocation);
    if (!util_1.isUndefined(mapPositions[currLocation]))
        context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 25, 25);
}
function displayCaleb() {
    var currLocation = scripting_1.getAgentVariable(Caleb, "currentLocation");
    context.drawImage(calebImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 25, 25);
}
function displayQuinn() {
    var currLocation = scripting_1.getAgentVariable(Quinn, "currentLocation");
    context.drawImage(quinnImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 25, 25);
}
spaceshipImage.src = "../images/finalized_ship_map_digi.png";
playerImage.src = "../images/commander_icon.png";
calebImage.src = "../images/caleb_icon.png";
quinnImage.src = "../images/Quinn.png";
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
    console.log("wires: " + scripting_1.getVariable(wiresCollected));
}
function displayArrow() {
    if (userInteractionObject.userActionsText.length != 0) {
        context.clearRect(actionsPanel.x, actionsPanel.y, 20, 1000);
        context.fillText("> ", 520, actionsPanel.y + 25 + (currentSelection * yOffsetIncrement));
    }
}
//User input
function keyPress(e) {
    if (e.keyCode == 13) {
        var selectedAction = userInteractionObject.userActionsText[currentSelection];
        if (!util_1.isUndefined(selectedAction)) {
            scripting_1.executeUserAction(selectedAction);
            scripting_1.worldTick();
            render();
        }
    }
}
function keyDown(e) {
    if (e.keyCode == 40) { //down
        if (userInteractionObject.userActionsText.length != 0) {
            currentSelection++;
            currentSelection = currentSelection % userInteractionObject.userActionsText.length;
            displayArrow();
        }
    }
    else if (e.keyCode == 38) { //up
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
