var HELP = [
	{
		"text":
		["Picross is a game in which solving a puzzle creates a picture.",
		 "  We begin with an empty grid, and use the clues at the top",
		 " and side to determine which blocks to fill in."].join(""),
		"img": "images/help1.png"
	},
	{
		"text":
		["The <strong>\"4\"</strong> clue on the first column means that a",
		 " <strong>group of four blocks</strong> will",
		 " be filled in.  In this case, that's the whole column!"].join(""),
		"img": "images/help2.png"
	},
	{
		"text":
		["The <strong>\"1\"</strong> clue on the bottom row means that only",
		 " one block gets filled.  We can remind ourselves <strong>not to fill",
		 " the rest</strong> using the <strong>\"X\" tool</strong>."].join(""),
		"img": "images/help3.png"
	},
	{
		"text":
		["The <strong>\"1 2\"</strong> clue means that the row contains",
		 " <strong>one block</strong> and a <strong>group of two blocks",
		 "</strong> to fill, <strong>separated</strong> by at least one",
		 " space, <strong>in that order</strong>."].join(""),
		"img": "images/help4.png"
	},
	{
		"text":
		["We already filled in <strong>\"1\"</strong> block in the",
		 " last column, so let's rule out the rest of them",
		 "  using the <strong>\"X\" tool</strong>.  This is",
		 " <strong>optional</strong>, but <strong>helpful</strong>!"].join(""),
		"img": "images/help5.png"
	},
	{
		"text":
		["The \"X\" marks in the column with the <strong>\"1 1\"</strong>",
		 " clue make it very easy to see where the <strong>two separated",
		 " blocks</strong> need filling in."].join(""),
		"img": "images/help6.png"
	},
	{
		"text":
		["Finishing up a puzzle is usually the easy part.  Our \"X\" marks",
		 " and the remaining clues make it clear which boxes to fill.",
		 "  It's a \"P\", for \"Picross\"!"].join(""),
		"img": "images/help7.png"
	},
	{
		"text":
		["Those are the basics of solving Picross puzzles.  Think logically,",
		 " and don't be afraid to experiment.  Have fun!"].join(""),
		"img": "images/help8.png"
	}
];


enyo.kind({
	"name": "HowTo",
	"kind": "onyx.Popup",
	"centered": true,
	"modal": true,
	"floating": true,
	"autoDismiss": false,
	"style": "width: 260px; height: 320px; padding: 20px;",
	"page": 0,
	"classes": "howto pop",
	"components": [
		{
			"kind": enyo.FittableRows,
			"style": "height: 100%;",
			"components": [
				{
					"name": "text",
					"content": "",
					"allowHtml": true,
					"fit": true
				},
				{
					"style": "text-align: center;",
					"components": [
						{
							"name": "img",
							"tag": "img",
							"attributes": {
								"width": 150,
								"height": 158
							},
							"src": "images/help1.png"
						}
					]
				},
				{
					"kind": enyo.FittableColumns,
					"components": [
						{
							"name": "back",
							"kind": "onyx.Button",
							"content": "Close",
							"ontap": "tapNav"
						},
						{
							"fit": true
						},
						{
							"name": "next",
							"kind": "onyx.Button",
							"content": "Next",
							"classes": "onyx-affirmative",
							"ontap": "tapNav"
						}
					]
				}
			]
		}
	],

	"showPage": function(which) {
		if(!HELP[which]) {
			this.removeClass("pop");
			return this.destroy();
		}
		this.$.text.setContent(HELP[which].text);
		this.$.img.setSrc(HELP[which].img || "images/help1.png");

		this.show();
		this.bubble("onresize");
		this.waterfall("onresize");
		return this;
	},

	"tapNav": function(sender, event) {
		if(event.originator.name === "back") {
			this.page--;
		} else {
			this.page++;
		}
		if(this.page <= 0) {
			this.$.back.setContent("Close");
		} else if(this.page >= HELP.length - 1) {
			this.$.next.setContent("Got it!");
			if(this.app) {
				this.app.badge("learner");
			}
		} else {
			this.$.back.setContent("Back");
			this.$.next.setContent("Next");
		}
		this.showPage(this.page);
	}
});
