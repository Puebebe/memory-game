var array_holder = []; // It holds URLs of images
function startGame() { // Function that begins the game itself
	var pools = document.getElementsByClassName("image-pool"); // There're divs inside of cells of Main game
	var array_png = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]; // Pairs of images from 1 to 8
	var images_sources = document.getElementsByClassName("images"); // Images inside of image-pools
	var array_picker; // Number randomized in interval from 0 to 15
	var array_index; // It picks randomized number from array_png and stores it
	var i=0; // ( ͡° ͜ʖ ͡°)
	for(i;i<16;i++) {
		do {
			images_sources[i].src = "../images/puzzle.png"; // It sets all images to puzzle.png
			array_picker = Math.floor(Math.random()*16); // Randomizes number
			array_index = array_png[array_picker]; // Picks number from array_png
			if (array_index!=="none") {
				array_holder[i] = "../images/"+array_index+".png"; // Saves URL of image to array cell
				array_png[array_picker] = "none"; // Sets array_png to none to prevent future complications
				array_index = "none"; // Same here as in array_png uppon it
			}
			else {
				array_index = ""; // Resets value of array_index
				//array_picker = -1; It's temporary not useful
			}
			continue;
		}
		while(array_index != "none"); // Loop break when array_index is set to none, because of assigning value to array_holder
		array_index = ""; // Does the same as in else 
		pools[i].style.visibility = "visible"; // Puzzle image shows up
	}

}
var attempts=0,matched_images=0; // attempts is for how many attempts you did and matched_images is used for counting matched images
function comparizer(n) { // Function that comparizes images
	var images_sources = document.getElementsByClassName("images"); // Variable that stores images in the form of class
	var this_image_source = document.getElementsByClassName("images")[n].src; // Variable that stores source of image clicked by user
	var i=0,many_clicked=0; // ( ͡° ͜ʖ ͡°) and many_clicked means how many images were clicked and it's used by statements
	var length = array_holder.length; // Length of array_holder needed to future doings
	for(i;i<length;i++) {
		if(images_sources[i].classList.contains("clicked")) { // It checks if all images contains class clicked
			many_clicked+=1; // If so it adds it amount to many_clicked
		}
	}
	var puzzle_src = document.getElementById("helper"); // Variable that possesses helper that I've described before
	puzzle_src.src = "../images/puzzle.png"; // Source of helper that stores the puzzle URL
	if(this_image_source === puzzle_src.src) { // This statement checks if image source that were chosen by user is equal by a type too with puzzle source
		if(many_clicked<2) { // If they weren't clicked more than 2 images it will pass the function
			if(many_clicked==0) { // If they're not clicked images yet it will make a first image additions
				images_sources[n].classList.add("clicked"); // It adds clicked class to first clicked image
				images_sources[n].classList.add("matched"); // It adds mathced class to first clicked image
				images_sources[n].style.visibility = "visible"; // It changes visibility of this element to show it to user
				images_sources[n].src = array_holder[n]; // It changes puzzle image to a image of a random fruit
				many_clicked+=1; // Adds how many images were clicked before to prevent multiplying of first images
				images_sources[n].classList.add("first"); // Adds first class to an image that were clicked by user to match this image as first one to other statements and loops
			}
			else {
				var first_image = document.getElementsByClassName("first"); // Variable that stores all elements with class first so it stores only one single element that i've called before the first image
				images_sources[n].src = array_holder[n]; // It assigns source of image in array_holder[n] to an image that were clicked
				images_sources[n].style.visibility = "visible"; // It sets visibility of clicked image to visible
				var clicked = images_sources[n].classList.add("clicked"); // Variable that adds to our clicked image class clicked to know that it was clicked
				var container = images_sources[n].classList; // Variable that stores list of classes of our image
				var classer = document.getElementsByClassName("clicked"); // It stores all elements with class clicked so it will be from interval from 0 to 2
				var score = document.getElementById("score"); // Our score div
				setTimeout(function(){ // Timeout is setted for enabling user a 0.5 sec view on image
					if (container.contains("clicked") === true && container.contains("matched") === false &&  images_sources[n].src===first_image[0].src) { // If recently clicked image contains class clicked and does not contain class matched and sources of first image and clicked image are equal so it pass the condition
						first_image[0].classList.remove("clicked"); // It removes clicked class from first image, because we cannot have more than 2 clicked images
						images_sources[n].classList.remove("clicked"); // The same with recently clicked image
						images_sources[n].classList.add("matched"); // Adds matched class to clicked image to assign it to be matched by another image
						first_image[0].classList.remove("first"); // First image loses its value, because it's matched so we don't need their first image anymore
						attempts+=1; // It adds how many times user clicked before so it's only one time
						score.innerHTML = attempts; // We show to user how many times he tried to match images
						matched_images+=1; // We add one pair of matched images to this variable to later show the victory of the user
						if (matched_images === 8) { // We have sixteen images so there is 8 pairs of it. We need to match 8 pairs to win the game
							score.innerHTML += " you Won"; // It adds this sign to our attempts
						}
					}
					else { // If one of the statements are not fulfilling the condition, it does
						first_image[0].src = "../images/puzzle.png"; // We change the source URL of first image to puzzle.png
						first_image[0].classList.remove("clicked"); // It removes clicked class from first image, because it couldn't be more than 2 clicked images at the same time
						first_image[0].classList.remove("matched"); // We removes this class, because it didn't match with clicked image
						first_image[0].classList.remove("first"); // And it stops being the first image
						images_sources[n].src = "../images/puzzle.png"; // Same here we change source to puzzle.png
						images_sources[n].classList.remove("clicked"); // And remove class clicked, because now there're not any clicked images
						attempts+=1; // It adds one attempt made by user
						score.innerHTML = attempts; // And we describe it on the screen
					}
				},500); // 0.5 second of delay
				many_clicked-=2; // We substract two from it, because there're not any clicked images here
			}
		}
	}
}
var instruction = document.getElementById("instruction"); // Variable that stores instruction div
instruction.style.display = "none"; // From beginning instruction div is not visible to the user
function instruction_display() { // Function that starts when user click show/hide instruction button
	var button = document.getElementById("instruction-button"); // Variable that stores show/hide button
	if (instruction.style.display == "block") { // If instruction is visible to the user it pass the condition
		instruction.style.display = "none"; // It changes display of instruction to be not displayed
		button.innerHTML = "Show Instruction"; // And changes Hide button to a Show button
	}
	else if(instruction.style.display == "none") { // If instruction is hidden from the user it passes the condition
		instruction.style.display = "block"; // It changes display of instruction to a standard display of block
		button.innerHTML = "Hide Instruction"; // And it changes Show button to a Hide button
	}
}
/*
		TODO !!!

	Alpha 2.0:
	- Add 5x5 memory game option
	- Add 6x6 memory game option
	- Add another set of images to be chosen by the user
	- Change the code to be faster interpreted
	- Delete images and set background images of divs
	- To minimize loops and if statements
	- Order variables and declarations
	- Correct graphic form of API

	Alpha 3.0:
	- Add score board to the game
	- Add user nicknames to be identified
	- Add simple database that store top 20 users 
	- Add timer

	Alpha 4.0:
	- Add levels of complexity of gameplay
	- Add some short tutor clips
	- Add possibility to play using arrows and enter/space button
	- Add changing controls

	REMEMBER TO ADD ANY OF MINE IDEAS TO THIS LIST !!!

	Beta 1.0:
	- Bug report button
	- Bug form to reply to me
	- In form add categories of sent message
	
	Rest of todo will come soon
	I think so xd.
*/
