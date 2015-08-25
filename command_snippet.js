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
			if(words.length > 2) {
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
		}
	},
	list: {
		carry: function() {
			var index=-1;
			var arg="";
			
			for(var i=1; i<words.length; i++) {
				arg+=words[i]+" ";
			}
			arg = arg.trim();
			index = worlds[pc.x][pc.y].npcs.indexOf(arg);
			console.log(index);
			if(words.length > 2 && index != -1) {
				com(">"+worlds[pc.x][pc.y].npcs[index].name);
				for(var c in worlds[pc.x][pc.y].npcs[index].carry) {
					com(">>"+c.name);
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
				for(var i=0;i<worlds[pc.x][pc.y].npcs.length;i++) {
					com(">"+worlds[pc.x][pc.y].npcs[i].name);
				}							
			} else {
				switch(words[2].toLowerCase()) {
					case "items":
						for(var i=0; i<worlds[pc.x][pc.y].npcs.length;i++) {
							com(">"+worlds[pc.x][pc.y].npcs[i].name+": ");
							for(var j=0; j<worlds[pc.x][pc.y].npcs[i].carry.length;j++) {
								com(">>"+worlds[pc.x][pc.y].npcs[i].carry[j].name+" --- "+worlds[pc.x][pc.y].npcs[i].carry[j].price+" gold");	
							}
							
						}
						break;
					default:
						console.log("i don't know man something went wrong");
				}
			}

		}		
	},
	give: function() {
		var args = words.slice(1);
		var index=args.indexOf("to");
		if(index===-1) {
			return;
		}
		var item=args.slice(0,index).join(" ");
		var person=args.slice(index+1).join(" ");

		if(item && person) {
			//find the item
			//find the person
		}
	}
}