// ****************************************
// 1d Coherant Noise Generator
// 
// Description: This generates '1 dimensional' perlin noise
// 	for the purposes of example and education.
//
//
// Made by: Ian McCunn, @ianmccunn, git: mcfun


(function () {

	'use strict';

	// Canvas Size
	var WIDTH = 860,
		HEIGHT = 550,
		BORDER_WIDTH = 50,
		c = document.getElementById('c'),
		ctx = c.getContext('2d'),
		SAMPLE_RATE = 4096; //4096/8192

	c.width = WIDTH;
	c.height = HEIGHT;

	function clear() {
		ctx.fillStyle = '#000';
		ctx.beginPath();
		ctx.rect(0, 0, WIDTH, HEIGHT);
		ctx.closePath();
		ctx.fill();
	}

    function drawText(textToDraw, posX, posY, size) {
        ctx.fillStyle = '#fff';
        ctx.fillText(textToDraw, posX, posY);
        ctx.font = parseInt(size).toString() + 'px arial';
    }

	function drawPoint(xC, yC, color) {
		ctx.fillStyle = color;
		ctx.beginPath();
		ctx.rect(xC, yC, 1, 1);
		ctx.closePath();
		ctx.fill();
	}

	function drawRect(x, y, width, height) {
		ctx.fillStyle = '#00FF00';
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.closePath();
		ctx.fill();
	}


	// ******************************************
	// Graph Object
	//
	// Description: Takes function values, scales them to the graph size in pixels and draws
	//
	//
	function Graph() {
		this.drawnYVals = [];
		this.drawnXVals = [];
		this.ORIGIN = new Coord(35, 520);
		this.X_PX = 800;
		this.Y_PX = 500;
	}
	
	Graph.prototype = {
		constructor: Graph,
		setGraphScaledPoints : function(noiseObj) {
		
			var xPointDist = this.X_PX/SAMPLE_RATE;
			
			for (var i = 0; i < noiseObj.length; i++ ) {
				this.drawnYVals[i] = roundFloat(this.ORIGIN.yy - ( parseFloat(noiseObj[i]) + 1) * (this.Y_PX) / 2, 4);
				this.drawnXVals[i] = xPointDist * i;
			}
		},

		checkGSP : function() {
			var highBound = 0, lowBound = 0;
			for (var i = 0; i < this.drawnXVals.length; i++){

				if (this.drawnYVals[i] > this.Y_PX){
					
					if (this.drawnYVals[i] > highBound) {
						highBound = this.drawnYVals[i];
					} 
				}

				if (this.drawnYVals[i] < 0){

					if (this.drawnYVals[i] < lowBound) {
						lowBound = this.drawnYVals[i];
					}
				}

			}

			if (highBound > 0 || lowBound < 0) {
				for (var i = 0; i < this.drawnXVals.length; i++) {
					
				}
			}

			console.log("low: " + lowBound + ", high: " + highBound);
		},

		drawGraphScaledPoints : function(noiseObj, color) {
			for (var i = 0; i < noiseObj.length; i++ ) {
				drawPoint( this.drawnXVals[i] + this.ORIGIN.xx, this.drawnYVals[i], color );
			}
		},

		drawAxis : function(){
			ctx.fillStyle = '#fff';

			ctx.beginPath();
			ctx.rect(this.ORIGIN.xx, this.ORIGIN.yy - this.Y_PX, 2, this.Y_PX);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.rect(this.ORIGIN.xx, this.ORIGIN.yy, this.X_PX, 2);
			ctx.closePath();
			ctx.fill();

			ctx.beginPath();
			ctx.rect(this.ORIGIN.xx-10, this.ORIGIN.yy-(this.Y_PX/2), 10, 2);
			ctx.closePath();
			ctx.fill();

			ctx.fillStyle = '#000000';
			ctx.beginPath();
			ctx.rect(this.ORIGIN.xx, this.ORIGIN.yy-(this.Y_PX/2), this.X_PX, 1);
			ctx.closePath();
			ctx.fill();

			drawText('1', this.ORIGIN.xx-20, this.ORIGIN.yy-this.Y_PX+5);
			drawText('0', this.ORIGIN.xx-20, this.ORIGIN.yy-this.Y_PX/2 + 4);
			drawText('-1', this.ORIGIN.xx-20, this.ORIGIN.yy);
		},

		drawGraphLines : function(setofpoints) {
			for (var i = 0; i < setofpoints.points.length; i++){
				drawRect(setofpoints.points[i].xx, setofpoints.points[i].yy, 1, HEIGHT-setofpoints.points[i].yy);
			}
		},

		drawSquareGrid : function() {
			ctx.strokeStyle = 'rgb(0, 0, 80)';

			var lineDist = 25;
			ctx.moveTo(this.ORIGIN.xx, this.ORIGIN.yy);
			for (var i = 1; i < parseInt(this.Y_PX/lineDist); i++) {
				
				ctx.moveTo(this.ORIGIN.xx+2, this.ORIGIN.yy - i*lineDist);
				ctx.lineTo(this.ORIGIN.xx+this.X_PX, this.ORIGIN.yy - i * lineDist);
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.closePath();

			}

			for (var i = 1; i < parseInt(this.X_PX/lineDist); i++) {
				
				ctx.moveTo(this.ORIGIN.xx+ i * lineDist, this.ORIGIN.yy - this.Y_PX);
				ctx.lineTo(this.ORIGIN.xx + i * lineDist, this.ORIGIN.yy);
				ctx.lineWidth = 1;
				ctx.stroke();
				ctx.closePath();

			}
		}
	}


	function drawLinearInterpolation(vals, color) {
		ctx.strokeStyle = color;
		ctx.beginPath();
		ctx.moveTo(ORIGIN.xx, ORIGIN.yy - (Y_PX/2));
		for (var i = 0; i < vals.length; i++) {
			ctx.lineTo(drawnXVals[i], drawnYVals[i]);
		}
		ctx.stroke();
	}

	function Linear_Interpolate(a, b, x) {
		return  a * (1 - x) + b * x;
	}

	function Cosine_Interpolate(a, b, x) {
		var ft = x * 3.1415927,
			f = (1 - Math.cos(ft)) * .5;

		return  a*(1-f) + b*f;
	}
	
	function Noise() {

		this.amplitude;
		this.freq;
		this.vals = [];
		this.cosIntCoords = [];
		this.linearIntCoords = [];
	}

	Noise.prototype	= {

		constructor: Noise,

		init : function(amp, freq) {
			
			this.amplitude = amp;
			this.freq = freq+2;

			for (var i = 0; i < this.freq; i++) {
				
				// if (i == this.freq-1 || i == 0){
				// 	this.vals[i] = 0;
				// } else {
				// 	this.vals[i] = getRandOne() * (1/this.amplitude);
				// }

				this.vals[i] = getRandOne() * (1/this.amplitude);
			
			}
		},

		linearInterp : function() {

			var j = 0,
				sampPerCycle = roundFloat(SAMPLE_RATE/(this.freq-2)),
				x = 0,
				pointA = this.vals[j],
				pointB = this.vals[j+1];

			for (var i = 0; i < SAMPLE_RATE; i++) {
				
				x += 1/sampPerCycle;
				
				if (x >= 1) {
					x = 0; 
					j++;
					pointA = this.vals[j];
					pointB = this.vals[j+1];
				} 
				
				this.linearIntCoords[i] = Linear_Interpolate(pointA, pointB, x);

				if (j == this.vals.length-1) break;
	
			}
		},

		cosInterp : function () {

			var j = 0,
				sampPerCycle = roundFloat(SAMPLE_RATE/(this.freq-2)),
				x = 0,
				pointA = this.vals[j],
				pointB = this.vals[j+1];

			for (var i = 0; i < SAMPLE_RATE; i++) {
				
				x += 1/sampPerCycle;
				
				if (x >= 1) {
					x = 0; 
					j++;
					pointA = this.vals[j];
					pointB = this.vals[j+1];
				} 
				
				this.cosIntCoords[i] = Cosine_Interpolate(pointA, pointB, x);

				if (j == this.vals.length-1) break;
	
			}
		},

		initAndInterp : function(amp, freq) {
			this.init(amp, freq);
			this.cosInterp();
			this.linearInterp();
		}	
	};




	// *********************** Perlin_Noise *************************
	//
	//
	// 
	//
	//
	//

	function Perlin_Noise(numOctaves, persistence) {
		
		this.persistence = persistence;
		this.numOctaves = numOctaves;
		this.octaves = []; // Noise
		this.summation = [];
	}
		
	Perlin_Noise.prototype = {
		constructor: Perlin_Noise,
		init : function(numOctaves, persistence) {
			this.persistence = persistence;
			this.numOctaves = numOctaves;
			var freq = 1;
			for (var i = 0; i < this.numOctaves; i++) {
				this.octaves[i] = new Noise();

				if (i === 0) {
					freq = 1;
				} else {
					freq = i * this.persistence;
				}
				this.octaves[i].initAndInterp(freq, Math.pow(2, i+1));
			}
			
		},
		sum : function() {

			var summedNoise = [];
			var summedPoint = 0;	
			for ( var i = 0; i < SAMPLE_RATE; i++ ) {

				summedPoint = 0;

				for (var j = 0; j < arguments.length; j++){
					summedPoint += this.octaves[arguments[j]-1].cosIntCoords[i];
				}

				summedNoise[i] = summedPoint/2;
			}

			this.summation = summedNoise;
		},
		smooth : function(factor) {

			for (var j = 0; j < factor; j++) {
				for (var i = 1; i < SAMPLE_RATE-1; i++) {
					this.summation[i] = (this.summation[i-1] + this.summation[i+1])/2;
				}
			}
		}

	};



	function roundFloat(input, prec) {
	    return parseFloat(input.toFixed(prec));
	}

	// Random number between -1.0 and 1.0
	function getRandOne() {
		return parseFloat(Math.random() * 2 - 1).toFixed(4);
	}

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max-min) + min);
	}

	function Coord(xx, yy) {
		this.xx = xx || 0;
		this.yy = yy || 0;
	}


	function frameLoop() {
		clear();

		perlin1G.drawAxis();
		//perlin1G.draw();
		perlin1G.drawSquareGrid();

		//somenoiseG.drawGraphScaledPoints(somenoise.cosIntCoords, '#00FF00');
		perlin1G.drawGraphScaledPoints(perlin1.summation, '#00ff00');

		//requestAnimationFrame(frameLoop);
	}


	var ampNume = 4,
		frequency = 32;

	var octaveDom = 10,
		persistDom = 1;

	var somenoise = new Noise();
	var somenoiseG = new Graph();

	var perlin1 = new Perlin_Noise(octaveDom, persistDom);
	var perlin1G = new Graph();

	somenoise.initAndInterp(ampNume, frequency);
	somenoiseG.setGraphScaledPoints(somenoise.cosIntCoords);


	perlin1.init(octaveDom, persistDom);
	perlin1.sum(1, 2, 3, 5, 6, 7, 8, 9, 10);


	perlin1G.setGraphScaledPoints(perlin1.summation);
	perlin1G.checkGSP();



	// Bind Click events to Generate and smooth buttons
	document.getElementById('smooth').addEventListener('click', function() {
		var factor = document.getElementById('smoothFactor').value;
		perlin1.smooth(factor);
		perlin1G.setGraphScaledPoints(perlin1.summation);
		frameLoop();
	});

	document.getElementById('setAmpFreq').addEventListener('click', function() {
		octaveDom = parseInt(document.getElementById('oct').value);
		persistDom = parseFloat(document.getElementById('persist').value);
		perlin1.init(octaveDom, persistDom);
		perlin1.sum(1, 2, 3, 5, 6, 7, 8, 9, 10);
		perlin1G.setGraphScaledPoints(perlin1.summation);
		perlin1G.checkGSP();
		frameLoop();
	});

	
	frameLoop();
	

})();
