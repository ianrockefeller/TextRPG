switch(words[0].toLowerCase()) {
	case "go": // move()
		if(words.length === 1) {
			console.log("");
			return;
		}
		switch(words[1].toLowerCase()) {
			case "north": // go north
				pc.y = (pc.y + 1) % gridSize;
				move(worlds[pc.x][pc.y]);
				break;
			case "south":
				pc.y = (pc.y - 1) % gridSize;
				move(worlds[pc.x][pc.y]);
				break;
			case "east":
				pc.x = (pc.x + 1) % gridSize;
				move(worlds[pc.x][pc.y]);
				break;
			case "west":
				pc.x = (pc.x - 1) % gridSize;
				move(worlds[pc.x][pc.y]);
				break;
			case "to": // go to x,y
				if(words.length === 2) {
					console.log("");
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
				break;
			default:
				console.log("go needs second argument");
		}
		 // caution
		break;
	case "list":
		if(words.length === 1) {
			console.log("");
			return;
		}
		switch(words[1].toLowerCase()) {
			case "carry":
			case "items":
				if(!pc.carry.length) {
					com(">You aren't carrying anything");
				} else {
					for(var i=0; i<pc.carry.length; i++) {
						com(">"+pc.carry[i].name);
					}
				}
				break;
			case "places":
				for(var i=0; i<gridSize;i++) {
					for(var j=0; j<gridSize;j++) {
						if(worlds[i][j].name.length>0) {
							com(">"+worlds[i][j].name);
						}	
					}
				}
				break;
			case "npcs":
				if(words.length === 2) {
					for(var i=0;i<worlds[pc.x][pc.y].npcs.length;i++) {
						com(">"+worlds[pc.x][pc.y].npcs[i].name);
					}							
				} else {
					switch(words[2].toLowerCase()) {
						case "items":
						case "carry":
							for(var i=0; i<worlds[pc.x][pc.y].npcs.length;i++) {
								com(">"+worlds[pc.x][pc.y].npcs[i].name+": ");
								for(var j=0; j<worlds[pc.x][pc.y].npcs[i].carry.length;j++) {
									com(">>"+worlds[pc.x][pc.y].npcs[i].carry[j].name+" --- "+worlds[pc.x][pc.y].npcs[i].carry[j].price+" gold");	
								}
								
							}
							break;
					}
				}
				//TODO: add list npcs items (mother)
				break;
			default:
				console.log("list what??");
		}	
		break;
	case "speak":
		if(words.length === 1) {
			return;
		}
		switch(words[1].toLowerCase()) {
			case "to":
			case "with":
				if(words.length === 2) {
					console.log("who are you trying to speak with?");
					return;
				}
				var found = false;
				for(var i=0; i<worlds[pc.x][pc.y].npcs.length; i++) {
					if(worlds[pc.x][pc.y].npcs[i].name === words[2]) {
						found = true;
					}
				}
				if(found) {
					/* 	speak with person code here
					 	this is only to interact with quests
					 	and special cases, the user does not followed
					 	the usual formula of having to initiate a "speak"
					 	with a NPC in order to exchange goods and what not
					 	this is specifically for story-driven dialogue
					*/
				} else {
					console.log("person not found in this area");
				}
				break;
			default:
				console.log("speak should be followed by to/with");
		}
		break;
	case "give": // give person item

		break;
	default:
		console.log("...");

}