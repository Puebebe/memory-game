var array_holder = [];
function startGame() {
	var pools = document.getElementsByClassName("image-pool");
	var array_png = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
	var images_sources = document.getElementsByClassName("images");
	var array_picker;
	var array_index;
	for(var i=0;i<16;i++) {
		do {
			
			images_sources[i].src = "images/puzzle.png"
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
			continue;
		}
		while(array_index != "none");
		var array_index;
		pools[i].style.visibility = "visible";
	}

}
var attempts=0,matched_images=0;
function comparizer(n) {
	var images_sources = document.getElementsByClassName("images");
	var this_image_source = document.getElementsByClassName("images")[n].src;
	var i=0,many_clicked=0;
	var length = array_holder.length;
	for(i;i<length;i++) {
		if(images_sources[i].classList.contains("clicked")) {
			many_clicked+=1;
		}
	}
	var puzzle_src = document.getElementById("helper");
	puzzle_src.src = "images/puzzle.png";
	if(this_image_source === puzzle_src.src) {
			if(many_clicked<2) {
			if(many_clicked==0) {
				images_sources[n].classList.add("clicked");
				images_sources[n].classList.add("matched");
				images_sources[n].style.visibility = "visible";
				images_sources[n].src = array_holder[n];
				many_clicked+=1;
				images_sources[n].classList.add("first");
				
			}
			else {
				var first_image = document.getElementsByClassName("first");
				images_sources[n].src = array_holder[n];
				images_sources[n].style.visibility = "visible";
				var clicked = images_sources[n].classList.add("clicked");
				var container = images_sources[n].classList;
				var classer = document.getElementsByClassName("clicked");
				var score = document.getElementById("score");
				setTimeout(function(){
					if (container.contains("clicked") === true && container.contains("matched") === false &&  images_sources[n].src===first_image[0].src) {
						first_image[0].classList.remove("clicked");
						images_sources[n].classList.remove("clicked");
						images_sources[n].classList.add("matched");
						first_image[0].classList.remove("first");

						attempts+=1;
						score.innerHTML = attempts;

						matched_images+=1;

						if (matched_images === 8) {
							score.innerHTML += " you Won";
						}
					}
					else {
						first_image[0].src = "images/puzzle.png";
						first_image[0].classList.remove("clicked");
						first_image[0].classList.remove("matched");
						first_image[0].classList.remove("first");
						images_sources[n].src = "images/puzzle.png";
						images_sources[n].classList.remove("clicked");
						attempts+=1;
						score.innerHTML = attempts;
					}
				},500);
				many_clicked-=1;
				
			}
		}
	}

}
