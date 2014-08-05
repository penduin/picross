enyo.kind({
	"name": "Picross",
	"handlers": {
		"onresize": "resizeHandler"
		//"onmousemove": "mousemoveHandler",
		//"onmouseup": "mousemoveHandler"
	},
	"classes": "picross enyo-fit",
	"components": [
		{
			"kind": enyo.FittableRows,
			"classes": "enyo-fit",
			"components": [
				{
					"name": "grid",
					"kind": "PlayGrid"
				},
				{
					"name": "floater",
					"classes": "floater",
					"content": "Select a Puzzle"
				},
				{
					"name": "info",
					"classes": "info",
					"onmousemove": "handleMousemove",
					"fit": true
				},
				{
					"name": "toolbar",
					"classes": "toolbar",
					"kind": "onyx.Toolbar",
					"ontap": "tapToolbar",
					"components": [
						{
							"name": "quit",
							"kind": "onyx.Button",
							"content": "Quit",
							"ontap": "tapQuit"
						},
						{
							"name": "preview",
							"kind": "PuzzleView",
							"showing": false,
							"style": "margin-left: 16px;"
						},
						{
							"name": "nameDec",
							"kind": "onyx.InputDecorator",
							"showing": false,
							"components": [
								{
									"name": "name",
									"kind": "onyx.Input",
									"placeholder": "Puzzle Name..."
								}
							]
						},

						/* select mode */
						{
							"name": "set",
							"classes": "select set",
							"kind": "onyx.RadioGroup",
							"ontap": "tapSet",
							"components": [
								{
									"name": "setOne",
									"value": 0,
									"content": "Set 1",
									"active": true
								},
								{
									"value": 8,
									"content": "2"
								}
							]
						},
						{
							"name": "random",
							"classes": "select",
							"kind": "onyx.Button",
							"content": "Random",
							"ontap": "pickRandom"
						},

						/* game mode */
						{
							"kind": "onyx.Button",
							"content": "Clear",
							"ontap": "tapClear",
							"classes": "game"
						},
						{
							"name": "tool",
							"kind": "Group",
							"classes": "game icongroup",
							"defaultKind": "onyx.IconButton",
							"ontap": "tapTool",
							"components": [
								{
									"name": "mark",
									"value": "mark",
									"src": "images/mark.png"
								},
								{
									"name": "fill",
									"value": "fill",
									active: true,
									"src": "images/fill.png"
								}
							]
						},

						/* builder mode */
						{
							"kind": "onyx.Button",
							"classes": "builder",
							"content": "Clear",
							"ontap": "tapClear"
						},
						{
							"classes": "icongroup",
							"components": [
								{
									"name": "load",
									"kind": "onyx.IconButton",
									"classes": "builder",
									"src": "images/load.png",
									"ontap": "tapLoad"
								},
								{
									"name": "save",
									"kind": "onyx.IconButton",
									"classes": "builder",
									"src": "images/save.png",
									"ontap": "tapSave"
								}
							]
						},
						{
							"showing": false,
							"name": "send",
							"classes": "builder",
							"allowHtml": true,
							"content": "Send"
						},
						{
							"showing": false,
							"kind": "onyx.InputDecorator",
							"classes": "builder",
							"components": [
								{
									"name": "data",
									"kind": "onyx.Input",
									"placeholder": "Puzzle Data...",
									"onchange": "updateValue"
								}
							]
						}
					]
				}
			]
		},
		{
			"name": "popupWin",
			"kind": "onyx.Popup",
			"modal": true,
			"centered": true,
			"floating": true,
			"autoDismiss": false,
			"style": "width: 260px; height: 210px;",
			"classes": "center",
			"components": [
				{
					"classes": "pad",
					"components": [
						{
							"content": "You've solved the puzzle!",
							"style": "margin-bottom: 20px;"
						},
						{
							"name": "summary",
							"kind": "PuzzleView"
						}
					]
				},
				{
					"kind": "onyx.Button",
					"content": "Yayy!",
					"classes": "onyx-affirmative",
					"ontap": "yayyConfirm"
				}
			]
		},
		{
			"name": "popupOverwrite",
			"kind": "onyx.Popup",
			"modal": true,
			"centered": true,
			"floating": true,
			"autoDismiss": false,
			"style": "width: 260px; height: 210px;",
			"classes": "center",
			"components": [
				{
					"classes": "pad",
					"components": [
						{
							"content": "Save over this puzzle?",
							"style": "margin-bottom: 20px;"
						},
						{
							"name": "overwrite",
							"kind": "PuzzleView"
						}
					]
				},
				{
					"kind": "onyx.Button",
					"content": "Cancel",
					"ontap": "overwriteCancel"
				},
				{
					"tag": "span",
					"content": " "
				},
				{
					"kind": "onyx.Button",
					"content": "Overwrite",
					"classes": "onyx-negative",
					"ontap": "overwriteConfirm"
				}
			]
		},
		{
			"name": "popupClear",
			"kind": "onyx.Popup",
			"modal": true,
			"centered": true,
			"floating": true,
			"autoDismiss": false,
			"style": "width: 260px; height: 100px;",
			"classes": "center",
			"components": [
				{
					"content": "Clear and reset the grid?",
					"classes": "pad"
				},
				{
					"kind": "onyx.Button",
					"content": "Cancel",
					"ontap": "clearCancel"
				},
				{
					"tag": "span",
					"content": " "
				},
				{
					"kind": "onyx.Button",
					"content": "Clear",
					"classes": "onyx-negative",
					"ontap": "clearConfirm"
				}
			]
		},
		{
			"name": "popupQuit",
			"kind": "onyx.Popup",
			"modal": true,
			"centered": true,
			"floating": true,
			"autoDismiss": false,
			"style": "width: 260px; height: 100px;",
			"classes": "center",
			"components": [
				{
					"content": "Are you sure you want to quit?",
					"classes": "pad"
				},
				{
					"kind": "onyx.Button",
					"content": "Cancel",
					"ontap": "quitCancel"
				},
				{
					"tag": "span",
					"content": " "
				},
				{
					"kind": "onyx.Button",
					"content": "Quit",
					"classes": "onyx-negative",
					"ontap": "quitConfirm"
				}
			]
		}
	],

	"init": function(app) {
		this.app = app;
		this.mode = null;
		this.puzzle = {};
		this.$.grid.setUpdate(enyo.bind(this, this.gridChanged));
		this.solved = Storage.get("picross-solved") || [];
		this.options = Storage.get("picross-options") || {};

		// clean up solved list while we're at it
		var known = [];
		for(key in PUZZLES) {
			for(row in PUZZLES[key]) {
				for(col in PUZZLES[key][row]) {
					if(PUZZLES[key][row][col] &&
					   PUZZLES[key][row][col].data) {
						known.push(PUZZLES[key][row][col].data);
					}
				}
			}
		}
		this.solved = this.solved.filter(function(val) {
			return (known.indexOf(val) !== -1);
		});
		Storage.set("picross-solved", this.solved);

		this.bubble("onresize");
		return this;
	},

	"resizeHandler": function(sender, event) {
		var h = document.body.clientHeight;

		if(h > 640) {
			this.$.grid.addClass("big");
			this.$.grid.removeClass("small");
		} else if(h < 420) {
			this.$.grid.removeClass("big");
			this.$.grid.addClass("small");
		} else {
			this.$.grid.removeClass("big");
			this.$.grid.removeClass("small");
		}
	},
	"mousemoveHandler": function(sender, event) {
		this.$.grid.bubble("onmouseup");
	},

	"setMode": function(mode, puzzle, key, x, y) {
		this.mode = mode;
		this.puzzle = puzzle;
		this.$.info.setContent("");
//		this.$.set.setActive(this.$.setOne);
		if(this.puzzle) {
			enyo.log("loaded puzzle: " + puzzle.name);
			this.puzzle.key = key;
			if(x !== undefined && y !== undefined) {
				this.puzzle.x = x;
				this.puzzle.y = y;
				var str = enyo.cap(key) + " Puzzle ";
				str += (y + 1);
				str += "-";
				str += "ABCDEFGH".charAt(x);
				if(this.mode === "builder" && this.puzzle.name) {
					str += (": " + this.puzzle.name);
				}
				this.$.info.setContent(str);
			}
			if(puzzle.name) {
				this.$.name.setValue(puzzle.name);
			}
		}

		this.$.toolbar.removeClass("select");
		this.$.toolbar.removeClass("game");
		this.$.toolbar.removeClass("builder");
		this.$.floater.setContent("Select a Puzzle");
		this.$.floater.hide();
		this.$.quit.setContent("Quit");
		this.$.preview.hide();
		this.$.nameDec.hide();
		this.$.random.hide();
		this.$.set.setShowing(false);

		switch(this.mode) {
		case "easy":
		case "normal":
		case "hard":
			this.$.random.show();
			this.$.set.setShowing(!(typeof(FULL) === "undefined" || !FULL));
			// fallthrough
		case "custom":
		case "load":
		case "save":
			this.$.floater.show();
			this.$.quit.setContent("Back");
			this.$.toolbar.addClass("select");
			var o = this.$.set.active.value || 0;
			this.$.grid.setMode("select", null, this.mode, o);
			if(this.mode === "load") {
				this.$.floater.setContent("Load a Puzzle");
				this.$.info.setContent("Select a previously saved puzzle");
			} else if(this.mode === "save") {
				this.$.floater.setContent("Save a Puzzle");
				this.$.info.setContent("Name and tap a slot for your puzzle");
				this.$.preview.display({
					"data": this.gridValue || "0000000000000000"
				}, 3, true);
				this.$.preview.show();
				this.$.nameDec.show();
				this.$.name.focus();
			} else {
				var info = enyo.cap(this.mode) + " Puzzles";
				if(typeof(FULL) === "undefined" || !FULL) {
					info += " (112 more in full version)";
				}
				this.$.info.setContent(info);
			}
			break;
		case "game":
			this.puzzle = puzzle;
			this.$.toolbar.addClass("game");
			this.$.grid.setMode("game", this.puzzle);
			break;
		case "builder":
			this.$.toolbar.addClass("builder");
			this.$.grid.setMode("builder");
			if(this.puzzle && this.puzzle.data) {
				this.$.grid.setValue(this.puzzle.data);
			} else if(this.gridValue) {
				this.$.grid.setValue(this.gridValue);
			}
			break;
		default:
			enyo.warn("unimplemented mode: " + mode);
			break;
		}
	},

	"tapClear": function(sender, event) {
		this.$.popupClear.show();
		this.$.popupClear.addClass("pop");
	},
	"clearCancel": function(sender, event) {
		this.$.grid.setTouch(-1);
		setTimeout(function() {
			this.$.grid.setTouch(false);
		}.bind(this), 300);
		this.$.popupClear.removeClass("pop");
		this.$.popupClear.hide();
		return true;
	},
	"clearConfirm": function(sender, event) {
		this.$.grid.clear();
		if(this.mode === "builder") {
			this.$.info.setContent("");
		}
		this.$.name.setValue("");
		this.$.data.setValue("");

		this.$.grid.setTouch(-1);
//document.getElementById("debug").innerHTML = "wa";
		setTimeout(function() {
//document.getElementById("debug").innerHTML = "bam";
			this.$.grid.setTouch(false);
		}.bind(this), 300);
		this.$.popupClear.removeClass("pop");
		this.$.popupClear.hide();

		return true;
	},

	"tapSet": function(sender, event) {
		this.$.grid.setMode("select", null, this.mode, this.$.set.active.value);
	},

	"overwriteCancel": function(sender, event) {
		this.$.popupOverwrite.hide();
		return true;
	},
	"overwriteConfirm": function(sender, event) {
		var x = this.puzzle.x || 0;
		var y = this.puzzle.y || 0;
		this.savePuzzle();
		this.$.popupOverwrite.hide();
		var puz = {  // copy so we don't stuff extra crap into Storage
			"name": PUZZLES.custom[y][x].name || "",
			"data": PUZZLES.custom[y][x].data
		};
		this.setMode("builder", puz, "custom", x, y);
		return true;
	},

	"tapQuit": function(sender, event) {
		switch(this.mode) {
		case "easy":
		case "normal":
		case "hard":
		case "custom":
			this.quitConfirm();
			break;
		case "load":
		case "save":
			this.setMode("builder");
			break;
		default:
			if(this.$.grid.getValue() === "0000000000000000" ||
			   (this.puzzle && this.puzzle.data &&
				this.$.grid.getValue() === this.puzzle.data)) {
				this.quitConfirm();
			} else {
				this.$.popupQuit.show();
				this.$.popupQuit.addClass("pop");
			}
			break;
		}
	},
	"quitCancel": function(sender, event) {
		this.$.grid.setTouch(-1);
		setTimeout(function() {
			this.$.grid.setTouch(false);
		}.bind(this), 300);
		this.$.popupQuit.removeClass("pop");
		this.$.popupQuit.hide();
		return true;
	},
	"quitConfirm": function(sender, event) {
		this.$.grid.setTouch(-1);
		setTimeout(function() {
			this.$.grid.setTouch(false);
		}.bind(this), 300);
		this.$.popupQuit.removeClass("pop");
		this.$.popupQuit.hide();
		this.$.popupWin.removeClass("pop");
		this.$.popupWin.hide();
		this.gridValue = null;
		if(this.mode === "game") {
			this.setMode(this.puzzle.key);
		} else {
			if(this.app) {
				this.app.mainMenu();
			}
		}
	},
	"yayyConfirm": function(sender, event) {
		if(this.options.autoquit) {
			this.quitConfirm();
		} else {
			this.$.popupWin.removeClass("pop");
			this.$.popupWin.hide();
		}
	},

	"tapTool": function(sender, event) {
		this.$.grid.setFill(this.$.tool.active.value === "fill");
		return false;
	},

	"tapLoad": function(sender, event) {
		this.gridValue = this.$.grid.getValue();
		this.setMode("load");
	},
	"tapSave": function(sender, event) {
		this.gridValue = this.$.grid.getValue();
		this.setMode("save");
	},

	"tapToolbar": function(sender, event) {
		if(this.mode === "game" && (event.originator.name === "toolbar" ||
									event.originator.name === "tool")) {
			if(this.$.tool.active.value === "fill") {
				this.$.tool.setActive(this.$.mark);
			} else {
				this.$.tool.setActive(this.$.fill);
			}
			this.$.grid.setFill(this.$.tool.active.value === "fill");
		}
	},

	"pickRandom": function(sender, event) {
		var key = this.mode;
		var setsize = 8;
		if(typeof(FULL) === "undefined" || !FULL) {
			setsize = 2;
		}
		var min = this.$.set.active.value;

		var data = null;
		if(this.options.randomunsolved) {
			enyo.log("prefer");
			var pickfrom = [];
			for(y = min; y < min + setsize; y++) {
				for(x = 0; x < 8; x++) {
					data = PUZZLES[key][y][x].data;
					if(this.solved.indexOf(data) === -1) {
						pickfrom.push({
							"y": (y - min) + 1,
							"x": x + 1
						});
					}
				}
			}
			if(pickfrom.length) {
				var pick = Math.floor((Math.random() * pickfrom.length));
				this.gridChanged(null, pickfrom[pick].x, pickfrom[pick].y);
				return;
			}
		}

		var row = Math.floor((Math.random() * setsize) + 1);
		var col = Math.floor((Math.random() * PUZZLES[key][row-1].length) + 1);

		this.gridChanged(null, col, row);
	},

	"gridChanged": function(value, x, y) {
		var o = this.$.set.active.value || 0;

		switch(this.mode) {
		case "easy":
		case "normal":
		case "hard":
		case "custom":
		case "load":
		case "save":
			var key = this.mode;
			if(key === "load" || key === "save") {
				key = "custom";
			}

			if(parseInt(value, 16) || (x && y)) {
				if(x && y) {
					x--;
					y--;
				} else {
					x = 0;
					y = 0;
					var row = "";
					while(row = value.substring(y * 2, (y * 2) + 2)) {
						if((x = parseInt(row, 16))) {
							x = Math.log(x) / Math.log(2);
							break;
						}
						y++;
					}
				}

				this.$.grid.clear();
				if(this.mode !== "save" &&
				   (y + o >= PUZZLES[key].length ||
					x >= PUZZLES[key][y + o].length ||
					!PUZZLES[key][y + o][x].data)) {
					enyo.log("no PUZZLE["+key+"]["+(y+0)+"]["+x+"].data");
					break;
				}
				if(this.mode === "load") {
					this.setMode("builder", PUZZLES[key][y][x], key, x, y);
				} else if(this.mode === "save") {
					// expand custom rows/col as needed
					while(PUZZLES.custom.length < y + 1) {
						PUZZLES.custom.push([]);
					}
					while(PUZZLES.custom[y].length < x + 1) {
						PUZZLES.custom[y].push({});
					}

					this.puzzle = this.puzzle || {};
					this.puzzle.x = x;
					this.puzzle.y = y;
					if(PUZZLES.custom[y][x].data) {
						this.$.popupOverwrite.removeClass("pop");
						this.$.popupOverwrite.show();
						this.$.popupOverwrite.addClass("pop");
						this.$.overwrite.display(PUZZLES.custom[y][x], 8);
					} else {
						this.savePuzzle();
						this.setMode("builder", PUZZLES[key][y][x], key, x, y);
					}
				} else {
					this.setMode("game", PUZZLES[key][y + o][x], key, x, y + o);
				}
			}
			break;
		case "game":
			if(value === this.puzzle.data) {
				enyo.log("win!");
				this.$.popupWin.show();
				this.$.popupWin.addClass("pop");

				this.$.summary.display(this.puzzle, 8, false);
				if(this.solved.indexOf(this.puzzle.data) === -1) {
					this.solved.push(this.puzzle.data);
				}
				Storage.set("picross-solved", this.solved);

				if(this.app) {
					/* earn any badges */
					this.app.badge("first");

					var keys = {
						"easy": null,
						"normal": null,
						"hard": null
					};
					var data = "";

					if(this.solved.length >= 64) {
						var clear = {
							"easy1": true,
							"normal1": true,
							"hard1": true,
							"easy2": true,
							"normal2": true,
							"hard2": true
						};
						for(key in keys) {
							for(y in PUZZLES[key]) {
								for(x in PUZZLES[key][y]) {
									data = PUZZLES[key][y][x].data;
									if(this.solved.indexOf(data) === -1) {
										if(y < 8) {
											clear[key + "1"] = false;
										} else {
											clear[key + "2"] = false;
										}
										break;
									}
								}
							}
						}
						for(key in clear) {
							if(clear[key]) {
								this.app.badge(key);
							}
						}
						if(clear.easy1 && clear.normal1 && clear.hard1) {
							this.app.badge("set1");
						}
						if(clear.easy2 && clear.normal2 && clear.hard2) {
							this.app.badge("set2");
						}
					}
					if(this.solved.length >= 48) {
						var demo = true;
						for(key in keys) {
							for(y in [0, 1]) {
								for(x in PUZZLES[key][y]) {
									data = PUZZLES[key][y][x].data;
									if(this.solved.indexOf(data) === -1) {
										demo = false;
										break;
									}
								}
							}
						}
						if(demo) {
							this.app.badge("demo");
						}
					}
				}
			}
			break;
		case "builder":
			this.$.send.setContent([
				"<a href='mailto:owenswerk@gmail.com",
				"?subject=Picross%20puzzle:",
				"&body=", value,
				"'>Send</a>"
			].join(""));
			this.$.data.setValue(value);
			break;
		default:
			enyo.warn("unimplemented gridChanged: " + this.mode);
			break;
		}
	},

	"savePuzzle": function() {
		var x = this.puzzle.x || 0;
		var y = this.puzzle.y || 0;

		if(this.gridValue === "0000000000000000") {
			// clear it out
			PUZZLES.custom[y][x] = {};
		} else {
			PUZZLES.custom[y][x] = {
				"data": this.gridValue,
				"name": this.$.name.getValue()
			};
		}

		var trimmed = [];
		var row = [];
		var obj = {};
		for(y in PUZZLES.custom) {
			row = [];
			for(x in PUZZLES.custom[y]) {
				obj = {};
				if(PUZZLES.custom[y][x].data) {
					obj.data = PUZZLES.custom[y][x].data;
					obj.name = PUZZLES.custom[y][x].name || "";
				}
				row.push(obj);
			}
			trimmed.push(row);
		}
		Storage.set("picross-custom", trimmed); //PUZZLES.custom
		enyo.log("saved");

		/* earn any badges */
		if(this.app) {
			var num = 0;
			var rows = 0;
			var curRow = 0;
			for(y in PUZZLES.custom) {
				curRow = 0;
				for(x in PUZZLES.custom[y]) {
					if(PUZZLES.custom[y][x].data) {
						num++;
						curRow++;
						if(curRow >= 8) {
							rows++;
						}
					}
				}
			}
			if(num) {
				this.app.badge("creation");
			}
			if(rows >= 3) {
				this.app.badge("row");
			}
			if(num >= 64) {
				this.app.badge("full");
			}
			if(num >= 32) {
				this.app.badge("half");
			}
		}
	},

	"updateValue": function(sender, event) {
		this.$.grid.setValue(this.$.data.getValue());
	},

	"handleMousemove": function(sender, event) {
		this.$.grid.handleMouseup();
	}
});
