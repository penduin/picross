var FULL = true || (location && location.search && location.search === "?FULL");
enyo.depends(
	"source/storage.js",
	"source/upgrade.js",
	"source/app.js",
	"source/howto.js",
	"source/mainmenu.js",
	"source/options.js",
	"source/picross.js",
	"source/playgrid.js",
	"source/puzzles.js",
	"source/puzzleview.js",
	"source/webOSExt.js",
	"source/ServiceRequest.js",
	"source/Notification.js",
    "picross.css"
);
