/* GLOBALS */
var population = 0,
	itemcount = 0;
var pc = new Player(0);

/*CLASSES*/
function Battle() {
	// what parameters am i passing here
}

function Item(id) {
	this.id = id;

	this.price = 0;
	this.name = "";
	this.hp = 0;
	this.mp = 0;
	this.bp = 0;
	this.power = 0;
	this.magic = 0;
	this.adef = 0;
	this.mdef = 0;
	this.level = 0;
	this.rate = 0; // for items found in the wild
}

function World(id) {
    this.id = id;

    this.isTown = false;
    this.npcs = []; // Player[]
    this.weather = "";
    this.name = "";
    this.level = 0; // maybe?
    //this.treasures = [] // Item[]
}
	
function Player(id) {
	this.id = id;
	
	this.name = "";
	this.level = 1;
	this.hp = 0;
	this.mp = 0;
	this.bp = 0;
	this.power = 0;
	this.magic = 0;
	this.adef = 0;
	this.mdef = 0;
	this.isFriendly = false;
	this.money = 0;
	this.carry = []; // Item[]
	this.dialog = []; // String[]
	this.rate = 0;
	/*
		Declare armor slots 
		--- unique --- allow any item as equipable
		make specific slots e.g. head, body, neck, etc. 
	*/
}

/* TEST GLOBALS */
var gridSize = 25;	
var worlds = new Array(gridSize);

/* TEST CODE */
for(var i = 0;i < gridSize; i++) {
	worlds[i] = new Array(gridSize);
}

for(var i = 0; i < gridSize; i++) {
	for(var j = 0;j < gridSize;j++) {
		//populate worlds[][] with World objects
		worlds[i][j] = new World(i*gridSize + j);
	}
}

worlds[0][0].name = "Home";
worlds[0][0].isTown = true;
worlds[0][0].weather = "nice and calm";

var testItem = new Item(itemcount);
itemcount++;
testItem.hp = 25;
testItem.price = 50;
testItem.name = "Small Potion";
testItem.rate = 0.5;

var mother = new Player(population);
population++;
mother.name = "Mother";
mother.isFriendly = true;
mother.carry.push(testItem);
mother.carry.push(testItem);
worlds[0][0].npcs.push(mother);

worlds[0][1].name = "Northern Swamps";
worlds[0][1].weather = "hot and wet";

/*
	Given this rate thing, might have to put People and Enemies as 
	separate classes, I guess since it's JS it doesn't really matter
	only really from a ORM perspective(?). 
	The problem comes in when you go to establish drop rates of items on creeps
	when you just want unique items and take the rate to establish the drop rate.
	TL;DR
	People who are vendors have multiples of each item
	Creeps only have unique items w/ droprates
*/


var bigPotion = new Item(itemcount);
itemcount++;
bigPotion.hp = 50;
bigPotion.price = 75;
bigPotion.name = "Big Potion";
bigPotion.rate = 0.25;

var smallDagger = new Item(itemcount);
itemcount++;
smallDagger.name = "Small Dagger";
smallDagger.power = 1; 
smallDagger.rate = 0.25;

// Creep Prototype
var creep = new Player(population);
population++;
creep.name = "Bat";
creep.level = 1;
creep.money = 5; // Don't forget about this 
creep.hp = 40;
creep.mp = 30;
creep.bp = 0;
creep.power = 0;
creep.magic = 1;
creep.adef = 0;
creep.mdef = 1;
creep.rate = 0.45;
creep.carry.push(testItem);
creep.carry.push(bigPotion);
creep.carry.push(smallDagger);
worlds[0][1].npcs.push(creep);

creep = new Player(population);
population++;
creep.name = "Rat";
creep.level = 1;
creep.money = 5;
creep.hp = 50;
creep.mp = 20;
creep.bp = 0;
creep.power = 1;
creep.magic = 0;
creep.adef = 1;
creep.mdef = 0;
creep.rate = 0.45;
creep.carry.push(bigPotion);
creep.carry.push(smallDagger);
worlds[0][1].npcs.push(creep);

//give this some kind of special item drop

creep = new Player(population);
population++;
creep.name = "Special Bat";
creep.level = 5;
creep.money = 100;
creep.hp = 80;
creep.mp = 20;
creep.bp = 0;
creep.power = 2;
creep.magic = 1;
creep.adef = 1;
creep.mdef = 1;
creep.rate = 0.1;
creep.carry = [];
creep.carry.push(smallDagger);
worlds[0][1].npcs.push(creep);

