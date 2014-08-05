var FULL = false || (location && location.search && location.search == "?FULL");
/*
  Change to true for the full game.  Yup, it's just that easy.

  I would, however, ask you not to redistribute full copies of the game.  Cool?
  And, if you don't mind, encourage your friends to try (and buy?) it.

  Have fun!  -penduin
*/
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
