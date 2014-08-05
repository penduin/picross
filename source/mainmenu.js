enyo.kind({
	"name": "MainMenu",
	"handlers": {
		"onresize": "resizeHandler"
	},
	"components": [
		{
			"name": "mainmenu",
			"kind": enyo.Control,
			"classes": "menu",
			"ontap": "handleTap",
			"components": [
				{
					"kind": "onyx.Toolbar",
					"components": [
						{
							"tag": "img",
							"src": "icon48.png"
						},
						{
							"name": "title",
							"content": "Picross"
						}
					]
				},
				{
					"tag": "hr"
				},
				{
					"classes": "column",
					"components": [
						{
							"components": [
								{
									"name": "howto",
									"kind": "onyx.Button",
									"classes": "half1",
									"content": "How to Play"
								},
								{
									"name": "options",
									"kind": "onyx.Button",
									"classes": "half2",
									"content": "Options"
								}
							]
						},
						{
							"tag": "hr"
						},
						{
							"components": [
								{
									"name": "easy",
									"kind": "onyx.Button",
									"classes": "difficulty",
									"style": "background-color: #cec",
									"content": "Easy Puzzles"
								},
								{
									"name": "normal",
									"kind": "onyx.Button",
									"classes": "difficulty",
									"style": "background-color: #eec",
									"content": "Normal Puzzles"
								},
								{
									"name": "hard",
									"kind": "onyx.Button",
									"classes": "difficulty",
									"style": "background-color: #ecc",
									"content": "Hard Puzzles"
								}
							]
						},
						{
							"components": [
								{
									"name": "custom",
									"kind": "onyx.Button",
									"classes": "half1",
									"style": "background-color: #cce;",
									"content": "Custom Puzzles"
								},
								{
									"name": "builder",
									"kind": "onyx.Button",
									"classes": "half2",
									"content": "Builder"
								}
							]
						},
						{
							"tag": "hr"
						},
						{
							"components": [
								{
									"name": "buy",
									"showing": false,
									"kind": "onyx.Button",
									"classes": "onyx-affirmative",
									"content": "Buy Picross: $0.99"
								}
							]
						}
					]
				}
			]
		}
	],

	"init": function(app) {
		this.app = app;
		//this.resizeHandler();
		this.bubble("onresize");
		if(typeof(FULL) === "undefined" || !FULL) {
			this.$.title.setContent("Picross Demo");
			this.$.custom.setDisabled(true);
			this.$.builder.setDisabled(true);
			if(typeof(PalmServiceBridge) !== "undefined") {
				if(location && location.hostname === "penduin.net") {
					this.$.buy.setContent("Get the WebOS app!");
				}
				this.$.buy.setShowing(true);
			}
		}
		return this;
	},

	"handleTap": function(sender, event) {
		if(location && location.hostname === "penduin.net" &&
		   event.originator.name === "buy") {
			location.assign(["http://developer.palm.com/appredirect/",
							 "?packageid=net.penduin.picrossdemo"].join(""));
			return;
		}
		if(this.app) {
			this.app.handleMenuTap(sender, event);
		}
	},

	"resizeHandler": function(sender, event) {
		if(document.body.clientHeight < 420) {
			this.$.mainmenu.addClass("small");
		} else {
			this.$.mainmenu.removeClass("small");
		}
	}
});
