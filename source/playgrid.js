var BuildPlayGridComponents = function(rows, cols) {
	var x = 0;
	var y = 0;
	var components = [];

	var subcomponents = [];
	var corner = [];
	for(y = 0; y < cols; y += 2) {
		corner[y] = y ? "<br>" : "";
		for(x = 0; x < rows; x += 2) {
			corner[y] += "0&nbsp;&nbsp;";
		}
	}
	subcomponents.push({
		"tag": "th",
		"allowHtml": true,
		"classes": "top left",
		"content": corner.join("")
	});
	for(x = 0; x < rows; x++) {
		subcomponents.push({
			"allowHtml": true,
			"tag": "th",
			"classes": "top",
			"name": ("top" + x),
			"content": "0"
		});
	}
	components.push({
		"components": subcomponents
	});
	for(y = 0; y < cols; y++) {
		subcomponents = [];
		subcomponents.push({
			"allowHtml": true,
			"tag": "th",
			"classes": "left",
			"name": ("left" + y),
			"content": "0"
		});
		for(x = 0; x < rows; x++) {
			subcomponents.push({
				"tag": "td",
				"name": ("col" + y + "row" + x),
				"components": [
					{
						"classes": "fitter"
					}
				]
			});
		}
		components.push({
			"tag": "tr",
			"components": subcomponents
		});
	}

	return components;
};

