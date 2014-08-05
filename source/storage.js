if(enyo.platform.webos && enyo.platform.webos < 2) {
	/* nasty hack for webos 1.x, on which localStorage is not permanent */

STORAGE = {};
DB = openDatabase("picross", 1, 1024 * 1024, true);
DB.transaction(function (tx) {
	tx.executeSql("CREATE TABLE IF NOT EXISTS ddata(dname text, dvalue text)");
});

enyo.kind({
	name: "Storage",
	kind: "Component",

	statics: {
		set: function(name, obj){
			//enyo.log("SET "+JSON.stringify(obj));
			STORAGE[name] = obj;
			DB.transaction(function (tx) {
				tx.executeSql("DELETE FROM ddata WHERE dname = ?", [name]);
				tx.executeSql("INSERT INTO ddata (dname, dvalue) VALUES (?, ?)",
							  [name, JSON.stringify(obj)]);
			});
		},

		/* Get the item with the key 'name'. */
		get: function(name){
			//enyo.log("get "+name);
			DB.transaction(function (tx) {
				var sql = "SELECT * FROM ddata where dname = ?";
				tx.executeSql(sql, [name], function (tx, results) {
					var len = results.rows.length, i;
					for(i = 0; i < len; i++) {
						//enyo.log("GOT "+results.rows.item(i).dvalue);
						STORAGE[name] = JSON.parse(results.rows.item(i).dvalue);

						//(another) horrible hack
						if(name === "picross-custom") {
							PUZZLES.custom = STORAGE[name];
						}
					}
				});
			});
			return STORAGE[name];
		},

		/* Remove the item with the key 'name'. */
		remove: function(name){
			if(STORAGE[name]) {
				delete STORAGE[name];
			}
			DB.transaction(function (tx) {
				tx.executeSql("DELETE FROM ddata where dname = ?", [name]);
			});
		}
	}
});

Storage.get("picross-solved");
Storage.get("picross-custom");
Storage.get("picross-options");

} else {

enyo.kind({
	name: "Storage",
	kind: "Component",

	statics: {
		set: function(name, obj){
			if(typeof name === "string") {
				if(typeof obj === "object") {
					localStorage.setItem(name, JSON.stringify(obj));
				}
				else if(typeof obj === "string") {
					localStorage.setItem(name, obj);
				}
			}
		},

		/* Get the item with the key 'name'. */
		get: function(name){
			var result;
			if(typeof name === "string") {
				result = localStorage.getItem(name);
			}

			if(typeof result === "string"){
				return result ? JSON.parse(result) : null;
			} else if(typeof result === "object" && result !== null) {
				enyo.log("OBJECT: " + result);
				throw "ERROR [Storage.get]: getItem returned an object. Should be a string.";
			} else if(typeof result === "undefined" || result === null){
				//TODO: what to do? log?
			}

		},

		/* Remove the item with the key 'name'. */
		remove: function(name){
			if(typeof name === "string") {
				localStorage.remove(name);
			} else {
				throw "ERROR [Storage.remove]: 'name' was not a String.";
			}
		},

		/* Returns length of all localStorage objects. */
		__getSize: function(){
			var i, count = 0;
			for(i = 0; i < localStorage.length; i++){
				count += localStorage.getItem(localStorage.key()).length;
			}
			return count;
		}
	}

});

}