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


// Goals for the player

// 0: Unknown/Initial State
// 1: Found out about Fault:1. New Goal. (only occurs if status=0)
// 2: Fixed Fault:1 (only occurs if status=1)
// 3: Found out about Fault:2. New Goal (only occurs if status=2)
// 4: Fixed Fault:2 (only occurs if status=3) 
// etc. etc.
var goal_broken_transport = setVariable("TRANSPORT_ROOM:Broken", 0);		// max:4
var goal_broken_engines = setVariable("ENGINES:Broken", 0);
var goal_broken_storage = setVariable("STORAGE:Broken", 0);
var goal_broken_cockpit = setVariable("COCKPIT:Broken", 0);
var goal_broken_main = setVariable("MAIN_ROOM:Broken", 0);
var goal_broken_dr = setVariable("DR_OFFICE:Broken", 0);
var goal_broken_monitoring = setVariable("MONITORING_ROOM:Broken", 0);
var goal_broken_escape = setVariable("ESCAPE_POD:Broken", 0);

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
		return sequence([
			action(() => true, () => agent.destination = destination, 0)
		]);

		// let chooseENGINES = action(() => destination == ENGINES, () => agent.destination = ENGINES, 0);
		// let chooseSTORAGE = action(() => destination == STORAGE, () => agent.destination = STORAGE, 0);
		// let chooseDOCTORS_OFFICE = action(() => destination == DOCTORS_OFFICE, () => agent.destination = DOCTORS_OFFICE, 0);
		// let chooseCOCKPIT = action(() => destination == COCKPIT, () => agent.destination = COCKPIT, 0);
		// let chooseESCAPE_POD = action(() => destination == ESCAPE_POD, () => agent.destination = ESCAPE_POD, 0);
		// let chooseTRANSPORT_ROOM = action(() => destination == TRANSPORT_ROOM, () => agent.destination = TRANSPORT_ROOM, 0);
		// let chooseMONITORING_ROOM = action(() => destination == MONITORING_ROOM, () => agent.destination = MONITORING_ROOM, 0);
		// let chooseMAIN_AREA = action(() => destination == MAIN_AREA, () => agent.destination = MAIN_AREA, 0);
		// let chooseFEM_BEDROOM = action(() => destination == FEM_BEDROOM, () => agent.destination = FEM_BEDROOM, 0);
		// let chooseMALE_BEDROOM = action(() => destination == MALE_BEDROOM, () => agent.destination = MALE_BEDROOM, 0);
		// let chooseBATHROOM = action(() => destination == BATHROOM, () => agent.destination = BATHROOM, 0);


		// let setNextDestination = selector([
		// 	chooseENGINES,
		// 	chooseCOCKPIT,
		// 	chooseSTORAGE,
		// 	chooseDOCTORS_OFFICE,
		// 	chooseBATHROOM,
		// 	chooseMALE_BEDROOM,
		// 	chooseFEM_BEDROOM,
		// 	chooseMAIN_AREA,
		// 	chooseMONITORING_ROOM,
		// 	chooseTRANSPORT_ROOM,
		// 	chooseESCAPE_POD
		// ]);

		// return setNextDestination;
	}

}


let setDestinationPrecondForAgent = function(agent: Agent){
	let setDestinationPrecond: Precondition = () => isUndefined(agent.destination) || agent.destination == agent.currentLocation;
	return setDestinationPrecond;	
}

// // create behavior trees


// let gotoNextLocationForAgent = function(agent: Agent){
// 	return agent.getNextLocation()

// 	// return  action(
// 	// 	() => true,
// 	// 	() => {
// 	// 		agent.currentLocation = getNextLocation(agent.currentLocation, agent.destination);
// 	// 		console.log(agent, " at: ", agent.currentLocation);
// 	// 	},
// 	// 	0
// 	// );
// }


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


// Todo: Has to be a better way to return a behaviour tree to go to the next destination for an agent. 
// Todo: Move to scripting under Agent instead. 

