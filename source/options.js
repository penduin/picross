//todo: 3 strikes and you're out
//todo: toggle/radiogroup for tools?
//todo: buttons on puzzle select?

enyo.kind({
	"name": "Options",
	"kind": enyo.FittableRows,
	"classes": "enyo-fit",
	"components":
	[
		{
			"kind": "onyx.Toolbar",
			"components": [
				{
					"kind": "onyx.Button",
					"content": "Back",
					"ontap": "tapBack"
				},
				{
					"name": "tab",
					"kind": "onyx.RadioGroup",
					"ontap": "tapTab",
					"classes": "tab",
					"components": [
						{
							"value": "options",
							"content": "Options",
							"active": true
						},
						{
							"value": "records",
							"content": "Data"
						},
						{
							"value": "credits",
							"content": "Credits"
						}
					]
				}
			]
		},
		{
			"name": "scroll",
			"kind": enyo.Scroller,
			"thumb": true,
			"fit": true,
			"components": [
				{
					"name": "top",
					"tag": "hr"
				},
				{
					"name": "options",
					"showing": true,
					"classes": "options center",
					"components": [
						{
							"kind": "onyx.Groupbox",
							"classes": "list",
							"components": [
								{
									"kind": "onyx.GroupboxHeader",
									"content": "Game Settings"
								},
								{
									"classes": "listitem",
									"components": [
										{
											"name": "highlight",
											"kind": "onyx.ToggleButton",
											"onChange": "changeHighlight"
										},
										{
											"classes": "setting",
											"content": "Clue match highlighting"
										}
									]
								},
								{
									"classes": "listitem",
									"components": [
										{
											"name": "autoquit",
											"kind": "onyx.ToggleButton",
											"onChange": "changeAutoquit"
										},
										{
											"classes": "setting",
											"content": "Auto-quit when solved"
										}
									]
								},
								{
									"classes": "listitem",
									"components": [
										{
											"name": "randomunsolved",
											"kind": "onyx.ToggleButton",
											"onChange": "changeRandomunsolved"
										},
										{
											"classes": "setting",
											"content": "Random prefers unsolved"
										}
									]
								}
							]
						},
						{
							"name": "submit",
							"showing": false,
							"kind": "onyx.Button",
							"content": "Submit Custom Puzzles",
							"ontap": "tapSubmit"
						}
					]
				},
				{
					"name": "records",
					"showing": false,
					"classes": "options center",
					"components": [
						{
							"kind": "onyx.Button",
							"classes": "onyx-negative",
							"content": "Erase Custom Puzzles",
							"ontap": "tapErase",
							"disabled": (typeof(FULL) === "undefined" || !FULL)
						},
						{
							"tag": "br"
						},
						{
							"name": "badges",
							"showing": false,
							"components": [
								{
									"kind": "onyx.Button",
									"classes": "onyx-negative",
									"content": "Clear Earned Badges",
									"ontap": "tapClear"
								},
								{
									"tag": "hr"
								},
								{
									"name": "badgelist",
									"kind": "onyx.Groupbox",
									"classes": "list",
									"components": [
										{
											"kind": "onyx.GroupboxHeader",
											"content": "Earned Badges"
										}
									]
								},
								{
									"tag": "hr"
								}
							]
						},
						{
							"kind": "onyx.Button",
							"classes": "onyx-negative",
							"content": "Reset Solved Records",
							"ontap": "tapReset"
						},
						{
							"tag": "br"
						},
						{
							"name": "data"
						}
					]
				},
				{
					"name": "credits",
					"showing": false,
					"components": [
						{
							"kind": "onyx.Groupbox",
							"classes": "list",
							"components": [
								{
									"kind": "onyx.GroupboxHeader",
									"content": "Game Program"
								},
								{
									"classes": "listitem",
									"content": "Owen Swerkstrom"
								}
							]
						},
						{
							"kind": "onyx.Groupbox",
							"classes": "list",
							"components": [
								{
									"kind": "onyx.GroupboxHeader",
									"content": "Puzzle Design"
								},
								{
									"classes": "listitem",
									"content": "Owen Swerkstrom"
								},
								{
									"classes": "listitem",
									"content": "Kim Guyer"
								},
								{
									"classes": "listitem",
									"content": "Jacob Cappell",
									"ontap": "tapJacob"
								},
								{
									"classes": "listitem",
									"content": "Micah N Gorrell"
								}
							]
						},
						{
							"kind": "onyx.Groupbox",
							"classes": "list",
							"components": [
								{
									"kind": "onyx.GroupboxHeader",
									"content": "Testing"
								},
								{
									"classes": "listitem",
									"content": "Kim Guyer"
								},
								{
									"classes": "listitem",
									"content": "Micah N Gorrell"
								},
								{
									"classes": "listitem",
									"content": "Christian Price"
								},
								{
									"classes": "listitem",
									"content": "Erika Price"
								},
								{
									"classes": "listitem",
									"content": "Rodney Price"
								},
								{
									"classes": "listitem",
									"content": "Paul King"
								}
							]
						},
						{
							"kind": "onyx.Groupbox",
							"classes": "list",
							"components": [
								{
									"kind": "onyx.GroupboxHeader",
									"content": "Library"
								},
								{
									"classes": "listitem",
									"content": "Palm, HP - enyo"
								},
								{
									"classes": "listitem",
									"content": "JayCanuck - webos-ext"
								},
								{
									"classes": "listitem",
									"content": "Jack Newcombe - Storage"
								}
							]
						},
						{
							"classes": "center",
							"content": "Dedicated to Mildred Pedersen"
						},
						{
							"tag": "br"
						}
					]
				}
			]
		},
		{
			"name": "popupReset",
			"kind": "onyx.Popup",
			"modal": true,
			"centered": true,
			"floating": true,
			"autoDismiss": false,
			"style": "width: 280px; height: 130px;",
			"classes": "center",
			"components": [
				{
					"content": "Are you sure you want to reset solved records?",
					"classes": "pad"
				},
				{
					"kind": "onyx.Button",
					"content": "Cancel",
					"ontap": "tapCancel"
				},
				{
					"tag": "span",
					"content": " "
				},
				{
					"kind": "onyx.Button",
					"content": "Reset",
					"classes": "onyx-negative",
					"ontap": "resetConfirm"
				}
			]
		},
		{
			"name": "popupErase",
			"kind": "onyx.Popup",
			"modal": true,
			"centered": true,
			"floating": true,
			"autoDismiss": false,
			"style": "width: 280px; height: 130px;",
			"classes": "center",
			"components": [
				{
					"content": ["Are you sure you want to erase all of your",
								" custom puzzles?"].join(""),
					"classes": "pad"
				},
				{
					"kind": "onyx.Button",
					"content": "Cancel",
					"ontap": "tapCancel"
				},
				{
					"tag": "span",
					"content": " "
				},
				{
					"kind": "onyx.Button",
					"content": "Erase",
					"classes": "onyx-negative",
					"ontap": "eraseConfirm"
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
			"style": "width: 280px; height: 130px;",
			"classes": "center",
			"components": [
				{
					"content": ["Are you sure you want to clear your",
								" earned badges?"].join(""),
					"classes": "pad"
				},
				{
					"kind": "onyx.Button",
					"content": "Cancel",
					"ontap": "tapCancel"
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
		}
	],

	"init": function(app) {
		this.app = app;
		this.jacobCount = 0;
		this.options = Storage.get("picross-options") || {};
		this.$.highlight.setValue(this.options.highlight);
		this.$.autoquit.setValue(this.options.autoquit);
		this.$.randomunsolved.setValue(this.options.randomunsolved);

		this.fillBadges();
		this.asyncFillRecords();
		return this;
	},

	"tapBack": function(sender, event) {
		this.todo = [];
		if(this.app) {
			this.app.mainMenu();
		}
	},

	"tapTab": function(sender, event) {
		this.$.options.hide();
		this.$.records.hide();
		this.$.credits.hide();
		if(this.$.tab.active.value === "records") {
			this.$.records.show();
		} else if(this.$.tab.active.value === "options") {
			this.$.options.show();
		} else {
			this.$.credits.show();
		}
		this.$.scroll.scrollTo(0, 0);
	},

	"changeHighlight": function(sender, event) {
		this.options.highlight = this.$.highlight.getValue();
		Storage.set("picross-options", this.options);
	},
	"changeAutoquit": function(sender, event) {
		this.options.autoquit = this.$.autoquit.getValue();
		Storage.set("picross-options", this.options);
	},
	"changeRandomunsolved": function(sender, event) {
		this.options.randomunsolved = this.$.randomunsolved.getValue();
		Storage.set("picross-options", this.options);
	},

	"tapSubmit": function(sender, event) {
		var request = new enyo.webOS.ServiceRequest({
			"service": "palm://com.palm.applicationManager",
			"method": "open"
		});
		request.response(this, "serviceResult");
		request.error(this, "serviceResult");

		var data = [];
		for(y in PUZZLES.custom) {
			for(x in PUZZLES.custom[y]) {
				if(PUZZLES.custom[y][x].data) {
					data.push({
						"name": PUZZLES.custom[y][x].name || "",
						"data": PUZZLES.custom[y][x].data
					});
				}
			}
		}

		request.go({
			"id": "com.palm.app.email",
			"params": {
				"summary": "Picross Puzzles",
				"text": enyo.json.stringify(data),
				"recipients": [
					{
						"type": "email",
						"contactDisplay": "penduinbits",
						"role": 1,
						"value": "owenswerk@gmail.com"
					}
				]
			}
		});
	},
	"serviceResult": function(sender, result) {
		enyo.log(enyo.json.stringify(result, null, 4));
	},

	"tapReset": function(sender, event) {
		this.$.popupReset.removeClass("pop");
		this.$.popupReset.show();
		this.$.popupReset.addClass("pop");
	},
	"resetConfirm": function(sender, event) {
		Storage.set("picross-solved", []);
		this.$.data.hide();
		this.$.popupReset.hide();
	},
	"tapErase": function(sender, event) {
		this.$.popupErase.removeClass("pop");
		this.$.popupErase.show();
		this.$.popupErase.addClass("pop");
	},
	"eraseConfirm": function(sender, event) {
		Storage.set("picross-custom", []);
		PUZZLES.custom = [];

		if(this.$.data.$.custom) {
			this.$.data.$.custom.hide();
		}
		this.$.popupErase.hide();
	},
	"tapCancel": function(sender, event) {
		this.$.popupReset.hide();
		this.$.popupErase.hide();
		this.$.popupClear.hide();
	},

	"tapClear": function(sender, event) {
		this.$.popupClear.removeClass("pop");
		this.$.popupClear.show();
		this.$.popupClear.addClass("pop");
	},
	"clearConfirm": function(sender, event) {
		this.options.badge = {};
		Storage.set("picross-options", this.options);
		this.$.badges.hide();
		this.$.popupClear.hide();
	},

	"fillBadges": function() {
		var badges;
		var earned = this.options.badge || {};

		if(this.app) {
			badges = this.app.getBadges();
			for(key in badges) {
				if(earned[key]) {
					this.$.badges.show();
					this.$.badgelist.createComponent({
						"classes": "listitem",
						"components": [
							{
								"tag": "img",
								"classes": "inline",
								"src": badges[key].icon
							},
							{
								"classes": "inline award",
								"allowHtml": true,
								"components": [
									{
										"content": badges[key].title
									},
									{
										"classes": "detail",
										"content": badges[key].message
									}
								]
							}
						]
					}).render();
				}
			}
		}
	},

	"asyncFillRecords": function() {
		this.todo = [];
		var solved = Storage.get("picross-solved") || [];

		for(key in PUZZLES) {
			if(["easy", "normal", "hard", "custom"].indexOf(key) === -1) {
				continue;
			}
			for(y in PUZZLES[key]) {
				for(x in PUZZLES[key][y]) {
					if(solved.indexOf(PUZZLES[key][y][x].data) !== -1) {
						this.todo.push({
							"key": key,
							"y": y,
							"x": x
						});
					}
				}
			}
		}

		var fill = null;
		fill = enyo.bind(this, function() {
			if(this.todo.length) {
				var item = this.todo.shift();
				var str = "";
				var group = null;

				if(!this.$.data.$[item.key]) {
					this.$.data.createComponent({
						"name": item.key,
						"kind": "onyx.Groupbox",
						"classes": "list",
						"components": [
							{
								"kind": "onyx.GroupboxHeader",
								"content": ["Solved ", enyo.cap(item.key),
											" Puzzles"].join("")
							}
						]
					}).render();
				}

				str = " ";
				str += (parseInt(item.y, 10) + 1).toString();
				str += "-";
				str += "ABCDEFGH".charAt(item.x);
				if(PUZZLES[item.key][item.y][item.x].name) {
					str += ": " + PUZZLES[item.key][item.y][item.x].name;
				}

				this.$.data.$[item.key].createComponent({
					"classes": "listitem",
					"components": [
						{
							"kind": "PuzzleView",
							"scale": 4,
							"puzzle": PUZZLES[item.key][item.y][item.x]
						},
						{
							"style": "display: inline;",
							"content": str
						}
					]
				}).render();

				setTimeout(enyo.bind(this, fill), 1);
			}
		});
		fill();
	},

	"tapJacob": function(sender, event) {
		this.jacobCount++;
		if(this.jacobCount === 2) {
			this.$.submit.show();
		} else {
			this.$.submit.hide();
		}
	}
});
