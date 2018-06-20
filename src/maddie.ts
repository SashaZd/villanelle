/* /// <reference path="scripting.ts"/> */
import {
    addAgent, setAgentVariable, addItem, addLocation, setVariable, getNextLocation, action,
    getRandNumber, getVariable, sequence, selector, execute, Precondition, getAgentVariable, neg_guard, guard,
    isVariableNotSet, displayDescriptionAction, addUserAction, addUserInteractionTree, initialize,
    getUserInteractionObject, executeUserAction, worldTick, attachTreeToAgent, setItemVariable, getItemVariable,
    displayActionEffectText, areAdjacent, addUserActionTree
} from "./scripting";
import {isUndefined} from "typescript-collections/dist/lib/util";

// 1. Define State
// locations
// var START = "START";
// var BC_CORRIDOR = "BC_CORRIDOR";
// var BL_CORRIDOR = "BL_CORRIDOR";
// var BR_CORRIDOR = "BR_CORRIDOR";
// var ML_CORRIDOR = "ML_CORRIDOR";
// var TL_CORRIDOR = "TL_CORRIDOR";
// var TC_CORRIDOR = "TC_CORRIDOR";
// var TR_CORRIDOR = "TR_CORRIDOR";
// var MR_CORRIDOR = "MR_CORRIDOR";
// var LAB = "LAB";
var STORAGE = "STORAGE";
var DOCTORS_OFFICE = "DOCTORS OFFICE";
// var QUARTERS1 = "QUARTERS1";
// var QUARTERS2 = "QUARTERS2";
// var EXIT_ELEVATOR = "EXIT_ELEVATOR";
var ENGINES = "ENGINES";
var COCKPIT = "COCKPIT";
var ESCAPE_POD = "ESCAPE POD";
var TRANSPORT_ROOM = "TRANSPORT ROOM";
var MONITORING_ROOM = "MONITORING ROOM";
var MAIN_AREA = "MAIN AREA";
var FEM_BEDROOM = "FEM BEDROOM";
var MALE_BEDROOM = "MALE BEDROOM";
var BATHROOM = "BATHROOM";
// var COMMS = "COMMS";

// addLocation(START, [BC_CORRIDOR]);
// addLocation(BC_CORRIDOR, [BL_CORRIDOR, BR_CORRIDOR, LAB]);
// addLocation(BL_CORRIDOR, [ML_CORRIDOR]);
// addLocation(ML_CORRIDOR, [STORAGE, TL_CORRIDOR]);
// addLocation(TL_CORRIDOR, [TC_CORRIDOR, ENGINES, COMMS]);
// addLocation(ENGINES, [COCKPIT]);
// addLocation(COCKPIT, [COMMS]);
// addLocation(TC_CORRIDOR, [EXIT_ELEVATOR, MEDICAL, TR_CORRIDOR]);
// addLocation(TR_CORRIDOR, [MR_CORRIDOR]);
// addLocation(MR_CORRIDOR, [MEDICAL, QUARTERS2, BR_CORRIDOR]);
// addLocation(BR_CORRIDOR, [QUARTERS1]);
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
// var Caleb = addAgent("Caleb");
    var Caleb = addAgent("Caleb");

// // items
// var crewCard1 = addItem("Crew card1");
// var crewCard2 = addItem("Crew card2");
    var wires1 = addItem("wires1");
    var wires2 = addItem("wires2");
// setItemVariable(crewCard1, "currentLocation", LAB);
// setItemVariable(crewCard2, "currentLocation", MEDICAL);
    setItemVariable(wires1, "currentLocation", STORAGE);
    setItemVariable(wires2, "currentLocation", MONITORING_ROOM);
// // variables
// //Caleb
// setAgentVariable(Caleb, "currentLocation", COCKPIT);
    //Caleb
    setAgentVariable(Caleb, "currentLocation", COCKPIT);
    var wiresCollected = setVariable("wiresCollected", 0);
// //player
// var playerLocation = setVariable("playerLocation", START);
// var crewCardsCollected = setVariable("crewCardsCollected", 0);
    //player
    var playerLocation = setVariable("playerLocation", MAIN_AREA);
    var wiresCollected = setVariable("wiresCollected", 0);
