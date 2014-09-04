//***************************
//Random Instrumentation Generator
//
//This tool takes a number, as the number of players of an ensemble
//and generates an instrumentation for that ensemble. An instrumentation includes
//primary instruments for each player and any doublings for that player.
//
//By Ian D. McCunn


(
	
	function Ensemble = {};
	

	var Player = function(primaryInstrument, isDoubling, doublingInstrument){
		this.isDoubling = false;
		this.primaryInstrument = primaryInstrument;
		this.doublingInstrument= doublingInstrument;

	};

	function Instrument = {
		this.instrumentName = instrumentName;
		this.transposition = transposition;
		this.upRange = upRange;
		this.lowRange = lowRange;
		this.print = function() {
			console.log(this.instrumentName);
		};
	};


	function Instrumentation = {
	
		this.players = [];
		this.instruments = [];

	};




	// ***************************************************
	// Helper Functions
	// ***************************************************


	// *******************
	// SPNtoSemiTones()
	//	 used to convert pitches in scientific pitch notation to a semitone integer
	//
	// @param sciencePitch
	//	 standard scientific notation of pitch to be converted to semitone integer
	//
	// @return semitoneInt
	//	integer in the form of semitones from C0

	function SPNtoSemiTones(sciencePitch){
		

		return semitoneInt;
	}


)();
