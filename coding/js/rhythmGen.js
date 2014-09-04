//Rhythm Generator

(function(){

	const PITCHSPACE = 88;

	function MusicGrid(size) {
		
		this.gridSize = size;
		this.notes = new Array(size, PITCHSPACE);
		this.timeSig = timeSig;
	}

	function Monad(smallestDur) {
		
		this.smallestDur = smallestDur;
		this.xPos = 0;
		this.yPos = 0;

		this.getInfo = function() {
			return "monad info: " + this.fraction;
		};

		this.changeX = function(toX) {
			this.xPos = toX;
		}
		this.changeY = function(toY) {
			this.yPos = toY;
		}

	}

	function createRhythm(){
		
	}

	function getRandom(min, max) {
    	return Math.floor(Math.random() * (max - min) + min);
  	}


})();