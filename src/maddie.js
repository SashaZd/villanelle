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
var Mark = scripting_1.addAgent("Mark");
var Eddie = scripting_1.addAgent("Eddie");
var Beatrice = scripting_1.addAgent("Beatrice");
// items
var wires1 = scripting_1.addItem("wires1");
var wires2 = scripting_1.addItem("wires2");
wires1.setCurrentLocation(STORAGE);
wires2.setCurrentLocation(MONITORING_ROOM);
// setItemVariable(wires1, "currentLocation", STORAGE);
// setItemVariable(wires2, "currentLocation", MONITORING_ROOM);
// var wiresCollected = setVariable("wiresCollected", 0);
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
var playerLocation = scripting_1.setVariable("playerLocation", MAIN_AREA);
var wiresCollected = scripting_1.setVariable("wiresCollected", 0);
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
// Goals for the player
// 0: Unknown/Initial State
// 1: Found out about Fault:1. New Goal. (only occurs if status=0)
// 2: Fixed Fault:1 (only occurs if status=1)
// 3: Found out about Fault:2. New Goal (only occurs if status=2)
// 4: Fixed Fault:2 (only occurs if status=3) 
// etc. etc.
var goal_broken_transport = scripting_1.setVariable("TRANSPORT_ROOM:Broken", 0); // max:4
// // 2. Define BTs
// // create ground actions
// Todo from here
// function function_name(argument) {
// 	// body...
// }
function setNextDestinationForAgent(agent, destination) {
    if (destination === void 0) { destination = "UNKNOWN"; }
    if (destination == "UNKNOWN") {
        var setRandNumber = scripting_1.action(function () { return true; }, function () { return agent.randNumber = scripting_1.getRandNumber(1, 11); }, 0);
        // Sasha Todo: Work on using the Agent/Item types for destinations
        var chooseENGINES = scripting_1.action(function () { return agent.randNumber == 1; }, function () { return agent.destination = ENGINES; }, 0);
        var chooseSTORAGE = scripting_1.action(function () { return agent.randNumber == 2; }, function () { return agent.destination = STORAGE; }, 0);
        var chooseDOCTORS_OFFICE = scripting_1.action(function () { return agent.randNumber == 3; }, function () { return agent.destination = DOCTORS_OFFICE; }, 0);
        var chooseCOCKPIT = scripting_1.action(function () { return agent.randNumber == 4; }, function () { return agent.destination = COCKPIT; }, 0);
        var chooseESCAPE_POD = scripting_1.action(function () { return agent.randNumber == 5; }, function () { return agent.destination = ESCAPE_POD; }, 0);
        var chooseTRANSPORT_ROOM = scripting_1.action(function () { return agent.randNumber == 6; }, function () { return agent.destination = TRANSPORT_ROOM; }, 0);
        var chooseMONITORING_ROOM = scripting_1.action(function () { return agent.randNumber == 7; }, function () { return agent.destination = MONITORING_ROOM; }, 0);
        var chooseMAIN_AREA = scripting_1.action(function () { return agent.randNumber == 8; }, function () { return agent.destination = MAIN_AREA; }, 0);
        var chooseFEM_BEDROOM = scripting_1.action(function () { return agent.randNumber == 9; }, function () { return agent.destination = FEM_BEDROOM; }, 0);
        var chooseMALE_BEDROOM = scripting_1.action(function () { return agent.randNumber == 10; }, function () { return agent.destination = MALE_BEDROOM; }, 0);
        var chooseBATHROOM = scripting_1.action(function () { return agent.randNumber == 11; }, function () { return agent.destination = BATHROOM; }, 0);
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
        return setNextDestination;
    }
    else {
        var chooseENGINES = scripting_1.action(function () { return destination == ENGINES; }, function () { return agent.destination = ENGINES; }, 0);
        var chooseSTORAGE = scripting_1.action(function () { return destination == STORAGE; }, function () { return agent.destination = STORAGE; }, 0);
        var chooseDOCTORS_OFFICE = scripting_1.action(function () { return destination == DOCTORS_OFFICE; }, function () { return agent.destination = DOCTORS_OFFICE; }, 0);
        var chooseCOCKPIT = scripting_1.action(function () { return destination == COCKPIT; }, function () { return agent.destination = COCKPIT; }, 0);
        var chooseESCAPE_POD = scripting_1.action(function () { return destination == ESCAPE_POD; }, function () { return agent.destination = ESCAPE_POD; }, 0);
        var chooseTRANSPORT_ROOM = scripting_1.action(function () { return destination == TRANSPORT_ROOM; }, function () { return agent.destination = TRANSPORT_ROOM; }, 0);
        var chooseMONITORING_ROOM = scripting_1.action(function () { return destination == MONITORING_ROOM; }, function () { return agent.destination = MONITORING_ROOM; }, 0);
        var chooseMAIN_AREA = scripting_1.action(function () { return destination == MAIN_AREA; }, function () { return agent.destination = MAIN_AREA; }, 0);
        var chooseFEM_BEDROOM = scripting_1.action(function () { return destination == FEM_BEDROOM; }, function () { return agent.destination = FEM_BEDROOM; }, 0);
        var chooseMALE_BEDROOM = scripting_1.action(function () { return destination == MALE_BEDROOM; }, function () { return agent.destination = MALE_BEDROOM; }, 0);
        var chooseBATHROOM = scripting_1.action(function () { return destination == BATHROOM; }, function () { return agent.destination = BATHROOM; }, 0);
        var setNextDestination = scripting_1.selector([
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
var setDestinationPrecondForAgent = function (agent) {
    var setDestinationPrecond = function () { return util_1.isUndefined(agent.destination) || agent.destination == agent.currentLocation; };
    return setDestinationPrecond;
};
// // create behavior trees
var gotoNextLocationForAgent = function (agent) {
    return scripting_1.action(function () { return true; }, function () {
        agent.currentLocation = scripting_1.getNextLocation(agent.currentLocation, agent.destination);
        console.log(agent, " at: ", agent.currentLocation);
    }, 0);
};
var lastSeenByAgent = function (agent) {
    return scripting_1.sequence([
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return agent.currentLocation == wires1.currentLocation; }, 
            // () => getAgentVariable(agent, 'currentLocation') == getItemVariable(wires1, "currentLocation"),
            //effect
            function () {
                console.log(agent + " sees - Item: wires1 | Location: " + agent.currentLocation);
                // console.log(agentName + " sees - Item: wires1 | Location: "+ getAgentVariable(agentName, 'currentLocation'));
                // setAgentVariable(agentName, "lastSeen:wires1",  getAgentVariable(agentName, 'currentLocation'))
                agent.setLastSawItemAtLocation(wires1, agent.currentLocation);
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return agent.currentLocation == wires2.currentLocation; }, 
            // () => getAgentVariable(agentName, 'currentLocation') == getItemVariable(wires2, "currentLocation"),
            //effect
            function () {
                console.log(agent + " sees - Item: wires2 | Location: " + agent.currentLocation);
                // console.log(agentName + "sees - Item: wires2 | Location: "+getAgentVariable(agentName, 'currentLocation'));
                agent.setLastSawItemAtLocation(wires2, agent.currentLocation);
                // setAgentVariable(agentName, "lastSeen:wires2",  getAgentVariable(agentName, 'currentLocation'))
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
        ]),
        scripting_1.selector([
            scripting_1.action(
            //precondition
            function () { return agent.currentLocation == scripting_1.getVariable("playerLocation"); }, 
            // () => getAgentVariable(agentName, 'currentLocation') == getVariable("playerLocation"),
            //effect
            function () {
                console.log(agent + " sees - Person: Player | Location: " + agent.currentLocation);
                // console.log(agentName + "sees - Person: Player | Location: "+getAgentVariable(agentName, 'currentLocation'));
                // agent.setLastSawItemAtLocation(wires1, agent.currentLocation);
                agent.setLastSawPersonAtLocation('player', agent.currentLocation);
                // setAgentVariable(agentName, "lastSeen:player",  getAgentVariable(agentName, 'currentLocation'))
            }, 
            //time taken
            0),
            scripting_1.action(function () { return true; }, function () { }, 0)
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
var searchForAgent = function (agent) {
    var search = scripting_1.sequence([
        scripting_1.selector([
            scripting_1.guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent)),
            scripting_1.action(function () { return true; }, function () {
            }, 0)
        ]),
        gotoNextLocationForAgent(agent),
    ]);
    return search;
};
var CalebBT = scripting_1.sequence([
    lastSeenByAgent(Caleb),
    scripting_1.sequence([
        searchForAgent(Caleb), lastSeenByAgent(Caleb)
    ])
]);
var QuinnBT = scripting_1.sequence([
    lastSeenByAgent(Quinn),
    scripting_1.sequence([
        searchForAgent(Quinn), lastSeenByAgent(Quinn)
    ])
]);
var MarkBT = scripting_1.sequence([
    lastSeenByAgent(Mark),
    scripting_1.sequence([
        searchForAgent(Mark), lastSeenByAgent(Mark)
    ])
]);
var EddieBT = scripting_1.sequence([
    lastSeenByAgent(Eddie),
    scripting_1.sequence([
        searchForAgent(Eddie), lastSeenByAgent(Eddie)
    ])
]);
var BeatriceBT = scripting_1.sequence([
    lastSeenByAgent(Beatrice),
    scripting_1.sequence([
        searchForAgent(Beatrice), lastSeenByAgent(Beatrice)
    ])
]);
// //attach behaviour trees to agents
scripting_1.attachTreeToAgent(Caleb, CalebBT);
scripting_1.attachTreeToAgent(Quinn, QuinnBT);
scripting_1.attachTreeToAgent(Mark, MarkBT);
scripting_1.attachTreeToAgent(Eddie, EddieBT);
scripting_1.attachTreeToAgent(Beatrice, BeatriceBT);
// // 3. Construct story
// // create user actions
scripting_1.setVariable("theStart", 0);
scripting_1.setVariable("EngineStart", 0);
scripting_1.setVariable("StorageStart", 0);
scripting_1.setVariable("DrOfficeStart", 0);
scripting_1.setVariable("CockpitStart", 0);
scripting_1.setVariable("MonitoringStart", 0);
scripting_1.setVariable("TransportStart", 0);
scripting_1.setVariable("EscapeStart", 0);
var MainBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MAIN_AREA; }, scripting_1.sequence([
    // displayDescriptionAction("You enter the ship's main area."),
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("theStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("It was a simple mission: land on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, their crewmates yelling at each other. There is only one escape pod remaining. As commander, you are equipped with a special ineractive map allowing you to see the positions of your crewmates at all times. You must utilize the map in order to take control of the ship and remaining crew to save everyone from certain death."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("theStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("theStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the ship's main area."),
            scripting_1.addUserAction("Go north to enter the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
            scripting_1.addUserAction("Go northeast to enter the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
            scripting_1.addUserAction("Go east to enter the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
            scripting_1.addUserAction("Go southeast to enter the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Go south into the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Go south into the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
            scripting_1.addUserAction("Go southwest to enter the escape pod.", function () { return scripting_1.setVariable(playerLocation, ESCAPE_POD); }),
            scripting_1.addUserAction("Go west to enter the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(MainBT);
var EngineBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ENGINES; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("EngineStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The engine room is where Beatrice spends most of her time. She’s a natural when it comes to problem solving, but her unapproachable and unfriendly personality turned many influential commanders away from her. Despite her personality, her engineering skills are second-to-none...granted she is the only engineer left."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("EngineStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("EngineStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the engine room."),
            scripting_1.addUserAction("Head east into the storage room.", function () { return scripting_1.setVariable(playerLocation, STORAGE); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        //Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(EngineBT);
var StorageBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == STORAGE; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("StorageStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The storage room is where Eddie spends his time and stores his janitor equipment. Old as he is, he still does his best to contribute to the team in whatever way he can, despite lacking technical skills the other crewmates employ. Although he is a well-known hero among military personnel, his crewmates continue to remain oblivious to the fact that the man who scrubs their toilets had been one of the most accomplished military officers the universe had ever seen."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("StorageStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("StorageStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You moved into the storage room."),
            scripting_1.addUserAction("Move into the engine room.", function () { return scripting_1.setVariable(playerLocation, ENGINES); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        //Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(StorageBT);
var DrOfficeBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == DOCTORS_OFFICE; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("DrOfficeStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("Dr. Quinn spends a lot of time in her office looking after patients. She puts all others above herself; she is constantly concerned with the well-being of her crewmates. The prospect of her patients dying still keeps her up at night, but her determination to save as many people as she can is what keeps her going."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("DrOfficeStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("DrOfficeStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the doctor's office."),
            scripting_1.addUserAction("Move into the cockpit.", function () { return scripting_1.setVariable(playerLocation, COCKPIT); }),
            scripting_1.addUserAction("Go to the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(DrOfficeBT);
var CockpitBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == COCKPIT; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("CockpitStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The cockpit is where Taylor pilots the ship, but Caleb spends a lot of his time there as well. Caleb runs things very differently from Taylor; he is a demanding leader who harshly criticizes his crewmates when failures occur. He secretly loathes Taylor; their personalities clash all-too-frequently, and their position on the ship despite his older age is a constant source of anger to the officer."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("CockpitStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("CockpitStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You move forward into the cockpit."),
            scripting_1.addUserAction("Move to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(CockpitBT);
var MonitoringBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MONITORING_ROOM; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("MonitoringStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("The monitoring room is purposed to see into the transport room, thus watching for signs of trouble with the transporter."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("MonitoringStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("MonitoringStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the monitoring room."),
            scripting_1.addUserAction("Move to the doctor's office.", function () { return scripting_1.setVariable(playerLocation, DOCTORS_OFFICE); }),
            scripting_1.addUserAction("Go to the transport room.", function () { return scripting_1.setVariable(playerLocation, TRANSPORT_ROOM); }),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(MonitoringBT);
var TransportBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == TRANSPORT_ROOM; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("TransportStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("Where the transporter is located and where the failure occurred. Mark often works in here. Mark is an older crewmate who avoids the spotlight like the plague. His anxiety levels shot up rapidly after the failure, and he is excessively worried that the rest of the crew blames the failure on him."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("TransportStart", 1);
                console.log("This is: ", scripting_1.getVariable(goal_broken_transport));
                console.log(scripting_1.getVariable("TRANSPORT_ROOM:Broken"), scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 0);
            }),
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("TransportStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the transport room where the teleporter is located."),
            scripting_1.addUserAction("Move into the monitoring room.", function () { return scripting_1.setVariable(playerLocation, MONITORING_ROOM); }),
            scripting_1.addUserAction("Exit to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
            // Goal options for the room -> Only showing these when the main help text is off. 
            scripting_1.selector([
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 0; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("There seems to be a problem with the teleporter software. Maybe Mark could check it out."),
                    scripting_1.action(function () { return true; }, function () {
                        scripting_1.setVariable("TRANSPORT_ROOM:Broken", 1);
                    }, 0)
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 1; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("You need to find someone to look at the teleporter sofware."),
                ])),
                scripting_1.guard(function () { return scripting_1.getVariable("TRANSPORT_ROOM:Broken") == 2; }, scripting_1.sequence([
                    scripting_1.displayDescriptionAction("The first thing was fixed, but now the second thing is broken? Go find EFG to fix the same."),
                ])),
            ])
        ]))
        // Optional
        // displayDescriptionAction("Something seems to have gone wrong...")
    ])
]));
scripting_1.addUserInteractionTree(TransportBT);
var EscapePodBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == ESCAPE_POD; }, scripting_1.sequence([
    scripting_1.selector([
        scripting_1.guard(function () { return scripting_1.getVariable("EscapeStart") == 0; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("There is only one escape pod aboard this ship. If any crewmate becomes too fearful of their current situation, they will attempt to leave in it."),
            scripting_1.addUserAction("Next.", function () {
                scripting_1.setVariable("EscapeStart", 1);
            })
        ])),
        scripting_1.guard(function () { return scripting_1.getVariable("EscapeStart") == 1; }, scripting_1.sequence([
            scripting_1.displayDescriptionAction("You enter the escape pod."),
            scripting_1.addUserAction("Return to the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
        ])),
        // Optional
        scripting_1.displayDescriptionAction("Something seems to have gone wrong...")
    ]),
]));
scripting_1.addUserInteractionTree(EscapePodBT);
var FBedroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == FEM_BEDROOM; }, scripting_1.sequence([
    // selector([
    //              guard(() => getVariable("theStart") == 0,
    //                  sequence([
    //                      displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
    //                      addUserAction("Next.", () => {
    //                          setVariable("theStart", 1);
    //                      })
    //                  ])),
    //             	guard(() => getVariable("theStart") == 1,
    //                  sequence([
    scripting_1.displayDescriptionAction("You move into the females' bedroom."),
    scripting_1.addUserAction("Return to the bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
]));
scripting_1.addUserInteractionTree(FBedroomBT);
var BathroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == BATHROOM; }, scripting_1.sequence([
    // selector([
    //              guard(() => getVariable("theStart") == 0,
    //                  sequence([
    //                      displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
    //                      addUserAction("Next.", () => {
    //                          setVariable("theStart", 1);
    //                      })
    //                  ])),
    //             	guard(() => getVariable("theStart") == 1,
    //                  sequence([
    scripting_1.displayDescriptionAction("You move into the bathroom."),
    scripting_1.addUserAction("Move south into the males' bedroom.", function () { return scripting_1.setVariable(playerLocation, MALE_BEDROOM); }),
    scripting_1.addUserAction("Move north into the females' bedroom.", function () { return scripting_1.setVariable(playerLocation, FEM_BEDROOM); }),
    scripting_1.addUserAction("Enter the main area.", function () { return scripting_1.setVariable(playerLocation, MAIN_AREA); }),
]));
scripting_1.addUserInteractionTree(BathroomBT);
var MBedroomBT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == MALE_BEDROOM; }, scripting_1.sequence([
    // selector([
    //              guard(() => getVariable("theStart") == 0,
    //                  sequence([
    //                      displayDescriptionAction("It was a simple mission: and on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Part two was when everything went awry. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed dead. The commander comes to as the ship is plummeting from orbit, his crewmates yelling at each other. There is only one escape pod remaining. You must take control of the ship and remaining crew to save everyone from certain death."),
    //                      addUserAction("Next.", () => {
    //                          setVariable("theStart", 1);
    //                      })
    //                  ])),
    //             	guard(() => getVariable("theStart") == 1,
    //                  sequence([
    scripting_1.displayDescriptionAction("You move into the males' bedroom."),
    scripting_1.addUserAction("Return to bathroom.", function () { return scripting_1.setVariable(playerLocation, BATHROOM); }),
]));
scripting_1.addUserInteractionTree(MBedroomBT);
var wires1BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == wires1.currentLocation; }, //  getItemVariable(wires1, "currentLocation")
scripting_1.sequence([
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
var wires2BT = scripting_1.guard(function () { return scripting_1.getVariable(playerLocation) == wires2.currentLocation; }, // getItemVariable(wires2, "currentLocation"),
scripting_1.sequence([
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
var displayPanel = { x: 250, y: 0 };
var textPanel = { x: 270, y: 501 };
var actionsPanel = { x: 520, y: 550 };
var canvas = document.getElementById('display');
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
    "ENGINES": { x: 285, y: 108 },
    "COCKPIT": { x: 860, y: 230 },
    "STORAGE": { x: 550, y: 106 },
    "DOCTORS OFFICE": { x: 725, y: 350 },
    "MAIN AREA": { x: 480, y: 240 },
    "ESCAPE POD": { x: 224, y: 408 },
    "TRANSPORT ROOM": { x: 370, y: 358 },
    "MONITORING ROOM": { x: 535, y: 360 },
    "BATHROOM": { x: 85, y: 240 },
    "MALE BEDROOM": { x: 85, y: 330 },
    "FEM BEDROOM": { x: 85, y: 150 }
};
function displayPlayer() {
    var currLocation = scripting_1.getVariable(playerLocation);
    if (!util_1.isUndefined(mapPositions[currLocation]))
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
spaceshipImage.src = "../images/ship.png";
playerImage.src = "../images/Taylor3.png";
calebImage.src = "../images/Caleb.png";
quinnImage.src = "../images/Quinn.png";
markImage.src = "../images/Mark.png";
eddieImage.src = "../images/Eddie.png";
beatriceImage.src = "../images/Beatrice.png";
var currentSelection;
var yOffset = actionsPanel.y + 25;
var yOffsetIncrement = 25;
function wrapText(text) {
    console.log("Wrap Text");
    var wa = text.split(" "), phraseArray = [], lastPhrase = wa[0], measure = 0, splitChar = " ";
    if (wa.length <= 1) {
        return wa;
    }
    for (var i = 1; i < wa.length; i++) {
        var w = wa[i];
        measure = context.measureText(lastPhrase + splitChar + w).width;
        if (measure < 1000) {
            lastPhrase += (splitChar + w);
        }
        else {
            phraseArray.push(lastPhrase);
            lastPhrase = w;
        }
        if (i === wa.length - 1) {
            phraseArray.push(lastPhrase);
            break;
        }
    }
    return phraseArray;
}
function displayTextAndActions() {
    context.clearRect(textPanel.x, textPanel.y, 500, 1000);
    context.font = "15pt Calibri";
    context.fillStyle = 'pink';
    console.log("Actions effect text: " + userInteractionObject.actionEffectsText);
    var textToDisplay = userInteractionObject.actionEffectsText.length != 0 ? wrapText(userInteractionObject.actionEffectsText) : wrapText(userInteractionObject.text);
    // console.log(textToDisplay);
    actionsPanel.y = textToDisplay.length * 25 + textPanel.y + 20;
    yOffset = actionsPanel.y + 25;
    for (var i = 0; i < textToDisplay.length; i++) {
        context.fillText(textToDisplay[i], textPanel.x, textPanel.y + 25 * i + 20);
    }
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
