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
				for(var i=0; i<pc.carry.length; i++) {
					com(">"+pc.carry[i].name);
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
			} else {
				switch(words[2].toLowerCase()) {
					case "items":
						for(var i=0; i<currWorld.npcs.length;i++) {
							com(">"+currWorld.npcs[i].name+": ");
							for(var j=0; j<currWorld.npcs[i].carry.length;j++) {
								com(">>"+currWorld.npcs[i].carry[j].name+" --- "+currWorld.npcs[i].carry[j].price+" gold");	
							}
							
						}
						break;
					default:
						console.log("i don't know man something went wrong");
				}
			}
		}		
	},
	speak: {
		to: function() {
			if(words.length < 3) {
				console.log("not enough arguments");
				return;
			}

		}
	}
}