/*FORM HANDLING*/
var name="";
var email="";
var health=0;
var mana=0;
var cp="";
var level=0, hp=0, bp=0;

$(function() {
	/*
	ON READY VARIABLES
	
		currWorld is actually pretty important. It holds
		the current world which dictates the scope/state 
		of (the users current ability to interact through
		commands with) the game.
	*/
	var currWorld, 
		cmds = []; // start at home

	/*FUNCTIONS*/
	function com(s) {  // ADDS THE BREAK!!
		$("#textWindow").append(s+"<br/>");
	}

	/*
		move(world): move to this world
			and update game
	*/
	function move(world) {
		if(currWorld != world) {
			currWorld = world;
			com("Welcome to "+currWorld.name);
		} else {
			com("You are already in "+currWorld.name);
		}
	}

	//add a command to the command history list
	function addcmd(s, cmd) {
		cmds.push(s);
		// TODO: add anchor tag to click on command and run it
		$("#cmds").prepend("<a href='javascript:"+cmd+"'>"+s+"</a><br/>");
	}

	function updateMoney() {
		$("#moneyCell").html("Money: " + pc.money + " gold");
	}

	function updateBp() {
		$("#bpCell").html("BP: " + pc.bp);
	}

	function updateLevel() {
		$("#levelCell").html("Level: " + pc.level);
	}

	function updateMp() {
		$("#mpCell").html("MP: " + pc.mp);
	}

	function updateHp() {
		$("#hpCell").html("HP: " + pc.hp);
	}

	function handleCmd() {
		var input = $("#gameInput").val(); 	// get val
		
		$("#gameInput").val("");			// clear val
		words = input.toLowerCase().split(" ");
		if(words.length === 0) {
			console.log("no words");
			return;
		}
		
		switch(words[0]) {
			case "go":
			case "list":
			case "speak":
				if(words.length < 2) {
					console.log("not enough args");
					return;
				} 
				dictionary[words[0]][words[1]]();
				addcmd(input, "dictionary[words[0]][words[1]]()");	
				break;
			case "buy":
			case "sell":
			case "battle":
			case "weather":
			case "drop":
				dictionary[words[0]]();
				addcmd(input, "dictionary[words[0]]()");	
				break;
			default:
				console.log("no such command");
		}	

	}

	/*
		handles each command input
	*/
	$("#cmd").click(function() {
		handleCmd();
	});
	$(document).keypress(function(e) {
		if(e.which === 13) {
			handleCmd();
		}
	});

	/* 	
		initial character set up form, 
		handles health/mana calculation 
	*/
	$('#healthInput').keyup(function() {
		var health = $(this).val();
		if(health <= 300) {
			var i = 300 - health;
			$('#calcMana').html(i);
		} else {
			$('#calcMana').html("0");
		}
	});

	/*
		handles the initial form and sets up the 
		player and world
	*/
	$('#startFormButton').click(function() {
		//get elements here and set variables
		name = $("#nameInput").val();
		email= $("#emailInput").val();
		health = $("#healthInput").val();
		mana = 300 - health;
		
		if($("#powerRadio").prop("checked", true)) {
			cp = "power";
		} else if($("#magicRadio").prop("checked", true)) {
			cp = "magic";
		} else {
			cp = "hybrid";
		}
		$("#startForm").hide();
	
		pc.name = name;	
		population++;
		pc.isFriendly = true;
		pc.hp = health;
		pc.mp = mana;
		switch(cp) {
			case "power":
				pc.power = 2;
				break;
			case "magic":
				pc.magic = 2;
				break;
			case "hybrid":
				pc.power = 1;
				pc.magic = 1;
				break;
		}
		pc.adef = 5;
		pc.mdef = 5;
		pc.x = 0;
		pc.y = 0;
		pc.money = 500;

		$("#nameCell").html("Name: " + pc.name);
		
		updateLevel();
		updateHp();
		updateMp();
		updateBp();
		updateMoney();

		$("#gameForm").show();
		$("#gameInput").show();
		$("#cmd").show();
		$("#cmdWindow").show();

		$("#textWindow").html("Welcome to RPG</br>");
		com("You find "+ pc.money +" gold on the ground");
		move(worlds[pc.x][pc.y]); // place player at home

	});

dictionary = {
	go: {
		north: function() {
			pc.y = (pc.y + 1) % gridSize;
			move(worlds[pc.x][pc.y]);			
		},
		south: function() {
			pc.y = (pc.y - 1) % gridSize;
			move(worlds[pc.x][pc.y]);			
		},
		east: function() {
			pc.x = (pc.x + 1) % gridSize;
			move(worlds[pc.x][pc.y]);
		},
		west: function() {
			pc.x = (pc.x - 1) % gridSize;
			move(worlds[pc.x][pc.y]);
		},
		to: function() {
			if(words.length < 3) {
				console.log("not enough arguments");
				return;
			}
			var coord = words[2].split(","); // coord = [x, y]
			if(coord[0] < gridSize && coord[1] < gridSize) {
				pc.x = coord[0];
				pc.y = coord[1];
				move(worlds[pc.x][pc.y]);
			} else {
				// error
				console.log("coordinate processing error");
			}		
		}
	},
	list: {
		carry: function() {
			var index=-1;
			var arg="";
			
			for(var i=2; i<words.length; i++) {
				arg+=words[i]+" ";
			}
			arg = arg.trim();
			for(var i=0; i<currWorld.npcs.length; i++) {
				if(currWorld.npcs[i].name.toLowerCase() === arg) {
					index = i;
					break;
				}
			}
			if(words.length > 2 && index != -1) {
				com(">"+currWorld.npcs[index].name);
				for(var i=0; i<currWorld.npcs[index].carry.length; i++) {
					com(">>"+currWorld.npcs[index].carry[i].name);
				}
			} else if(!pc.carry.length) {
					com(">You aren't carrying anything");
			} else {
				com(">"+pc.name+"'s carry");
				for(var i=0; i<pc.carry.length; i++) {
					com(">>"+pc.carry[i].name);
				}
			}
		},
		places: function() {
			for(var i=0; i<gridSize;i++) {
				for(var j=0; j<gridSize;j++) {
					if(worlds[i][j].name.length>0) {
						com(">"+worlds[i][j].name);
					}	
				}
			}
		},	
		npcs: function() {
			if(words.length === 2) {
				var friendlies=0;
				for(var i=0;i<currWorld.npcs.length;i++) {
					if(currWorld.npcs[i].isFriendly) {
						com(">"+currWorld.npcs[i].name);
						friendlies++;
					}
				}	
				if(!friendlies) {
					com(">No friendlies in the area");
				}						
			} else if(words[2].toLowerCase() === "items") {			
				for(var i=0; i<currWorld.npcs.length;i++) {
					com(">"+currWorld.npcs[i].name+": ");
					for(var j=0; j<currWorld.npcs[i].carry.length;j++) {
						com(">>"+currWorld.npcs[i].carry[j].name+" --- "+currWorld.npcs[i].carry[j].price+" gold");	
					}
				}
			} else {
				console.log("i don't know man something went wrong");
			}	
		}	
	},
	buy: function() { // buy Item from Person
		var args = words.slice(1), //get arguments to buy
			toIndex = words.indexOf("from"),
			person = words.slice(toIndex+1).join(" "),
			item = words.slice(1,toIndex).join(" "),
			itemIndex = -1,
			personIndex = -1;
		if(words.length < 4) {
			console.log("not enough arguments");
			return;
		}	
		for(var i=0; i<currWorld.npcs.length; i++) {
			if(person === currWorld.npcs[i].name.toLowerCase()) {
				personIndex = i;
				break;
			}
		}
		if(personIndex === -1) {
			com(">person not found!!");
			return;
		} 
		if(currWorld.npcs[personIndex].carry.length < 1) {
			com(">"+currWorld.npcs[personIndex].name+" is not carrying anything");
			return;
		}
		for(var i=0; i<currWorld.npcs[personIndex].carry.length; i++) {
			if(item === currWorld.npcs[personIndex].carry[i].name.toLowerCase()) {
				itemIndex = i;
				break;
			}
		}
		if(itemIndex === -1) {
			com(">item not found!!");
			return;
		} 
		if((pc.money - currWorld.npcs[personIndex].carry[itemIndex].price) < 0) {
			com(">not enough funds");
			return;
		}
		pc.money -= currWorld.npcs[personIndex].carry[itemIndex].price; // subtract price from user
		pc.carry.push(currWorld.npcs[personIndex].carry[itemIndex]); 	// add item to user's carry
		currWorld.npcs[personIndex].carry.splice(itemIndex,1); 			// remove item from npc
		updateMoney();
	},
	sell: function() { // sell Item to Person
		var args = words.slice(1),
			toIndex = words.indexOf("to"),
			person = words.slice(toIndex+1).join(" "),
			item = words.slice(1,toIndex).join(" "),
			itemIndex = -1,
			personIndex = -1;

		if(words.length < 4) {
			console.log("not enough arguments");
			return;
		}	

		for(var i=0; i<currWorld.npcs.length; i++) {
			if(person === currWorld.npcs[i].name.toLowerCase()) {
				personIndex = i;
				break;
			}
		}
		if(personIndex === -1) {
			com(">person not found!!");
			return;
		} 
		if(pc.carry.length < 1) {
			com(">you are not carrying anything");
			return;
		}
		for(var i=0; i<pc.carry.length; i++) {
			if(item === pc.carry[i].name.toLowerCase()) {
				itemIndex = i;
				break;
			}
		}
		if(itemIndex === -1) {
			com(">item not found!!");
			return;
		}
		pc.money += pc.carry[itemIndex].price/2;
		currWorld.npcs[personIndex].carry.push(pc.carry[itemIndex]);
		pc.carry.splice(itemIndex,1);
		updateMoney();
	},
	battle: function() {
		var creeps = [];
		var c = 100; // may set this some other way
		var r = Math.floor(Math.random()*c); // random integer 0-99
		var sim = []; 
		var totalPercent = 0;
		var creepIndex = -1;

		for(var i=0; i<currWorld.npcs.length; i++) {
			if(!currWorld.npcs[i].isFriendly) {
				creeps.push(currWorld.npcs[i]); // get creeps
			}
		}
		if(!creeps.length) { // no creeps?
			com(">no creeps here");
			return;
		}
		for(var i=0; i<creeps.length; i++) {
			totalPercent += creeps.rate*100;
			if(i===0) {
				sim[i] = creeps[i].rate*100 - 1;
			} else {
				sim[i] = creeps[i].rate*100 + sim[i-1];
			}
		}
		if(totalPercent > 100) {
			console.log("spawn rate percentage error. exiting battle system");
			return;
		} else if(totalPercent < 100) {
			sim.push(99);
		}
		for(var i=0; i<sim.length; i++) {
			if(r <= sim[i]) {
				if(i < creeps.length) {
					creepIndex = i;
				}
				break;
			}
		}
		if(creepIndex < 0) {
			console.log("creep index error. exiting battle system");
			return;
		}

		var creep = creeps[creepIndex];
		var itemSim = [];
		var itemIndex = -1;
		r = Math.floor(Math.random()*c); // new random integer 0-99
		/*
			got creep now assign drops
		*/
		totalPercent = 0;
		r = Math.floor(Math.random()*c);
		if(creep.carry.length != 0) {
			for(var i=0; i<creep.carry.length; i++) {
				totalPercent += creep.carry[i].rate*100;
				if(i===0) {
					itemSim[i] = creep.carry[i].rate*100 - 1;
				} else {
					itemSim[i] = creep.carry[i].rate*100 + itemSim[i-1];
				}	
			}
			if(totalPercent > 100) {
				console.log("drop rate percentage error. exiting battle system");
				return;
			} else if(totalPercent < 100) {
				itemSim.push(99);
			} 
			for(var i=0; i<itemSim.length; i++) {
				if(r <= itemSim[i]) {
					//got it
					if(i < creep.carry.length) {
						itemIndex = i;
					}
					break;
				}
			}
		} else {
			console.log("no drop");
		}
		var item = null;
		if(itemIndex != -1) {
			item = creep.carry[itemIndex];		
		} 

		var pchp = pc.hp;
		var creephp = creep.hp;
		var turn = 0;
		/* time for a battle object */

	},
	weather: function() {
		if(currWorld.weather.length) {
			com(">the weather here is "+currWorld.weather);
		}
	},
	drop: function() {
		var item = words.slice(1).join(" ");
		var index = words.indexOf(item);
		if(index < 0) {
			com(">item not found");
			return;
		} 
		pc.carry.splice(index, 1); // delete first occurrence of item
	}
}});
/*
NOTES:
currently building battle()
prototype each monster, set spawn rates
prototype drops, set drop rates and put them on each monster prior to each battle

TODO's:
robust options menu
option menu ideas:
-list carry after removal of an item

WISHLIST:
be able to type in multiple commands by more dynamically 
checking if an Item or Person has been typed. If a match is 
found and a match with the n+1 node is not a match then Item or Person 
found. You also have to make sure even before that fact that 
no command can be a subset of another command. 

DO NOT DEREFRENCE OBJECTS AND MODIFY THEM 
DO NOT COPY OBJECTS AND EDIT THEM
numbers are cool
*/