// // 2. Define BTs
// // create ground actions
let setRandNumber = action(
    () => true,
    () => setVariable("randNumber", 
            getRandNumber(1, 11)),
            0
);
// let chooseSTART = action(() => getVariable("randNumber") == 1, () => setVariable("destination", START), 0);
// let chooseBC_CORRIDOR = action(() => getVariable("randNumber") == 2, () => setVariable("destination", BC_CORRIDOR), 0);
// let chooseBL_CORRIDOR = action(() => getVariable("randNumber") == 3, () => setVariable("destination", BL_CORRIDOR), 0);
// let chooseBR_CORRIDOR = action(() => getVariable("randNumber") == 4, () => setVariable("destination", BR_CORRIDOR), 0);
// let chooseML_CORRIDOR = action(() => getVariable("randNumber") == 5, () => setVariable("destination", ML_CORRIDOR), 0);
// let chooseTL_CORRIDOR = action(() => getVariable("randNumber") == 6, () => setVariable("destination", TL_CORRIDOR), 0);
// let chooseTC_CORRIDOR = action(() => getVariable("randNumber") == 7, () => setVariable("destination", TC_CORRIDOR), 0);
// let chooseTR_CORRIDOR = action(() => getVariable("randNumber") == 8, () => setVariable("destination", TR_CORRIDOR), 0);
// let chooseMR_CORRIDOR = action(() => getVariable("randNumber") == 9, () => setVariable("destination", MR_CORRIDOR), 0);
// let chooseLAB = action(() => getVariable("randNumber") == 10, () => setVariable("destination", LAB), 0);
// let chooseSTORAGE = action(() => getVariable("randNumber") == 11, () => setVariable("destination", STORAGE), 0);
// let chooseMEDICAL = action(() => getVariable("randNumber") == 12, () => setVariable("destination", MEDICAL), 0);
// let chooseQUARTERS1 = action(() => getVariable("randNumber") == 13, () => setVariable("destination", QUARTERS1), 0);
// let chooseQUARTERS2 = action(() => getVariable("randNumber") == 14, () => setVariable("destination", QUARTERS2), 0);
// let chooseEXIT_ELEVATOR = action(() => getVariable("randNumber") == 15, () => setVariable("destination", EXIT_ELEVATOR), 0);
// let chooseENGINES = action(() => getVariable("randNumber") == 16, () => setVariable("destination", ENGINES), 0);
// let chooseCOCKPIT = action(() => getVariable("randNumber") == 17, () => setVariable("destination", COCKPIT), 0);
// let chooseCOMMS = action(() => getVariable("randNumber") == 18, () => setVariable("destination", COMMS), 0);
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


let atDestination: Precondition = () => getVariable("destination") == getAgentVariable(Caleb, "currentLocation");
let setDestinationPrecond: Precondition = () => isVariableNotSet("destination") || atDestination();

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

let gotoNextLocation = action(
    () => true,
    () => {
        setAgentVariable(Caleb, "currentLocation", getNextLocation(getAgentVariable(Caleb, "currentLocation"), getVariable("destination")));
        console.log("Caleb is at: " + getAgentVariable(Caleb, "currentLocation"))
    },
    0
);

// let eatPlayer = action(() => getAgentVariable(Caleb, "currentLocation") == getVariable(playerLocation),
//     () => {
//         setVariable("endGame", "lose");
//         setVariable(playerLocation, "NA");
//     }, 0
// );

//this mess
// let conversation = action(() => getAgentvariable(Caleb, "currentLocation") == getVariable(playerLocation),
//     () => {
//             displayDescriptionAction("You happen to run into Caleb."),
//             displayDescriptionAction("Caleb: Have you not found the wires yet? Did you not check storage?"),
//     },
// );

// /*let search = selector([
//     eatPlayer,
//     sequence([
//         selector([
//             guard(setDestinationPrecond, {}, setNextDestination),
//             action(() => true, () => {
//             }, {}, 0)
//         ]),
//         gotoNextLocation,
//         eatPlayer
//     ])
// ]);*/

let search = sequence([
        selector([
            guard(setDestinationPrecond, setNextDestination),
            action(() => true, () => {
            },0)
        ]),
        gotoNextLocation,
    ]);

let CalebBT = selector([
    // eatPlayer,
    // conversation,
    sequence([
        search, 
        // eatPlayer
        // conversation
    ])
]);

// //attach behaviour trees to agents
attachTreeToAgent(Caleb, CalebBT);

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
// var elevatorBT = guard(() => getVariable(playerLocation) == EXIT_ELEVATOR,
//     sequence([
//             displayDescriptionAction("You reach the exit elevator."),
//             selector([
//                 guard(() => getVariable(crewCardsCollected) >= 2,
//                     sequence([
//                         displayDescriptionAction("You can now activate the exit and flee!"),
//                         addUserAction("Activate and get out!", () => {
//                             setVariable("endGame", "win");
//                             setVariable(playerLocation, "NA")
//                         })
//                     ])),
//                 displayDescriptionAction("You need 2 crew cards to activate the exit elevator system.")
//             ]),
//             addUserAction("Move back in the corridor", () => setVariable(playerLocation, TC_CORRIDOR)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(mbedroomBT);
var tlStateBT = guard(() => getVariable(playerLocation) == MALE_BEDROOM,
    sequence([
            displayDescriptionAction("You move into the males' bedroom."),
            addUserAction("Enter the bathroom.", () => setVariable(playerLocation, BATHROOM)),
            addUserAction("Enter the main area.", () => setVariable(playerLocation, MAIN_AREA)),
        ]
    ));
