function getColor() {
	var newColor = document.getElementById("color").value;
	document.documentElement.style.setProperty("--back_color",newColor)
}

function beat() {
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.clickcount) {
			var count = Number(sessionStorage.clickcount);
			if (count > 19) {
				count = 1;
			} else {
				count = count + 1;
			}
        } else {
        	count = 1;
        }
        sessionStorage.clickcount = count;
		var beatRate = (1/count).toString() + "s";
		document.documentElement.style.setProperty("--applebeat",beatRate);
        document.getElementById("apple").innerHTML = sessionStorage.clickcount;
    } else {
        document.getElementById("apple").innerHTML = "Sorry, your browser does not support web storage...";
    }
}