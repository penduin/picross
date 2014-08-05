enyo.kind({
	"name": "App",
	"kind": enyo.Control,
	"classes": "app enyo-unselectable",

	"published": {
		"badges": {
			"learner": {
				"title": "Learner!",
				"message": "Looked through the tutorial",
				"icon": "images/badge-green.png"
			},
			"first": {
				"title": "First!",
				"message": "Solved one puzzle",
				"icon": "images/badge-green.png"
			},
			"demo": {
				"title": "Demo-lition!",
				"message": "Solved all demo puzzles",
				"icon": "images/badge-red.png"
			},
			"easy1": {
				"title": "That's Easy!",
				"message": "Solved easy puzzle set 1",
				"icon": "images/badge-bronze.png"
			},
			"easy2": {
				"title": "All Two Easy!",
				"message": "Solved easy puzzle set 2",
				"icon": "images/badge-bronze.png"
			},
			"normal1": {
				"title": "That's Normal!",
				"message": "Solved normal puzzle set 1",
				"icon": "images/badge-bronze.png"
			},
			"normal2": {
				"title": "All Two Normal!",
				"message": "Solved normal puzzle set 2",
				"icon": "images/badge-bronze.png"
			},
			"hard1": {
				"title": "That's Hard!",
				"message": "Solved hard puzzle set 1",
				"icon": "images/badge-bronze.png"
			},
			"hard2": {
				"title": "All Two Hard!",
				"message": "Solved hard puzzle set 2",
				"icon": "images/badge-bronze.png"
			},
			"set1": {
				"title": "First Set!",
				"message": "Solved set 1 of all levels",
				"icon": "images/badge-silver.png"
			},
			"set2": {
				"title": "Second Set!",
				"message": "Solved set 2 of all levels",
				"icon": "images/badge-silver.png"
			},
			"creation": {
				"title": "Creation!",
				"message": "Saved a custom puzzle",
				"icon": "images/badge-purple.png"
			},
			"row": {
				"title": "Row Row Row!",
				"message": "Build 3 rows of custom puzzles",
				"icon": "images/badge-blue.png"
			},
			"half": {
				"title": "Half Full!",
				"message": "Saved 32 custom puzzles",
				"icon": "images/badge-bronze.png"
			},
			"full": {
				"title": "Full Up!",
				"message": "Saved 64 custom puzzles",
				"icon": "images/badge-silver.png"
			},
			"all": {
				"title": "Dollar's Worth!",
				"message": "Earned all of these badges",
				"icon": "images/badge-gold.png"
			},
		}
	},

	"init": function() {
		if(!enyo.platform.webos || enyo.platform.webos !== 3) {
			document.body.className += " anim";
		}
		this.mainMenu();
	},

	"mainMenu": function() {
		this.mainmenu = new MainMenu().init(this).renderInto(this.hasNode());
	},

	"handleMenuTap": function(sender, event) {
		switch(event.originator.name) {
		case "howto":
			this.howto = new HowTo({"app": this}).showPage(0).show();
//			this.howto.removeClass("pop");
//			this.howto.addClass("pop");
			break;
		case "options":
			this.options = new Options().init(this).renderInto(this.hasNode());
			break;
		case "custom":
		case "builder":
			if(typeof(FULL) === "undefined" || !FULL) {
				break;
			}
			// enyo bug? touchpad gets these events even if button is disabled
			// note: fallthrough
		case "easy":
		case "normal":
		case "hard":
			this.picross = new Picross().init(this).renderInto(this.hasNode());
			this.picross.setMode(event.originator.name);
			break;
		case "buy":
			var request = new enyo.webOS.ServiceRequest({
				"service": "palm://com.palm.applicationManager",
				"method": "open"
			});
			request.response(this, "serviceResult");
			request.error(this, "serviceResult");
			request.go({
				"target": ["http://developer.palm.com/appredirect/",
						   "?packageid=net.penduin.picross"].join("")
			});
			break;
		default:
			enyo.warn("unhandled menu event: " + event.originator.name);
			break;
		}
	},

	"serviceResult": function(sender, result) {
		enyo.log(enyo.json.stringify(result, null, 4));
	},

	"badge": function(badge) {
		var options = Storage.get("picross-options") || {};
		if(!options.badge) {
			options.badge = {};
		}
		if(options.badge[badge]) {
			// already have it
			return;
		}
		options.badge[badge] = true;
		Storage.set("picross-options", options);

		if(!this.notify) {
			this.notify = new enyo.Notification({});
		}
		this.notify.sendNotification({
			"title": this.badges[badge].title,
			"message": this.badges[badge].message,
			"icon": this.badges[badge].icon,
			"theme": "notification.Badged",
			"stay": false,
			"duration": 5
		});

		if(badge !== "all") {
			var all = true;
			for(key in this.badges) {
				if(key === "all") {
					continue;
				}
				if(!options.badge[key]) {
					all = false;
				}
			}
			if(all) {
				this.badge("all");
			}
		}
	}
});
