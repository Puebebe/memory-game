var array_holder = [];
function startGame() {
	var pools = document.getElementsByClassName("image-pool");
	var array_png = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
	var images_sources = document.getElementsByClassName("images");
	var array_picker;
	var array_index;
	for(var i=0;i<16;i++) {
		do {
			images_sources[i].style.visibility = "hidden";
			array_picker = Math.floor(Math.random()*16);
			array_index = array_png[array_picker];
			if (array_index!=="none") {
				array_holder[i] = "images/"+array_index+".png";
				array_png[array_picker] = "none";
				array_index = "none";
			}
			else {
				array_index = "";
				array_picker = -1;
			}
		}
		while(array_index != "none");
		var array_index;
		pools[i].style.visibility = "visible";
	}
}
function comparizer(n) {
	var images_sources = document.getElementsByClassName("images");
	images_sources[n].src = array_holder[n];
	images_sources[n].style.visibility = "visible";
	var clicked = images_sources[n].classList.add("clicked");
	var visible_image = images_sources[n].style.visibility;
	var source_image = images_sources.src;
	var contains = images_sources[n].classList;
	var classer = document.getElementsByClassName("clicked");
	if(contains.contains("clicked") === true) {
		document.getElementById("image-pool")[n].disabled = true;
	}
	if ( contains.contains("clicked") === true && contains.contains("matched") === false &&  classer[0].src===images_sources[n].src) {
		classer[0].classList.add("matched");
		classer[1].classList.add("matched");
	}
	else {
		
		classer[0].style.visibility = "hidden";
		if(typeof classer[1] !== "undefined") {
			classer[1].style.visibility = "hidden";
		}
		classer[0].classList.remove("clicked");
		

	}
}