addUserInteractionTree(tlStateBT);
// var blStateBT = guard(() => getVariable(playerLocation) == BL_CORRIDOR,
//     sequence([
//             displayDescriptionAction("You move forward in the corridor."),
//             addUserAction("Move to the north in the corridor", () => setVariable(playerLocation, ML_CORRIDOR)),
//             addUserAction("Move to the east in the corridor", () => setVariable(playerLocation, BC_CORRIDOR)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(blStateBT);
// var mlStateBT = guard(() => getVariable(playerLocation) == ML_CORRIDOR,
//     sequence([
//             displayDescriptionAction("You move forward in the corridor."),
//             addUserAction("Enter the storage room", () => setVariable(playerLocation, STORAGE)),
//             addUserAction("Move to the north in the corridor", () => setVariable(playerLocation, TL_CORRIDOR)),
//             addUserAction("Move to the south", () => setVariable(playerLocation, BL_CORRIDOR)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(mlStateBT);
// var storageBT = guard(() => getVariable(playerLocation) == STORAGE,
//     sequence([
//             displayDescriptionAction("You enter the storage."),
//             addUserAction("Exit the storage room", () => setVariable(playerLocation, ML_CORRIDOR)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(storageBT);
// var commsBT = guard(() => getVariable(playerLocation) == COMMS,
//     sequence([
//             displayDescriptionAction("You enter the communications room."),
//             addUserAction("Enter the cockpit", () => setVariable(playerLocation, COCKPIT)),
//             addUserAction("Exit the communications room into the corridor", () => setVariable(playerLocation, TL_CORRIDOR)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(commsBT);
// var cockpitBT = guard(() => getVariable(playerLocation) == COCKPIT,
//     sequence([
//             displayDescriptionAction("You enter the cockpit."),
//             addUserAction("Enter the engines room to the east", () => setVariable(playerLocation, ENGINES)),
//             addUserAction("Enter the communications room to the south", () => setVariable(playerLocation, COMMS)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(cockpitBT);
// var enginesBT = guard(() => getVariable(playerLocation) == ENGINES,
//     sequence([
//             displayDescriptionAction("You enter the engines room."),
//             addUserAction("Enter the cockpit to the east", () => setVariable(playerLocation, COCKPIT)),
//             addUserAction("Enter the corridor to the south", () => setVariable(playerLocation, TL_CORRIDOR)),
//             addUserAction("Stay where you are.", () => {})
//         ]
//     ));
// addUserInteractionTree(enginesBT);

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

// var CalebNearby = guard(() => areAdjacent(getVariable(playerLocation), getAgentVariable(Caleb, "currentLocation")),
//     displayDescriptionAction("You hear a thumping sound. Caleb is nearby."));
// addUserInteractionTree(CalebNearby);

// var gameOver = guard(() => getVariable(playerLocation) == "NA",
//     selector([
//             guard(() => getVariable("endGame") == "win",
//                 displayDescriptionAction("You have managed to fix the ship!")),
//             guard(() => getVariable("endGame") == "lose",
//                 displayDescriptionAction("The creature grabs you before you can react! You struggle for a bit before realising it's all over.."))
//         ]
//     ));
// addUserInteractionTree(gameOver);

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

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(spaceshipImage, displayPanel.x, displayPanel.y, 500, 500);
    displayPlayer();
    displayCaleb();
    displayTextAndActions();
}

var mapPositions = {
    // "START": {x: 230, y: 235},
    // "BC_CORRIDOR": {x: 240, y: 210},
    // "BR_CORRIDOR": {x: 300, y: 190},
    // "MR_CORRIDOR": {x: 305, y: 150},
    // "QUARTERS2": {x: 340, y: 155},
    // "QUARTERS1": {x: 340, y: 190},
    // "TR_CORRIDOR": {x: 300, y: 100},
    // "TC_CORRIDOR": {x: 230, y: 100},
    // "TL_CORRIDOR": {x: 170, y: 100},
    // "EXIT_ELEVATOR": {x: 230, y: 60},
    // "LAB": {x: 240, y: 170},
    // "ML_CORRIDOR": {x: 160, y: 150},
    // "BL_CORRIDOR": {x: 160, y: 200},
    "ENGINES": {x: 115, y: 135},
    "COCKPIT": {x: 393, y: 243},
    // "COMMS": {x: 120, y: 100},
    // "MEDICAL": {x: 250, y: 130},
    "STORAGE": {x: 260, y: 150},
    "DOCTORS OFFICE": {x: 302, y: 250},
    "MAIN AREA": {x: 165, y: 250},
    "ESCAPE POD": {x: 105, y: 360},
    "TRANSPORT ROOM": {x: 228, y: 347},
    "MONITORING ROOM": {x: 308, y: 320},
    "BATHROOM": {x: 24, y: 245},
    "MALE BEDROOM": {x: 24, y: 325},
    "FEM BEDROOM": {x: 24, y: 170}
};

function displayPlayer() {
    var currLocation = getVariable(playerLocation);
    if (!isUndefined(mapPositions[currLocation]))
        context.drawImage(playerImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 25, 25);
}

function displayCaleb() {
    var currLocation = getAgentVariable(Caleb, "currentLocation");
    context.drawImage(calebImage, displayPanel.x + mapPositions[currLocation].x, displayPanel.y + mapPositions[currLocation].y, 25, 25);
}

spaceshipImage.src = "../images/finalized_ship_map_digi.png";
playerImage.src = "../images/commander_icon.png";
calebImage.src = "../images/caleb_icon.png";

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