let searchForAgent = function(agent: Agent, destination: string = "UNKNOWN"){
	if(destination == "UNKNOWN"){
		let search = sequence([
			selector([
				guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent)),
				action(() => true, () => {
				},0)
			]),
			agent.getNextLocation()
			// gotoNextLocationForAgent(agent),
		]);	
		return search
	}
	else{
		let search = sequence([
			selector([
				guard(setDestinationPrecondForAgent(agent), setNextDestinationForAgent(agent, destination)),
				action(() => true, () => {
				},0)
			]),
			agent.getNextLocation()
			// gotoNextLocationForAgent(agent),
		]);	
		return search
	}
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
setVariable("EngineStart",0);
setVariable("StorageStart",0);
setVariable("DrOfficeStart",0);
setVariable("CockpitStart",0);
setVariable("MonitoringStart",0);
setVariable("TransportStart",0);
setVariable("EscapeStart",0);


var MainBT = guard(() => getVariable(playerLocation) == MAIN_AREA,
    sequence([
            // displayDescriptionAction("You enter the ship's main area."),
            selector([
                guard(() => getVariable("theStart") == 0,
                    sequence([
                        displayDescriptionAction("It was a simple mission: land on the newly-discovered planet Siguron, teleport crew members down to its surface, and secure and document new information. Everything went awry during phase two. As most of the crew gathered into the transport bay, the commander and a few others stayed behind to monitor the exploration. The teleportation process began, yet immediately a massive systems failure occurred. Those who had been awaiting teleportation were gone, assumed to have been lost in space. The commander comes to as the ship is plummeting from orbit, their crewmates yelling at each other. There is only one escape pod remaining. As commander, you are equipped with a special interactive map allowing you to see the positions of your crewmates at all times. You must utilize the map in order to take control of the ship and remaining crew to save everyone from certain death."),
                        addUserAction("Next.", () => {
                            setVariable("theStart", 1);
                            console.log("This is: ", getVariable(goal_broken_main))
                            console.log(getVariable("MAIN_ROOM:Broken"), getVariable("MAIN_ROOM:Broken") == 0)
                        })
                    ])),

               	guard(() => getVariable("theStart") == 1,
                    sequence([
                        displayDescriptionAction("You enter the ship's main area."),
                        addUserAction("Go north to enter the engine room.", () => setVariable(playerLocation, ENGINES)),
						addUserAction("Go northeast to enter the storage room.", () => setVariable(playerLocation, STORAGE)),
						addUserAction("Go east to enter the cockpit.", () => setVariable(playerLocation, COCKPIT)),
						addUserAction("Go southeast to enter the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
						addUserAction("Go south into the monitoring room.", () => setVariable(playerLocation, MONITORING_ROOM)),
						addUserAction("Go south into the transport room.", () => setVariable(playerLocation, TRANSPORT_ROOM)),
						addUserAction("Go southwest to enter the escape pod.", () => setVariable(playerLocation, ESCAPE_POD)),
						addUserAction("Go west to enter the bathroom.", () => setVariable(playerLocation, BATHROOM)),
                    ])),
               			selector([
			            	guard(() => getVariable("MAIN_ROOM:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("It has been hours since the crew last ate. The resident ship mom could help prepare some food."),
			                        // Quinn
			                        action(() => true, ()=>{
					            		setVariable("MAIN_ROOM:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("MAIN_ROOM:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("Find someone to prepare food for the crew."),
			                    ])
			                ),
			                guard(() => getVariable("MAIN_ROOM:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("The crew was able to eat, but the kitchen was left a mess. Someone needs to clean it."),
			                    // Quinn or Eddie
			                    ])
			                ),
			                guard(() => getVariable("MAIN_ROOM:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to clean the kitchen."),
			                    ])
			                ),
			            ]),    
               	// Optional
                displayDescriptionAction("Something seems to have gone wrong...")
            ]),
        ]
    ));
addUserInteractionTree(MainBT);

