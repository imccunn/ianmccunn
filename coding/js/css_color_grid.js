//css_color_grid

(function(){
	"use strict";
	
	var hasRun = false;

	var animSheet = document.createElement('style');
	animSheet.setAttribute('id', 'bodyAnimSheet');
	animSheet.innerHTML = ' ';
	
	// Add stylesheet for webkit animation definitions
	document.body.appendChild(animSheet);
	
	document.onload = updateDOM();

	var config1 = new Preset();
	config1.blockSize = 20;
	config1.borderRad = 2;
	config1.rRandUpper = 256;
	config1.rRandLower = 0;
	config1.rRandUpperEnd = 0;
	config1.rRandLowerEnd = 0;
	config1.gRandUpper = 256;
	config1.gRandLower = 0;
	config1.gRandUpperEnd = 0;
	config1.gRandLowerEnd = 0;
	config1.bRandUpper = 256;
	config1.bRandLower = 0;
	config1.bRandUpperEnd = 0;
	config1.bRandLowerEnd = 0;
	config1.minAnimationTime = 1;
	config1.maxAnimationTime = 3;

	var config2 = new Preset();
	config2.blockSize = 20;
	config2.borderRad = 0;
	config2.rRandUpper = 0;
	config2.rRandLower = 0;
	config2.rRandUpperEnd = 0;
	config2.rRandLowerEnd = 0;
	config2.gRandUpper = 256;
	config2.gRandLower = 150;
	config2.gRandUpperEnd = 0;
	config2.gRandLowerEnd = 0;
	config2.bRandUpper = 30;
	config2.bRandLower = 0;
	config2.bRandUpperEnd = 0;
	config2.bRandLowerEnd = 0;
	config2.minAnimationTime = 0.2;
	config2.maxAnimationTime = 1;


	var config3 = new Preset();
	config3.blockSize = 20;
	config3.borderRad = 0;
	config3.rRandUpper = 256;
	config3.rRandLower = 256;
	config3.rRandUpperEnd = 0;
	config3.rRandLowerEnd = 0;
	config3.gRandUpper = 256;
	config3.gRandLower = 256;
	config3.gRandUpperEnd = 0;
	config3.gRandLowerEnd = 0;
	config3.bRandUpper = 256;
	config3.bRandLower = 256;
	config3.bRandUpperEnd = 0;
	config3.bRandLowerEnd = 0;
	config3.minAnimationTime = 2;
	config3.maxAnimationTime = 5;

	var config4 = new Preset();
	config4.blockSize = 20;
	config4.borderRad = 3;
	config4.rRandUpper = 256;
	config4.rRandLower = 0;
	config4.rRandUpperEnd = 256;
	config4.rRandLowerEnd = 0;
	config4.gRandUpper = 256;
	config4.gRandLower = 0;
	config4.gRandUpperEnd = 256;
	config4.gRandLowerEnd = 0;
	config4.bRandUpper = 256;
	config4.bRandLower = 0;
	config4.bRandUpperEnd = 256;
	config4.bRandLowerEnd = 0;
	config4.minAnimationTime = 0.5;
	config4.maxAnimationTime = 3;

	var config5 = new Preset();
	config5.blockSize = 20;
	config5.borderRad = 0;
	config5.rRandUpper = 150;
	config5.rRandLower = 90;
	config5.rRandUpperEnd = 256;
	config5.rRandLowerEnd = 256;
	config5.gRandUpper = 150;
	config5.gRandLower = 100;
	config5.gRandUpperEnd = 256;
	config5.gRandLowerEnd = 256;
	config5.bRandUpper = 256;
	config5.bRandLower = 200;
	config5.bRandUpperEnd = 256;
	config5.bRandLowerEnd = 256;
	config5.minAnimationTime = 3;
	config5.maxAnimationTime = 5;

	var config6 = new Preset();
	config6.blockSize = 20;
	config6.borderRad = 0;
	config6.rRandUpper = 256;
	config6.rRandLower = 0;
	config6.rRandUpperEnd = 0;
	config6.rRandLowerEnd = 0;
	config6.gRandUpper = 0;
	config6.gRandLower = 0;
	config6.gRandUpperEnd = 0;
	config6.gRandLowerEnd = 0;
	config6.bRandUpper = 0;
	config6.bRandLower = 0;
	config6.bRandUpperEnd = 256;
	config6.bRandLowerEnd = 200;
	config6.minAnimationTime = 1;
	config6.maxAnimationTime = 3;

	var config7 = new Preset();
	config7.blockSize = 20;
	config7.borderRad = 0;
	config7.rRandUpper = 256;
	config7.rRandLower = 256;
	config7.rRandUpperEnd = 0;
	config7.rRandLowerEnd = 0;
	config7.gRandUpper = 0;
	config7.gRandLower = 0;
	config7.gRandUpperEnd = 190;
	config7.gRandLowerEnd = 100;
	config7.bRandUpper = 0;
	config7.bRandLower = 0;
	config7.bRandUpperEnd = 256;
	config7.bRandLowerEnd = 200;
	config7.minAnimationTime = 2;
	config7.maxAnimationTime = 2.5;

	var config8 = new Preset();
	config8.blockSize = 20;
	config8.borderRad = 0;
	config8.rRandUpper = 140;
	config8.rRandLower = 140;
	config8.rRandUpperEnd = 0;
	config8.rRandLowerEnd = 0;
	config8.gRandUpper = 160;
	config8.gRandLower = 160;
	config8.gRandUpperEnd = 190;
	config8.gRandLowerEnd = 100;
	config8.bRandUpper = 0;
	config8.bRandLower = 0;
	config8.bRandUpperEnd = 256;
	config8.bRandLowerEnd = 200;
	config8.minAnimationTime = 5;
	config8.maxAnimationTime = 10;

	var config9 = new Preset();
	config9.blockSize = 20;
	config9.borderRad = 10;
	config9.rRandUpper = 256;
	config9.rRandLower = 256;
	config9.rRandUpperEnd = 203;
	config9.rRandLowerEnd = 190;
	config9.gRandUpper = 157;
	config9.gRandLower = 157;
	config9.gRandUpperEnd = 0;
	config9.gRandLowerEnd = 0;
	config9.bRandUpper = 100;
	config9.bRandLower = 100;
	config9.bRandUpperEnd = 40;
	config9.bRandLowerEnd = 40;
	config9.minAnimationTime = 1;
	config9.maxAnimationTime = 4;





	function Preset(){
		this.blockSize;
		this.borderRad;
		this.rRandUpper;
		this.rRandLower;
		this.rRandUpperEnd;
		this.rRandLowerEnd;
		this.gRandUpper;
		this.gRandLower;
		this.gRandUpperEnd;
		this.gRandLowerEnd;
		this.bRandUpper;
		this.bRandLower;
		this.bRandUpperEnd;
		this.bRandLowerEnd;
		this.minAnimationTime;
		this.maxAnimationTime;
	}

/*
	function Grid(rows, cols){

		this.grid = new Array(rows);
		this.gridRows = rows;
		this.gridCols = cols;

		//init 2d array for grid
		for (var i = 0; i < rows; i++){
			this.grid[i] = new Array(cols);
		}

		// fill grid with DOM data via Block()
		var blockNum = 0;
		for (i=0; i<row; i++){

			for (var j = 0; i < cols; j++){
				blockNum++;
				this.grid[i][j] = new Block(blockNum);
			}
		}

		function getBlockCSS(row, col){
			return grid[row][col].css;
		}

		function getBlockAnim(row, col){
			return grid[row][col].anim;
		}

		function getBlockMarkup(row, col){
			return grid[row][col].markup;
		}

		function getBlockCount() {
			return blockNum;
		}

	};

	function Block(num){

	 	var div = document.createElement('div');
		div.id = 'div' + num;
		div.style.width = '30px';
		div.style.height = '30px';
		div.style.backgroundColor = "red";
		div.setAttribute('style', '-webkit-animation: ');
		
		//this.anim = ;
		return div;
		//this.markup = ;
	};

	function AnimKF(name, fromColor, toColor) {
		this.aName = aName;
		this.fromColor = fromColor;
		this.toColor = toColor;
		//this.markup = "@-webkit-keyframes " + this.aName + " {from {background: " + this.fromColor + ";}to {background: " + this.toColor + ";}}";
		this.getMarkup = function() {
			return null;
		}

	};

	function createGrid(rows, cols) {
		var grid = new Grid(rows, cols);
		return grid;
	}
*/

	// ***************************
	// init()
	//
	// Bind event handlers

	function init(){
		//get rows and colums from form, validate input

		var radioPresets = document.forms['controlForm'].elements['preset'];
		for (var i = 0; i < radioPresets.length; i++){
			radioPresets[i].addEventListener('click', updateFromAll, false);
		}

		if (updateGrid.addEventListener){
			// W3C DOM
    		updateGrid.addEventListener('click', updateDOM, false);
	   	} else 
	   		if (updateGrid.attachEvent) { // IE DOM
     			updateGrid.attachEvent('onclick', updateDOM);
  			}
	}


	function getRandom(min, max) {
    	return Math.floor(Math.random() * (max - min) + min);
	}

	function getRandomf(min, max) {
		return Math.random() * (max - min) + min;
	}

	function rOctetInt(){

		// Optional: two arguments given providing range 
		if (arguments.length == 0){
			return getRandom(0, 256);
		}else
			if (arguments.length == 2){

				return getRandom(arguments[0], arguments[1]);
			}
			
	}

	function rPercentageInt(){
		return getRandom(0, 100);
	}

	function rHueInt() {
		return getRandom(0, 360);
	}

	function checkInput(){};


	function updateFromAll() {
		applyPreset();
		updateDOM();
	}

	function applyPreset(){
		var radioPresets = document.forms['controlForm'].elements['preset'];
		var preset = {};
		for (var i = 0; i < radioPresets.length; i++){
			if (radioPresets[i].checked){
				switch (i) {
					case 0 : preset = config1;
						break;
					case 1 : preset = config2;
						break;
					case 2 : preset = config3;
						break;
					case 3 : preset = config4;
						break;
					case 4 : preset = config5;
						break;
					case 5 : preset = config6;
						break;
					case 6 : preset = config7;
						break;
					case 7 : preset = config8;
						break;
					case 8 : preset = config9;
						break;
					default : preset = config1;
				}
			}
		}
		document.getElementById('boxSize').value = preset.blockSize;
		document.getElementById('boxBRad').value = preset.borderRad;
		document.getElementById('rUpper').value = preset.rRandUpper;
		document.getElementById('rLower').value = preset.rRandLower;
		document.getElementById('rUpperEnd').value = preset.rRandUpperEnd;
		document.getElementById('rLowerEnd').value = preset.rRandLowerEnd;
		document.getElementById('gUpper').value = preset.gRandUpper;
		document.getElementById('gLower').value = preset.gRandLower;
		document.getElementById('gUpperEnd').value = preset.gRandUpperEnd;
		document.getElementById('gLowerEnd').value = preset.gRandLowerEnd;
		document.getElementById('bUpper').value = preset.bRandUpper;
		document.getElementById('bLower').value = preset.bRandLower;
		document.getElementById('bUpperEnd').value = preset.bRandUpperEnd;
		document.getElementById('bLowerEnd').value = preset.bRandLowerEnd;
		document.getElementById('minAnimTime').value = preset.minAnimationTime;
		document.getElementById('maxAnimTime').value = preset.maxAnimationTime;
	}

	function updateDOM(){


		var content = document.getElementById('deltaColorGrid'), // Output Container 
				blockSize = parseInt(document.getElementById('boxSize').value),
				borderRad = parseInt(document.getElementById('boxBRad').value),
				jrUpper = parseInt(document.getElementById('rUpper').value),
				jrLower = parseInt(document.getElementById('rLower').value),
				jrUpperEnd = parseInt(document.getElementById('rUpperEnd').value),
				jrLowerEnd = parseInt(document.getElementById('rLowerEnd').value),
				jgUpper = parseInt(document.getElementById('gUpper').value),
				jgLower = parseInt(document.getElementById('gLower').value),
				jgUpperEnd = parseInt(document.getElementById('gUpperEnd').value),
				jgLowerEnd = parseInt(document.getElementById('gLowerEnd').value),
				jbUpper = parseInt(document.getElementById('bUpper').value),
				jbLower = parseInt(document.getElementById('bLower').value),
				jbUpperEnd = parseInt(document.getElementById('bUpperEnd').value),
				jbLowerEnd = parseInt(document.getElementById('bLowerEnd').value),
				jminAnimTime = parseFloat(document.getElementById('minAnimTime').value),
				jmaxAnimTime = parseFloat(document.getElementById('maxAnimTime').value);

		var numPerRow = 28, 
			rows = 18,
			numBlocks = rows * numPerRow,
			blocks = new Array(numBlocks),
			toggleRandSizes = false,
			animTime = 1, 
			keyframes = '';
			
		// Assure the div we're writing to is empty or cleared before we add another collection of divs
		content.innerHTML = ' ';
		animSheet.innerHTML = ' ';

		var attachDiv = document.createElement('div');
		//var clrGridDOMChunk;

		// Construct div blocks, their styles, and animations
		for (var i = 0; i < blocks.length; i++){

			blocks[i] = document.createElement('div');
			blocks[i].id = 'div' + i;

			if (toggleRandSizes){
				blockSize = getRandom(30, 30);
			}
			
			// Create Animation Keyframes
			keyframes = '@-webkit-keyframes anim' + i + ' {from{background: rgba(' + rOctetInt(jrLower, jrUpper) + ', ' + rOctetInt(jgLower, jgUpper) + ', ' + rOctetInt(jbLower, jbUpper) + ', 1);}to{background: rgba(' + rOctetInt(jrLowerEnd, jrUpperEnd) + ', ' + rOctetInt(jgLowerEnd, jgUpperEnd) + ', ' + rOctetInt(jbLowerEnd, jbUpperEnd) + ', 1);}}\n';
			animSheet.innerHTML += keyframes;
			
			animTime = getRandomf(jminAnimTime, jmaxAnimTime).toFixed(2);

			//Set Syle for each block
			blocks[i].style.display = 'inline-block';
			blocks[i].style.width = blockSize + 'px';
			blocks[i].style.height = blockSize + 'px';
			blocks[i].style.marginLeft = '0px';
			blocks[i].style.marginRight = '0px';
			blocks[i].style.marginTop = '0';
			//blocks[i].style.border = '0px solid #000';
			blocks[i].style.borderRadius = borderRad + 'px';

			// Animation
			blocks[i].style.webkitAnimation = 'anim' + i + ' ' + animTime + 's';

			blocks[i].style.webkitAnimationIterationCount = 'infinite';
			blocks[i].style.webkitAnimationDirection = 'alternate';

			blocks[i].style.mozWebkitAnimation = 'anim' + i + ' ' + animTime + 's';

			blocks[i].style.mozWebkitAnimationIterationCount = 'infinite';
			blocks[i].style.mozWebkitAnimationDirection = 'alternate';

			// Construct Virtual DOM
			attachDiv.appendChild(blocks[i]);
		}

		//Append Virtual DOM to DOM
		content.appendChild(attachDiv);		
	}

	init();

	 return;

})();
