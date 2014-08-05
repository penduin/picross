enyo.kind({
	"name": "PuzzleView",
	"kind": enyo.Control,
	"classes": "puzzleview",
	"published": {
		"scale": 8,
		"puzzle": {
			"name": "penduin",
			"data": "181e18343474183c",
			"fg": "#222",
			"bg": "#eee"
		}
	},
	"components": [
		{
			"name": "canvas",
			"tag": "canvas"
		},
/*
		{
			"name": "fg",
			"showing": false,
			"kind": "onyx.Input",
			"onchange": "changeFg"
		},
		{
			"name": "bg",
			"showing": false,
			"kind": "onyx.Input",
			"onchange": "changeBg"
		},
*/
		{
			"name": "label",
			"classes": "label"
		}
	],

	"create": function() {
		this.inherited(arguments);
	},
	"rendered": function() {
		this.display(this.puzzle, this.scale, true);
	},

	"changeFg": function(sender, event) {
		this.puzzle.fg = this.$.fg.getValue();
		this.display(null, 8, 8);
	},
	"changeBg": function(sender, event) {
		this.puzzle.bg = this.$.bg.getValue();
		this.display(null, 8, 8);
	},

	"display": function(puzzle, scale, pictureOnly) {
		this.puzzle = puzzle || this.puzzle;
		this.scale = scale || this.scale;

		this.$.label.setContent(this.puzzle.name || "(no name)");
		if(pictureOnly) {
			this.$.label.setShowing(false);
			this.addClass("inline");
		} else {
			this.$.label.setShowing(true);
			this.removeClass("inline");
		}

		var canvas = this.$.canvas.hasNode();
		if(!canvas) {
			// hack for web version which somehow doesn't hasNode yet
			setTimeout(enyo.bind(this, function() {
				this.display(puzzle, scale, pictureOnly);
			}), 10);
			return;
		}
		var ctx = canvas.getContext("2d");
		var x = 0;
		var y = 0;

		canvas.width = 8 * this.scale;
		canvas.height = 8 * this.scale;

		ctx.fillStyle = this.puzzle.bg || "#eee";
//		this.$.bg.setValue(ctx.fillStyle);
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = this.puzzle.fg || "#222";
//		this.$.fg.setValue(ctx.fillStyle);
		var row = "";
		if(!this.puzzle.data) {
			return;
		}

		for(y = 0; y < 8; y++) {
			row = parseInt(this.puzzle.data.substring(y * 2, (y * 2) + 2), 16);
			for(x = 0; x < 8; x++) {
				if(row & Math.pow(2, x)) {
					ctx.fillRect(x * this.scale, y * this.scale,
								 this.scale, this.scale);
				}
			}
		}

		if(this.puzzle.image) {
			var puzName = this.puzzle.name;
			scale = this.scale;
			var img = new Image();
			img.src = this.puzzle.image;
			img.onload = function() {
				try {
					ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
				} catch(e) {
					enyo.log("fallback to 2-color: " + puzName);
				}
			};
		}
	}
});