var EngineBT = guard(() => getVariable(playerLocation) == ENGINES,
	sequence([
			selector([
                guard(() => getVariable("EngineStart") == 0,
                    sequence([
                        displayDescriptionAction("The engine room is where Beatrice spends most of her time. She’s a natural when it comes to problem solving, but her unapproachable and unfriendly personality turned many influential commanders away from her. Despite her personality, her engineering skills are second-to-none...granted she is the only engineer left."),
                        addUserAction("Next.", () => {
                            setVariable("EngineStart", 1);
                            console.log("This is: ", getVariable(goal_broken_engines))
                            console.log(getVariable("ENGINES:Broken"), getVariable("ENGINES:Broken") == 0)
                        })
                    ])),

               	guard(() => getVariable("EngineStart") == 1,
                    sequence([
                       displayDescriptionAction("You enter the engine room."),
						addUserAction("Head east into the storage room.", () => setVariable(playerLocation, STORAGE)),
						addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
                    ])),
               			selector([
			            	guard(() => getVariable("ENGINES:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("In order to fix the engines, replacement wires must be found. An engineer or janitor should know where they are."),
			                        // Beatrice or Eddie
			                        action(() => true, ()=>{
					            		setVariable("ENGINES:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("ENGINES:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("You need to find replacement wires."),
			                    ])
			                ),
			                guard(() => getVariable("ENGINES:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("The wires were found, but the tool box seems to be missing. Caleb might have taken it."),
			                    // Beatrice or Caleb
			                    ])
			                ),
			                 guard(() => getVariable("ENGINES:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("Before the engines can be fixed, you need to find a tool box."),
			                    ])
			                ),
			                 guard(() => getVariable("ENGINES:Broken") == 4,
			                    sequence([
			                        displayDescriptionAction("With box acquired, the wires can now be replaced. An engineer should know how to do it."),
			                    // Beatrice
			                    ])
			                ),
			                 guard(() => getVariable("ENGINES:Broken") == 5,
			                    sequence([
			                        displayDescriptionAction("You need to have the wires replaced in the engine room."),
			                    ])
			                ),
			                 guard(() => getVariable("ENGINES:Broken") == 6,
			                    sequence([
			                        displayDescriptionAction("The engine's now fixed, but it still needs to be restarted."),
			                    // Beatrice
			                    ])
			                ),
			                 guard(() => getVariable("ENGINES:Broken") == 7,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to restart the engine."),
			                    ])
			                ),
			            ]),    
               	//Optional
                displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		]
	));
addUserInteractionTree(EngineBT);

