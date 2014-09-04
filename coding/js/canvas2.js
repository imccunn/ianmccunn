(function() {

	//canvas size
	var width = 1024,
	  	height = 768,
		c = document.getElementById('c'), 
		ctx = c.getContext('2d');

	c.width = width;
	c.height = height;

	// Number of 'rain' pixels on canvas at any given time
	var numDots = 10000,
			dots = [];

	//init dots storage
	for (var i = 0; i < numDots; i++){
		dots.push({xx: 0, yy: 0});
	}

	function clear() {	
	  ctx.fillStyle = '#000';
	  ctx.beginPath();
	  ctx.rect(0, 0, width, height);
	  ctx.closePath();
	  ctx.fill();
	}

	function getRandom(min, max) {
    	return Math.floor(Math.random() * (max - min) + min);
	}

	function drawLine(x, y, h, w, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.fillRect(x, y, h, w);
		ctx.closePath();
		ctx.fill();
	}

	function DrawPoints(color) {
		for (var i = 0; i < numDots; i++){
			ctx.fillStyle = color;
			ctx.beginPath();

			dots[i].xx = getRandom(1, width);
			dots[i].yy = getRandom(1, height);
			ctx.fillRect(dots[i].xx, dots[i].yy, 1, 1);
			ctx.closePath();
			ctx.fill();
		}

	}

	// This draws a line across the canvas width
	function drawDiagonal() {
      ctx.beginPath();
      ctx.moveTo(100, 400);
      ctx.lineTo(450, getRandom(50, 60));
      ctx.lineTo(getRandom(700, 1000), 200);
      ctx.closePath();
      ctx.strokeStyle = '#fff';
      ctx.stroke();

	};

	function DeltaPoints(fCount) {

		var xChange = 0;
		var dotColor = '';
		var rectSize = 1;

		var bandAdjust = 0;

		for (var i = 0; i < dots.length; i++){


			switch (i%10) {
				case 1 : xChange = 1; dotColor = '#005C4F';
					break;
				case 2 : xChange = 2; dotColor = '#005C4F';
					break;
				case 3 : xChange = 3; dotColor = '#027A6A';
					break;
				case 4 : xChange = 4; dotColor = '#008C79';
					break;
				case 5 : xChange = 5; dotColor = '#009C87';
					break;
				case 6 : xChange = 6; dotColor = '#00AD96';
					break;
				case 7 : xChange = 7; dotColor = '#00C7AC';
					break;
				case 8 : xChange = 8; dotColor = '#00E0C2';
					break; 
				case 9 : xChange = 9; dotColor = '#03FFDD';
					break;
				default : xChange = 1; dotColor = '#005C4F';
					break;
			}

			if (dots[i].yy >= 50 && dots[i].yy < 65) {

				if (dots[i].xx <= 0) {
					dots[i].xx += width + getRandom(1, 20);
				} else {
					dots[i].xx -= 20;
				}

			}

			if (dots[i].yy >= 100 && dots[i].yy < 170) {
				rectSize = 2;
			}	else
				rectSize = 1;

			if (dots[i].yy >= 200 && dots[i].yy < 250) {
				if (dots[i].xx >= width){
					dots[i].xx = 1;
				} else {
					dots[i].xx += getRandom(1, 15);
				}

			}

			
			if (bandAdjust == 50) {
				bandAdjust = 0;
			}

			if (dots[i].yy >= (260 - ((frameCount*3) % 350)) && dots[i].yy < (285 - ((frameCount*3) % 350))) {
				if (frameCount % getRandom(1, 6) === 0){
					dotColor = 'rgba(0,0,0,0)';
				}else {
					dotColor = 'rgba(0,0,0,0)';
				}
				
			}

			if (dots[i].yy >= (400 + ((frameCount*2) % 100)) && dots[i].yy < (480 + ((frameCount*2) % 100))) {
				dots[i].xx -= 2;

				dotColor = '#FF8800';
			}

			if (dots[i].yy >= 480 && dots[i].yy < 520) {
				dots[i].xx += 4;
				rectSize = 2
			}

			if (dots[i].yy >= 600 && dots[i].yy < 650) {
				if (dots[i].xx >=width){
					dots[i].xx = 1;
				}
				dots[i].xx += 4;
				rectSize = 2;
			}			


			// reset dot positions
			if (dots[i].yy >= height) {
				dots[i].yy = 0;
				dots[i].xx = getRandom(1, width);
			} else {
					dots[i].yy += xChange;
				}

			
			
			ctx.fillStyle = dotColor;
			ctx.beginPath();
			ctx.fillRect(dots[i].xx, dots[i].yy, rectSize, rectSize);
			ctx.closePath();
			ctx.fill();

		}
	}

	var frameCount = 0;
	function frameLoop() {
	  clear();

	  if (frameCount == 500){
	  	frameCount = 0;
	  } else {
	  	frameCount++;
	  }

	  // **** Flashing Lines ****
	  if ( frameCount%20 === 0){
	  	drawLine(0, getRandom(1, height), width, getRandom(5, 30), '#FF17E0');
	  }

	 	if ( frameCount%15 === 0){
	  	drawLine(0, getRandom(1, height), width, getRandom(10, 100), '#000');
	  }
	  
	  drawLine(0, getRandom(1, 300), width, 1, '#fff');

	  if (frameCount % 5 == 0){
			drawLine(0, getRandom(500, 760), width, 1, '#00FF00');
	  }

	  if (frameCount % 7 == 0){
			drawLine(0, getRandom(0, 760), width, 2, '#00FF00');
	  }

	  if ( frameCount % 23 === 0 ) {
	  }
	  
	  DeltaPoints(frameCount);
	  requestAnimationFrame(frameLoop);
	 }
	 
	DrawPoints('#03FFDD');
	frameLoop();

})();

