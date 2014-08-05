// upgrade from cookies to proper storage
try {
	var custom = enyo.getCookie("picross-custom") || "[]";
	custom = enyo.json.parse(custom);
	if(custom.length) {
		Storage.set("picross-custom", custom);
		enyo.setCookie("picross-custom", null, {
			"Max-Age": 0
		});
	}
} catch(e) {
	enyo.log("upgrade: custom fail");
}
try {
	var solved = enyo.getCookie("picross-solved") || "[]";
	solved = enyo.json.parse(solved);
	if(solved.length) {
		Storage.set("picross-solved", solved);
		enyo.setCookie("picross-solved", null, {
			"Max-Age": 0
		});
	}
} catch(e) {
	enyo.log("upgrade: solved fail");
}

// Create options object with defaults
try {
	var options = Storage.get("picross-options") || {
		"highlight": false,
		"autoquit": true
	};
	Storage.set("picross-options", options);
} catch(e) {
	enyo.log("upgrade: options fail");
}