var StorageBT = guard(() => getVariable(playerLocation) == STORAGE,
	sequence([
			selector([
                guard(() => getVariable("StorageStart") == 0,
                    sequence([
                        displayDescriptionAction("The storage room is where Eddie spends his time and stores his janitor equipment. Old as he is, he still does his best to contribute to the team in whatever way he can, despite lacking technical skills the other crewmates employ. Although he is a well-known hero among military personnel, his crewmates continue to remain oblivious to the fact that the man who scrubs their toilets had been one of the most accomplished military officers the universe had ever seen."),
                        addUserAction("Next.", () => {    
                            setVariable("StorageStart", 1);
                            console.log("This is: ", getVariable(goal_broken_storage))
                            console.log(getVariable("STORAGE:Broken"), getVariable("STORAGE:Broken") == 0)
                        })
                    ])),

               	guard(() => getVariable("StorageStart") == 1,
                    sequence([
                       displayDescriptionAction("You moved into the storage room."),
						addUserAction("Move west into the engine room.", () => setVariable(playerLocation, ENGINES)),
						addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
                    ])),
               	selector([
			            	guard(() => getVariable("STORAGE:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("The storage room is a mess. A janitor would be able to make sense of it all."),
			                        // Eddie
			                        action(() => true, ()=>{
					            		setVariable("STORAGE:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("STORAGE:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("Find someone to reorganize the storage room."),
			                    ])
			                ),
			                guard(() => getVariable("STORAGE:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("Now that the storage room is clean, the replacement wires can by found."),
			                    //Beatrice or Eddie
			                    ])
			                ),
			                guard(() => getVariable("STORAGE:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("Find someone to retrieve the wires."),
			                    ])
			                ),
			            ]),    

               	//Optional
                displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		]
	));
addUserInteractionTree(StorageBT);

var DrOfficeBT = guard(() => getVariable(playerLocation) == DOCTORS_OFFICE,
	sequence([
			selector([
                guard(() => getVariable("DrOfficeStart") == 0,
                    sequence([
                        displayDescriptionAction("Dr. Quinn spends a lot of time in her office looking after patients. She puts all others above herself; she is constantly concerned with the well-being of her crewmates. The prospect of her patients dying still keeps her up at night, but her determination to save as many people as she can is what keeps her going. Her maternal instincts follow her from her house to the ship."),
                        addUserAction("Next.", () => {
                            setVariable("DrOfficeStart", 1);
                            console.log("This is: ", getVariable(goal_broken_dr))
                            console.log(getVariable("DR_OFFICE:Broken"), getVariable("DR_OFFICE:Broken") == 0)
                        })
                    ])),

               	guard(() => getVariable("DrOfficeStart") == 1,
                    sequence([
                       displayDescriptionAction("You enter the doctor's office."),
						addUserAction("Move northeast into the cockpit.", () => setVariable(playerLocation, COCKPIT)),
						addUserAction("Go west into the monitoring room.", () => setVariable(playerLocation, MONITORING_ROOM)),
						addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
                    ])),
               			selector([
			            	guard(() => getVariable("DR_OFFICE:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("Some crewmates may have sustained injuries. Find the doctor."),
			                        // Quinn
			                        action(() => true, ()=>{
					            		setVariable("DR_OFFICE:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("DR_OFFICE:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("Find someone to check the crew's health."),
			                    ])
			                ),
			                guard(() => getVariable("DR_OFFICE:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("Some minor injuries were sustained. Find the doctor to heal the crew's injuries."),
			                    // Quinn
			                    ])
			                ),
			                guard(() => getVariable("DR_OFFICE:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("Find someone to heal the crew's injuries."),
			                    ])
			                ),
			        ]),        

               	// Optional
                displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		]
	));
addUserInteractionTree(DrOfficeBT);

var CockpitBT = guard(() => getVariable(playerLocation) == COCKPIT,
	sequence([
			selector([
                guard(() => getVariable("CockpitStart") == 0,
                    sequence([
                        displayDescriptionAction("The cockpit is where Taylor pilots the ship, but Caleb spends a lot of his time there as well. Caleb runs things very differently from Taylor; he is a demanding leader who harshly criticizes his crewmates when failures occur. He secretly loathes Taylor; their personalities clash all-too-frequently, and their position on the ship despite his older age is a constant source of anger to the officer."),
                        addUserAction("Next.", () => {
                            setVariable("CockpitStart", 1);
                            console.log("This is: ", getVariable(goal_broken_cockpit))
                            console.log(getVariable("COCKPIT:Broken"), getVariable("COCKPIT:Broken") == 0)
                        })
                    ])),

               	guard(() => getVariable("CockpitStart") == 1,
                    sequence([
                       displayDescriptionAction("You move forward into the cockpit."),
						addUserAction("Move southwest into the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
						addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
		])),
						selector([
			            	guard(() => getVariable("COCKPIT:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("Now that the ship is back online, you will need to contact a support ship. An officer would be perfect for the job."),
			                        // Caleb
			                        action(() => true, ()=>{
					            		setVariable("COCKPIT:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("COCKPIT:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to contact a support ship."),
			                    ])
			                ),
			                guard(() => getVariable("COCKPIT:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("A support ship has now been contacted, but the ship must get ready to be moved."),
			                    // Caleb
			                    ])
			                ),
			                guard(() => getVariable("COCKPIT:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to prepare the ship to move."),
			                    ])
			                ),
			            ]),
            ]),
		]
	));
addUserInteractionTree(CockpitBT);

var MonitoringBT = guard(() => getVariable(playerLocation) == MONITORING_ROOM,
	sequence([
			selector([
                guard(() => getVariable("MonitoringStart") == 0,
                    sequence([
                        displayDescriptionAction("The monitoring room is purposed to see into the transport room, thus watching for signs of trouble with the transporter."),
                        addUserAction("Next.", () => {
                            setVariable("MonitoringStart", 1);
                            console.log("This is: ", getVariable(goal_broken_monitoring))
                            console.log(getVariable("MONITORING_ROOM:Broken"), getVariable("MONITORING_ROOM:Broken") == 0)
                        })
                    ])),

               	guard(() => getVariable("MonitoringStart") == 1,
                    sequence([
                       displayDescriptionAction("You enter the monitoring room."),
						addUserAction("Move east into the doctor's office.", () => setVariable(playerLocation, DOCTORS_OFFICE)),
						addUserAction("Go west into the transport room.", () => setVariable(playerLocation, TRANSPORT_ROOM)),
						addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
			])),
               			selector([
			            	guard(() => getVariable("MONITORING_ROOM:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("The monitoring room needs to be inspected to note any malfunctions."),
			                        // Caleb or Mark
			                        action(() => true, ()=>{
					            		setVariable("MONITORING_ROOM:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("MONITORING_ROOM:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to inspect the monitoring room."),
			                    ])
			                ),
			                guard(() => getVariable("MONITORING_ROOM:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("Nothing is wrong in the monitoring room, but some broken shards flew in from the adjacent room. A janitor would have it cleaned up in no time."),
			                    // Eddie
			                    ])
			                ),
			                guard(() => getVariable("MONITORING_ROOM:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to clean the monitoring room."),
			                    ])
			                ),
			            ]),

               	// Optional
                displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		]
	));
addUserInteractionTree(MonitoringBT);

var TransportBT = guard(
	() => getVariable(playerLocation) == TRANSPORT_ROOM,
	sequence([
			selector([
                guard(() => getVariable("TransportStart") == 0,
                    sequence([
                        displayDescriptionAction("Where the transporter is located and where the failure occurred. Mark the transport officer often works in here. Mark is an older crewmate who avoids the spotlight like the plague. His anxiety levels shot up rapidly after the failure, and he is excessively worried that the rest of the crew blames the failure on him."),
                        addUserAction("Next.", () => {
                            setVariable("TransportStart", 1);
                            console.log("This is: ", getVariable(goal_broken_transport))
                            console.log(getVariable("TRANSPORT_ROOM:Broken"), getVariable("TRANSPORT_ROOM:Broken") == 0)
                        }),
                    ])),

               	guard(() => getVariable("TransportStart") == 1,
                    sequence([
                       	displayDescriptionAction("You enter the transport room where the teleporter is located."),
						addUserAction("Move east into the monitoring room.", () => setVariable(playerLocation, MONITORING_ROOM)),
						addUserAction("Exit to the main area.", () => setVariable(playerLocation, MAIN_AREA)),

						// Goal options for the room -> Only showing these when the main help text is off. 
						selector([
			            	guard(() => getVariable("TRANSPORT_ROOM:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("There seems to be a problem with the teleporter software. Maybe a transport officer could check it out."),
			                        action(() => true, ()=>{
			                        	//Mark
					            		setVariable("TRANSPORT_ROOM:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to look at the teleporter sofware."),
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 2,
			                    sequence([
			                        displayDescriptionAction("The software was looked over, but before it can be restarted, the room must be cleaned. Sounds like a janitor's job."),
			                    // Eddie
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 3,
			                    sequence([
			                        displayDescriptionAction("You need to clean the room before any other progress is made."),
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 4,
			                    sequence([
			                        displayDescriptionAction("The room is cleaned, so now the teleporter software can be restarted."),
			                    // Mark
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 5,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to restart the teleporter software."),
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 6,
			                    sequence([
			                        displayDescriptionAction("The teleporter software was restarted, but now it needs to be reconfigured to match the settings of the ship."),
			                    // Mark
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 7,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to reconfigure the software."),
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 8,
			                    sequence([
			                        displayDescriptionAction("The teleporter software is now good to go, so all that is left is to restart the teleporter itself."),
			                    // Mark
			                    ])
			                ),
			                guard(() => getVariable("TRANSPORT_ROOM:Broken") == 9,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to restart the teleporter."),
			                    ])
			                ),
						])
					]),
				)

               	// Optional
                // displayDescriptionAction("Something seems to have gone wrong...")
            ])
            
		])
	);
addUserInteractionTree(TransportBT);

var EscapePodBT = guard(() => getVariable(playerLocation) == ESCAPE_POD,
	sequence([
		selector([
            guard(() => getVariable("EscapeStart") == 0,
                sequence([
                    displayDescriptionAction("There is only one escape pod aboard this ship. If any crewmate becomes too fearful of their current situation, they will attempt to leave in it."),
                    addUserAction("Next.", () => {
                        setVariable("EscapeStart", 1);
                        console.log("This is: ", getVariable(goal_broken_escape))
                        console.log(getVariable("ESCAPE_POD:Broken"), getVariable("ESCAPE_POD:Broken") == 0)
                    })
            	])
            ),
           	guard(() => getVariable("EscapeStart") == 1,
                sequence([
                   	displayDescriptionAction("You enter the escape pod."),
					addUserAction("Return to the main area.", () => setVariable(playerLocation, MAIN_AREA)),
				])
            ),
            		selector([
			            	guard(() => getVariable("ESCAPE_POD:Broken") == 0,
			                    sequence([
			                        displayDescriptionAction("The escape pod needs to be inspected for signs of malfunctions."),
			                        // Caleb
			                        action(() => true, ()=>{
					            		setVariable("ESCAPE_POD:Broken", 1);
					            	}, 0)
			                    ])
			                ),
			                guard(() => getVariable("ESCAPE_POD:Broken") == 1,
			                    sequence([
			                        displayDescriptionAction("You need to find someone to inspect the escape pod."),
			                    ])
			                ),
			        ]),
        ]),
	])
);
addUserInteractionTree(EscapePodBT);

var FBedroomBT = guard(() => getVariable(playerLocation) == FEM_BEDROOM,
	sequence([
                    displayDescriptionAction("You move into the females' bedroom."),
					addUserAction("Return to the bathroom.", () => setVariable(playerLocation, BATHROOM)),
               	// Optional
                // displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		);
addUserInteractionTree(FBedroomBT);

var BathroomBT = guard(() => getVariable(playerLocation) == BATHROOM,
	sequence([
             		displayDescriptionAction("You move into the bathroom."),
					addUserAction("Move south into the males' bedroom.", () => setVariable(playerLocation, MALE_BEDROOM)),
					addUserAction("Move north into the females' bedroom.", () => setVariable(playerLocation, FEM_BEDROOM)),
					addUserAction("Enter the main area.", () => setVariable(playerLocation, MAIN_AREA)),
               	// Optional
                // displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		);
addUserInteractionTree(BathroomBT);

var MBedroomBT = guard(() => getVariable(playerLocation) == MALE_BEDROOM,
	sequence([
                      displayDescriptionAction("You move into the males' bedroom."),
						addUserAction("Return to bathroom.", () => setVariable(playerLocation, BATHROOM)),
               	// Optional
                // displayDescriptionAction("Something seems to have gone wrong...")
            ]),
		);
addUserInteractionTree(MBedroomBT);

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

let addGoalToAgent = function(goal, agent, destination) {
	let newAgentTree = sequence([
		lastSeenByAgent(agent),
		sequence([
			searchForAgent(agent, destination), lastSeenByAgent(agent)
		])
	]);
	attachTreeToAgent(agent, newAgentTree);
}


let playerSeesAgent = function(agent) {
	var playerSeesAgent = guard(() => getVariable(playerLocation) == agent.currentLocation,
	    sequence([
	    	displayDescriptionAction("You see "+agent.name+"."),
	    	guard(() => getVariable("TRANSPORT_ROOM:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to inspect the teleporter software.", () => addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM)),
                ])
            ),
            guard(() => getVariable("ENGINE_ROOM:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to find replacement wires for the engine.", () => addGoalToAgent("ENGINE_ROOM:Broken", agent, ENGINES)),
                ])
            ),
            guard(() => getVariable("STORAGE:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to reorganize the storage room.", () => addGoalToAgent("STORAGE:Broken", agent, STORAGE)),
                ])
            ),
            guard(() => getVariable("DR_OFFICE:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to check the health of the crew.", () => addGoalToAgent("DR_OFFICE:Broken", agent, DOCTORS_OFFICE)),
                ])
            ),
            guard(() => getVariable("COCKPIT:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to contact a support ship.", () => addGoalToAgent("COCKPIT:Broken", agent, COCKPIT)),
                ])
            ),
            guard(() => getVariable("MONITORING_ROOM:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to inspect the monitoring room.", () => addGoalToAgent("MONITORING_ROOM:Broken", agent, MONITORING_ROOM)),
                ])
            ),
            guard(() => getVariable("MAIN_AREA:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to prepare food for the crew.", () => addGoalToAgent("MAIN_AREA:Broken", agent, MAIN_AREA)),
                ])
            ),
            guard(() => getVariable("ESCAPE_POD:Broken") == 1,
                sequence([
                    addUserAction("Tell " + agent.name + " to inspect the escape pod.", () => addGoalToAgent("ESCAPE_POD:Broken", agent, ESCAPE_POD)),
                ])
            ),
            //  guard(() => getVariable("TRANSPORT_ROOM:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to clean the transport room.", () => addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM)),
            //     ])
            // ), 
            //  guard(() => getVariable("ENGINE_ROOM:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to find a tool kit.", () => addGoalToAgent("ENGINE_ROOM:Broken", agent, ENGINES)),
            //     ])
            // ),
            //  guard(() => getVariable("STORAGE:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to retrieve the replacement wires", () => addGoalToAgent("STORAGE:Broken", agent, STORAGE)),
            //     ])
            // ),
            //  guard(() => getVariable("DR_OFFICE:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to heal the crew's injuries.", () => addGoalToAgent("DR_OFFICE:Broken", agent, DOCTORS_OFFICE)),
            //     ])
            // ),
            //  guard(() => getVariable("COCKPIT:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to prepare the ship to move.", () => addGoalToAgent("COCKPIT:Broken", agent, COCKPIT)),
            //     ])
            // ),
            //  guard(() => getVariable("MONITORING_ROOM:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to clean the monitoring room.", () => addGoalToAgent("MONITORING_ROOM:Broken", agent, MONITORING_ROOM)),
            //     ])
            // ),
            //  guard(() => getVariable("MAIN_AREA:Broken") == 3,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to clean the kitchen.", () => addGoalToAgent("MAIN_AREA:Broken", agent, MAIN_AREA)),
            //     ])
            // ),
            // guard(() => getVariable("TRANSPORT_ROOM:Broken") == 5,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to restart the teleporter software.", () => addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM)),
            //     ])
            // ), 
            //  guard(() => getVariable("ENGINE_ROOM:Broken") == 5,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to find the wires.", () => addGoalToAgent("ENGINE_ROOM:Broken", agent, ENGINES)),
            //     ])
            // ), 
            // guard(() => getVariable("TRANSPORT_ROOM:Broken") == 7,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to reconfigure the teleporter software.", () => addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM)),
            //     ])
            // ), 
            //  guard(() => getVariable("ENGINE_ROOM:Broken") == 7,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to restart the engine.", () => addGoalToAgent("ENGINE_ROOM:Broken", agent, ENGINES)),
            //     ])
            // ),
             // guard(() => getVariable("TRANSPORT_ROOM:Broken") == 9,
            //     sequence([
            //         addUserAction("Tell " + agent.name + " to reconfigure the teleporter.", () => addGoalToAgent("TRANSPORT_ROOM:Broken", agent, TRANSPORT_ROOM)),
            //     ])
            // ), 
		])
	);
	addUserInteractionTree(playerSeesAgent);
}

playerSeesAgent(Caleb)
playerSeesAgent(Quinn)
playerSeesAgent(Mark)
playerSeesAgent(Beatrice)


// //4. Run the world
initialize();
var userInteractionObject = getUserInteractionObject();

// //RENDERING-----
var displayPanel = {x: 250, y: 0};
var textPanel = {x: 270, y: 501};
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
	"ENGINES": {x: 285, y: 108},
	"COCKPIT": {x: 860, y: 230},
	"STORAGE": {x: 550, y: 106},
	"DOCTORS OFFICE": {x: 725, y: 350},
	"MAIN AREA": {x: 480, y: 240},
	"ESCAPE POD": {x: 224, y: 408},
	"TRANSPORT ROOM": {x: 370, y: 358},
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
    var wa=text.split(" "),
        phraseArray=[],
        lastPhrase=wa[0],
        measure=0,
        splitChar=" ";
    if (wa.length <= 1) {
        return wa
    }

    for (var i=1;i<wa.length;i++) {
        var w=wa[i];
        measure=context.measureText(lastPhrase+splitChar+w).width;
        if (measure<1000) {
            lastPhrase+=(splitChar+w);
        } else {
            phraseArray.push(lastPhrase);
            lastPhrase=w;
        }
        if (i===wa.length-1) {
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
	actionsPanel.y = textToDisplay.length*25+textPanel.y+20;
	yOffset = actionsPanel.y + 25;

	for(var i=0; i<textToDisplay.length; i++){
			context.fillText(textToDisplay[i], textPanel.x, textPanel.y+25*i+20);	
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