enyo.kind({
	"name": "PlayGrid",
	"kind": enyo.Control,
	"classes": "playgrid",
	"rows": 8,
	"cols": 8,
	"drawing": false,
	"erasing": false,
	"options": {},
	"published": {
		"fill": true,
		"touch": false
	},
	"components": [
		{
			"name": "table",
			"tag": "table",
			"ontap": "tapTable",

			"onmousedown": "handleMousedown",
			"onmousemove": "handleMousemove",
			"onmouseup": "handleMouseup",
			"onmouseout": "handleMouseout",

			"ontouchstart": enyo.platform.webos ? null : "handleMousedown",
			"ontouchmove": enyo.platform.webos ? null : "handleMousemove",
			"ontouchend": enyo.platform.webos ? null : "handleMouseup",
			"ontouchcancel": enyo.platform.webos ? null : "handleMouseout",

			"components": BuildPlayGridComponents(8, 8)
		}
	],

	"setUpdate": function(cb) {
		this.updateCB = cb;
	},

	"setMode": function(mode, puzzle, section, o) {
		var x = 0;
		var y = 0;
		var solved = Storage.get("picross-solved") || [];
		if(section === "load" || section === "save") {
			section = "custom";
		}
		o = o || 0;

		this.mode = mode;
		this.puzzle = puzzle;
		this.drawing = false;
		this.erasing = false;
		this.clear(true);

		this.removeClass("select");
		switch(this.mode) {
		case "select":
			this.fillLabels(null, true, o);
			this.addClass("select");
			for(y = 0 + o; y < this.rows + o; y++) {
				for(x = 0; x < this.cols; x++) {
					if(y < PUZZLES[section].length &&
					   x < PUZZLES[section][y].length &&
					   PUZZLES[section][y][x].data) {
						this.$["col" + (y - o) + "row" + x].addClass("game");
						if(solved.indexOf(PUZZLES[section][y][x].data) !== -1) {
							this.$["col" + (y - o) + "row" + x].addClass("won");
						}
					} else {
						this.$["col" + (y - o) + "row" + x].removeClass("game");
						this.$["col" + (y - o) + "row" + x].removeClass("won");
					}
				}
			}
			break;
		case "game":
			this.fillLabels(enyo.bind(this, function(x, y) {
				var row = this.puzzle.data.substring(y * 2, (y * 2) + 2);
				return parseInt(row, 16) & Math.pow(2, x);
			}));
			this.options = Storage.get("picross-options") || {};
			//enyo.log(enyo.json.stringify(this.options));
			this.highlightLabels();
			break;
		case "builder":
			this.fillLabels(enyo.bind(this, function(x, y) {
				return false;
			}));
			break;
		default:
			enyo.warn("unhandled grid mode: " + this.mode);
			break;
		}
	},

	"fillLabels": function(filledCB, selection, o) {
		var x = 0;
		var y = 0;
		filledCB = filledCB || function(x, y) {
			return false;
		};
		o = o || 0;

		// set the top labels
		var string = "";
		var num = 0;
		for(x = 0; x < this.rows; x++) {
			for(y = 0; y < this.cols; y++) {
				if(filledCB(x, y)) {
					num++;
				} else if(num) {
					if(string.length) {
						string += "<br>";
					}
					string += ("" + num);
					num = 0;
				}
			}
			if(num) {
				if(string.length) {
					string += "<br>";
				}
				string += ("" + num);
				num = 0;
			}
			if(selection) {
				/* //clever but ugly on a big display
				var tmp = "";
				tmp += "SELECT A".charAt(x);
				tmp += "<br>";
				tmp += " PUZZLE ".charAt(x);
				tmp += "<br>";
				tmp += "<br>";
				tmp += "ABCDEFGH".charAt(x);
				*/
				this.$["top" + x].setContent("ABCDEFGH".charAt(x));
			} else {
				this.$["top" + x].setContent(string || "0");
			}
			this.$["top" + x].removeClass("match");
			string = "";
		}

		// set the left labels
		string = "";
		num = 0;
		for(y = 0; y < this.cols; y++) {
			for(x = 0; x < this.rows; x++) {
				if(filledCB(x, y)) {
					num++;
				} else if(num) {
					if(string.length) {
						string += "&nbsp;&nbsp;";
					}
					string += ("" + num);
					num = 0;
				}
			}
			if(num) {
				if(string.length) {
					string += "&nbsp;&nbsp;";
				}
				string += ("" + num);
				num = 0;
			}
			if(selection) {
				this.$["left" + y].setContent(y + o + 1);
			} else {
				this.$["left" + y].setContent(string || "0");
			}
			this.$["left" + y].removeClass("match");
			string = "";
		}
	},

	"highlightLabels": function() {
		if(!this.options.highlight) {
			return;
		}

		var x = 0;
		var y = 0;
		var filledCB = enyo.bind(this, function(x, y) {
			return this.$["col" + y + "row" + x].hasClass("filled");
		});

		// set the top labels
		var string = "";
		var num = 0;
		for(x = 0; x < this.rows; x++) {
			for(y = 0; y < this.cols; y++) {
				if(filledCB(x, y)) {
					num++;
				} else if(num) {
					if(string.length) {
						string += "<br>";
					}
					string += ("" + num);
					num = 0;
				}
			}
			if(num) {
				if(string.length) {
					string += "<br>";
				}
				string += ("" + num);
				num = 0;
			}
			string = string || "0";
			if(this.$["top" + x].getContent() === string) {
				this.$["top" + x].addClass("match");
			} else {
				this.$["top" + x].removeClass("match");
			}
			string = "";
		}

		// set the left labels
		string = "";
		num = 0;
		for(y = 0; y < this.cols; y++) {
			for(x = 0; x < this.rows; x++) {
				if(filledCB(x, y)) {
					num++;
				} else if(num) {
					if(string.length) {
						string += "&nbsp;&nbsp;";
					}
					string += ("" + num);
					num = 0;
				}
			}
			if(num) {
				if(string.length) {
					string += "&nbsp;&nbsp;";
				}
				string += ("" + num);
				num = 0;
			}
			string = string || "0";
			if(this.$["left" + y].getContent() === string) {
				this.$["left" + y].addClass("match");
			} else {
				this.$["left" + y].removeClass("match");
			}
			string = "";
		}
	},

	"tapTable": function(sender, event) {
		if(this.touch === -1) {
//document.getElementById("debug").innerHTML += "t";
//document.getElementById("debug").innerHTML = "-1t";
			return true;
		}
		if(! enyo.platform.ios &&
		   (this.mode === "game" || this.mode === "builder")) {
			return;
		}
		if(event.originator.tag === "td") {
			var td = event.originator;
			if(this.fill || this.mode !== "game") {
				td.removeClass("marked");
				td.addRemoveClass("filled", !td.hasClass("filled"));
			} else {
				td.removeClass("filled");
				td.addRemoveClass("marked", !td.hasClass("marked"));
			}
		}

		if(this.mode === "builder" || this.mode === "fake") {
			this.fillLabels(enyo.bind(this, function(x, y) {
				return this.$["col" + y + "row" + x].hasClass("filled");
			}));
		} else if(this.mode === "game") {
			this.highlightLabels();
		}
		if(this.updateCB) {
			this.updateCB(this.getValue());
		}
		return true;
	},

	"handleMousedown": function(sender, event) {
//document.getElementById("debug").innerHTML += "d";
		if(this.touch === -1) {
//document.getElementById("debug").innerHTML = "-1d";
			return true;
		}
		this.touch = !!event.touches;
		if(event.touches) {
			event.preventDefault();
		}

		if((this.mode === "game" || this.mode === "builder") &&
		   event.originator.tag === "td") {
			this.drawing = true;
			if((this.fill && event.originator.hasClass("filled")) ||
			   (!this.fill && event.originator.hasClass("marked"))) {
				this.erasing = true;
			}
			this.lastDate = 0;
			return this.handleMousemove(sender, event);
		}
		return true;
	},
	"handleMousemove": function(sender, event) {
//document.getElementById("debug").innerHTML += "m";
		if(this.touch === -1 ||
		   event.originator.tag !== "td") {
//document.getElementById("debug").innerHTML = "-1m";
			this.drawing = false;
			return true;
		}
		if(!!event.touches !== this.touch) {
			return true;
		}
		if(event.touches) {
			event.preventDefault();
		}

		if(this.drawing) {
			var now = new Date();
			if(!this.lastDate) {
				this.lastDate = 0;
				if(this.timer) {
					clearTimeout(this.timer);
				}
			    this.timer = setTimeout(function() {
					this.handleMouseup(sender, event, true);
			    }.bind(this), 500);
			}
			if(now - this.lastDate < 10) {  // throttle move events
				return true;
			}

			var target = event.originator;

			if(event.touches) {
				target = enyo.$[document.elementFromPoint(event.touches[0].pageX,
														  event.touches[0].pageY).id];
			}

			if(this.fill) {
				target.removeClass("marked");
				target.addRemoveClass("filled", !this.erasing);
			} else {
				target.addRemoveClass("marked", !this.erasing);
				target.removeClass("filled");
			}

			this.lastDate = now;
		}
		return true;
	},
	"handleMouseup": function(sender, event, fake) {
//document.getElementById("debug").innerHTML += "u";
		if(this.touch === -1) {
//document.getElementById("debug").innerHTML = "-1u";
//			return true;
		}
		if(!this.drawing && !this.erasing && !fake) {
			return true;
		}

		if(!fake) {
			this.touch = false;
			this.drawing = false;
			this.erasing = false;
		}

		if(this.mode === "builder") {
			this.fillLabels(enyo.bind(this, function(x, y) {
				return this.$["col" + y + "row" + x].hasClass("filled");
			}));
		} else if(this.mode === "game") {
			this.highlightLabels();
		}
		if(this.updateCB) {
			this.updateCB(this.getValue());
		}
		return false;
	},
	"handleMouseout": function(sender, event) {
//document.getElementById("debug").innerHTML += "o";
		if(this.touch === -1) {
//document.getElementById("debug").innerHTML = "-1o";
//			return true;
		}
		this.touch = false;
		if(event.originator.name === "table") {
			this.bubble("onmouseup");
		}
		return true;
	},

	"getValue": function() {
		var x = 0;
		var y = 0;
/*
//old string generation
			var str = [];
			var value = [];

			for(y = 0; y < this.cols; y++) {
				for(x = 0; x < this.rows; x++) {
					if(this.table.$["col" + y + "row" + x].hasClass("filled")) {
						str.push(x);
					}
				}
				value.push(str.join(","));
				str = [];
			}
			this.updateCB(value.join(";"));
*/
		var str = "";
		var row = 0;
		for(y = 0; y < this.rows; y++) {
			row = 0;
			for(x = 0; x < this.cols; x++) {
				if(this.$["col" + y + "row" + x].hasClass("filled")) {
					row += Math.pow(2, x);
				}
			}
			row = row.toString(16);
			if(row.length < 2) {
				row = "0" + row;
			}
			str += row;
		}
		return str;
	},

	"setValue": function(val) {
		var y = 0;
		var x = 0;

		this.clear();

		var oldmode = this.mode;
		this.mode = "fake";

		if(val.indexOf(";") !== -1) {
			// support old pre-alpha strings
			var rows = val.split(";");
			var boxes = [];
			for(y = 0; y < rows.length; y++) {
				boxes = rows[y].split(",");
				for(x = 0; x < boxes.length; x++) {
					if(boxes[x]) {
						this.$["col" + y + "row" + boxes[x]].bubble("ontap");
					}
				}
			}
		} else {
			var row = 0;
			for(y = 0; y < this.rows; y++) {
				row = parseInt(val.substring(y * 2, (y * 2) + 2), 16);
				for(x = 0; x < this.cols; x++) {
					if(Math.pow(2, x) & row) {
						this.$["col" + y + "row" + x].bubble("ontap");
					}
				}
			}
		}
		this.mode = oldmode;
	},

	"clear": function(completely) {
		var x = 0;
		var y = 0;
		var value = [];

		for(y = 0; y < this.cols; y++) {
			for(x = 0; x < this.rows; x++) {
				this.$["col" + y + "row" + x].removeClass("filled");
				this.$["col" + y + "row" + x].removeClass("marked");
				if(completely) {
					this.$["col" + y + "row" + x].removeClass("game");
					this.$["col" + y + "row" + x].removeClass("won");
				}
			}
			value.push("00");
		}

		if(this.mode === "builder") {
			this.fillLabels(enyo.bind(this, function(x, y) {
				return this.$["col" + y + "row" + x].hasClass("filled");
			}));
		} else if(this.mode === "game") {
			this.fillLabels(enyo.bind(this, function(x, y) {
				var row = this.puzzle.data.substring(y * 2, (y * 2) + 2);
				return parseInt(row, 16) & Math.pow(2, x);
			}));
			this.highlightLabels();
		}
		this.updateCB(value.join(""));
	}
});
